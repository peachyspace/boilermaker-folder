/* import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import store, { fetchMe } from "./store";
import UserPage from `./UserPage`
import Login from './LoginPage'
//class component  can recieve "history" as a prop from react-router-dom when we wrap it "withRouter " 
const MainApp = class extends Component {
  componentDidMount() {
    this.props.userFetched();
  }

  render() {
    if (this.props.userIsBeingFetched) {
      return <h1>Loading...</h1>;
    }
    return (
      <Switch>
        <Route path="/home" component={UserPage} />
        <Route component={Login} />
      </Switch>
    );
  }
};

const mapStateToProps = (state) => ({
  userIsBeingFetched: state.user.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  userFetched: () => dispatch(fetchMe()),
});
const WrappedMainApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainApp)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <WrappedMainApp />
    </Router>
  </Provider>,
  document.getElementById("app")
);
 */
