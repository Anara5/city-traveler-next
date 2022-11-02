import React from 'react';
import Head from 'next/head';

export default function Home() {

  return (
    <div>
      <Head>
        <title>City Traveler</title>
      </Head>

      <div className='min-h-screen text-center'>
            <h1 className='text-2xl font-bold '>
                Welcome to City Traveler!
            </h1>
            <h3>Lets spin around the world!</h3>
            
            {/* button for fetching a rundom city from my planning list */}
            
            {/* fetched city name and photo */}
            
        </div>
    </div>
  )
}