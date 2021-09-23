import AxiosInterceptor from '../AxiosInterceptor';

export const fetchPhotoList = async () => {
    return await AxiosInterceptor.get('/v2/list?page=5&limit=30');
}

export const fetchPhotoById = async (id:string) => {
    return await AxiosInterceptor.get(`/id/${id}/info`);
}
