import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <div>
                <Route path='/' element={<App />} />
            </div>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
