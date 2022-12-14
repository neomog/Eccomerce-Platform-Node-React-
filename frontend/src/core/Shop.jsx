// REACT IMPORT
import React, { useEffect, useState } from 'react';

// CUSTOM COMPONENT IMPORT
import Layout from './Layout';
import Card from './Card';
import Checkbox from './Checkbox';
import { getCategories, getFilteredProducts } from './apiCore';
import { prices } from './fixedPrices';
import Radiobox from './Radiobox';

// import PropTypes from 'prop-types'

const Shop = props => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

    // POPULATE CATEGORY AND SET FORMDATA
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });

        // Load products on page load
        loadFilteredResults(skip, limit, myFilters.filters);
    };

    // FUNCTION TO FETCH RESULTS FROM API BASED ON THE FILTERED ITEMS
    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    // FUNCTION TO LOAD MORE RESULTS FROM API BASED ON THE FILTERED ITEMS
    const loadMore = () => {
        // console.log('b4dat', filteredResults)
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {                
                
                setFilteredResults({...filteredResults, ...data});
                // setFilteredResults(data);
                // console.log('dat', filteredResults)
                setSize(data.size);
                setSkip(toSkip);

            }
        });
    };

    // LOAD MORE BUTTON
    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn mb-5 btn-warning'>Load more</button>
            )
        );
    };

    useEffect(() => {
        init();
        
    }, []);
    
    const handleFilters = (filters, filterBy) => {
        // console.log('SHOP', filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        // CHECK IF ITS PRICE AN GRAB THE ARRAY OF PRICE
        if (filterBy ==='price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters);
    };

    // FUNCTION THAT HANDLES GRABBING OF PRICE ARRAY FROM PRICES
    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }

        return array;
    };

    

    return (
        <Layout title='Homepage' description='Node React E-commerce App' className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <h4 >Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>
                    <h4 >Filter by price range</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
                <div className='col-8'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {filteredResults?.data?.map((product, i) => (
                        <Card key={i} product={product} />
                            ))}
                    </div>

                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
      );
};

// Shop.propTypes = {}

export default Shop;