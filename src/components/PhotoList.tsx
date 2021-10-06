import React, { useEffect, useState } from 'react';
import { Card, Col, CardGroup } from 'react-bootstrap';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Photografy } from '../interfaces/List-Interface';

export const PhotoList = () => {

    const { photoList }: { photoList: Array<Photografy> } = useSelector((state: RootStateOrAny) => state.photo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (photoList !== []) && setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [photoList])


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
                    : (<>
                        <h3>Listado de Fotografia</h3>
                        <CardGroup className="mb-5" >
                            {
                                photoList?.map((photo, index) => {
                                    return <Col key={index}>

                                        <Link
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            to={`./list/view/${photo.id}`} >

                                            <Card style={{ width: '12rem' }}
                                                className="my-1 mx-2 animate__animated animate__fadeIn">

                                                <Card.Img
                                                    variant="top"
                                                    src={photo.download_url} />

                                                <Card.Body>
                                                    <Card.Text>{photo.author}</Card.Text>
                                                </Card.Body>
                                            </Card>

                                        </Link>

                                    </Col>
                                })
                            }
                        </CardGroup>
                    </>)
            }
        </div>
    )
}
