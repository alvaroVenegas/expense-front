import { React, useEffect, useState } from 'react';
import { getTips } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import './tips.scss';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../api/api';



const Tips = () => {
    const history = useHistory();
    const [tips, setTips] = useState([]);

    const getTipsApi = async () => {
        try {
            const tipsFromApi = await getTips();
            console.log(tipsFromApi);
            setTips(tipsFromApi);
        } catch (error) {
            console.log("La cagaste con los tips broder");
        };
    };

    useEffect(() => {
        getTipsApi();
    }, []);

    const ReturnToHome = () => {
        history.push("/details");
    }

    const logOutAndRedirect = () => {
        logOut();
        history.push("/");
    }
    return (
        <div>
            <div className="tips__info">
                <h1 className="tips__info--title">EXPENSE APP</h1>
                <h2 className="tips__info--slogan">Make your life better by saving money</h2>
            </div>
            <div className="tips__layout">
                <div className="tips__container">
                    <div className="use-icons">
                        <div className="icons">
                            <FontAwesomeIcon className="icons__home" icon={faHome} onClick={ReturnToHome} />
                            <FontAwesomeIcon className="icons__logout" icon={faSignOutAlt} onClick={() => logOutAndRedirect()} />
                        </div>
                    </div>
                    {tips.map(item => {
                        return (
                            <div key={JSON.stringify(item)} className="tips">
                                <div className="tips__title"><strong>{item.title}</strong></div>
                                <div className="tips__information">{item.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default Tips;