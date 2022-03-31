import React, { useState } from 'react';
import ComponentView from './ComponentView';
import './style/page.css'

function AddComponent({ component, setComponent, componentViews, setComponentViews }) {
    const [showForm, setShowForm] = useState(false);


    const handleChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Added Component " + component.componentName + ", version " + component.componentVersion + ", with a " + component.componentResult + " result. Build number " + component.componentNumber);

        // concatenate element
        setComponentViews([...componentViews, <ComponentView name={component.componentName} version={component.componentVersion} result={component.componentResult} number={component.componentNumber} />]);
        setShowForm(!showForm);
    }

    return (
        <span style={{ float: 'left' }}>
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
                    </label><br />
                    <label htmlFor='componentVersion'>
                        Component Version:
                        <input
                            type="text"
                            name="componentVersion"
                            value={component.componentVersion}
                            onChange={handleChange} />
                    </label><br />
                    <label htmlFor='componentNumber'>
                        Build Number:
                        <input
                            type="text"
                            name="componentNumber"
                            value={component.componentNumber}
                            onChange={handleChange} />
                    </label><br />
                    <input
                        type="radio"
                        name="componentResult"
                        value="passed"
                        onChange={handleChange}
                        checked={component.componentResult === "passed"} />
                    <label htmlFor='componentResult'> Passed</label><br />
                    <input
                        type="radio"
                        name="componentResult"
                        value="failed"
                        onChange={handleChange}
                        checked={component.componentResult === "failed"} />
                    <label htmlFor='componentResult'> Failed</label><br />
                    <input
                        type="radio"
                        name="componentResult"
                        value="skipped"
                        onChange={handleChange}
                        checked={component.componentResult === "skipped"} />
                    <label htmlFor='componentResult'> Skipped</label><br />

                    <input type="submit" value="Add" />
                </form> : null
            }


        </span>
    );
}

export { AddComponent as default };