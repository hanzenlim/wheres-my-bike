import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const SCContainer = styled.div`
    height: 90vh
    background: #f5f5f5;
`;
function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Header vh="10">I'm the header</Header>
                    <SCContainer>
                        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </SCContainer>
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;
