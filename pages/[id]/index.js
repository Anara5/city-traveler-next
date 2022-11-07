import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Loader, Confirm } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const City = ({ city }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);
    
    useEffect(() => {
        if (isDeleting) {
            deleteCity();
        }
    }, [isDeleting]);

    const deleteCity = async () => {
        const cityId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/cities/${cityId}`, {
                method: 'DELETE',
            });
            router.push('/citiesPlanning')
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className='flex-2'>
            <Confirm
                className='text-center'
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />

            {
                isDeleting ? <Loader active /> : 
                <div className='flex text-center'>
                    {city.title}
                    
                    <button onClick={open}>
                        Delete
                    </button>
                </div>
            }
        </div>
    )
}

export default City;

City.getInitialProps = async ({ query: { id }}) => {
    const res = await fetch(`http://localhost:3000/api/cities/${id}`);
    const { data } = await res.json();
    return { city: data }
}
