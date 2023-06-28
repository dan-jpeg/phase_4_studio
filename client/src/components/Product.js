function Product({product, deleteProduct}){
    return (
        <li className="product">
            <h1> product # {product.id}: {product.name}</h1>
            <img src={product.image} alt={product.name} />
            <button onClick={() => deleteProduct(product.id)}>delete product # {product.id}</button>
        </li>
    )
}

export default Product