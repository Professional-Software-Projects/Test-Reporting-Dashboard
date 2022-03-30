import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import AddProduct from './AddProduct';
import CreateAccount from './CreateAccount';
import './style/page.css';
import './style/report.css';

ReactDOM.render(
    <span style={{ display: "inline-block" }}>
        <AddProduct />
    </span>,
    document.getElementById('add-component')
);

ReactDOM.render(
    <span style={{ display: "inline-block" }}>
        <CreateAccount />
    </span>,
    document.getElementById('login')
);

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/*' element={<DashboardRoutes />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);


function NotFound() {
    return (
        <div className='report'>
            <h1>Not found.</h1>
            <p>Page not found.</p>
        </div>
    );
};
