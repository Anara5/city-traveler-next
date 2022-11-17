import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form } from 'semantic-ui-react';

const NewCity = ({ newCityToState }) => {
    const [form, setForm] = useState({ title: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fromCities, setFromCities] = useState([]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setFromCities();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('submit')
        addCity()
        e.target.reset();
    }

    const addCity = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/cities', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            console.log(data)
            newCityToState(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center bg-white shadow-md rounded px-8 py-4 my-3 mx-2'>
            
            <Form className='mb-3 w-[90%]'
                onSubmit={handleSubmit}>
                <input
                    className='appearance-none bg-transparent bg-clip-padding border-b border-teal-500 
                    text-gray-700 form-control block px-3 py-1.5 mb-2 text-lg focus:outline-none 
                    transition ease-in-out m-2 w-full'
                    fluid={toString()}
                    placeholder='City'
                    type='text'
                    required
                    name='title'
                    pattern='^[A-Za-z\-]+'
                    title='The name should start with the capital letter and have no numbers'
                    onChange={handleChange}
                />

                <Button
                    className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
                     hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
                    type='submit'
                    >Add to plan
                </Button>
            </Form>
            
        </div>
    )
}

export default NewCity;
