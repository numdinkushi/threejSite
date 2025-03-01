'use client';
import { ProductType } from '@/components/sections/Catalog';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

interface PreviewProps {
  selectedProduct: ProductType;
  gravityDensity?: number;
}

const ModelWithManualRotationEffectAndNotContinous = ({ selectedProduct, gravityDensity=0.002 }: PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const isHoveredRef = useRef<boolean>(false);

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
        model.position.set(0, 12, -2);
        scene.add(model);
        modelRef.current = model;
      });
    };

    loadModel(selectedProduct.modelSrc);

    camera.position.z = 5;
    // const gravity = 0.002;
    const gravity = gravityDensity;
    const bounceFactor = 0.3;
    const groundY = 0;
    let velocityY = 0;

    function animate() {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        // Apply gravity and update position
        velocityY -= gravity;
        modelRef.current.position.y += velocityY;

        // Check for ground collision
        if (modelRef.current.position.y <= groundY) {
          modelRef.current.position.y = groundY;
          velocityY *= -bounceFactor;

          // Stop bouncing if the velocity is very low
          if (Math.abs(velocityY) < 0.01) {
            velocityY = 0;
          }
        }

        // Apply continuous rotation if not hovered
        if (!isHoveredRef.current) {
          modelRef.current.rotation.x += 0.002; // Adjust the rotation speed as needed
          modelRef.current.rotation.z += 0.002; // Adjust the rotation speed as needed
        }
      }

      renderer.render(scene, camera);
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (modelRef.current && isHoveredRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        modelRef.current.rotation.y = mouseX * Math.PI;
      }
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseenter', handleMouseEnter);
    mount.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseenter', handleMouseEnter);
      mount.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [selectedProduct]);

  return (
    <div ref={mountRef} className='overflow-hidden h-[400px] md:h-[500px] pt-8 md:pt-0' />
  );
};

export default ModelWithManualRotationEffectAndNotContinous;
