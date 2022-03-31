import React, { useState } from 'react';
import ProductView from './ProductView';
import './style/page.css'

function AddProduct({ productViews, setProductViews }) {

    console.log("add views: " + Object.prototype.toString.call(productViews));
    console.log("set views: " + Object.prototype.toString.call(setProductViews));

    const [product, setProduct] = useState({
        productName: '',
        productVersion: '',
        productResult: ''
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Added Product " + product.productName + ", version " + product.productVersion + ", with a " + product.productResult + " result.");

        // concatenate element
        setProductViews([...productViews, <ProductView name={product.productName} version={product.productVersion} result={product.productResult} />]);

        setProduct({
            productName: '',
            productVersion: '',
            productResult: ''
        });
    }

    return (
        <span style={{ float: 'left' }}>
            <button type="button" className="btn btn-default" onClick={() => {
                setShowForm(!showForm);
            }}>
                <span>Add Product</span>
            </button>

            {
                showForm ? <form onSubmit={() => handleSubmit}>

                    <label htmlFor='productName'>
                        Product Name:
                        <input
                            type="text"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange} />
                    </label><br />
                    <label htmlFor='productVersion'>
                        Product Version:
                        <input
                            type="text"
                            name="productVersion"
                            value={product.productVersion}
                            onChange={handleChange} />
                    </label><br />

                    <input
                        type="radio"
                        name="productResult"
                        value="passed"
                        onChange={handleChange} />
                    <label htmlFor='productResult'> Passed</label><br />
                    <input
                        type="radio"
                        name="productResult"
                        value="failed"
                        onChange={handleChange} />
                    <label htmlFor='productResult'> Failed</label><br />
                    <input
                        type="radio"
                        name="productResult"
                        value="skipped"
                        onChange={handleChange} />
                    <label htmlFor='productResult'> Skipped</label><br />

                    <input type="submit" value="Add" />
                </form> : null
            }
        </span>
    );
}


export { AddProduct as default };