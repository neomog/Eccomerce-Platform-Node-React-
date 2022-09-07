import { API } from "../config";

// FUNCTION TO GET ALL PRODUCTS FROM API
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error));
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

  // FUNCTION TO GET PRODUCTS FROM API BASED ON FILTERED
  export const getFilteredProducts = (skip, limit, filters = {}) => {
    // console.log(name, email, password);
    const data = {
      limit,
      skip,
      filters
    };
    return fetch(`${API}/products/by/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.log(error)
    })
  };