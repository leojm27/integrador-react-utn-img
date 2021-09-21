import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router';
import { Photografy } from '../interfaces/List-Interface';
import { fetchPhotoById } from '../services/PhotoService';

export const PhotoForm = () => {
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photografy>();

    useEffect(() => {
        fetchPhotoById(id)
            .then(resp => {
                console.log(resp.data);
                setPhoto(resp.data);
            })
            .catch((err) => {
                console.log(err);
                return <Redirect to="/list" />;
            })
    }, []);

    return (
        <Container className="my-3">
            <Row>
                <Col xs={12} md={8}>
                    <Image src={photo?.download_url} style={{ width: '100%' }} rounded />
                </Col>
                <Col xs={12} md={4}>
                    <h4>{photo?.author}</h4>
                    <small>autor</small>
                    <hr />
                    <h6>Tamaño: {photo?.width}px - {photo?.height}px</h6>
                    <a href={photo?.url} target="_blank">sitio descarga</a>
                </Col>
            </Row>
        </Container>
    )
}
