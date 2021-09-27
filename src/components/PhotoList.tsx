import React, { useEffect, useState } from 'react';
import { Card, Col, CardGroup } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadList } from '../redux/actions/photo'
import { Photografy } from '../interfaces/List-Interface';
import { fetchPhotoList } from '../services/PhotoService';

export const PhotoList = () => {

    const dispatch = useDispatch();

    const { photoList }: { photoList: Array<Photografy> } = useSelector((state: RootStateOrAny) => state.photo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotoList()
            .then(resp => {
                dispatch(loadList(resp.data));
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [dispatch]);

    return (
        <div className="my-3">

            {
                (loading)
                    ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                    : (<CardGroup className="mb-5 animate__animated animate__fadeIn">
                        {
                            photoList?.map((photo, index) => {
                                return <Col key={index}>
                                    <Link to={`./view/${photo.id}`} >
                                        <Card
                                            style={{ width: '18rem' }}
                                            className="my-1 mx-2 animate__animated animate__fadeIn">
                                            <Card.Img variant="top" src={photo.download_url} />
                                            <Card.Body>
                                                <Card.Text>{photo.author}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            })
                        }
                    </CardGroup>)
            }
        </div>
    )
}
