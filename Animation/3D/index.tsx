import { ProductType } from '@/components/sections/Catalog';
import React from 'react'
import ModelWithOnMouseEventAndResponsiveness from './live/with-on-mouse-event-and-responsiveness';
import ModelWithContinuousAnimationWithPausEffect from './live/with-continous-and-pause-effect';
import ModelWithBouncingEffects from './live/with-bouncing-effect';
import ModelWithContinousRotationAndBouncingEffects from './live/with-continous-rotation-and-bouncing-effect';

interface ThreeDimensionalModel {
  selectedProduct: ProductType;
}

const ThreeDimensionalModel = ({selectedProduct}: ThreeDimensionalModel ) => {
  return (
   <>
   <ModelWithContinousRotationAndBouncingEffects selectedProduct={selectedProduct} />
   </>
  )
}

export default ThreeDimensionalModel