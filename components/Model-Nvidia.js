import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { NvidiaSpinner, NvidiaContainer } from './Model-Nvidia-loader';
import { RateLimiterMemory } from 'rate-limiter-flexible';

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

let cachedModel = null;

const ModelNvidia = () => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refRenderer = useRef();
  const urlNvidiaGLB = process.env.S3_URL;
  const isMounted = useRef(false);

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
    if (isMounted.current) return;
    isMounted.current = true;

    console.log('useEffect running, cachedModel:', !!cachedModel);
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
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      scene.add(hemiLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
      directionalLight.position.set(5, 10, 5);
      scene.add(directionalLight);
    };

    const loader = new GLTFLoader();
    if (cachedModel) {
      console.log('Using cached model');
      scene.add(cachedModel);
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
              cachedModel = gltf.scene;
              console.log('Model loaded, caching');
              scene.add(cachedModel);
              addLights();
              renderer.setPixelRatio(window.devicePixelRatio);
              animate();
              setLoading(false);
            },
            undefined,
            (error) => {
              console.error('GLTF loading error:', error);
              setLoading(false);
              setError('Failed to load model');
            }
          );
        })
        .catch((err) => {
          console.log('Rate limit exceeded:', err);
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