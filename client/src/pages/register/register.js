
import './register.css';
import Header from "../../components/header/header";
import React, {Fragment,useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { clearErrors, register } from "../../actions/userAction";

function Register() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [user, setNewUser] = useState(
    {
        name: '',
        email: '',

        password:'',
    }
);

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', user.password);

    formData.append('email', user.email);
    formData.append('name', user.name);
    dispatch(register(formData));
}

const handleChange = (e) => {
    setNewUser({...user, [e.target.name]: e.target.value});
}

useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (isAuthenticated) {
        history.push('/');
    }
}, [dispatch, error, alert, history, isAuthenticated]);


  

    return (
        <Fragment>
             {loading ? (
               <Loader />
           ):(
               <Fragment>
        <Header />
        <div className="reg-body">
        <div className="container-reg">
        <div className="logo">
            <h3>Service Fare</h3>
        </div>
            <div className="register-form toggle">
                <h2 className="heading2">Register</h2>
                <form
                className="signUpForm"
               
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="signUpName">
                
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="signUpEmail">
                 
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="signUpPassword">
                  
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>

               
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
        </div>
        </div>
        </Fragment>
    )}
    </Fragment>
 )
}
export default Register
