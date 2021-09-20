import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PhotoForm } from '../components/PhotoForm';
import { PhotoList } from '../components/PhotoList';
import { NavbarApp } from '../components/Navbar';
import { Home } from '../components/Home';
import { Footer } from '../components/Footer';

export const AppRouter = () => {
    return (
        <>
            <Router>

                <NavbarApp />

                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route exact path="/photo/list" component={PhotoList} />
                        <Route exact path="/photo/new" component={PhotoForm} />
                        <Route exact path="/photo/view" component={PhotoForm} />
                    </Switch>
                </div>

                <Footer />
            </Router>
        </>
    )
}