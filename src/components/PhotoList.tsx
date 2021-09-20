import React, { useEffect, useState } from 'react';
import AxiosInterceptor from '../AxiosInterceptor';
import { Photografy, ListPhotografy } from '../interfaces/List-Interface';
import { Button, Card, Row, Col } from 'react-bootstrap';

export const PhotoList = () => {

    const [photoList, setPhotoList] = useState<Array<Photografy>>();

    const url = '/list';

    useEffect(() => {
        fetchGameList()
            .then(resp => {
                console.log(resp.data);
                setPhotoList(resp.data);
            })
            .catch((err) => console.log(err))
    }, []);


    const fetchGameList = async () => {
        return await AxiosInterceptor.get(url);
    }

    return (
        <>
            <Row xs={1} md={2} className="g-2 m-3">
                {
                    photoList?.map((photo, index) => {
                        return <Col key={index}>
                            <Card style={{ width: '18rem' }} className="m-3">
                                <Card.Img variant="top" src={photo.download_url} />
                                <Card.Body>
                                    <Card.Title>{photo.author}</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button variant="primary">Ver</Button>
                                </Card.Body>
                            </Card>

                            {/*
                            <Card className="">
                                <Card.Img src={photo.download_url} alt="Card image" />
                                    <Card.Title>Autor: {photo.author}</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Card.Text>Tamaño: {photo.width}px-{photo.height}px</Card.Text>
                                    
                            </Card>
                            */}
                        </Col>
                    })
                }
            </Row>
        </>
    )
}
