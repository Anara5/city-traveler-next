import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";

const mapStyles = {
    width: '90%',
    height: '90%',
    marginLeft: '5%'
};

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();
Geocode.setLocationType('ROOFTOP');

const newArr = [];

const MapContainer = ({ cities }) => {
  const [points, setPoints] = useState([]);
  const arr = []
  cities.forEach(cont => arr.push(cont.title))
  const fetchPos = () => {
    Geocode.fromAddress(arr)
      .then(response => {
        response.results.forEach(data => newArr.push({position: data.geometry.location, name: data.address_components[0].long_name}))
        setPoints(newArr)
      })
      .catch(error => console.error(error));
  }
    fetchPos();

    
  return (
    <Map
      google={google}
      zoom={2}
      style={mapStyles}
      initialCenter={{
      lat: 0,
      lng: 0
      }}>  
      
      {
        points.map((mark, i) => {
          return <Marker
                    key={i}
                    name={mark.name}
                    position={mark.position}
                    />
                  })
      }
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
})(MapContainer)

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/cities');
  const { data } = await res.json();
  console.log('data', data);
  return { props: { cities: data } };
}
