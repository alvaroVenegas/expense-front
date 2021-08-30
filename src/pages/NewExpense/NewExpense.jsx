import React, { useEffect, useState } from 'react';
import { addExpense, getCategories } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import "./NewExpense.scss";

let setToday = new Date();
setToday.setDate(setToday.getDate());
let date = setToday.toISOString().substr(0, 10);

const INITIAL_STATE = {
    category: [],
    date: date,
    title: "",
    price: ""

};

const INITIAL_CATEGORY = {
    name: "Categoría",
};

const Expense = (props) => {

    const history = useHistory();
    useEffect(() => {
        setExpenseForm(INITIAL_STATE)
    }, []);

    const { user } = props;
    const [categories, setCategories] = useState([INITIAL_CATEGORY]);
    const [expenseForm, setExpenseForm] = useState(INITIAL_STATE);
    const [error, setError] = useState("");

    const getAllCategories = async () => {
        try {
            const allCategories = await getCategories(categories);
            setCategories(allCategories);
        } catch (error) {
            setError(error.message);
        }
    };

    const submitExpense = async (event) => {
        event.preventDefault();
        setError("");
        const { category, price, title } = expenseForm;
        if (expenseForm.date === "") {
            expenseForm.date = date
        } else {
            const { date } = expenseForm
        }
        console.log(expenseForm);

        try {
            const expense = await addExpense(expenseForm);
            document.getElementById("new-expense-form").reset()
            setExpenseForm(INITIAL_STATE);
            history.push('/details')

        } catch (error) {
            setError(error.message);
        }
    };

    const ReturnToHome = () => {
        history.push("/details");
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setExpenseForm({ ...expenseForm, [name]: value })
    };

    return (
        <div>
            <div className="info">
                <h1 className="info__title">EXPENSE APP</h1>
                <h2 className="info__slogan">Make your life better by saving money</h2>
            </div>
            <div className="layout">
                <div className="container">
                    <div className="container__top">
                        <h1 className="container__top--title">AGREGAR GASTO</h1>
                        <FontAwesomeIcon icon={faHome} onClick={ReturnToHome} className="container__top--iconHome" />
                    </div>
                    <form className="form__new-expense" onSubmit={submitExpense} id="new-expense-form">
                        <div >
                            <div className="form__new-expense--title">
                                <input type="text" name="title" placeholder="Descripción" onChange={handleInput} />
                            </div>
                            <div >
                                <input className="form__new-expense--date" type="date" name="date" defaultValue={date} onChange={handleInput} />
                            </div>
                            <div className="select form__new-expense--category">
                                <select className="" name="category" label="Selecciona categoría" onClick={getAllCategories} onChange={handleInput}>
                                    {categories.map(item => {
                                        return (
                                            <option key={JSON.stringify(item)} value={item._id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form__new-expense--price">
                                <input type="number" name="price" step="0.01" placeholder="Precio" onChange={handleInput} />
                            </div>

                            <div >
                                <input className="register-btn" type="submit" value="Añadir Gasto" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
};

export default Expense;