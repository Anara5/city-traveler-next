import React from 'react';
import fetch from 'isomorphic-unfetch';
// import { Button, Card } from 'semantic-ui-react';
import NewCity from './Planning';
import City from '../[id]';


function CitiesPlanning({ cities }) {

    return (
        <div className='min-h-screen p-5'>
            <NewCity />

            <h1 className='p-3 text-center'>Cities List that is planned:</h1>
            
            <div className='flex-2'>
                {
                    cities?.map(city => {
                        return (
                            <div key={city._id}>
                                <City id={city._id} city={city} />
                            </div>
                        )
                    })
                }       
            </div>
        </div>
    )
}

export default CitiesPlanning;

CitiesPlanning.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/cities');
    const { data } = await res.json();
    return { cities: data }
}
