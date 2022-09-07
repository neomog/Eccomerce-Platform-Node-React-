// REACT IMPORT
import React from "react";

// ROUTER IMPORTS
import { BrowserRouter, Routes, Route } from   'react-router-dom';

// ROUTE PAGES IMPORTS
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashbord from './user/AdminDashboard';
import AddCategory from "./admin/AddCategory";
import AddProduct from './admin/AddProduct';
import Shop from "./core/Shop";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/shop' exact element={<Shop />} />
                <Route path='/signin' exact element={<Signin />} />
                <Route path='/signup' exact element={<Signup />} />
                <Route exact path='/user/dashboard' element={<PrivateRoute />}>
                    <Route exact path='/user/dashboard' element={<Dashboard />} />
                </Route>
                <Route exact path='/admin/dashboard' element={<AdminRoute />}>
                    <Route exact path='/admin/dashboard' element={<AdminDashbord />} />
                </Route>
                <Route exact path='/create/category' element={<AdminRoute />}>
                    <Route exact path='/create/category' element={<AddCategory />} />
                </Route>
                <Route exact path='/create/product' element={<AdminRoute />}>
                    <Route exact path='/create/product' element={<AddProduct />} />
                </Route>
            </Routes>
            
        </BrowserRouter>
    )
}

export default AppRoutes;