import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';


const City = ({ city }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteCity();
        }
    }, [isDeleting]);

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    const deleteCity = async () => {
        const cityId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost/api/cities/${cityId}`, {
                method: 'DELETE'
            })
            return deleted.json();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex-2'>
            {isDeleting 
            ? <Loader active />
            : <Card>
                <Card.Content className='flex flex-row items-center mb-2'>
                    <Card.Header>
                        <h5>{city.title}</h5>
                    </Card.Header>
                    <Button className='object-right bg-slate-400 hover:bg-slate-300 text-sm ml-2 py-1 px-2 rounded'
                    onClick={handleDelete}>
                        Delete
                    </Button>
                </Card.Content>
            </Card>
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
