import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import style from '../css_modules/history.module.css';

const HistoryPage = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        let userEmail = sessionStorage.getItem('session');
        let userData = JSON.parse(localStorage.getItem(userEmail));
        setHistory(userData.history);
    }, []);

    return (
        <div>
            {history.map((item) => (
                <Link to={`/main_page/${item}`} className={style.decor}>
                    {item}
                </Link>
            ))}
            <Link to='/main_page' className={style.back}>B A C K</Link>
        </div>
    );
};

export default HistoryPage;