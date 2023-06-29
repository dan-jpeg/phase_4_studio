import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"

import NavBar from './NavBar'
import Header from './Header'
import ProductList from './ProductList'
import NewProductForm from './NewProductForm'
import UpdateProductForm from './UpdateProductForm'
import ProductDisplay from './ProductDisplay';

function App() {

const [products, setProducts] = useState ([])
const [postFormData, setPostFormData] = useState({})
const [idToUpdate, setIdToUpdate] = useState(0)
const [patchFormData, setPatchFormData] = useState({})
const [displayedProduct, setDisplayedProduct] = useState({});

const placeholder = '[ 1 ] [ 2 ] [ 3 ] [ 4 ]'

useEffect(() => {
    fetch('/products')
    .then(rsp => rsp.json())
    .then(productData => setProducts(productData),
    setDisplayedProduct[products[2]],
    console.log(products[2]))
}, [])



useEffect(() => {
    if(products.length > 0 && products[0].id){
        setIdToUpdate(products[0].id)
    }
}, [products])




function handleClickProduct(product) {
  setDisplayedProduct(product);
  console.log(displayedProduct)
}

function addProduct(event){
    event.preventDefault()

    fetch('/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postFormData)
    })
    .then(response => response.json())
    .then(newProduct => setProducts(products => [...products, newProduct]))
}


function updateProduct(e){
    e.preventDefault()
    fetch(`/products/${idToUpdate}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(patchFormData)
    })
    .then(rsp => rsp.json())
    .then(updatedProduct => {
        setProducts(products => {
            return products.map(product => {
                if(product.id === updateProduct.id) {
                    return updatedProduct
                } else {
                    return product
                }
            })
        })
    })
}



function deleteProduct(id){
    fetch(`/hotels/${id}`, {
        method: "DELETE"
    })
    .then(() => setProducts(products => {
        return products.filter(product => {
            return product.id !== id
        })
    }))
}

function updatePostFormData(event){
    setPostFormData({...postFormData, [event.target.name]: event.target.value})
  }

  function updatePatchFormData(event){
    setPatchFormData({...patchFormData, [event.target.name]: event.target.value})
  }

return (
    <div className="app">
      <NavBar/>
      <Header />
      <Switch>
        <Route exact path="/">
          <h1></h1>
          <ProductList products={products} handleClickProduct={handleClickProduct} deleteProduct={deleteProduct}/>
          <ProductDisplay handleClickProduct={handleClickProduct} displayedProduct={displayedProduct} />
        </Route>
        <Route path="/add_product">
          <NewProductForm addProduct={addProduct} updatePostFormData={updatePostFormData}/>
        </Route>
        <Route path="/update_product">
          <UpdateProductForm updateProduct={updateProduct} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} products={products}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
