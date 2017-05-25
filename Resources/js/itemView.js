var dotnetnuclear = dotnetnuclear || {};

dotnetnuclear.defaultOptions = {
    moduleId: -1,
    localResources: {},
    listContainerElemId: 'items-wrap'
};

dotnetnuclear.itemListViewModel = function (opts) {
    var options = $.extend(dotnetnuclear.defaultOptions, opts);
    var utils = new common.Utils();
    var alert = new common.Alert();
    //var parentSelector = "[id='" + options.bindContainer + "']";
    var parentSelector = options.bindContainer;

    var service = {
        path: "DotNetNuclear.PBStarter.PersonaBar",
        framework: $.ServicesFramework(options.moduleId),
        controller: "ItemList"
    }
    service.baseUrl = service.framework.getServiceRoot(service.path);

    var selectedItem = ko.observable();
    var isLoading = ko.observable(false);
    var itemList = ko.observableArray([]);

    var init = function () {
        getItemList();
    }

    var getItemList = function () {
        isLoading(true);

        var params = {};

        utils.get("GET", "", service, params,
            function (data) {
                // success
                if (data) { load(data); }
                else { itemList.removeAll(); }
            },
            function (error, exception) {
                // fail
                alert.danger({
                    selector: parentSelector,
                    text: error.responseText,
                    status: error.status
                });
            },
            function () {
                // always
                isLoading(false);
            });
    };

    var load = function (data) {
        itemList.removeAll();
        var underlyingArray = itemList();
        for (var i = 0; i < data.length; i++) {
            var result = data[i];
            var item = new dotnetnuclear.itemViewModel(this);
            item.load(result);
            underlyingArray.push(item);
        }
        itemList.valueHasMutated();
    };

    return {
        init: init,
        load: load,
        itemList: itemList,
        getItemList: getItemList,
        isLoading: isLoading,
        selectedItem: selectedItem
    }
};

dotnetnuclear.itemViewModel = function (parent) {
    var id = ko.observable('');
    var name = ko.observable('');
    var description = ko.observable('');

    var load = function (data) {
        id(data.id);
        name(data.name);
        description(data.description);
    };

    return {
        id: id,
        name: name,
        description: description,
        load: load
    }
}
