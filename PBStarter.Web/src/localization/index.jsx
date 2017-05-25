import util from "utils";

const Localization = {
    get(key) {
        let moduleName = "PBStarter";
        return util.getResx(moduleName, key);
    }
};
export default Localization;