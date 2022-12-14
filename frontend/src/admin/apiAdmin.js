// ENV VARIABLES IMPORT
import { API } from '../config';

// FUNCTION TO CREATE CATEGORY
export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
    return fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.log(error)
    })
  };

  // FUNCTION TO CREATE NEW PRODUCT
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(response => {
    return response.json()
  })
  .catch(error => {
    console.log(error)
  })
};

// FUNCTION TO GET CATEGORIES FROM API
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(error => console.log(error));
};