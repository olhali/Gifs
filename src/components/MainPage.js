import React, {useEffect, useState} from "react";
import style from '../css_modules/main.module.css'
import {Button, Col, Container, Input, Row} from "reactstrap";
import {API_Key, URL_Gif} from "../utils/Constants";
import Gifs from "./Gifs";
import {Link, useParams} from "react-router-dom";

const MainPage = (props) => {
    const limitGifs = 10;

    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(100);
    const [page, setPage] = useState(0);
    const [message, setMessage] = useState('');

    const handleChangePage = (event, page) => {
        let url = URL_Gif + '?api_key=' + API_Key + '&q=' + text + '&limit=' + limitGifs + '&offset=' + limitGifs * page;
        setPage(page);
        fetchData(url);
    };

    const textHandler = (e) => {
        setText(
            e.target.value
        )
    };

    const fetchData = (url) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => {
                if (response.pagination.total_count === 0) {
                    setMessage ('Sorry. No results were found for your search. Тry again');
                }
                setData(response.data);
                setTotalResults(response.pagination.total_count)
            })
            .catch(error => alert('Network error!'));
    };

    const clickSearchHandler = () => {
        props.addToHistory(text);
        let url = URL_Gif + '?api_key=' + API_Key + '&q=' + text + '&limit=' + limitGifs + '&offset=' + 0;
        fetchData(url);
    };

    const{item} = useParams();

    useEffect(() => {
        if(item === undefined) return;
        setText(item);
        let url = URL_Gif + '?api_key=' + API_Key + '&q=' + item + '&limit=' + limitGifs + '&offset=' + 0;
        fetchData(url);
    }, []);

    return (
        <div className={style.divDecor} align="center">
            <Container>
                <Row>
                    <Col>
                        <Input className={style.inputDecor} onChange={textHandler}/>
                        <Button className={style.btnDecor} onClick={clickSearchHandler}>Search</Button>
                    </Col>
                </Row>
                <span className={style.message}>{message}</span>
                <Row>
                    <Col>
                        <Gifs data={data} totalResults={totalResults} page={page} handleChangePage={handleChangePage} limit={limitGifs}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to='/history_page' className={style.linkDecor}>H I S T O R Y</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default MainPage;