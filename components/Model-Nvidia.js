import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { NvidiaSpinner, NvidiaContainer } from './Model-Nvidia-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const ModelNvidia = () => { //Model-Model Nvidia-Nvidia
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  
  const urlNvidiaGLB = process.env.NEXT_PUBLIC_S3_URL;
  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, []) 

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const gl = renderer.getContext();
console.log('WebGL Context:', gl);
if (!gl) {
  console.error('WebGL context is null. Check browser support or settings.');
  setLoading(false);
  return;
}
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      //renderer.outputEncoding = THREE.sRGBEncoding
      renderer.toneMapping = THREE.LinearToneMapping
      renderer.toneMappingExposure = 2


      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      const scene = new THREE.Scene()

      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
        
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      //const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI)
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      scene.add(ambientLight)

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2)
      scene.add(hemiLight)  
      /*const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      directionalLight.position.set(5, 10, 5)
      scene.add(directionalLight)*/

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
      directionalLight.position.set(5, 10, 5)
      scene.add(directionalLight)

      /*const light2 = new THREE.DirectionalLight(0xffffff, 1)
      light2.position.set(-5, 10, 5)
      scene.add(light2)

      const light3 = new THREE.DirectionalLight(0xffffff, 1)
      light3.position.set(5, 10, -5)
      scene.add(light3)

      const light4 = new THREE.DirectionalLight(0xffffff, 1)
      light4.position.set(-5, 10, -5)
      scene.add(light4)

      const light5 = new THREE.DirectionalLight(0xffffff, 1)
      light3.position.set(5, -10, -5)
      scene.add(light5)

      const light6 = new THREE.DirectionalLight(0xffffff, 1)
      light4.position.set(-5, -10, -5)
      scene.add(light6)*/


      
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target

      loadGLTFModel(scene, urlNvidiaGLB, {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        animate()
        setLoading(false)
      })
        

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 25
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => { 
        cancelAnimationFrame(req)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <NvidiaContainer ref={refContainer}>{loading && <NvidiaSpinner />}</NvidiaContainer>
  )
}

export default ModelNvidia
