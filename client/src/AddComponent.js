import React, { useState } from 'react';

function AddComponent() {

    const [link, setLink] = useState('');
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <button type="button" className="btn btn-default" onClick={() => {
                setShowForm(!showForm);
            }}>
                <span>Add Component</span>
            </button>
            {
                showForm ? <form style={{ zIndex: "1" }} onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Added component from ${link}`);
                }}>
                    <label>
                        Component API link:
                        <input
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> : null
            }
        </div>
    );
}

export { AddComponent as default };