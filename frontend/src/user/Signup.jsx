// REACT IMPORT
// import { json } from 'body-parser';
import React, {useState} from 'react';
import Layout from '../core/Layout';
import PropTypes from 'prop-types';

// ROUTER IMPORT
import { Link } from 'react-router-dom';

// SUBMIT HELPER IMPORT
import { signup } from '../auth';


const Signup = props => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, success, error } = values;
  
  const handleChange = name => event => {
     setValues({...values, error: false, [name]: event.target.value});
  }

  // FUNCTION TO HANDLE FORM STATE
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false})
    signup({name, email, password})
    .then(data => {
      if(data.err) {
        // console.log('data', data)
        setValues({...values, error: data.err, success: false})
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })}
    })
  }

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className='text-muted' for="name">Name</label>
        <input value={name} onChange={handleChange('name')} type="text" name="name" id="" className="form-control" placeholder="" aria-describedby="helpId" />
      </div>

      <div className="form-group">
        <label className='text-muted' for="email">Email</label>
        <input value={email} onChange={handleChange('email')} type="email" name="email" id="" className="form-control" placeholder="" aria-describedby="helpId" />
      </div>

      <div className="form-group">
        <label className='text-muted' for="password">Password</label>
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
  )

  // DISPLAY SUCCESS MESSAGE ON SUBMIT
  const showSuccess = () => (
    <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
      New account is created, <Link to='/signin'>Please Signin</Link>
    </div>
  )

  return (
    <Layout title='Sign-up' description='Sign-up to Node React E-commerce App' className='container col-md-8 offset-md-2'>
      {showSuccess()}
      {showError()}
      {signupForm()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  )
}

Signup.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  showError: PropTypes.func,
  showSucces: PropTypes.func,
  signupForm: PropTypes.element,
  signup: PropTypes.func
};

export default Signup;