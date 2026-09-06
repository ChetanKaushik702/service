import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import './forgotpassword.css';

function ForgotPassword(){
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, message, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Header />
                    <div className="row">
                        <div className="login-form">
                            <h2>Forgot Password</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your registered Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit">Send reset link</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ForgotPassword;
