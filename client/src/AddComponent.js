import React, { useState } from 'react';

function AddComponent() {

    const apiPrefix = 'http://localhost:5000/';

    const [component, setComponent] = useState({
        componentName: '',
        componentLink: ''
    });

    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setComponent({ ...component, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        component.componentLink = apiPrefix + component.componentLink;
        console.log("Added component " + component.componentName + " from " + component.componentLink);
        setComponent({
            componentName: '',
            componentLink: ''
        });
    }

    return (
        <span>
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

export { AddComponent as default };