import ActionTypes from "constants/actionTypes/ItemActionTypes";

export default function items(state = {
    list: [],
    totalCount: 0
}, action) {
    switch (action.type) {
        case ActionTypes.RETRIEVED_ITEMS:
            return {
                ...state,
                list: action.payload.Results,
                totalCount: action.payload.TotalResults
            };
        default:
            return state;
    }
}