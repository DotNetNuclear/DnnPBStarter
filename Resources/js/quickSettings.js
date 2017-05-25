var dotnetnuclear = dotnetnuclear || {};

dotnetnuclear.quickSettings = function (root, moduleId) {
    var utils = new common.Utils();
    var alert = new common.Alert();
    var parentSelector = "[id='" + root + "']";

    // Setup your settings service endpoint
    var service = {
        path: "DotNetNuclear.PBStarter.PersonaBar",
        framework: $.ServicesFramework(moduleId),
        controller: "Settings"
    }
    service.baseUrl = service.framework.getServiceRoot(service.path);
    //service.baseUrl = "/DesktopModules/" + service.path + "/API/";

    // Observables
    var inputSetting1 = ko.observable("");

    var SaveSettings = function () {
        var deferred = $.Deferred();

        var params = {
            setting1: inputSetting1()
        };

        utils.get("POST", "save", service, params,
            function (data) {
                deferred.resolve();
            },
            function (error, exception) {
                // fail
                deferred.reject();
                alert.danger({
                    selector: parentSelector,
                    text: error.responseText,
                    status: error.status
                });
            },
            function () {
            });

        return deferred.promise();
    };

    var CancelSettings = function () {
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    };

    var LoadSettings = function () {
        var params = {};

        utils.get("GET", "load", service, params,
            function (data) {
                inputSetting1(data.setting1);
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
            });
    };

    var init = function () {
        // Wire up the default save and cancel buttons
        $(root).dnnQuickSettings({
            moduleId: moduleId,
            onSave: SaveSettings,
            onCancel: CancelSettings
        });
        LoadSettings();
    }

    return {
        init: init,
        inputSetting1: inputSetting1
    };
};