import React, { useState } from 'react';
import './Style.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardsData from './CardData'
import { addToCart } from '../redux/features/CartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';


const Home = () => {
    // console.log(CardData);
    const [cardData, setCardData] = useState(CardsData);
    const dispatch = useDispatch();

    //add to cart
    const send = (e) => {
        // console.log("ok", e);
        dispatch(addToCart(e))
        toast.success("Items added to cart")
    }
    return (
        <>

            <section className='iteam_section mt-4 container'>
                <h2 className='px-4' >React-Redux-ToolKit-Ecommerce</h2>

                <div className='row mt-2 d-flex justify-content-around align-items-center'>

                    {
                        cardData.map((element, index) => {
                            return (
                                <>
                                    <Card style={{ width: "22rem", border: "none" }} className='hove mb-4'>
                                        <Card.Img varient='top' className='cd' src={element.imgdata} />
                                        <div className="card_body">
                                            <div className="upper_data d-flex justify-content-between align-items-center">
                                                <h4 className='mt-2'>{element.dish}</h4>
                                                <span>{element.rating}&nbsp;*</span>
                                            </div>
                                            <div className="lower_data d-flex justify-content-between">
                                                <h5>{element.address}</h5>
                                                <span>{element.price}</span>
                                            </div>
                                            <div className="extra"></div>
                                            <div className="last_data d-flex justify-content-between align-items-center">
                                                <img src={element.arrimg} className='limg' alt="" />
                                                <button className='mt-2 mb-2 btn btn-success' onClick={() => send(element)}>Add to Cart</button>
                                                <img src={element.delimg} className='laimg' alt="" />

                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    }



                </div>

            </section>

        </>
    )
}

export default Home