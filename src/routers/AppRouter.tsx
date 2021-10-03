import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PhotoForm } from '../components/PhotoForm';
import { PhotoList } from '../components/PhotoList';
import { PhotoView } from '../components/PhotoView'
import { NavbarApp } from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchPhotoList } from '../services/PhotoService';
import { loadList } from '../redux/actions/photo';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //const { photoList }: { photoList: Array<Photografy> } = useSelector((state: RootStateOrAny) => state.photo);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (!isLoaded)
            && (fetchPhotoList()
                .then(resp => {
                    console.log('AppRouter');
                    // se almacena en LocalStorage y en State de Redux
                    // localStorage.setItem('photoList', JSON.stringify(resp.data));
                    dispatch(loadList(resp.data));
                    //setIsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                    //setIsLoaded(true);
                }))
                .finally(() => {
                    setTimeout(() => {
                        setIsLoaded(true)
                    }, 1500);
                })
    }, [dispatch, isLoaded]);

    return (
        <>
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

                {/*}
                <Footer />
                */}
            </Router>
        </>
    )
}