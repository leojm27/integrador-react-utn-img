

export const loadListLocalStorage = (photoList) => {
    localStorage.setItem('photoList', JSON.stringify(photoList));
}

export const getListLocalStorage = () => {
    //const persist = localStorage.getItem('persist:root');
    const persist = typeof window !== 'undefined' ? localStorage.getItem('persist:root') : null
    //verificar si esta vacio
    if (persist) {
        const data = JSON.parse(persist);
        const { photoList } = data;
        return JSON.parse(photoList);
    } else {
        return null
    }
}