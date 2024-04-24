import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {

    const [activeUsername, setActiveUsername] = useState(null)

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/users/isLoggedIn')

        setActiveUsername(response.data.username)
    
    }

    useEffect(() => {
        checkIfUserIsLoggedIn()
    }, []);

    async function logOutUser() {

        await axios.post('/api/users/logOut')
        setActiveUsername(null)
    }

    if(!activeUsername) {

        return (<div className='header'>
            <Link to="/" >HomePage</Link>
            <Link to="/login" >Log in</Link>
            <Link to="/register" >Sign up</Link>
        </div>)

    }

    return (
        <div className='header'>
            <Link to="/" >HomePage</Link>
            <div >Welcome, {activeUsername}</div>
            <button onClick={logOutUser}>Log Out!</button>
        </div>

    )

}