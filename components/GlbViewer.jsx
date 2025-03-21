
import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Box, Spinner } from '@chakra-ui/react';


function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const GlbViewer = ({
  src,
  autoRotate = true,
  cameraPosition = [0, 2, 5], 
  cameraTarget = [0, 0, 0], 
  cameraFov = 5, 
  lightIntensity = 1, 
  backgroundColor = 0x000000, 
  backgroundAlpha = 0, 
  enableZoom = true, 
  enablePan = true, 
  animationDuration = 60, 
}) => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef();
  const refCamera = useRef();
  const refControls = useRef();
  const refModel = useRef();

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer;
    const { current: container } = refContainer;
    const { current: camera } = refCamera;
    if (container && renderer && camera) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      renderer.setSize(scW, scH);
      camera.aspect = scW / scH;
      camera.updateProjectionMatrix();
    }
  }, []);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.setClearColor(backgroundColor, backgroundAlpha);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      container.appendChild(renderer.domElement);
      refRenderer.current = renderer;

      
      const scene = new THREE.Scene();

      
      const camera = new THREE.PerspectiveCamera(cameraFov, scW / scH, 0.1, 1000);
      camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
      camera.lookAt(new THREE.Vector3(cameraTarget[0], cameraTarget[1], cameraTarget[2]));
      refCamera.current = camera;

      
      const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity * 0.8); 
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, lightIntensity * 0.6); 
      hemiLight.position.set(0, 5, 0);
      scene.add(hemiLight);

      const pointLight1 = new THREE.PointLight(0xffffff, lightIntensity * 0.6, 50);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, lightIntensity * 0.6, 50);
      pointLight2.position.set(-5, 5, -5);
      scene.add(pointLight2);

      const directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity * 0.4);
      directionalLight.position.set(0, 5, 3);
      scene.add(directionalLight);

      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.5; 
      controls.enableZoom = enableZoom;
      controls.enablePan = enablePan;
      controls.minDistance = 1;
      controls.maxDistance = 20;
      controls.update();
      refControls.current = controls;

      
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
      dracoLoader.setDecoderConfig({ type: 'js' });

      
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      
      loader.load(
        src,
        (gltf) => {
          const model = gltf.scene;
          refModel.current = model;

          
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center); 

          
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim; 
          model.scale.set(scale, scale, scale);

          
          const cameraDistance = Math.max(maxDim * 2, 3); 
          camera.position.set(0, maxDim * 0.5, cameraDistance);
          controls.minDistance = cameraDistance * 0.5;
          controls.maxDistance = cameraDistance * 2;

          scene.add(model);
          animate();
          setLoading(false);
        },
        undefined,
        (error) => {
          console.error('Error loading GLB model:', error);
          setLoading(false);
        }
      );

      let req = null;
      let frame = 0;
      const initialCameraPosition = camera.position.clone();
      const circlingRadius = initialCameraPosition.distanceTo(new THREE.Vector3(cameraTarget[0], cameraTarget[1], cameraTarget[2]));

      const animate = () => {
        req = requestAnimationFrame(animate);

        frame += 1;

        if (frame <= animationDuration) {
          const t = easeInOutQuad(frame / animationDuration);
          camera.position.y = THREE.MathUtils.lerp(initialCameraPosition.y, initialCameraPosition.y * 0.8, t);
          camera.lookAt(new THREE.Vector3(cameraTarget[0], cameraTarget[1], cameraTarget[2]));
        } else {
          
          const angle = frame * 0.01; 
          camera.position.x = cameraTarget[0] + circlingRadius * Math.cos(angle);
          camera.position.z = cameraTarget[2] + circlingRadius * Math.sin(angle);
          camera.lookAt(new THREE.Vector3(cameraTarget[0], cameraTarget[1], cameraTarget[2]));
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.domElement.remove();
        renderer.dispose();
        refCamera.current = null;
        dracoLoader.dispose();
      };
    }
  }, [src, cameraPosition, cameraTarget, cameraFov, lightIntensity, backgroundColor, backgroundAlpha, enableZoom, enablePan, animationDuration, autoRotate]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <Box
      ref={refContainer}
      w="100%"
      h={['300px', '400px', '500px']}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
    >
      {loading && (
        <Spinner
          size="xl"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          color="blue.500"
        />
      )}
    </Box>
  );
};

export default GlbViewer;