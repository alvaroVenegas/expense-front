import { Route, Redirect } from 'react-router-dom';

const SecureRoute = (props) => {
    if (props.user === null) {
        return <div>Cargando...</div>
    }
    if (props.user === false) {
        return <Redirect to="/login" />
    };
    if (props.user) {
        return <Route {...props} />
    }
};

export default SecureRoute;