import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/*' element={<App />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

function NotFound() {
    return (
        <div className='App'>
            <h1>Not found.</h1>
            <p>Page not found.</p>
        </div>
    );
};
