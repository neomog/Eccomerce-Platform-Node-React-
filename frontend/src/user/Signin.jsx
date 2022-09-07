// REACT IMPORT
// import { json } from 'body-parser';
import React, {useState} from 'react';
import Layout from '../core/Layout';
import PropTypes from 'prop-types';

// ROUTER IMPORT
import { Navigate } from 'react-router-dom';

// AUTH HELPER IMPORT
import { signin, authenticate, isAuthenticated } from '../auth';


const Signin = props => {
  const [values, setValues] = useState({
    email: 'don@gmail.com',
    password: 'password',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  // DESTRUCTURED VARIABLES
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  
  const handleChange = name => event => {
     setValues({...values, error: false, [name]: event.target.value});
  };

  // FUNCTION TO HANDLE FORM STATE
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    signin({email, password})
    .then(data => {
      if(data.error) {
        // console.log('data', data)
        setValues({...values, error: data.error, loading: false})
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signinForm = () => (
    <form>      <div className="form-group">
        <label className='text-muted' htmlFor="email">Email</label>
        <input value={email} onChange={handleChange('email')} type="email" name="email" id="" className="form-control" placeholder="" aria-describedby="helpId" />
      </div>

      <div className="form-group">
        <label className='text-muted' htmlFor="password">Password</label>
        <input value={password} onChange={handleChange('password')} type="password" name="password" id="" className="form-control" placeholder="" aria-describedby="helpId" />
      </div>
      <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
    </form>
  );

  // DISPLAY ERROR MESSAGE ON SUBMIT
  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  // DISPLAY SUCCESS MESSAGE ON SUBMIT
  const showLoading = () => 
  loading && (
    <div className='alert alert-info'>
      <h2>Loading...</h2>
    </div>
  );

  // REDIRECT USER TO DASHBOARD IF LOGIN SUCCESSFUL
  const redirectUser = () => {
    if (redirectToReferrer) {
       if (user && user.role === 1) {
          return <Navigate to='/admin/dashboard' />;
       } else {
          return <Navigate to='/user/dashboard' />;
       }
    }

    if (isAuthenticated()) {
      return <Navigate to='/' />;
    }
  };

  return (
    <Layout title='Sign-in' description='Sign-in to Node React E-commerce App' className='container col-md-8 offset-md-2'>
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  )
}

Signin.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  showError: PropTypes.func,
  showLoading: PropTypes.func,
  signinForm: PropTypes.element,
  redirectUser: PropTypes.element
};


export default Signin;