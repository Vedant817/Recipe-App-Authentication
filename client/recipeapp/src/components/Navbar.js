/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [cookies, setCookies] = useCookies('access_token') //? Used to check whether the person is logged in or not.
    const navigate = useNavigate()
    const logout = () => {
        setCookies('access_token', "");
        navigate('/auth')
    }
    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create-Recipe</Link>
            {!cookies.access_token ?
                (<Link to="/auth">Login/Register</Link>) : (<>
                    <Link to='/saved-recipes'>Saved Recipes</Link>
                    <button onClick={logout}>Logout</button>
                </>)}
        </div>
    )
}

export default Navbar
