import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import gsap from "gsap";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import toast from "react-hot-toast";

import Header from "../../components/header/header";
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

export default function Login() {
  const history = useHistory();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    if (!loading && cardRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
      });
      return () => ctx.revert();
    }
  }, [loading]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <Card ref={cardRef} className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  autoComplete="off"
                  onSubmit={loginSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="login-email"
                      required
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="login-password"
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-primary hover:underline">
                      Register Now
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
