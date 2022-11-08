import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
import NewCity from './Planning';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CitiesList = ({ cities }) => {

    return (
        <div id="head" className='p-8 bg-[#DCDCDC]'>
            <NewCity />

            <h1 className='p-3 text-2xl text-center'>Planned Cities List:</h1>
            
            <div className=''>

                {
                    cities?.map(city => {
                        return (
                            <div key={city._id}>
                                <Card className='flex flex-row justify-left text-xl items-baseline mb-2'>
                                    <p>{city.title}</p>
                                    
                                    <Link href={`/${city._id}`}>                                    
                                    <Button className='object-right bg-slate-400 hover:bg-slate-300 text-sm ml-2 py-1 px-2 rounded'>
                                        delete
                                    </Button>      
                                    </Link>
                                </Card>                                                            
                            </div>
                        )
                    })
                }       
            </div>
        </div>
    )
}

export default CitiesList;

CitiesList.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/cities');
    const { data } = await res.json();
    return { cities: data }
}
