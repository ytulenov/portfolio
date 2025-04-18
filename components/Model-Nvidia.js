import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { NvidiaSpinner, NvidiaContainer } from './Model-Nvidia-loader';
import { RateLimiterMemory } from 'rate-limiter-flexible';

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

// Use a module-scoped cache to persist across component instances
const modelCache = {
  model: null,
};

const ModelNvidia = () => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refRenderer = useRef();
  const urlNvidiaGLB = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_S3_URL
    : '/nvidia.glb';

  const rateLimiter = useRef(new RateLimiterMemory({
    points: 5,
    duration: 3600,
  })).current;

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer;
    const { current: container } = refContainer;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      renderer.setSize(scW, scH);
    }
  }, []);

  useEffect(() => {
    const { current: container } = refContainer;
    if (!container) return;

    const scW = container.clientWidth;
    const scH = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(scW, scH);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 2;
    container.appendChild(renderer.domElement);
    refRenderer.current = renderer;

    const scene = new THREE.Scene();
    const target = new THREE.Vector3(-0.5, 1.2, 0);
    const initialCameraPosition = new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    );

    const scale = scH * 0.005 + 4.8;
    const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.01, 50000);
    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.target = target;
    controls.enableZoom = false;

    const addLights = () => {
      // First Directional Light
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 25.0);
      directionalLight1.position.set(5000, 10000, 7500);
      directionalLight1.castShadow = true;
      directionalLight1.shadow.bias = 0.000000;
      directionalLight1.shadow.normalBias = 0.0;
      directionalLight1.shadow.radius = 1.0;
      scene.add(directionalLight1);
    
      // Second Directional Light
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10.0);
      directionalLight2.position.set(-2599, -7752, 2265);
      directionalLight2.castShadow = true;
      directionalLight2.shadow.bias = 0.000000;
      directionalLight2.shadow.normalBias = 0.0;
      directionalLight2.shadow.radius = 1.0;
      scene.add(directionalLight2);
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);

    if (modelCache.model) {
      console.log('Using cached model');
      scene.add(modelCache.model);
      addLights();
      renderer.setPixelRatio(window.devicePixelRatio);
      animate();
      setLoading(false);
    } else {
      console.log('Attempting to consume rate limit');
      rateLimiter.consume('model-fetch')
        .then(() => {
          console.log('Rate limit passed, loading model');
          loader.load(
            urlNvidiaGLB,
            (gltf) => {
              modelCache.model = gltf.scene;
              console.log('Model loaded, caching');
              scene.add(modelCache.model);
              addLights();
              renderer.setPixelRatio(window.devicePixelRatio);
              animate();
              setLoading(false);
            },
            undefined,
            (loadError) => {
              console.error('GLTF loading error:', loadError);
              setLoading(false);
              setError('Failed to load model');
            }
          );
        })
        .catch((rateError) => {
          console.error('Rate limit exceeded:', rateError);
          setLoading(false);
          setError('Rate limit exceeded. Try again later.');
        });
    }

    let req = null;
    let frame = 0;
    const animate = () => {
      req = requestAnimationFrame(animate);
      frame = frame <= 100 ? frame + 1 : frame;

      if (frame <= 100) {
        const p = initialCameraPosition;
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
        camera.position.y = 25;
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
        camera.lookAt(target);
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    return () => {
      cancelAnimationFrame(req);
      renderer.domElement.remove();
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [handleWindowResize]);

  if (error) return <NvidiaContainer ref={refContainer}>{error}</NvidiaContainer>;
  return <NvidiaContainer ref={refContainer}>{loading && <NvidiaSpinner />}</NvidiaContainer>;
};

export default ModelNvidia;