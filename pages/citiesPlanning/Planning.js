import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';

const NewCity = () => {
    const [form, setForm] = useState({ title: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            
            if (Object.keys(errors ?? {}).length === 0) {
                addCity();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

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
            router.push('/citiesPlanning');
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const validate = () => {
        let err = {};
        if (!form.title) {
            err.title = 'City is required';
        }
    } 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Form className='bg-white shadow-md rounded px-8 pt-3 pb-4 mb-3 mx-5'
                onSubmit={handleSubmit}>
                <div className='flex items-center py-2'>
                    <input
                    className='appearance-none bg-transparent border-b border-teal-500 leading-tight 
                    w-full text-gray-700 p-2 mb-2 focus:outline-none text-lg'
                    fluid="true"
                    // error={errors.title ? { content: 'Please enter a city name' } : null}
                    placeholder='City'
                    type='text'
                    name='title'
                    onChange={handleChange}
                />
                </div>
                        
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
