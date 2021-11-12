import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { UserLogin, UserHome, UserEvaluate } from "./screens/user";
import {
  AdminHome,
  AdminLogin,
  ResetPassword,
  UserManager,
} from "./screens/admin";

import Error from "./screens/common/Error/Error";
import ChatBox from "./screens/common/ChatBox/ChatBox";
import ChatBoxDetail from "./components/ChatBoxDetail/ChatBoxDetail";
import Feedback from "./views/students/Feadback";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container fluid className="p-0">
        <div className="App">
          {/* <Sidebar/> */}
          <Switch>
            {/* user */}
            <Route path="/" exact component={UserHome} />
            <Route path="/login" component={UserLogin} />
            <Route path="/chatbox" component={ChatBox} />
            <Route path="/chatbox/detail" component={ChatBoxDetail} />
            <Route path="/evaluate" component={UserEvaluate} />
            <Route path="/feedback" component={Feedback} />
            {/* admin */}
            <Route path="/admin" component={AdminHome} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/resetpassword" component={ResetPassword} />
            <Route path="/admin/usermanager" component={UserManager} />
            {/* error */}
            <Route component={Error} />
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
