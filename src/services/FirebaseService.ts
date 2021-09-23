import { useState } from 'react';
import { storage } from '../firebase/index';


export const imageUpload = async (image:any) => {
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
                    return url;
                })
        }
    )
}

