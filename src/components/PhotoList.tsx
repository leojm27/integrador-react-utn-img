import React, { useEffect, useState } from 'react';
import { Card, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Photografy } from '../interfaces/List-Interface';
import { fetchPhotoList } from '../services/PhotoService';

export const PhotoList = () => {

    const [photoList, setPhotoList] = useState<Array<Photografy>>();

    useEffect(() => {
        fetchPhotoList()
            .then(resp => {
                console.log(resp.data);
                setPhotoList(resp.data);
            })
            .catch((err) => console.log(err))
    }, []);

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
