import React from "react";
import ProductCard from './ProductCard'

function ProductList({products, handleClickProduct, deleteProduct}){

    // const productComponenets = products.map(product => {
    //     return <Product key={product.id} product={product} deleteProduct={deleteProduct}/>
    // })
//     const mappedProducts = products.map((product) => (
//         <ProductCard
//             key={product.id}
//             title={product.title}
//             author={product.author}
//             description={product.description}
//             image={product.image}
//         />
//     ))

//     return (
//         <ul className="cards">{ mappedProducts}</ul>
//         );
// }


    const mappedProducts = products.map(product => <ProductCard key={product.id} product={product} handleClickProduct={handleClickProduct} />)

    return (

    <div className="product-nav">
        {mappedProducts}
    </div>

    )
}
export default ProductList;