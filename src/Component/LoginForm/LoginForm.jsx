// Genral imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// Style imports
import './LoginForm.css';

const LoginForm = ({handleSubmit}) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = ({key, value}) => {
        setCredentials((prevState) => {
            return {...prevState, [key]: value};
        });
    };

    const handleLoginChange = (event) => {
        handleChange({
            key: 'email',
            value: event.currentTarget.value
        });
    };

    const handlePasswordChange = (event) => {
        handleChange({
            key: 'password',
            value: event.currentTarget.value
        });
    };

    const handleSubmitForm = async(event) => {
        event.preventDefault();
        await handleSubmit(credentials);
    };
    //TODO Add Credentials Inputs (With Input Component)
    return (
        <>

            <form id="email-form" onSubmit={handleSubmitForm}>

                <div className='credentials-and-password-container'>

                    <input type="email" name='email' value={credentials.email} onChange={handleLoginChange} placeholder="Email"/>
                    <input type="text" value={credentials.password} onChange={handlePasswordChange} placeholder="Mot de passe"/>

                    <button
                        className='email-page-call-to-action'
                        type="submit"
                        onClick={handleSubmitForm}
                    >
                        Submit
                    </button>

                </div>
            </form>
        </>
    );
};

export default LoginForm;
