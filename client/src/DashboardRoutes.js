import React, { useState, Fragment } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ComponentView from './ComponentView';
import GetReport from './GetReport';
import EditProduct from './EditProduct';
import './style/report.css';
import ProductView from './ProductView';

// TODO: Implement routes to view the LiveData Migrator version 1 test reports
function DashboardRoutes() {

    // handle the state of ComponentView, ProductView and AddProduct
    const [productViews, setProductViews] = useState([]);

    const [product, setProduct] = useState({
        productName: '',
        productVersion: '',
        productResult: ''
    });

    return (
        <Routes>
            <Route path='components/:component/:version/:result/:buildNumber/:test' element={<GetReport />} />
            <Route path='components/:component/:version/:result/:buildNumber/*' element={<GetReport />} />
            <Route path='components/:component/:version/:result/*' element={<GetReport />} />

            <Route path='components' element={
                <div id='report' style={{ margin: 10, padding: 10 }}>
                    <h1 style={{ fontWeight: 'bold' }}>Component Reports</h1>
                    <Link to='/'>
                        <button type="button" className="btn btn-default">View Rolled Up Test Results</button>
                    </Link>
                    <ComponentView component='core-data' version='v2' />
                    <ComponentView component='metadata' version='v2' />
                    <ComponentView component='ui' version='v2' />
                </div>} />

            <Route exact path='/*' element={
                // use map() to render multiple ProductViews
                <div id='report' style={{ margin: 10, padding: 10 }}>
                    <h1>LiveData Migrator Test Reporting Dashboard</h1>

                    <EditProduct product={product} setProduct={setProduct} productViews={productViews} setProductViews={setProductViews} />

                    {productViews.map((val, i) => (
                        <Fragment key={i}>
                            <ProductView name={product.productName} version={product.productVersion} result={product.productResult} />
                        </Fragment>
                    ))}

                </div>
            } />
        </Routes>
    );
}

export { DashboardRoutes as default };