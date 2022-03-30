import React, { useState } from 'react';
import MigratorView from './MigratorView';
import './style/page.css'

function AddProduct() {

    const apiPrefix = 'http://localhost:5000/';
    const [component, setComponent] = useState({
        componentName: '',
        componentLink: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [componentTabs, setComponentTab] = useState(['Migrator V2']);
    const [showTabs, setShowTabs] = useState([false]);

    const handleChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // this is to prevent repeatedly concatenating the link prefix on each submission
        let temp = component.componentLink;
        component.componentLink = apiPrefix + component.componentLink;
        console.log("Added component " + component.componentName + " from " + component.componentLink);
        component.componentLink = temp;

        setComponentTab([...componentTabs], component.componentName);
        setShowTabs(true);

        setComponent({
            componentName: '',
            componentLink: ''
        });
    }

    function Tab() {
        return (
            showTabs ? <ul className="nav nav-tabs" id="myTab" role="tablist">
                {componentTabs.map(item => (
                    <li className="nav-item" role="presentation" key={item}>
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            {component.componentName}
                            {console.log(item + " " + component.componentName)}
                        </button>
                    </li>
                ))}
            </ul> : null
        );
    }

    return (
        <span style={{ float: 'right' }}>
            <button type="button" className="btn btn-default" onClick={() => {
                setShowForm(!showForm);
            }}>
                <span>Add Component</span>
            </button>

            {
                showForm ? <form onSubmit={handleSubmit}>

                    <label htmlFor='componentName'>
                        Component Name:
                        <input
                            type="text"
                            name="componentName"
                            value={component.componentName}
                            onChange={handleChange} />
                    </label>
                    <label htmlFor='componentLink'>
                        Component API Link:
                        <input
                            type="text"
                            name="componentLink"
                            value={component.componentLink}
                            onChange={handleChange} />
                    </label>
                    <input type="submit" value="Add" />
                </form> : null
            }
        </span>
    );
}


export { AddProduct as default };