import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';


export const PhotoForm = () => {

    const [formValues, handleInputChange, handleSizeImage] = useForm({
        id: '',
        author: 'leo@gmail.com',
        width: 0,
        height: 0,
        url: '',
        download_url: ''
    });

    let { author, width, height, download_url } = formValues;

    const [image, setImage] = useState();

    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            getSize(e.target.files[0]);
            setImage(e.target.files[0]);
            handleInputChange(e);
        }
    }

    const getSize = (files) => {
        let _URL = window.URL || window.webkitURL;
        let file, img;
        if ((file = files)) {
            img = new Image();
            img.onload = function () {
                handleSizeImage(this.width, this.height);
                console.log("ok");
                alert(this.width + " " + this.height);
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
                <Form.Label column sm={2}>
                    Autor
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
                <Form.Label column sm={2}>
                    File
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="file"
                        name="download_url"
                        value={download_url}
                        onChange={handleChangeFile} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button
                        type="submit">
                        Guardar
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}
