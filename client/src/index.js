import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddComponent from './AddComponent';
import ViewRoutes from './ViewRoutes';
import './style/page.css';
import './style/report.css';

ReactDOM.render(
    <div style={{ display: "inline-block" }}>
        <AddComponent />
    </div>,
    document.getElementById('add-component')
);

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
