import { Route, Switch } from "react-router-dom"
import HomeComponent from "./components/HomeComponent"
import LoginComponent from "./components/LoginComponent"
import SignupComponent from "./components/SignupComponent"

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path="/" component={HomeComponent} />
      </Switch>

    </>
  );
}

export default App;
