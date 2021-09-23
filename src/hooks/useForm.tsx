import { useState } from 'react';
import { Photografy } from '../interfaces/List-Interface';


export const useForm = (initialState: Photografy) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }: { target: any }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    const handleSizeImage = (width: number, height: number) => {
        setValues({
            ...values,
            width,
            height
        });
    }

    /*const handleFile = (e: any) => {
        if (e.target.files[0]) {
            getSize(e);
            //handleInputChange(e);
        }
    }*/

    /*const getSize = (e: any) => {
        let _URL = window.URL || window.webkitURL;
        let file: any, img: any;
        if ((file = e.target.files[0])) {
            img = new Image();
            img.onload = function () {
                handleSizeImage(this.width, this.height)
            };
            img.onerror = function () {
                console.log("not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    }*/

    return [values, handleInputChange, handleSizeImage, reset];

}
