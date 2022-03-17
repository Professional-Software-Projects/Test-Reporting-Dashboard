import React from 'react';
import ReactDOM from 'react-dom';
import './style/page.css';
import './style/report.css';
import ViewRoutes from './ViewRoutes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/*' element={<ViewRoutes />} />
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
