import React from "react";
import Link from 'next/link';

const Navbar = () => {
    
    return (
        <nav className='flex items-inline items-center justify-between bg-teal-800 p-3'>
            <div className='flex items-center flex-shrink-0 text-white'>
                <div className='flex items-center h-12 w-full'>
                    CITY TRAVELER
                </div>
            </div>
            <div className='w-full flex-grow lg:flex lg:items-center lg:w-auto'>
                <div className='text-md text-end lg:flex-grow'>
                    <Link href="/" className='lg:inline-block text-teal-200 hover:text-white mr-4'>Home</Link>
                    <Link href="/citiesPlanning" className='lg:inline-block text-teal-200 hover:text-white'>Planning</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;