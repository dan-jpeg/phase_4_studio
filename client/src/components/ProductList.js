import Product from './Product'

function ProductList({products, handleClickProduct, deleteProduct}){

    const productComponenets = products.map(product => {
        return <Product key={product.id} deleteProduct={deleteProduct} product={product} handleClickProduct={handleClickProduct} />
    })

    return (
        <ul className="product-list">{productComponenets}</ul>
        )
}

export default ProductList