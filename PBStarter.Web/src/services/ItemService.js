import util from "../utils";

class ItemService {
    getServiceFramework(controller) {
        let sf = util.sf;

        sf.moduleRoot = "DotNetNuclear.PBStarter.PersonaBar";
        sf.controller = controller;

        return sf;
    }

    getItems(searchParameters, callback, errorCallback) {
        const sf = this.getServiceFramework("Item");
        searchParameters = Object.assign({}, searchParameters, {});
        sf.get("list", searchParameters, callback, errorCallback);
    }

    saveItem(itemVm, callback, errorCallback) {
        const sf = this.getServiceFramework("Item");
        sf.post("upsert", itemVm, callback, errorCallback);
    }

    deleteItem(itemVm, callback, errorCallback) {
        const sf = this.getServiceFramework("Item");
        sf.post("delete", itemVm, callback, errorCallback);
    }

}
const itemService = new ItemService();
export default itemService;