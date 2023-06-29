function Product({product, deleteProduct}){
    const lb = '['
    const rb = ']'
    const newId = product.id + 10000
    return (
        <li className="product">
            <h1> # {lb} {newId} {rb}</h1>
            <button onClick={() => deleteProduct(product.id)}>delete product # {product.id}</button>
        </li>
    )
}

export default Product