import { Route, Switch } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
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
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
