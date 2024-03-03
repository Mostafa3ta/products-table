import React, { useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import axios from 'axios';

export default function ProductsTable() {
    const [addProduct, setAddProduct] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [productsSearch, setProductsSearch] = useState([]);
    const [newProducts, setNewProducts] = useState([])
    const [newProductsSearch, setNewProductsSearch] = useState([])
    const [page, setPage] = useState(0)


    async function productsPages() {
        setIsLoading(true)
        let { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10}`)
        setProducts(data.products)
        setIsLoading(false)
        if (JSON.parse(localStorage.getItem('myProducts')) !== null) {
            setNewProducts(JSON.parse(localStorage.getItem('myProducts')))
        }
    }

    function handleNext() {
        setPage((page) => page + 1)
    }

    function handlePrev() {
        setPage((page) => page - 1)
    }

    function handleSearch(value) {
        const results = products.filter((product) => {
            return product.title.toLowerCase().includes(value.toLowerCase())
        })
        setProductsSearch(results)
        const results2 = newProducts.filter((product) => {
            return product.productTitle.toLowerCase().includes(value.toLowerCase())
        })
        setNewProductsSearch(results2)
        if (!value) {
            setProductsSearch([])
            setNewProductsSearch([])
        }
    }

    useEffect(() => {
        productsPages();
    }, [page])

    useEffect(() => {
        if (newProducts.length !== 0) {
            localStorage.setItem('myProducts', JSON.stringify(newProducts))
        }
    }, [newProducts])


    return <>

        {isLoading ? <div className='loading'>
            <div className="spinner"></div>
        </div> : null}


        <div className={`${addProduct ? 'blur' : null}`}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <input type="search" onChange={(e) => handleSearch(e.target.value)} className="rounded-5 form-control w-50 mt-4"
                        placeholder=" Search Products " />
                    <div className=" col-md-7 col-11  my-3 rounded-2  ">
                        <table className="table table-responsive-sm table-success table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">

                                {productsSearch.length !== 0 || newProductsSearch.length !== 0 ? <>
                                    {productsSearch.map((product) =>
                                        <tr key={product.id}>
                                            <td>{product.title.split(' ').slice(0, 2).join(' ')}</td>
                                            <td>{product.price} $</td>
                                            <td>{product.category}</td>
                                        </tr>
                                    )}

                                    {newProductsSearch.map((product) =>
                                        <tr key={product.id}>
                                            <td>{product.productTitle?.split(' ').slice(0, 2).join(' ')}</td>
                                            <td>{product.productPrice} $</td>
                                            <td>Mine</td>
                                        </tr>
                                    )}
                                </> : <>
                                    {products.map((product) =>
                                        <tr key={product.id}>
                                            <td>{product.title.split(' ').slice(0, 2).join(' ')}</td>
                                            <td>{product.price} $</td>
                                            <td>{product.category}</td>
                                        </tr>
                                    )}

                                    {newProducts.map((product) =>
                                        <tr key={product.id}>
                                            <td>{product.productTitle?.split(' ').slice(0, 2).join(' ')}</td>
                                            <td>{product.productPrice} $</td>
                                            <td>Mine</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="3" className='text-center'>
                                            <button onClick={() => setAddProduct(true)} className='btn btn-sm btn-success w-auto'>Add Product</button>
                                        </td>
                                    </tr>
                                </>}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    {page === 0 ? <button disabled className='btn btn-warning btn-sm m-1'>
                        <i className="fa-solid fa-angles-left px-1"></i> Prev
                    </button> :
                        <button onClick={() => handlePrev()} className='btn btn-warning btn-sm m-1'>
                            <i className="fa-solid fa-angles-left px-1"></i> Prev
                        </button>
                    }

                    <button className='btn btn-light btn-sm m-1'>{page + 1} OF 10</button>

                    {page === 9 ? <button disabled className='btn btn-warning btn-sm m-1'>Next
                        <i className="fa-solid fa-angles-right px-1"></i>
                    </button> :
                        <button onClick={() => handleNext()} className='btn btn-warning btn-sm m-1'>Next
                            <i className="fa-solid fa-angles-right px-1"></i>
                        </button>
                    }
                </div>
            </div>
        </div>

        {addProduct ? <AddProduct
            setAddProduct={setAddProduct}
            setNewProducts={setNewProducts}
            newProducts={newProducts}
        /> : null}

    </>
} 
