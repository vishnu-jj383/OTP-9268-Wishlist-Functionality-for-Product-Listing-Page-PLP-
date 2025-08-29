// Model.js
// -----------------------
// @module Case
define("JJ.Wishlistextension.Wishlistextension.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/Wishlistextension/SuiteScript2/Wishlistextension.Service.ss"
            ),
            true
        )
});
});
