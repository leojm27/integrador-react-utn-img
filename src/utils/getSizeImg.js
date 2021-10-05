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
                //console.log("not a valid file: " + file.type);
                reject("El archivo seleccionado no es una Imagen válida.");
            };
            img.src = _URL.createObjectURL(file);
        } else {
            reject(size)
        }
    });
    
    return promise;
}