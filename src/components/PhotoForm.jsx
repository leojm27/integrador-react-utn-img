import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addNewPhoto } from '../redux/actions/photo';
import { getSizeImgAsync } from '../utils/getSizeImg';
import { uploadFile } from '../utils/firebaseStorage';

/*interface sizeImg {
    width: string,
    height: string
}*/

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
            dispatch(addNewPhoto(formValues));
            console.log("registro enviado a redux");
            setLoading(false);
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
            setImage(files);
            //console.log("antes de getSize");
            await getSizeImgAsync(files)
                .then(resp => {
                    console.log(resp);
                    handleSizeImage(resp.width, resp.height);
                })
                .catch(err => {
                    //console.log(err);
                    alert(err);
                })
            //console.log("despues de getSize");
            //console.log(size);
            //getSize(files);
            //handleSizeImage(size.width, size.height);
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
        setForm({
            ...formValues,
            url,
            download_url: url,
            id,
        });
        //setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

    useEffect(() => {
        if (loading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [loading]);

    // VALIDACIONES
    const isFormValid = () => {

        /*if (name.trim().length === 0) {
            //console.log('Name is required');
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            //console.log('Email is not valid');
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Password should be at least 6 characters and match each other');
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());*/
        return true;
    }

    return (
        <Form className="my-3 animate__animated animate__fadeIn" onSubmit={!loading ? handleSubmit : null}>
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
                    {/*<Button
                        type="submit">
                        Guardar
                    </Button>*/}
                    {' '}
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    //onClick={!loading ? handleSubmit : null}
                    >
                        {loading ? 'Cargando…' : 'Guardar'}
                    </Button>
                </Col>

                <Col className="m-1" sm={{ span: 10, offset: 0 }}>
                    <Button
                        variant="danger"
                        onClick={handleReturn}>
                        Cancelar
                    </Button>
                </Col>

            </Form.Group>
        </Form>
    )
}
