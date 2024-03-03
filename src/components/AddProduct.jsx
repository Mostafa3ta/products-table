import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


export default function AddProduct({ setAddProduct, setNewProducts }) {

    const [productTitle, setProductTitle] = useState('')
    const [productPrice, setProductPrice] = useState(0)

    async function addProduct(e) {
        e.preventDefault();
        setNewProducts(prevProducts => [
            ...prevProducts,
            {
                id: uuidv4(),
                productTitle: productTitle,
                productPrice: productPrice,
            }
        ])
        setAddProduct(false)
    }

    return <>
        <div className="addProduct text-white">
            <button onClick={() => setAddProduct(false)} className='closeBtn btn btn-sm btn-danger'>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-8 col-10 text-center">
                    <h1 className="fs-2">Add New Product</h1>
                </div>
                <div className="col-md-6 col-10 my-4 p-4 form-group rounded-3 text-center bg-secondary">
                    <form onSubmit={addProduct}>
                        <div className="p-3">
                            <label htmlFor="name" className="fs-5 mb-1">Product</label>
                            <input
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                className="form-control"
                                id="name"
                                placeholder="Product Name . . " />
                        </div>
                        <div className="p-3">
                            <label htmlFor="url" className="fs-5 mb-1">Price</label>
                            <input
                                type="number"
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="form-control"
                                id="url"
                                placeholder="Product Price . . " />
                        </div>
                        {productTitle === '' || productPrice === 0 ?
                            <button disabled className="btn btn-primary w-auto mt-3">Add</button> :
                            <button type='submit' className="btn btn-primary w-auto mt-3">Add</button>
                        }
                    </form>
                </div>
            </div>
        </div >
    </>
}
