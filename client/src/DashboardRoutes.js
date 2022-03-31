import React, { useState, Fragment } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductView from './ProductView';
import ComponentView from './ComponentView';
import GetReport from './GetReport';
import AddProduct from './AddProduct';
import AddComponent from './AddComponent';
import './style/report.css';

// TODO: Implement routes to view the LiveData Migrator version 1 test reports
function DashboardRoutes() {

    // handle the state of ComponentView, ProductView and AddProduct
    const [productViews, setProductViews] = useState([]);
    const [componentViews, setComponentViews] = useState([]);

    const [product, setProduct] = useState({
        productName: '',
        productVersion: '',
        productResult: '',
        productNumber: ''
    });

    const [component, setComponent] = useState({
        componentName: '',
        componentVersion: '',
        componentResult: '',
        componentNumber: ''
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

                    <AddComponent component={component} setComponent={setComponent} componentViews={componentViews} setComponentViews={setComponentViews} />

                    {componentViews.map((val, i) => (
                        <Fragment key={i}>
                            <ComponentView name={component.componentName} version={component.componentVersion} result={component.componentResult} number={component.componentNumber} />
                        </Fragment>
                    ))}

                </div>} />

            <Route exact path='/*' element={
                // use map() to render multiple ProductViews
                <div id='report' style={{ margin: 10, padding: 10 }}>
                    <h1 style={{ fontWeight: 'bold' }}>LiveData Migrator Test Reporting Dashboard</h1>

                    <AddProduct product={product} setProduct={setProduct} productViews={productViews} setProductViews={setProductViews} />

                    {productViews.map((val, i) => (
                        <Fragment key={i}>
                            <ProductView name={product.productName} version={product.productVersion} result={product.productResult} number={product.productNumber} />
                        </Fragment>
                    ))}

                </div>
            } />
        </Routes>
    );
}

export { DashboardRoutes as default };