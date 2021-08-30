import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SecureRoute from './components/SecureRoutes';
import { checkSession, getCategories } from './api/api';
import { Suspense, lazy } from 'react';
import './App.scss';


const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const NewExpense = lazy(() => import("./pages/NewExpense/NewExpense"));
const Tips = lazy(() => import("./pages/Tips/Tips"));
const Details = lazy(() => import("./pages/Details/Details"));

const INITIAL_STATE = {
  userName: "",
  id: ""
}

function App() {

  let categories = [];
  const [user, setUser] = useState(INITIAL_STATE);
  console.log(user)


  useEffect(() => {
    getUserData();
    categories = getCategories()
  }, []);


  const getUserData = async () => {
    try {
      const user = await checkSession();
      storeUser(user);
    } catch (error) {
      console.log("Error recibiendo el userData", error);
    }
  };

  const storeUser = (user) => {
    setUser(user);
  };




  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route exact path="/" component={(props) => <Login {...props} storeUser={storeUser} />} />

            <Route exact path="/login" component={(props) => <Login {...props} storeUser={storeUser} />} />
            <Route exact path="/register" component={(props) => <Register {...props} storeUser={storeUser} />} />
            <Route exact path="/tips" component={(props) => <Tips {...props} categories={categories} />} />

            <SecureRoute exact path="/details" component={Details} user={user} />
            <Route exact path="/newexpense" component={(props) => <NewExpense {...props} categories={categories} />} />
           
            

          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
