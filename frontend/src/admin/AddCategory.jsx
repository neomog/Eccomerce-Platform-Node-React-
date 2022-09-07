// REACT IMPORT
import React, { useState } from 'react';
import Layout from '../core/Layout';
import PropType from 'prop-types';

// ROUTER IMPORT
import { Link } from 'react-router-dom';

// AUTH || HELPER IMPORT
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // DESTRUCTURE USER AND TOKEN FROM LOCALSTORAGE
    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // SEND DATA TO API
        createCategory(user._id, token, { name })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setSuccess(true);
            }
        })
    };


    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input autoFocus type='text' className='form-control' onChange={handleChange} value={name} />
            </div>
            <button className='btn btn-outline-primary'>Create Category</button>
        </form>
    );

    const closeAlert = (e) => {
        e.preventDefault();
        if (success) {
            setSuccess(false);
        }

        if (error) {
            setError(false);
        }
    };

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>
                <button onClick={closeAlert} className='close' type='button' data-dismiss='alert'>&times;</button>
                {name} has been created</div>;
        }
    };

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>
                <button onClick={closeAlert} className='close' type='button' data-dismiss='alert'>&times;</button>
                Category should be unique</div>;
        }
    };

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
        </div>
    );

    return (
        <Layout title='Add Category' description={`Hello, ${user.name}`} className='container'>
    
            <div className='row'>
              <div className='col-md-8 offset-md-2'>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
              </div> 
            </div>
    
        </Layout>
      );
};

AddCategory.prototype = {
    name: PropType.string,
    error: PropType.bool,
    success: PropType.bool,
    handleChange: PropType.func,
    handleSubmit: PropType.func,
    newCategoryForm: PropType.element
};

export default AddCategory;