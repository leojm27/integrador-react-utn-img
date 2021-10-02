import { storage } from '../firebase';

export const uploadFile = async (file) => {
    const fileRef = file;
    const storageRef = storage.ref();

    const pathFile = storageRef.child(`images/${fileRef.name}`);
    await pathFile.put(fileRef)
        .then(resp => {
            console.log("Imagen almacenada en Storage de Firebase: ", resp)
        })
        .catch(err => console.log(err))

    const url = await pathFile.getDownloadURL();
    return url;
}