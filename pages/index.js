import React, { useState, useEffect, use } from 'react';
import Head from 'next/head';
import { Button, Card, Loader } from 'semantic-ui-react';
import { Images } from '../components/Images';

export default function Home({ cities }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(''); // city title set to '' initially

  useEffect(() => {
    handleClick(); // for init image update
  }, []);

  const handleClick = () => {
    const pages = (Math.floor(Math.random() * 10) + 1); // get a random number from 1 to 10
    const cityNow = cities[Math.floor(Math.random() * cities.length)]; // get the a city from index random 0 - cities.length-1

    setLoading(false);
    setImages([]);
    const response = `https://api.unsplash.com/search/photos?page=${pages}&query=${cityNow.title}&client_id=xw4LRHylDCxKzZrgEkzeOo7dehbzObsIslwqJcP8pXw`;
    
    fetch(response)
        .then(res => res.json())
        .then(data => {
          let urls = data.results.map(d => d.urls.regular);
          setCity(cityNow.title); // update city title
          setLoading(true);            
          setImages([...urls]); // update all the img urls    
        });
  }

  return (
    <div id="head" className='flex flex-col relative text-center 
    md:flex-col justify-evenly mx-auto items-center z-0 mb-5'>
      <Head>
        <title>City Traveler</title>
      </Head>

      <div className='mt-5'>
        <h1 className='text-2xl font-bold'>
            Welcome to City Traveler!
        </h1>

        <Button 
          className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
        hover:border-teal-700 text-sm border-4 text-white py-1 px-2 my-5 rounded'
          onClick={handleClick}
          >Let's travel to:
        </Button>
            

        <div className=''>

          {
            images.map((img, i) => (
              <Card key={i} className=''>
                  
              <Images 
                title={city}
                images={img}
              />
            </Card>))
          }
        </div>        
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/cities');
  const { data } = await res.json();
  return { cities: data }
}