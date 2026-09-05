import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";
import '../login/login.css';

function ResetPassword(){
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const { token } = useParams();
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, { password, confirmPassword }));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password updated successfully");
            history.push('/login');
        }
    }, [dispatch, error, success, alert, history]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Header />
                    <div className="row">
                        <div className="login-form">
                            <h2>Reset Password</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="New password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button type="submit">Reset password</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ResetPassword;
