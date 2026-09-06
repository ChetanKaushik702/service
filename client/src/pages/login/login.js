import React, {Fragment,useState,useEffect} from "react";
import {useHistory,useLocation} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors, login} from "../../actions/userAction";
import {useAlert} from "react-alert";

import Header from "../../components/header/header";
import './login.css';
export default function Login(){
    const history = useHistory();
    const location = useLocation();
    const alert = useAlert();
    
    const {error,loading,isAuthenticated} = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    
    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");
  
    const loginSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        dispatch(login(loginEmail,loginPassword));
    };
  
    const redirect = location.search ? location.search.split("=")[1]:"/";
  
    useEffect( ()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            
        }
        if(isAuthenticated){
            history.push('/');
        }
    },[dispatch,error,alert,history,isAuthenticated,redirect]    );

    return(
       <Fragment>
           {loading ? (
               <Loader />
           ):(
               <Fragment>
                   <div >
                       <Header />
                   <div className="row">
            <div className="login-form">
                <h2>Login</h2>
                <form autoComplete="off" onSubmit={loginSubmit}>
                    <input type="email" name="email" id="login-ml" required placeholder="Enter your Email" value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}/>
                    <input type="password" name="password" id="login-pd" required placeholder="Enter your password" value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value) }/>
                    
                    <div className="login-row">
                        
                        <a href="/forgotpassword">Forgot password</a>
                    </div>
                    <button type="submit">Login</button>
                   
                   
                    <p>Don't have an account? <a href="/register" className="switch">Register Now</a></p>
                </form>
            </div>
        </div>
                   </div>
                </Fragment>
           )}
       </Fragment>
    )
}