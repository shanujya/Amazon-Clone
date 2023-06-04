import React, { useState, useEffect } from 'react'
import './Payment.css'
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import { getBasketTotal } from "./reducer";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();

    }, [basket])

    console.log("THE SECRET IS >>>", clientSecret);

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment Confirmation
            
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            navigate('/orders', { replace: true })
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                {/* payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Dulha Baba Road</p>
                        <p>Nowgong,India</p>
                    </div>
                </div>
                {/* payment section - review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items & Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* payment section - payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">

                        {/* stripe Magic will go from here */}
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment