import React, { useState } from 'react';

function CreateAccount() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    return (
        <span>
            <button type="button" className="btn btn-default" onClick={() => {
                setShowUsernameForm(!showUsernameForm);
                setShowPasswordForm(!showPasswordForm);
            }}>
                <span>Create Account</span>
            </button>

            {
                // Add component name logic
                showUsernameForm ? <form style={{ zIndex: "1" }} onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Added component from ${username}`);
                }}>
                    <label>
                        Username: 
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> : null
            }


            {
                // Add component API link logic
                showPasswordForm ? <form style={{ zIndex: "1" }} onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Added component from ${password}`);
                }}>
                    <label>
                        Password: 
                        <input
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> : null
            }
        </span>
    );
}

export { CreateAccount as default };