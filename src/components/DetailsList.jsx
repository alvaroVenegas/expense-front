import { deleteExpense } from '../api/api'
import React, { useContext, useEffect } from 'react';
import { DetailsContext } from '../pages/Details/Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./DetailsList.scss";

const DetailsList = () => {
    const { details, setDetails } = useContext(DetailsContext)
    
    const deleteExp = async (id) =>{
        const deleted = await deleteExpense(id)
        //console.log('elemento borrado= ',deleted);
        const newElements = details.filter(detail => detail._id !== id);
        setDetails(newElements);
    }

    let totalExpense = 0;
    for (let i = 0; i < details.length; i++) {
        const element = details[i];
        totalExpense += Number(element.price)
    }
    totalExpense = totalExpense.toFixed(2)

    return (
        <>
            <div className="main__details">
                {details.map(item => {
                    return (
                        <div className="details" key={JSON.stringify(item)}>
                            <div className="details__child">
                                <p>{item.date}</p>
                            </div>
                            <div className="details__child">
                                <p>{item.title}</p>
                            </div>
                            <div className="details__child">
                                <p>{item.category.name}</p>
                            </div>
                            <div className="details__child">
                                <p><strong>{item.price}€</strong></p>
                            </div>
                            <div className="details__child">
                                <div className="details__icon">
                                    {/* <button onClick={() => { deleteExpense(item._id) }}>Eliminar</button> */}
                                    <FontAwesomeIcon className="details__icon--trash" icon={faTrash} onClick={() =>  deleteExp(item._id) } />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="details__total">
                <div>
                    <p><strong>Total</strong></p>
                </div>
                <div>
                    <p><strong>{totalExpense}€</strong></p>
                </div>
            </div>
        </>
    )
}

export default DetailsList