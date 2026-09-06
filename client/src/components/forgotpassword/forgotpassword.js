import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import gsap from "gsap";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { clearErrors, forgotPassword } from "../../actions/userAction";
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

function ForgotPassword() {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    if (!loading && cardRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
      });
      return () => ctx.revert();
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

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
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                  We'll email you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      type="email"
                      id="forgot-email"
                      name="email"
                      required
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send reset link
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

export default ForgotPassword;
