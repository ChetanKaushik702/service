import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { clearErrors, register } from "../../actions/userAction";
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

function Register() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [user, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("name", user.name);
    dispatch(register(formData));
  };

  const handleChange = (e) => {
    setNewUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

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
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Join ServiceFare to book or offer services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      type="text"
                      id="register-name"
                      placeholder="Name"
                      required
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      type="email"
                      id="register-email"
                      placeholder="Email"
                      required
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      type="password"
                      id="register-password"
                      placeholder="Password"
                      required
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default Register;
