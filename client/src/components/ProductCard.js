import React from "react";


function ProductCard({ product, handleClickProduct}) {
  return (
    <img onClick={() => handleClickProduct(product)} src={product.image} alt={product.title} author />
  )
}

// function ProductCard({ product, handleClickDuck }) {
//   return (
//     <img
//       onClick={() => handleClickDuck(product)}
//       src={product.img_url}
//       alt={product.name}
//     />
//   );
// }

export default ProductCard;
