// ENV VARIABLES IMPORT
import { API } from '../config';

// FUNCTION TO HANDLE SIGNUP
export const signup = (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
  };

  // FUNCTION TO HANDLE SIGNIN
export const signin = (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
  };

// FUNCTION TO SET AUTHENTICATED USER DATA TO LOCALSTORAGE
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};


// FUNCTION TO LOGOUT AN AUTHENTICATED USER
export const signout = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/signout`, {
      method: 'GET'
    })
    .then(response => {
      console.log('signout', response);
    })
    .catch(error => console.log(error));
  }
}

// FUNCTION TO CHECK AUTHENTICATED USER STATUS 
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};