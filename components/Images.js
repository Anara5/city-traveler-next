import React from 'react';

export const Images = ({ images, title }) => {
    return (
        <div className=''>
            <h3 className='text-2xl text-purple-800 mt-5'>{title}</h3>
            <img src={images} alt="city" 
                className='w-90%'
            />
        </div>
    )
}