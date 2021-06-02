import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
