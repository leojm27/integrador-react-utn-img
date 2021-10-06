import { types } from "../types/types";

const initialState = {
    photoList: [],
}

export const photoReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.loadList:
            return {
                ...state,
                photoList: [...action.payload]
            }

        case types.addNewPhoto:
            return {
                ...state,
                photoList: [action.payload, ...state.photoList]
            }

        case types.deletePhoto:
            const update = state.photoList.filter(photo => photo.id !== action.payload);
            return {
                ...state,
                photoList: update
            }

        default:
            return state;

    }
}

