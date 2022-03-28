import React, { useState } from 'react';

function AddComponent() {

    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [showAPIForm, setShowAPIForm] = useState(false);
    const [showNameForm, setShowNameForm] = useState(false);

    return (
        <div>
            <button type="button" className="btn btn-default" onClick={() => {
                setShowAPIForm(!showAPIForm);
                setShowNameForm(!showNameForm);
            }}>
                <span>Add Component</span>
            </button>
            {
                showNameForm ? <form style={{ zIndex: "1" }} onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Added component from ${link}`);
                }}>
                    <label>
                        Component Name:
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> : null
            }
            {
                showAPIForm ? <form style={{ zIndex: "1" }} onSubmit={(e) => {
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