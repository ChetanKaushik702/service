import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userAction';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './pages/resetpassword/resetpassword';
import Services from './pages/services/services';
import ServiceDetail from './pages/services/serviceDetail';
import ProfessionalListings from './pages/professional/listings';
import NewListing from './pages/professional/newListing';
import EditListing from './pages/professional/editListing';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
   <>
   <Router>
   <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route path="/register">
         <Register />
       </Route>
       <Route path="/login">
         <Login />
       </Route>
       <Route path="/forgotpassword">
         <ForgotPassword/>
       </Route>
       <Route path="/password/reset/:token">
         <ResetPassword/>
       </Route>
       <Route exact path="/services">
         <Services/>
       </Route>
       <Route path="/services/:id">
         <ServiceDetail/>
       </Route>
       <ProtectedRoute exact path="/professional/listings" role="professional">
         <ProfessionalListings/>
       </ProtectedRoute>
       <ProtectedRoute exact path="/professional/listings/new" role="professional">
         <NewListing/>
       </ProtectedRoute>
       <ProtectedRoute exact path="/professional/listings/:id/edit" role="professional">
         <EditListing/>
       </ProtectedRoute>
       <Route path="*">
         <Redirect to="/" />
       </Route>
     </Switch>
   </Router>
   </>
  );
}

export default App;
