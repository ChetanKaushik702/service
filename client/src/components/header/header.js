import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";
import logo from "../../logo.svg";
import { logout } from "../../actions/userAction";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
  };

  const NavLinks = ({ onNavigate }) => (
    <>
      <Link
        to="/"
        onClick={onNavigate}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Home
      </Link>
      <Link
        to="/services"
        onClick={onNavigate}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Services
      </Link>
      {!isAuthenticated && (
        <Link
          to="/forgotpassword"
          onClick={onNavigate}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Forgot Password
        </Link>
      )}
    </>
  );

  const AuthActions = ({ onNavigate }) =>
    isAuthenticated ? (
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Hi, {user && user.name}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild onClick={onNavigate}>
          <Link to="/register">Register</Link>
        </Button>
        <Button size="sm" asChild onClick={onNavigate}>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" className="h-9 w-9" />
          <span className="text-lg font-bold">ServiceFare</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden md:flex">
          <AuthActions />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="right" className="w-3/4">
            <SheetHeader>
              <SheetTitle>ServiceFare</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
              <div className="mt-2 border-t pt-4">
                <AuthActions onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
