import { combineReducers } from "redux";
import items from "./ItemReducer";


const rootReducer = combineReducers({
    items
});

export default rootReducer;
