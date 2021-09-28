
import { types } from '../types/types';

export const loadList = (photoList) => ({
    type: types.loadList,
    payload: photoList
});

export const addNewPhoto = (photografy) => ({
    type: types.addNewPhoto,
    payload: photografy
});

/*export const findById = (id) => ({
    type: types.loadList,
    payload: id
});*/
