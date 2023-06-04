import React from 'react';
import './Home.css';
import Product from './Product';
function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWphase3/V4/Phase4_Rec_PC_Hero_1X_ENGLISH._CB416347901_.jpg"
                />

                <div className="home__row">
                    <Product
                        id='12345678'
                        title='Energize Your Mind: Learn the Art of Mastering Your Thoughts, Feelings and Emotions'
                        price={2.11}
                        image="https://m.media-amazon.com/images/I/71B4h-dSVzL._AC_UY218_.jpg"
                        rating={4}
                    />
                    <Product
                        id='98745632'
                        title='Noise Pulse Go Buzz Smart Watch with Advanced Bluetooth Calling, 
                        1.69" TFT Display,100 Sports Mode with Auto Detection, 
                        Upto 7 Days Battery - Jet Black'
                        price='19.38'
                        image="https://m.media-amazon.com/images/I/61QMPHGyc2L._AC_UY218_.jpg"
                        rating={4}
                    />

                </div>

                <div className="home__row">
                    <Product
                        id='45263784'
                        title='Acer ED270R 27 Inch (68.58 Cm) Curved Gaming LCD Monitor with LED Back Light Technology '
                        price='157.45'
                        image="https://m.media-amazon.com/images/I/81bGoTqXEKL._AC_UY218_.jpg"
                        rating={5}
                    />
                    <Product
                        id='24527846'
                        title='Echo Dot (5th Gen, 2023 release) | Smart speaker with Bigger sound, Motion Detection, Temperature Sensor and Alexa| Black'
                        price='66.61'
                        image="https://m.media-amazon.com/images/I/71nSvJGkabL._AC_UY218_.jpg"
                        rating={4}
                    />
                    <Product
                        id='24587952'
                        title='Apple 2022 11-inch iPad Pro (Wi-Fi, 128GB) - Space Grey (4th Generation)'
                        price='962.88'
                        image="https://m.media-amazon.com/images/I/81gC7frRJyL._AC_UY218_.jpg"
                        rating={5}
                    />
                </div>

                <div className="home__row">
                    <Product
                        id='98452136'
                        title='Apple 2022 MacBook Air Laptop with M2 chip: 34.46 cm (13.6-inch) Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone/iPad; Space Grey'
                        price='1,277.66'
                        image="https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_UY218_.jpg"
                        rating={4}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home