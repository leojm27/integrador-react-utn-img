import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { addNewPhoto } from '../redux/actions/photo';
import { getSizeImgAsync } from '../utils/getSizeImg';
import { uploadFile } from '../utils/firebaseStorage';

export const PhotoForm = ({ history }) => {

    const dispatch = useDispatch();

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    const [formValues, setForm] = useState({
        id: '',
        author: '',
        width: 0,
        height: 0,
        url: '',
        download_url: '',
    });

    const { author, width, height, id } = formValues;


    useEffect(() => {
        const addNew = async () => {
            dispatch(addNewPhoto(formValues));
            setLoading(false);
            await Swal.fire('Registro creado correctamente.')
            history.push('/list');
        }
        (id !== '') && addNew();
    }, [id, dispatch, formValues, history])


    const handleInputChange = ({ target }) => {
        setForm({
            ...formValues,
            [target.name]: target.value
        });
    }


    const handleChangeFile = async (e) => {
        const files = e.target.files[0];
        if (files) {
            await getSizeImgAsync(files)
                .then(resp => {
                    setImage(files);
                    sizeImage(resp.width, resp.height);
                })
                .catch(async (err) => {
                    setImage(undefined);
                    e.target.value = null;
                    sizeImage(0, 0);
                    await getMessageError(err);
                })
        }
    }


    const sizeImage = (width, height) => {
        setForm({
            ...formValues,
            width,
            height,
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (await isFormValid()) {
            await uploadFile(image)
                .then(resp => {
                    urlImageAndId(resp);
                })
                .catch(async (err) => {
                    await getMessageError('Error en la carga de imagen en Storage!');
                    console.log(err);
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
        }

    }


    const urlImageAndId = (url) => {
        const id = (new Date().getTime()).toString();
        setForm({
            ...formValues,
            url,
            download_url: url,
            id,
        });
    }


    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/list');
        } else {
            history.goBack();
        }
    }


    const isFormValid = async () => {
        if (!image) {
            setLoading(false);
            await getMessageError('Debe seleccionar una imagen!');
            return false;

        } else if (author.trim().length < 6) {
            setLoading(false);
            await getMessageError('El Nombre del Autor debe contener como minimo 6 caracteres');
            return false;
        } else {
            return true;
        }
    }

    const getMessageError = async (title) => {
        await Swal.fire({
            icon: 'error',
            title: title,
        });
    }


    return (
        <Form
            className="my-3 animate__animated animate__fadeIn"
            onSubmit={!loading ? handleSubmit : null}
        >
            <h4>Ingrese Fotografia</h4>

            <Form.Group as={Row} className="mb-3" controlId="formBasicAuthor">

                <Form.Label column sm={3}>
                    Nombre del Autor
                </Form.Label>

                <Col sm={8}>
                    <Form.Control
                        type="text"
                        placeholder="Autor"
                        name="author"
                        value={author}
                        onChange={handleInputChange}
                    />
                </Col>

            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicFile">

                <Form.Label column sm={3}>
                    File
                </Form.Label>

                <Col sm={8}>
                    <Form.Control
                        type="file"
                        name="file"
                        onChange={handleChangeFile}
                    />
                </Col>

            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicFile">

                <Form.Label column sm={3} md={3}>
                    Tamaño Imagen
                </Form.Label>

                <Col sm={4} md={4} >
                    <Form.Control
                        className="mb-3"
                        type="text"
                        name="width"
                        disabled
                        value={width}
                        onChange={handleInputChange}
                    />
                </Col>

                <Col sm={4} md={4}>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        name="height"
                        disabled
                        value={height}
                        onChange={handleInputChange}
                    />
                </Col>

            </Form.Group>

            <Form.Group as={Row} className="mb-3">

                <Col className="m-1" sm={{ span: 10, offset: 0 }}>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Procesando…' : 'Guardar'}
                        {' '}
                        <Spinner animation="grow" size="sm" hidden={!loading} />
                    </Button>
                </Col>

                <Col className="m-1" sm={{ span: 10, offset: 0 }}>
                    <Button
                        onClick={handleReturn}
                        disabled={loading}>
                        Regresar
                    </Button>
                </Col>

            </Form.Group>
        </Form>
    )
}
