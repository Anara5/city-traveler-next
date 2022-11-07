import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from 'semantic-ui-react';
import { Images } from '../components/Images';
import { useRouter } from 'next/router';

export default function Home({ cities }) {

  let anyCity = cities[Math.floor(Math.random() * cities.length)];
  let pages = (Math.floor(Math.random() * 10) + 1);
  const router = useRouter();

  const [city, setCity] = useState(anyCity.title);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(false);
    setImages([]);
    // const myApiKey = process.env.REACT_APP_API_KEY;
    const response = `https://api.unsplash.com/search/photos?page=${pages}&query=${city}&client_id=xw4LRHylDCxKzZrgEkzeOo7dehbzObsIslwqJcP8pXw`;
    
    fetch(response)
        .then(res => res.json())
        .then(data => {
            const urls = data.results.map(d => d.urls.regular);
            setCity(anyCity);
            console.log(anyCity);
            setImages([...urls]);
            setLoading(true);
        });
  }

  return (
    <div className=''>
      <Head>
        <title>City Traveler</title>
      </Head>

      <div className='min-h-screen text-center pt-5'>
        <h1 className='text-2xl font-bold'>
            Welcome to City Traveler!
        </h1>

        <Button 
          className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
        hover:border-teal-700 text-sm border-4 text-white py-1 px-2 my-5 rounded'
          onClick={e => handleClick}
          >Let's travel to:
        </Button>
            
        {/* trying to figure out how to fetch new city more than once with button click */}
            
        {
          images.map((img, i) => (
            <div key={i} className='w-screen flex justify-center items-center rounded-xl'>
                  
              <Images 
                title={city.title}
                images={img}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/cities');
  const { data } = await res.json();
  return { cities: data }
}