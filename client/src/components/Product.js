function Product({product, deleteProduct, handleClickProduct, adminMode}){
    const lb = '['
    const rb = ']'
    const newId = product.id + 10000
    const dBtn = <h3 id='deleteBtn'>DELETE</h3>
    return (
        <li className="product" onClick={() => handleClickProduct(product)}>
            <h1> # {lb} {newId} {rb}</h1>
            {adminMode ? <h3 id='deleteBtn'>DELETE</h3> : '' }
        </li>
    )
}

export default Product