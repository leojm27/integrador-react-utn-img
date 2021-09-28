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

        default:
            return state;

    }
}

