"use client"

import React, { useState } from 'react'
import Catalog, { ProductType } from './Catalog'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    imgSrc: "/assets/keyboard1.png",
    title: "Magic Keyboard",
    price: 79.99,
    modelSrc: "/assets/keyboard.glb", 
  })

  const handleProductClick = (product: ProductType) =>{
    setSelectedProduct(product);
  }
  return (
    <div id="catalog" className='max-w-[1536px] flex flex-col mx-auto pt-8'>
      <Catalog selectedProduct={selectedProduct} onProductClick={handleProductClick}/>
    </div>
  )
}

export default Products
