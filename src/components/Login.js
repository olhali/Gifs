import React from "react";
import style from '../css_modules/login.module.css';

const Login = (props) => {

        return (
            <div>
                <form name='login'>
                    <label htmlFor='user_email' className={style.label}>Email:</label>
                    <input id='user_email' type='email' name='email' title="Enter your email" placeholder='Enter your email' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handleEmail(event)}}/><br/>

                    <label htmlFor='user_password' className={style.label}>Password:</label>
                    <input id='user_password' type='password' name='password' title='Enter your password' placeholder='Enter your password' autoComplete='off' required className={style.no_frame} onChange={(event) => {props.handlePassword(event)}}/><br/>
                </form>
            </div>
        );
};

export default Login;