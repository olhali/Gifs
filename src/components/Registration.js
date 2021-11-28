import React, {useEffect, useState} from "react";
import style from '../css_modules/registration.module.css';

const Registration = (props) => {
    const [validationLabel, setValidationLabel] = useState('');

    useEffect(() => {
        setValidationLabel(props.validationLabel);
    }, [props.validationLabel]);

        return (
            <div>
                <form name='registration' action='#' method='POST' >
                    <label htmlFor='user_name' className={style.label}>Name:</label>
                    <input id='user_name' type='text' name='name' title="Enter your name" placeholder='Enter your name' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handleName(event)}}/><br/>

                    <label htmlFor='user_email' className={style.label}>Email:</label>
                    <input id='user_email' type='email' name='email' title="Enter your email" placeholder='Enter your email' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handleEmail(event)}}/><br/>

                    <label htmlFor='user_password' className={style.label}>Password:</label>
                    <input id='user_password' type='password' name='password' title='Enter your password' placeholder='Enter your password' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handlePassword(event)}}/><br/>

                    <label htmlFor='repeat_password' className={style.label}>Repeat password:</label>
                    <input id='repeat_password' type='password' name='repeatPassword' title='Please re-enter your password' placeholder='Re-enter your password' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handleConfirmPassword(event)}}/><br/>

                    {validationLabel}
                </form>
            </div>
        );
    };

export default Registration;