import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { PicCenterOutlined, ArrowLeftOutlined, ShoppingCartOutlined, LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'


import { Badge } from 'antd'
import './Header.css';
import { signOut } from '../../redux/actions/userActions'

import logo from '../../img/logo.png'

const Header = () => {
    const cart = useSelector((state) => state.cart)
    const numberOfItemsInCart = cart.cartItems.length

    const user = useSelector((state) => state.user)
    const { userInfo: { username } } = user

    const history = useHistory()

    const dispatch = useDispatch()

    const redirect = () => {
        dispatch(signOut())
        history.push('/')
    }


    const [click, setClick] = useState(false)
    const [, setDropdown] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(false)
        }
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-logo'>
                    <Link to='/' onClick={closeMobileMenu}>
                        <img className="logo"  src={logo} />
                        {/* lOgo */}
                    </Link>
                </div>

                <div className='menu-icon' onClick={handleClick}>
                    {click ? <ArrowLeftOutlined /> : <PicCenterOutlined />}
                </div>

                <ul className={"nav-menu " + (click && 'active')} style={{ marginBottom: '0px' }}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link
                            to='/services'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Services <i className='fas fa-caret-down' />
                        </Link>

                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/products'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Products
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <ul className=" show-on-mobile show-on-mobile-nav-shopping" style={{ marginBottom: '20px', }}>
                        {
                            username ?
                                <Link to="/profile/" onClick={closeMobileMenu}>
                                    <UserOutlined />&nbsp;{username}
                                </Link>
                                :
                                <Link to="/signin/" onClick={closeMobileMenu}>
                                    <LoginOutlined />&nbsp;Sign in
                                </Link>
                        }

                        <Link to="/cart/" onClick={closeMobileMenu}>
                            <ShoppingCartOutlined /> &nbsp;
                            {numberOfItemsInCart > 0 ?
                                <Badge
                                    count={numberOfItemsInCart > 0 && numberOfItemsInCart}
                                    overflowCount={10}>
                                    Cart &nbsp;
                                </Badge>
                                :
                                ' Cart  '
                            }
                        </Link>
                    </ul>
                    <hr />
                    <ul className=" show-on-mobile show-on-mobile-nav-shopping" style={{ marginBottom: '0px' }}>
                        {
                            username &&
                            <a
                                onClick={() => { closeMobileMenu(); redirect() }}>
                                <LogoutOutlined />&nbsp;Sign out
                            </a>
                        }
                    </ul>
                </ul>

                <ul className="nav-shopping hide-on-mobile" style={{ marginBottom: '0px' }}>
                    {
                        username ?
                            <Link to="/profile/" className='nav-links'>
                                &nbsp;&nbsp; <UserOutlined /> {username}
                            </Link>
                            :
                            <Link to="/signin/" className='nav-links'>
                                &nbsp;&nbsp; <LoginOutlined /> Sign in
                            </Link>
                    }
                    <Link to="/cart/" className='nav-links'>
                        <ShoppingCartOutlined />&nbsp;
                        {numberOfItemsInCart > 0 ?
                            <Badge
                                count={numberOfItemsInCart > 0 && numberOfItemsInCart}
                                overflowCount={10}>
                                Cart &nbsp;
                            </Badge>
                            :
                            ' Cart  '
                        }
                    </Link>
                </ul>
                <ul className=" hide-on-mobile" style={{ marginBottom: '0px', marginLeft: '-50px', marginRight: '50px' }}>
                    {
                        username &&
                        <a onClick={() => redirect()} className='nav-links'>
                            <LogoutOutlined />&nbsp;Sign out
                            </a>

                    }
                </ul>
            </nav>
        </>
    );
}

export default Header;
