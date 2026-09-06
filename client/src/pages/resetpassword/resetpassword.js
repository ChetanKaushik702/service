import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ResetPassword() {
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
      history.push("/login");
    }
  }, [dispatch, error, success, alert, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Choose a new password for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="reset-password">New password</Label>
                    <Input
                      type="password"
                      id="reset-password"
                      name="password"
                      required
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="reset-confirm-password">Confirm new password</Label>
                    <Input
                      type="password"
                      id="reset-confirm-password"
                      name="confirmPassword"
                      required
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Reset password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
