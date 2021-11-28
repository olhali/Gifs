import React from "react";
import {Link} from "react-router-dom";
import style from '../css_modules/history.module.css';

const HistoryPage = (props) => {

    return (
        <div >
            {props.history.map((item) => (
                <li className={style.decor}>
                    <Link to={`/main_page/${item}`}>
                        {item}
                    </Link>
                </li>
            ))}
        </div>
    );
};

export default HistoryPage;