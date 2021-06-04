import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import Error404 from './components/Error404'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="*" component={Error404} />
            </Switch>
        </Router>
    );
};

export default App;
