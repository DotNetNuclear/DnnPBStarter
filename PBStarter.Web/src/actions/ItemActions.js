import ActionTypes from "constants/actionTypes/ItemActionTypes";
import ItemService from "services/ItemService";
import Utils from "utils";

function errorCallback(message) {
    Utils.notifyError(JSON.parse(message.responseText).Message, 5000);
}

const ItemActions = {
    getItems(searchParameters, callback) {
        return (dispatch) => {
            ItemService.getItems(searchParameters, (data) => {
                dispatch({
                    type: ActionTypes.RETRIEVED_ITEMS,
                    payload: data
                });
                if (callback) {
                    callback(data);
                }
            }, errorCallback);
        };
    },
    saveItem(item, callback) {
        return (dispatch) => {
            ItemService.saveItem(item, data => {
                dispatch({
                    type: ActionTypes.UPDATE_ITEM,
                    payload: item
                });

                if (callback) {
                    callback(data);
                }
            }, errorCallback);
        };
    },
    deleteItem(item, callback) {
        return (dispatch) => {
            ItemService.deleteItem(item, data => {
                dispatch({
                    type: ActionTypes.DELETE_ITEM,
                    data: { itemId: data.itemId }
                });

                if (callback) {
                    callback();
                }
            }, errorCallback);
        };
    },
    changePageField(key, value) {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.CHANGE_FIELD_VALUE,
                field: key,
                value
            });
        };
    }
};

export default ItemActions;
