/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios' //? Performs operations that fetch function can perform but with less syntax
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const auth = () => {
    const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();
        const [,setCookies] = useCookies('access-token') //* This will help in accessing the token for login operation.
        const onSubmit = async (event)=>{
            event.preventDefault();
            try {
                const response = await axios.post('http://localhost:4000/auth/login',{
                    username,
                    password
                });
                setCookies('access_token',response.data.token); //! This is used to check that user is logged in or not.
                window.localStorage.setItem('userID',response.data.userID);
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
        return (<div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(event) => { setPassword(event.target.value) }}></input>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>)
    }
    const Register = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const onSubmit= async(event)=>{
            event.preventDefault();
            //? We are using axios to send the request to the api. It is similar to fetch function.
            try {
                await axios.post('http://localhost:4000/auth/register',{
                    username,
                    password
                });
                alert('Registration Completed. Now Login')
            } catch (error) {
                console.log(error);
            }
        }
        return (<div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(event) => { setPassword(event.target.value) }}></input>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>)
    }
    return (
        <div className='auth'>
            <Login />
            <Register />
        </div>
    )
}

export default auth
