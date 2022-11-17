import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button, Card, Loader } from 'semantic-ui-react';
import { Images } from '../components/Images';

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/cities');
  const { data } = await res.json();
  return { cities: data }
}

export default function Home({ cities }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(''); // city title set to '' initially

  const [error, setError] = useState(null);
  
  useEffect(() => {
    const story = window.localStorage.getItem('my_traveler_app');
    if (story !== null) {
      setImages(JSON.parse(story));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('my_traveler_app', JSON.stringify(images))
  }, [images]);

  const handleClick = () => {
      const pages = (Math.floor(Math.random() * 10) + 1); // get a random number from 1 to 10
      let cityNow = cities[Math.floor(Math.random() * cities.length)]; // get the a city from index random 0 - cities.length-1
      if (cityNow === undefined) {
        cityNow = {title: ''};
      }
      setLoading(false);
      setImages([]);
      const unsplashKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
      const response = `https://api.unsplash.com/search/photos?page=${pages}&query=${cityNow.title}&client_id=${unsplashKey}`;
       fetch(response)
        .then(res => {
          if (!res.ok) {
            throw Error('Cities list is empty');
          }
          return res.json();
        })
        .then(data => {
          let urls = data.results.map(d => d.urls.regular);
          setCity(cityNow.title); // update city title
          setLoading(true);            
          setImages([...urls]); // update all the img urls
          setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setLoading(false);
        setError(err.message);
      })
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
        
        { error && <p>{error}</p> }
        
        { loading && <Loader /> ?
        
        <div>
          {
            images.map((img, i) => (
              <Card key={i} className=''>
                  
              <Images 
                title={city}
                images={img}
              />
            </Card>))
          } 
        </div> : null }    
      </div>
    </div>
  )
}
