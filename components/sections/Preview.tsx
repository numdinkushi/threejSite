'client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { ProductType } from './Catalog';
import ModelWithOnMouseEventAndResponsiveness from '@/Animation/3D/live/with-on-mouse-event-and-responsiveness';
import ModelWithBouncingEffects from '@/Animation/3D/live/with-bouncing-effect';
import ModelWithContinuousAnimationWithPausEffect from '@/Animation/3D/live/with-continous-and-pause-effect';
import ModelWithContinousRotationAndBouncingEffects from '@/Animation/3D/live/with-continous-rotation-and-bouncing-effect';
import ModelWithManualRotationEffectAndNotContinous from '@/Animation/3D/live/with-manual-rotation';

interface PreviewProps {
  selectedProduct: ProductType;
}

const Preview = ({ selectedProduct }: PreviewProps) => {

  return (
    <ModelWithManualRotationEffectAndNotContinous selectedProduct={selectedProduct} />
  )

};

export default Preview;