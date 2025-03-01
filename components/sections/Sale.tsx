'use client';
import { Canvas, useLoader } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from "three";

interface ModelProps {
  url: string;
  rotation: [number, number, number];
  initialPosition: [number, number, number];
  finalPosition: [number, number, number];
}

const Model = ({ url, initialPosition, finalPosition, rotation }: ModelProps) => {
  const modelRef = useRef<THREE.Mesh>(null);
  const model = useLoader(GLTFLoader, url);
  return (
    <mesh ref={
      modelRef}
      position={finalPosition}
      rotation={rotation}
      scale={[0.65, 0.65, 0.65]}
    >
      <primitive object={model.scene} />
    </mesh>
  );
};

const Sale = () => {
  const mountRef = useRef(null);
  const isInview = useInView(mountRef, { once: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const leftModelInitialPosition: [number, number, number] = [-2, 0, 0];
  const rightModelInitialPosition: [number, number, number] = [2, 0, 0];

  const leftModelFinalPosition: [number, number, number] = [-3.1, -1.3, 0];
  const rightModelFinalPosition: [number, number, number] = isMobile ? [1.5, -1, 0] : [2.9, 0.8, 0];

  const modelRotation: [number, number, number] = [Math.PI / 2, Math.PI / 180 * 80, Math.PI / 180 * -10];

  return (
    <div className='max-w-[1536px] flex flex-col items-center gap-8 pt-32 mx-auto'>
      <div ref={mountRef} className="absolute w-full h-screen lg:h-[150vh] bottom:0 lg:top-[150rem] left-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className='w-full h-full'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <directionalLight position={[-5, 5, 5]} intensity={3} />
          {isInview &&
            <>
              {!isMobile &&
                <Model
                  url='/assets/keyboard.glb'
                  initialPosition={leftModelInitialPosition}
                  finalPosition={leftModelFinalPosition}
                  rotation={modelRotation}
                />
              }
              <Model
                url='/assets/keyboard3.glb'
                initialPosition={rightModelInitialPosition}
                finalPosition={rightModelFinalPosition}
                rotation={modelRotation}
              />
            </>
          }
        </Canvas>
      </div>
      <h2 className='text-4xl md:text-5xl font-bold text-center'>Limited collection <br /> for sale</h2>
      <p className='uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent'>discounts up to 30%</p>
      <Link href='#catalog' className='w-36 bg-red-800 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient'>
        Buy keyboard
      </Link>
    </div>
  );
};

export default Sale;
