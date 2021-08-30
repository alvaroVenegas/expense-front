import React, { useEffect } from 'react';
import './graphics.scss';
import themes from "devextreme/ui/themes";
import ReactDOM from "react-dom";
import Gastos from "./Gastos.jsx";


const BASE_URL = "http://localhost:3500";
const expensesUrl = `${BASE_URL}/expenses`;
const categoriesUrl = `${BASE_URL}/categories`;

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
}

export const getCategoriesFromApi = async () => {
    const request = await fetch(categoriesUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}

export const getDetailsFromApi = async () => {
    const request = await fetch(expensesUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}


const DetailsGraphics = () => {
    return (
        <div >
            <div className="dx-viewport">
                <Gastos />
            </div>
        </div>
    )
}

export default DetailsGraphics

