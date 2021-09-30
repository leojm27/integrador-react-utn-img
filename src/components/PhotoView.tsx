import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { stateSelector, Photografy } from '../interfaces/List-Interface';

export const PhotoView = ({ history }: { history: any }) => {

    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photografy>();

    const { photoList } = useSelector((state: stateSelector) => state.photo);

    useEffect(() => {
        const photografy = photoList.find(photo => photo.id === id);

        if (photografy !== undefined) {
            setPhoto(photografy);
            setLoading(false);
        } else {
            setLoading(false);
            history.replace('/');
        }

        return () => {
            setPhoto(undefined);
        }
    }, [id, photoList, history])

    const [loading, setLoading] = useState(true);

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();
        }
    }

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
                            <br />
                            <Button
                                className="mt-3"
                                type="submit"
                                onClick={handleReturn}>
                                Regresar
                            </Button>
                        </Col>
                    </Row>
                )}



        </Container>
    )
}
