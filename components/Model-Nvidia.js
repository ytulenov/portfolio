import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { NvidiaSpinner, NvidiaContainer } from './Model-Nvidia-loader';

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const ModelNvidia = () => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef();
  const urlNvidiaGLB = process.env.NEXT_PUBLIC_S3_URL;

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
    renderer.setPixelRatio(1); // Low quality during load
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
    // Disable zooming
    controls.enableZoom = false; // Prevents zooming with mouse scroll or pinch gestures

    // Load the GLTF model directly
    const loader = new GLTFLoader();
    loader.load(
      urlNvidiaGLB,
      (gltf) => {
        scene.add(gltf.scene);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        scene.add(hemiLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        renderer.setPixelRatio(window.devicePixelRatio); // Full quality
        animate();
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('GLTF loading error:', error);
        setLoading(false);
      }
    );

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

  return <NvidiaContainer ref={refContainer}>{loading && <NvidiaSpinner />}</NvidiaContainer>;
};

export default ModelNvidia;