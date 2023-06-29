import {useState} from 'react'

function NewProductForm({addProduct, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="product-form">
            <h2>new product</h2>
            {formSubmitted ? <h1>new product added</h1> :
            <form onSubmit={event => {
                addProduct(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="title" placeholder="title" required/>
                <input onChange={updatePostFormData} type="text" name="price" placeholder="price" required/>
                <input onChange={updatePostFormData} type="text" name="img_url" placeholder="image url" required/>
                <input onChange={updatePostFormData} type="text" name="width" placeholder="width" required/>
                <input onChange={updatePostFormData} type="text" name="height" placeholder="height"/>
                <input onChange={updatePostFormData} type="text" name="description" placeholder="description" required/>
                <input onChange={updatePostFormData} type="text" name="quantity" placeholder="quantity"/>
                <input onChange={updatePostFormData} type="text" name="subject" placeholder='subject' />
                <input type="submit" value="add product"/>
            </form>}
        </div>
    )
}

export default NewProductForm