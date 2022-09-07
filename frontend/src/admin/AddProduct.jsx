// REACT IMPORT
import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import PropType from 'prop-types';

// ROUTER IMPORT
import { Link } from 'react-router-dom';

// AUTH || HELPER IMPORT
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    // DESTRUCTURED VARIABLES
    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category, 
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // POPULATE CATEGORY AND SET FORMDATA
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({...values, categories: data.data, formData: new FormData()});
            }
        });
    };

    useEffect(() => {
        init();
    }, []);


    // FUNCTI5ON TO HANDLE FORM EVENT
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    // FUNCTION TO HANDLE FORM SUBMIT
    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ 
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                 });
            }
        });
    };

    const closeAlert = (e) => {
        e.preventDefault();
        console.log(createdProduct);
        if (createdProduct) {
            setValues({ ...values, createdProduct: '' });
        }

        if (error) {
            setValues({ ...values, error: '' });
        }
    };

    const showSuccess = () => (
        <div className='alert alert-success' style={{ display: createdProduct ? '' : 'none' }}>
            <button onClick={closeAlert} className='close' type='button' data-dismiss='alert'>&times;</button>
            {`${createdProduct} has been created`}
        </div>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            <button onClick={closeAlert} className='close' type='button' data-dismiss='alert'>&times;</button>
            {error}
        </div>
    );

    const showLoading = () => {
        loading && (<div className='alert alert-success'>
            <h2>Loading...</h2>
        </div>)
    }


    const newPostForm = () => (
        <form className='mb-3' onSubmit={handleSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input type='file' name='photo' accept='image/*' />
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control' value={name} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea onChange={handleChange('description')} type='text' className='form-control' value={description} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input onChange={handleChange('price')} type='number' className='form-control' value={price} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select onChange={handleChange('category')} className='form-control'>
                <option>Please select</option>
                {categories && categories.map((c, i) => (
                    <option key={i} value={c._id}>{c.name}</option>
                ))}
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select onChange={handleChange('shipping')} className='form-control'>
                <option>Please select</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                </select>
                
            </div>

            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input onChange={handleChange('quantity')} type='text' className='form-control' value={quantity} />
            </div>

            <button className='btn btn-outline-primary'>Create Product</button>
        </form>
    );

    return (
        <Layout title='Add Product' description={`Hello ${user.name}, ready to add a new product?`} className='container'>
    
            <div className='row'>
              <div className='col-md-8 offset-md-2'>
                {showError()}
                {showSuccess()}
                {showLoading()}
                {newPostForm()}
              </div> 
            </div>
    
        </Layout>
      );
}

export default AddProduct;