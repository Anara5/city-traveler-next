import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
import NewCity from './Planning';
import GoogleMap from '../../components/GoogleMap';

const CitiesList = ({ cities }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [stateCities, setStateCities] = useState(cities);

    useEffect(() => {
        if (isDeleting) {
            deleteCity();
        }
    }, [stateCities]);

    const deleteCity = async (id) => {
        try {
            const deleted = await fetch(`http://localhost:3000/api/cities/${id}`, {
                method: 'DELETE',
            });
            const data = await deleted.json();
            setStateCities(prev => prev.filter(c => c._id !== id));
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div id="head" className='p-8 bg-[#DCDCDC]'>
                <NewCity newCityToState={city => setStateCities([...stateCities, city])} />

                <h1 className='p-3 text-2xl text-center'>Planned Cities List:</h1>
                
                <div className=''>
                    {
                        stateCities?.map(city => {
                            return (
                                <div key={city._id}>
                                    <Card className='flex flex-row justify-left text-xl items-baseline mb-2'>
                                        <p>{city.title}</p>
                                        
                                        <Button className='button' onClick={() => deleteCity(city._id)}>
                                            delete
                                        </Button>    
                                    </Card>                                                            
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <GoogleMap cities={stateCities} />
        </>
    )
}

export default CitiesList;

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/cities');
    const { data } = await res.json();
    return { props: { cities: data } };
}
