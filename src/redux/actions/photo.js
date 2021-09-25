
import { types } from '../types/types';

export const loadList = (photoList) => ({
    type: types.loadList,
    payload: photoList
});
