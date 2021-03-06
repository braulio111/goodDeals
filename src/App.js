import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DealsScreen } from "./screens/DealsScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { StoreScreen } from "./screens/StoreScreen";
import { GamesScreen } from "./screens/GamesScreen";
import { Footer } from "./components/Footer";
import { DealScreen } from "./screens/DealScreen";
import { SearchScreen } from "./screens/SearchScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/deals" component={DealsScreen} exact />
            <Route path="/games" component={GamesScreen} exact />
            <Route path="/stores" component={StoreScreen} exact />
            <Route path="/deal/:id" component={DealScreen} />
            <Route path="/search/:game" component={SearchScreen} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
