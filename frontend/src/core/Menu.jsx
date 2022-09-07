// REACT IMPORT
import React from 'react';
import PropTypes from 'prop-types'

// ROUTER IMPORT
import { Link, useNavigate } from 'react-router-dom';

// AUTH HELPER IMPORT
import { signout, isAuthenticated } from '../auth';


const Menu = () => {
    const navigate = useNavigate();
    // const [active, setActive] = useState(null);
    const pathname = window.location.pathname;
    
    const isActive = (path) => {
        if (pathname === path) {
            return { color: '#ff9900' };
        } else {
            return { color: '#ffffff' }
        }
    }

  return (
    <div>
        <ul className='nav na-tabs bg-primary'>
            <li className='nav-item'>
                <Link className='nav-link' to='/' style={isActive('/signin')}>
                    Home
                </Link>
            </li>

            <li className='nav-item'>
                <Link className='nav-link' to='/shop' style={isActive('/shop')}>
                    Shop
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-item'>
                    <Link className='nav-link' to='/user/dashboard' style={isActive('/user/dashboard')}>
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-item'>
                    <Link className='nav-link' to='/admin/dashboard' style={isActive('/admin/dashboard')}>
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <>
                    <li className='nav-item'>
                <Link className='nav-link' to='/signin' style={isActive('/signin')}>
                    Signin
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'  style={isActive('/signup')}>
                    Signup
                </Link>
            </li>
                </>
            )}
            {isAuthenticated() && (
                <>
                    <li className='nav-item'>
                <span className='nav-link' to='/signup'  style={{cursor : 'pointer', color: '#ffffff'}} onClick={() => 
                signout(() => {
                    navigate('/');
                })}>
                    Signout
                </span>
            </li>
                </>
            )}
        </ul>
    </div>
  )
}

Menu.propTypes = {
    isActive: PropTypes.func,
    signout: PropTypes.func,
    isAuthenticated: PropTypes.func
}

export default Menu;