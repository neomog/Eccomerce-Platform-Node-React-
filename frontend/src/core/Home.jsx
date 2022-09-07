// REACT IMPORT
import React, { useEffect, useState } from 'react';

// CUSTOM COMPONENT IMPORT
import Layout from './Layout';
import Card from './Card';

import { getProducts } from './apiCore';

const Home = () => {
  const [productsBySell, setProductBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  // FUNCTION TO GET PRODUCT BY SELL
  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    })
  };

  // FUNCTION TO GET PRODUCT BY ARRIVAL
  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    })
  };
  
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title='Homepage' description='Node React E-commerce App' className='container-fluid'>
      <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
      {productsByArrival.map((product, i) => (
        <Card key={i} product={product} />
      ))}
      </div>

      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
      {productsBySell.map((product, i) => (
        <Card key={i} product={product} />
      ))}
      </div>
      {console.log('HomeError', error)}
    </Layout>
  )
};


export default Home