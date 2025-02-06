import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PhotoForm } from '../components/PhotoForm';
import { PhotoList } from '../components/PhotoList';
import { PhotoView } from '../components/PhotoView'
import { NavbarApp } from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchPhotoList } from '../services/PhotoService';
import { loadList } from '../redux/actions/photo';
import { getListLocalStorage } from '../utils/localStorage'

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const list = getListLocalStorage();
        (!list) && (fetchPhotoList()
            .then(resp => {
                dispatch(loadList(resp.data));
            })
            .catch((err) => {
                console.log(err);
            }))
    }, [dispatch]);

    return (
        <Router>

            <NavbarApp />

            <div className="container mb-2">
                <Switch>

                    <Route path="/" exact component={PhotoList} />
                    <Route exact path="/list" component={PhotoList} />
                    <Route exact path="/list/view/:id" component={PhotoView} />
                    <Route exact path="/new" component={PhotoForm} />
                    <Route exact path="*">
                        <Redirect to="/" />
                    </Route>

                </Switch>
            </div>

            {/*
            <Footer />
            */}
        </Router>
    )
}