export const getSizeImgAsync = (files) => {
    const promise = new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL;
        let file, img, size = { width : 0, height : 0 };
        if ((file = files)) {
            img = new Image();
            img.onload = function () {
                size.width = this.width;
                size.height = this.height;
                resolve(size);
            };
            img.onerror = function () {
                console.log("not a valid file: " + file.type);
                reject("ERROR - El archivo seleccionado no es una Imagen");
            };
            img.src = _URL.createObjectURL(file); // ??????
        } else {
            console.log('No se selecciono ningún archivo.');
            reject(size)
        }
    });
    
    return promise;
}