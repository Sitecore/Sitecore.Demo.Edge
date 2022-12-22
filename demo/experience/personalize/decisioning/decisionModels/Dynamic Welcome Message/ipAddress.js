(function () {
    // First try to retrieve the IP address from the callFlows params object
    if (request && request.params && request.params.ipAddress) {
        return request.params.ipAddress;
    }

    var PERSONAL_INFORMATION_DATA_EXTENSION_NAME = "PersonalInformation";

    for (var dataExtensionIndex = 0; dataExtensionIndex < guest.dataExtensions.length; dataExtensionIndex++) {
        var dataExtension = guest.dataExtensions[dataExtensionIndex];

        if (dataExtension.name === PERSONAL_INFORMATION_DATA_EXTENSION_NAME) {
            return dataExtension.values.ipAddress || undefined;
        }
    }

    return undefined;
})();