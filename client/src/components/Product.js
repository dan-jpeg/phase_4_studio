function Product({product, deleteProduct, handleClickProduct}){
    const lb = '['
    const rb = ']'
    const newId = product.id + 10000
    return (
        <li className="product" onClick={() => handleClickProduct(product)}>
            <h1> # {lb} {newId} {rb}</h1>

        </li>
    )
}

export default Product