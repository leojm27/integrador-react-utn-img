import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';


export const PhotoForm = () => {

    const [formValues, handleInputChange, handleSizeImage] = useForm({
        id: '',
        author: '',
        width: 0,
        height: 0,
        url: '',
        download_url: ''
    });

    let { author, width, height, download_url } = formValues;

    const [image, setImage] = useState();


    const handleChangeFile = async (e) => {

        const file = e.target.files[0];
        if (file) {



            getSize(file);
            setImage(file);
        }
    }

    const getSize = (files) => {
        let _URL = window.URL || window.webkitURL;
        let file, img;
        if ((file = files)) {
            img = new Image();
            img.onload = function () {
                handleSizeImage(this.width, this.height);
                //alert(this.width + " " + this.height);
            };
            img.onerror = function () {
                console.log("not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    }

    /*const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            async () => {
                await storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        console.log("termino");
                        //setForm({url: url, download_url: url})
                        // funcion que carga la interface
                    })
            }
        )
    }*/

    //console.log("image:", image);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("file: " + download_url);
        console.log(author, width, height);
        console.log(image);
    }

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
                        //value={fileName}
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

                <Col sm={{ span: 10, offset: 0 }}>
                    <Button
                        type="submit">
                        Guardar
                    </Button>
                </Col>

            </Form.Group>
        </Form>
    )
}
