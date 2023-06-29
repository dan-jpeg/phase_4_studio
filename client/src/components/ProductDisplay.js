function ProductDisplay(displayedProduct) {

    return (
        <div id='parent'>
            <div id='div1'>{displayedProduct.title}</div>
            <div id='div2'>{displayedProduct.artist}</div>
            <div id='div3'>{displayedProduct.description}</div>
            <div id='div4'><img alt={displayedProduct.title} src={displayedProduct.img_url} /></div>
        </div>
    )
}

export default ProductDisplay