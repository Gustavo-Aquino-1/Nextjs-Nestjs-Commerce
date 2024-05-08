import React from 'react'
import ProductLoading from './ProductLoading'

function ProductsLoading() {
  return (
    <div className='flex gap-10 max-md:flex-col'>
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
      <ProductLoading />
    </div>
  )
}

export default ProductsLoading