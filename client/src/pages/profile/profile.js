import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Header from "../../components/header/header";
import { updateProfile, updatePassword, clearErrors } from "../../actions/userAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [details, setDetails] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    if (user) {
      setDetails({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Saved successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    }
  }, [dispatch, error, isUpdated]);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(details));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(passwords));
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="container flex max-w-lg flex-col gap-6 py-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <Badge variant={user.role === "professional" ? "default" : "secondary"}>
            {user.role === "professional" ? "Professional" : "User"}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>Update your name and email.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                Save details
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-current-password">Current password</Label>
                <Input
                  id="profile-current-password"
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-new-password">New password</Label>
                <Input
                  id="profile-new-password"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                Update password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
