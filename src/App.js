import { Switch, Route, Redirect } from "react-router-dom";
import Competitions from "./components/Pages/Competitions/Competitions";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CompetitionDetail from "./components/Pages/CompetitionDetail/CompetitionDetail";
import TeamDetail from "./components/Pages/TeamDetail/TeamDetail";
import Attribution from "./components/Attribution/Attribution";
import { constants } from "./constants";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path={constants.baseUrl}>
            <Redirect to={`${constants.baseUrl}competitions/?page=0`} />
          </Route>
          <Route
            exact
            path={`${constants.baseUrl}competitions/`}
            component={Competitions}
          />
          <Route
            exact
            path={[
              `${constants.baseUrl}competitions/:competitionId/matches/`,
              `${constants.baseUrl}competitions/:competitionId/teams/`,
            ]}
            component={CompetitionDetail}
          />
          <Route
            exact
            path={`${constants.baseUrl}competitions/:competitionId/teams/:teamId/`}
            component={TeamDetail}
          />
        </Switch>
      </Main>
      <Attribution />
    </>
  );
}

export default App;
