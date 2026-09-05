
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './pages/resetpassword/resetpassword';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
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
     </Switch>
   </Router>
   </>
  );
}

export default App;


