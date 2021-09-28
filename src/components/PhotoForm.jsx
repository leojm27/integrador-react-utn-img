import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { storage } from '../firebase';
import { addNewPhoto } from '../redux/actions/photo';
//import { Photografy } from '../interfaces/List-Interface';
//import { useForm } from '../hooks/useForm';


export const PhotoForm = ({ history }) => {

    const dispatch = useDispatch();

    const [formValues, setForm] = useState({
        id: '',
        author: '',
        width: 0,
        height: 0,
        url: '',
        download_url: '',
    });

    let { author, width, height, id } = formValues;

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const addNew = () => {
            dispatch(addNewPhoto(formValues))
        }
        (id !== '') && addNew();
    }, [id, dispatch, formValues])

    const handleInputChange = ({ target }) => {
        setForm({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            getSize(file);
        }
    }

    // obtener width y height de la imagen a subir
    const getSize = (files) => {
        let _URL = window.URL || window.webkitURL;
        let file, img;
        if ((file = files)) {
            img = new Image();
            img.onload = function () {
                handleSizeImage(this.width, this.height);
            };
            img.onerror = function () {
                console.log("not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    }

    const handleSizeImage = (width, height) => {
        setForm({
            ...formValues,
            width,
            height,
        });
    }

    const handleUrlImageAndId = (url) => {
        const id = (new Date().getTime()).toString();
        console.log("id generado. " + id);
        setForm({
            ...formValues,
            url,
            download_url: url,
            id,
        });
    }

    const uploadFile = async (file) => {
        const fileRef = file;
        const storageRef = storage.ref();

        const pathFile = storageRef.child(`images/${fileRef.name}`);
        await pathFile.put(fileRef)
            .then(resp => {
                console.log("Imagen se almaceno correctamente: ", resp)
            })
            .catch(err => console.log(err))

        const url = await pathFile.getDownloadURL();
        return url;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await uploadFile(image);
        (url) && handleUrlImageAndId(url);
    }

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();
        }
    }

    function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    /*function LoadingButton() {
        const [isLoading, setLoading] = useState(false);
    }*/

    useEffect(() => {
        if (loading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [loading]);

    const handleClick = () => setLoading(true);

    return (
        <Form className="my-3" onSubmit={handleSubmit}>
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
                        //value={download_url}
                        onChange={handleChangeFile} />
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
                        value={`${width}px`}
                    />
                </Col>

                <Col sm={4} md={4}>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        name="height"
                        disabled
                        value={`${height}px`}
                    />
                </Col>

            </Form.Group>

            <Form.Group as={Row} className="mb-3">

                <Col className="m-1" sm={{ span: 10, offset: 0 }}>
                    <Button
                        type="submit">
                        Guardar
                    </Button>
                    {' '}
                    <Button
                        variant="primary"
                        disabled={loading}
                        onClick={!loading ? handleClick : null}
                    >
                        {loading ? 'Loading…' : 'Click to load'}
                    </Button>
                </Col>

                <Col className="m-1" sm={{ span: 10, offset: 0 }}>
                    <Button
                        onClick={handleReturn}>
                        Cancelar
                    </Button>
                </Col>

            </Form.Group>
        </Form>
    )
}
