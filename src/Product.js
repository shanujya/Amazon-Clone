import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';
function Product({id,title,image,price,rating}) {
    const [{basket},dispatch] = useStateValue();
    //console.log('this is the basket >>>',basket)
    const addToBasket = () =>{
        // dispatch the items into data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item:{
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            }
        });
    };
    return (
        <div className='product'>
            <div className="product__info">
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_,i)=>(
                        <p>⭐</p>
                    ))}
                </div>
            </div>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskdUkCvGi6KIc2VhK95_qZFgYEwVjU1EFrA&usqp=CAU" alt="" /> */}
                <img src={image}/>
                {/* <img src="https://m.media-amazon.com/images/I/81vvgZqCskL._AC_UF1000,1000_QL80_.jpg" /> */}
                <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}

export default Product