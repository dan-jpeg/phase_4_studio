import Product from './Product'

function ProductList({products, handleClickProduct, deleteProduct, adminMode}){

    const productComponenets = products.map(product => {
        return <Product key={product.id} deleteProduct={deleteProduct} product={product} handleClickProduct={handleClickProduct} adminMode={adminMode}/>
    })

    return (
        <ul className="product-list">{productComponenets}</ul>
        )
}

export default ProductList