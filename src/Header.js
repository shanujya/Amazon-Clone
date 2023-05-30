import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { getAuth } from 'firebase/auth';

function Header() {
    const [{ basket,user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        const auth = getAuth();
        if(user){
           auth.signOut();
        }
    }

    return (
        <div className='header'>
            <Link to="/">
                <img className='header__logo'
                    //src="https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg"/>
                    src="https://zeevector.com/wp-content/uploads/Amazon-Logo-White.png" />
            </Link>

            <div className='header__search'>
                <input className='header_searchInput' type="text" />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                <Link to= { !user && '/login'}>
                    <div onClick={handleAuthentication} className='header__options'>
                        <span className='header__optionLineOne'>Hello,Guest</span>
                        <span className='header__optionLineTwo'>{user ?'Sign Out':'Sign In'}</span>
                    </div>
                </Link>

                <div className='header__options'>
                    <span className='header__optionLineOne'>Returns</span>
                    <span className='header__optionLineTwo'>& Orders</span>
                </div>

                <div className='header__options'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Header