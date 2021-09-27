import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PhotoForm } from '../components/PhotoForm';
import { PhotoList } from '../components/PhotoList';
import { PhotoView } from '../components/PhotoView'
import { NavbarApp } from '../components/Navbar';
//import { Footer } from '../components/Footer';

export const AppRouter = () => {
    return (
        <>
            <Router>

                <NavbarApp />

                <div className="container mb-2">
                    <Switch>

                        <Route path="/" exact component={PhotoList} />
                        <Route exact path="/list" component={PhotoList} />
                        <Route exact path="/new" component={PhotoForm} />
                        <Route exact path="/view/:id" component={PhotoView} />
                        <Route exact path="*">
                            <Redirect to="/" />
                        </Route>
                        
                    </Switch>
                </div>

                {/*}
                <Footer />
                */}
            </Router>
        </>
    )
}