// WITHOUT CONTINOUS ANIMATION

'use client';
import { ProductType } from '@/components/sections/Catalog';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

interface ModelWithoutContinousAnimationProps {
  selectedProduct: ProductType;
}
const ModelWithoutContinousAnimation = ({ selectedProduct }: ModelWithoutContinousAnimationProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !selectedProduct) return;

    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const containerWidth = mount.clientWidth;
    const sceneWidth = containerWidth <= 1536 ? containerWidth : 1536;
    const sceneHeight = window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight;

    scene.rotation.x = THREE.MathUtils.degToRad(60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);
    const ambientLight = new THREE.AmbientLight(0xfffff, 1.5);
    scene.add(ambientLight);

    const directionalLightTop = new THREE.DirectionalLight(0xfffff, 1);
    directionalLightTop.position.set(5, 10, 7.5);
    scene.add(directionalLightTop);

    const directionalLightLeft = new THREE.DirectionalLight(0xfffff, 1);
    directionalLightLeft.position.set(-10, 5, 0);
    scene.add(directionalLightLeft);

    const directionalLightRight = new THREE.DirectionalLight(0xfffff, 1);
    directionalLightRight.position.set(10, 5, 0);
    scene.add(directionalLightRight);

    const loadModel = (modelSrc: string) => {

      loader.load(modelSrc, (gltf) => {
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, -2);
        scene.add(model);
        modelRef.current = model;

        animate();
      });
    };

    loadModel(selectedProduct.modelSrc);

    camera.position.z = 5;

    renderer.setAnimationLoop(animate);

    function animate() {
      renderer.render(scene, camera);
    }

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);

      }
    };
  }, [selectedProduct]);

  return (
    <div ref={mountRef} className='overflow-hidden h-[400px] md:h-[500px] pt-8  md:pt-0' />
  );
};

export default ModelWithoutContinousAnimation;
