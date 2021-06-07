import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';

const Header = () => {

    const currentUser = useSelector(state => state.user.currentUser);

return (
    <div className='header'>
        <Link className='logo-container' to='/'>
            HOME
        </Link>
        <div className='options'>

            <Link className='option' to='/dashboard'>
                DASHBOARD
            </Link>

            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) :
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            }
        </div>
    </div>
)
}

export default Header;