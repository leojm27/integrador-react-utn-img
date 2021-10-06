import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { stateSelector, Photografy } from '../interfaces/List-Interface';
import { deletePhoto } from '../redux/actions/photo';

export const PhotoView = () => {

    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photografy>();
    let history = useHistory();

    const { photoList } = useSelector((state: stateSelector) => state.photo);

    useEffect(() => {
        const findPhotografy = async () => {
            const photografy = photoList.find(photo => photo.id === id);

            if (photografy !== undefined) {
                setPhoto(photografy);
            } else {
                Swal.fire('Fotografia no encontrada');
                history.push('/list');
            }
        }

        findPhotografy();
        return () => {
            setPhoto(undefined);
        }
    }, [id, history, photoList])


    const handleReturn = () => {
        history.push('/list');
    }

    const handleDelete = () => {
        Swal.fire({
            title: `¿Está seguro que desea eliminar la Fotografia de '${photo?.author}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePhoto(id));
                history.push('/list');
                Swal.fire(
                    'Eliminado',
                    `La Fotografia de '${photo?.author}' se elimino correctamente`,
                    'success'
                );
            }
        })
    }


    return (
        <Container className="my-3">

            {(photo)

                ? (
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
                            {' '}
                            <Button
                                className="mt-3"
                                variant="danger"
                                type="submit"
                                onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                )
                : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }



        </Container>
    )
}
