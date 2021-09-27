import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Photografy } from '../interfaces/List-Interface';
import { fetchPhotoById } from '../services/PhotoService';

export const PhotoView = ({ history }: { history: any }) => {

    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photografy>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotoById(id)
            .then(resp => {
                setPhoto(resp.data);
            })
            .catch((err) => {
                history.replace('/');
            })
            .finally(() => setLoading(false))

        return () => {
            setPhoto(undefined);
        }
    }, [id, history]);

    return (
        <Container className="my-3">

            {(loading)
                ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                : (
                    <Row>
                        <Col xs={12} md={7} >
                            <Image
                                className="animate__animated animate__fadeInLeft"
                                src={photo?.download_url}
                                style={{ width: '90%' }}
                                rounded />
                        </Col>
                        <Col xs={12} md={5} className="animate__animated animate__fadeIn">
                            <h4>{photo?.author}</h4>
                            <small>autor</small>
                            <hr />
                            <h6>Tamaño: {photo?.width}px - {photo?.height}px</h6>
                            <a
                                href={photo?.url}
                                target="_blank"
                                rel="noreferrer">
                                sitio descarga
                            </a>
                        </Col>
                    </Row>
                )}



        </Container>
    )
}