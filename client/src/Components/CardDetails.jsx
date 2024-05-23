import React, { useEffect, useState } from 'react';
import './cardstyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleItems, emptycartIteam } from '../redux/features/CartSlice';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';



const CardDetails = () => {
    // const carts = [0, 1];
    const { carts } = useSelector((state) => state.allCart);
    // console.log(carts);

    const [totalprice, setPrice] = useState(0);

    const [totalquantity, setTotalQuantity] = useState(0);

    //total price count
    const total = () => {
        let totalprice = 0
        carts.map((ele, index) => {
            totalprice = ele.price * ele.qnty + totalprice
        })
        setPrice(totalprice)
    }

    //total quantity count
    const quantity = () => {
        let totalquantity = 0
        carts.map((ele, index) => {
            totalquantity = ele.qnty + totalquantity
        })
        setTotalQuantity(totalquantity)
    }

    useEffect(() => {
        total()
    }, [total])

    useEffect(() => {
        quantity()
    }, [quantity])





    const dispatch = useDispatch();

    //add to cart
    const handleIncrement = (e) => {
        dispatch(addToCart(e))
    }

    //remove to cart
    const handleDecrement = (e) => {
        dispatch(removeToCart(e))
        toast.success("Item removed")
    }

    //remove to single item
    const handleSingleDecrement = (e) => {
        dispatch(removeSingleItems(e))
    }

    //remove to all clear cart
    const handleClearAll = () => {
        dispatch(emptycartIteam())
        toast.success("cart is empty")

    }



    //payment
    const makePayment = async () => {
        alert('hello')
        const stripe = await loadStripe(process.env.PUBLIC_KEY)
        const body = {
            products: carts
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error) {
            console.log(result.error)
        }

    }


    return (
        <>

            <div className="row justify-content-center m-0">
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>

                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-light m-0'> Cart Calculations {carts.length > 0 ? `(${carts.length})` : ""}</h5>
                                {
                                    carts.length > 0 ? <button className='btn btn-danger btn-sm mt-0' onClick={() => handleClearAll()}><i className='fa fa-trash-alt mr-2'></i> <span>Empty Cart</span></button> : ""
                                }
                            </div>
                        </div>

                        <div className="card-body p-0">

                            {
                                carts.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>your cart is empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'> <span id='amount' className='amount'>Total Amount</span> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carts.map((data, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td><button className='prdct-delete' onClick={() => handleDecrement(data.id)}><i className='fa fa-trash-alt mr-2'></i></button></td>
                                                                <td><div className='product-img'>
                                                                    <img src={data.imgdata} alt="" />
                                                                </div></td>
                                                                <td><div className='product-name'><p>{data.dish}</p></div></td>
                                                                <td>{data.price}</td>
                                                                <td><div className='prdct-qty-container'>
                                                                    <button className='prdct-qty-btn' type='button' onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)} >
                                                                        <i className='fa fa-minus'></i>
                                                                    </button>
                                                                    <input type="text" className='qty-input-box' value={data.qnty} disabled />
                                                                    <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                                                        <i className='fa fa-plus'></i>
                                                                    </button>
                                                                </div></td>
                                                                <td className='text-right'>{data.qnty * data.price}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}>&nbsp;</th>
                                                <th>Items in Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                                                <th className='text-right'>Total Price <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalprice}</span></th>
                                                <th className='text-right'><button className='btn btn-success ' onClick={makePayment} type='button' >Make Payment</button></th>

                                            </tr>

                                        </tfoot>

                                    </table>
                            }

                        </div>

                    </div>

                </div>
            </div >

        </>
    )
}

export default CardDetails