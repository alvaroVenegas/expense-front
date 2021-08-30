import { UseEffect } from "react";
import { getDetails, getCategories } from '../api/api';

const BASE_URL = "http://localhost:3500";
const expensesUrl = `${BASE_URL}/expenses`;
const categoriesUrl = `${BASE_URL}/categories`;

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
}



/* const cogerDetalles = async () => {
  try {
    const data = await getDetails()
    //console.log(data);
    return data;
  } catch (error) {
    console.log("A la veeeeeeeeeeeeeeerga")
  }
}

const data = async () => {

  return data = await cogerDetalles();
}

console.log("data  a juan", data)
const result = data.reduce((acc, curr) => {
  // [curr.category.name]

  if (!curr.price) return acc;

  if (acc[curr.category]) {
    acc[curr.category] += Number(curr.price);
  } else {
    acc[curr.category] = Number(curr.price);
  }

  return acc;
}, {});

const gastosJuan = Object.entries(result);

const flatted = gastosJuan.flatMap(el => {
  return { [el[0]]: el[1] };
});

console.log(flatted);

export const gastos = flatted; */






export const gastos = [
  {
    categoria: "Hogar",
    gasto: 120
  },
  {
    categoria: "Salud",
    gasto: 70
  },
  {
    categoria: "Compras",
    gasto: 75
  },
  {
    categoria: "Combustible",
    gasto: 300
  },
  {
    categoria: "Transporte",
    gasto: 60
  },
  {
    categoria: "Ocio",
    gasto: 50
  },
  {
    categoria: "Comida",
    gasto: 200
  },
  {
    categoria: "Otros",
    gasto: 55
  }
];
