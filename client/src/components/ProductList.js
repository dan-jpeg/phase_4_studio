import Product from './Product'

function ProductList({products, deleteProduct}){

    const productComponenets = products.map(product => {
        return <Product key={product.id} product={product} deleteProduct={deleteProduct}/>
    })

    return (
        <ul className="product-list">{productComponenets}</ul>
        )
}

export default ProductList