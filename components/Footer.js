import Link from "next/link";
import React from "react";
import Image from 'next/image';
import top from '../public/arrow-up-xxl.png';

const Footer = () => {
    return (
        <div className='p-2 bg-white rounded-lg shadow fixed inset-x-0 bottom-0 md:flex md:items-center md:justify-between md:p-6'>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>© 2022 <Link href="https://portfolio-1-anara5.vercel.app" className="hover:underline">Zhunusova</Link></span>
        <ul className='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
                <Link href="https://www.linkedin.com/in/anarazhunusova" className='mr-4 hover:underline md:mr-6'>Linkedin</Link>
            </li>
            <li>
                <Link href="https://github.com/Anara5" className='hover:underline'>Github</Link>
            </li>
        </ul>
            <Link className='fixed bottom-2 mr-[40%] w-10 right-8 cursor-pointer'
                href="#head">
                <Image className="filter grayscale hover:grayscale-0
                cursor-pointer" src={top} alt="home" />
            </Link>
        </div>
    )
}

export default Footer;