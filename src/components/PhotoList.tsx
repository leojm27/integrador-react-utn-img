import React, { useEffect } from 'react';
import { Card, Col, CardGroup } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadList } from '../redux/actions/photo'
import { Photografy } from '../interfaces/List-Interface';
import { fetchPhotoList } from '../services/PhotoService';

export const PhotoList = () => {

    const dispatch = useDispatch();

    const { photoList }: { photoList: Array<Photografy> } = useSelector((state: RootStateOrAny) => state.photo);

    useEffect(() => {
        fetchPhotoList()
            .then(resp => {
                dispatch(loadList(resp.data));
            })
            .catch((err) => console.log(err))
    }, [dispatch]);

    return (
        <>
            <CardGroup className="mb-5">
                {
                    photoList?.map((photo, index) => {
                        return <Col key={index}>
                            <Link to={`./view/${index}`}>
                                <Card style={{ width: '18rem' }} className="my-1 mx-2">
                                    <Card.Img variant="top" src={photo.download_url} />
                                    <Card.Body>
                                        <Card.Text>{photo.author}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    })
                }
            </CardGroup>
        </>
    )
}
