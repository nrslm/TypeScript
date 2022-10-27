import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav className='flex justify-between items-center h-[40px]  px-5 shadow-md bg-gray-500 text-white'>
            <h1 className='font-bold'>
                GitHub search
            </h1>

            <div>
                <Link className='m-2' to="/">
                    Home
                </Link>
                <Link to="/Favourites">
                    Favourites
                </Link>
            </div>
        </nav>
    )
}

export default Navigation