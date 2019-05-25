import React from 'react';
import './book.css';

export default function Book(props){
    return (
        <div>
            <h1>{props.title}</h1>
            <div>{props.authors}</div>
            <div>Price: ${props.cost}</div>
            <img src={props.thumbnail} alt="book cover" />
            <p>{props.snippet}</p>
        </div>
    )
}