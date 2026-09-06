import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import gsap from "gsap";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Register() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
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
    const formData = new FormData();
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("name", user.name);
    formData.append("role", user.role);
    dispatch(register(formData));
  };

  const handleChange = (e) => {
    setNewUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setNewUser({ ...user, role: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated]);

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
                  <div className="flex flex-col gap-2">
                    <Label>I want to</Label>
                    <RadioGroup
                      value={user.role}
                      onValueChange={handleRoleChange}
                      className="grid grid-cols-2 gap-2"
                    >
                      <Label
                        htmlFor="role-user"
                        className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm font-normal has-[[data-state=checked]]:border-primary"
                      >
                        <RadioGroupItem value="user" id="role-user" />
                        Find services
                      </Label>
                      <Label
                        htmlFor="role-professional"
                        className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm font-normal has-[[data-state=checked]]:border-primary"
                      >
                        <RadioGroupItem value="professional" id="role-professional" />
                        Offer services
                      </Label>
                    </RadioGroup>
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
