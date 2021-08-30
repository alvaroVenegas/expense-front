import React, { useState, useEffect, useContext } from 'react';
import { getDetails, getDetailsByDates } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSignOutAlt, faUser, faChartPie, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { DetailsList, DetailsGraphics } from '../../components';
import { logOut } from '../../api/api';
import './Details.scss';

export const DetailsContext = React.createContext(null);

const INITIAL_STATE_FORM = {
    initialDate: "",
    finalDate: ""
}

const Details = () => {

    const [details, setDetails] = useState([]);
    const history = useHistory();

    let finalDateBefore = new Date();
    finalDateBefore.setDate(finalDateBefore.getDate());
    let finalDate = finalDateBefore.toISOString().substr(0, 10);

    let initialDateBefore = new Date();
    initialDateBefore.setDate(initialDateBefore.getDate());
    let initialDate = initialDateBefore.toISOString().substr(0, 10);

    useEffect(() => {
        getDetailsApi();
    }, []);

    const SeeTips = () => {
        history.push("/tips");
    }

    const AddNewExpense = () => {
        history.push("/newexpense");
    }

    const logOutAndRedirect = () => {
        logOut();
        history.push("/");
    }

    const [graphs, setGraphs] = useState(true);
    const [error, setError] = useState();
    const [datesForm, setDatesForm] = useState(INITIAL_STATE_FORM);


    const getDetailsApi = async () => {
        try {
            const expensesFromApi = await getDetails();

            for (let i = 0; i < expensesFromApi.length; i++) {
                const element = expensesFromApi[i];
                const dateFormat = new Date(element.date).toLocaleDateString("es-EU");
                expensesFromApi[i].date = dateFormat;
            }
            setDetails(expensesFromApi);
        } catch (error) {
            console.log("Error getDetailApi ", error);
        };
    };

    const handleDate = (event) => {
        const { name, value } = event.target;
        setDatesForm({ ...datesForm, [name]: value })
    }

    const findByDates = async (event) => {
        event.preventDefault();
        setError("")

        const { initialDate, finalDate } = datesForm

        if (datesForm.initialDate === "") {
            datesForm.initialDate = initialDate
        } else {
            const { initialDate } = datesForm
        }
        if (datesForm.finalDate === "") {
            datesForm.finalDate = finalDate
        } else {
            const { finalDate } = datesForm
        }

        try {
            const expensesFromApiByDates = await getDetailsByDates(datesForm);
            console.log(expensesFromApiByDates);

            for (let i = 0; i < expensesFromApiByDates.length; i++) {
                const element = expensesFromApiByDates[i];
                const dateFormat = new Date(element.date).toLocaleDateString("es-EU");
                expensesFromApiByDates[i].date = dateFormat;
            }
            setDetails(expensesFromApiByDates)
        } catch (error) {
            console.log("Error al obtener los gastos por fechas", error);
        }
    }

    return (
        <>
            <div>
                <div className="info">
                    <h1 className="info__title">EXPENSE APP</h1>
                    <h2 className="info__slogan">Make your life better by saving money</h2>
                </div>
                <div className="layout">
                    <div className="details__container">
                        <nav>
                            <div className="container__dtop">
                                <div>
                                    <h1>LISTA DE GASTOS</h1>
                                </div>
                                <button className="pulse" onClick={() => AddNewExpense()}> Agregar Nuevo Gasto</button>
                                <button className="pulse" onClick={() => SeeTips()}> Tips</button>
                                <FontAwesomeIcon className="logout" icon={faSignOutAlt} onClick={() => logOutAndRedirect()} />
                            </div>
                        </nav>
                        <div className="main__top">
                            <form onSubmit={findByDates}>
                                <input type="date" name="initialDate" defaultValue={finalDate} onChange={handleDate} />
                                <input type="date" name="finalDate" defaultValue={finalDate} onChange={handleDate} />
                                <button className="pulse" type='submit'>Buscar</button>
                            </form>
                            <div className="details__views">
                                <div className="details__views--marg">
                                    <FontAwesomeIcon icon={faChartPie} onClick={() => setGraphs(false)} className={graphs ? "details__views--marg--on" : "details__views--marg--off"} />
                                </div>
                                <div className="details__views--marg">
                                    <FontAwesomeIcon icon={faListUl} onClick={() => setGraphs(true)} className={graphs ? "details__views--marg--off" : "details__views--marg--on"} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <DetailsContext.Provider value={{ details, setDetails }}>
                                {graphs ? <DetailsList /> : <DetailsGraphics />}
                            </DetailsContext.Provider>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Details;