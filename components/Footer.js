import React from "react";

const Footer = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>© 2022 <a href="https://portfolio-1-anara5.vercel.app" className="hover:underline">Zhunusova</a></span>
        <ul className='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
                <a href="https://www.linkedin.com/in/anarazhunusova" className='mr-4 hover:underline md:mr-6'>Linkedin</a>
            </li>
            <li>
                <a href="https://github.com/Anara5" className='hover:underline'>Github</a>
            </li>
        </ul>
        </div>
    )
}

export default Footer;