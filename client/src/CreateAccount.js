import React, { useState } from 'react';

function CreateAccount() {

    const [user, setUser] = useState({
        userName: '',
        userPassword: ''
    });

    const [showForm, setShowForm] = useState(false);

    // function that runs when you type in the text box
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // function that runs when you submit the form
    const handleSubmit = (e) => {
        e.preventDefault();


        // clears the text box on submit, this should be last in the function
        setUser({
            userName: '',
            userPassword: ''
        });
    }

    return (
        <span>
            <button type="button" className="btn btn-component" style={{}}onClick={() => {
                setShowForm(!showForm);
            }}>
                <span>Create Account</span>
            </button>

            {
                showForm ? <form style={{ zIndex: "1" }} onSubmit={handleSubmit}>
                    <label htmlFor='userName'>
                        Username:
                        <input
                            type="text"
                            name="userName"
                            value={user.userName}
                            onChange={handleChange} />
                    </label>
                    
                    <label htmlFor='userPassword'>
                        Password:
                        <input
                            type="password"
                            name="userPassword"
                            value={user.userPassword}
                            onChange={handleChange} />
                    </label>

                    <input type="submit" value="Add" />
                </form> : null
            }
        </span>
    );
}

export { CreateAccount as default };