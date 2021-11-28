import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import style from '../css_modules/gifs.module.css';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Gifs (props) {
    return (
        <div>
        <ImageList sx={{ width: 800, height: 450 }} cols={5}>
            {props.data.map((item) => (
                <ImageListItem key={item.images.original.url}>
                    <img className={style.sizeImg} src={item.images.original.url} alt={item.title}/>
                </ImageListItem>
            ))}
        </ImageList>
            {props.data.length > 0 &&
                <TablePagination
                    colSpan={5}
                    count={props.totalResults}
                    rowsPerPage={props.limit}
                    page={props.page}
                    onPageChange={props.handleChangePage}
                    rowsPerPageOptions={-1}
                />
            }
        </div>
    );
}