/*
 * INTER-Mediator
 * Copyright (c) INTER-Mediator Directive Committee (http://inter-mediator.org)
 * This project started at the end of 2009 by Masayuki Nii msyk@msyk.net.
 *
 * INTER-Mediator is supplied under MIT License.
 * Please see the full license for details:
 * https://github.com/INTER-Mediator/INTER-Mediator/blob/master/dist-docs/License.txt
 * 
 * This plugin requres the following libraries, they can include with CDN services.
 * The sample file "jquery_datepicker_MySQL.html" of INTER-Mediator loacated 
 * "INTER-Mediator/samples/Sample_webpage/" includes the loading code ot them.
 * 
 * JQuery (https://jquery.com/)
 * jQuery UI (https://api.jqueryui.com/)
 */

IMParts_Catalog.jquery_datepicker = {
    instantiate: function (targetNode) {
        var nodeId = targetNode.getAttribute('id');
        this.ids.push(nodeId);

        targetNode._im_getComponentId = (function () {
            var theId = nodeId;
            return function () {
                return theId;
            };
        })();
        targetNode._im_setValue = (function () {
            var aNode = targetNode;
            return function (str) {
                aNode.value = str;
            };
        })();
        targetNode._im_getValue = (function () {
            var aNode = targetNode;
            return function () {
                return aNode.value;
            };
        })();
    },

    ids: [],
    dateFormat: "yy-mm-dd",

    finish: function () {
        for (var i = 0; i < IMParts_Catalog.jquery_datepicker.ids.length; i++) {
            var targetId = IMParts_Catalog.jquery_datepicker.ids[i];
            var targetNode = $('#' + targetId);
            if (targetNode) {
                targetNode.datepicker({
                    dateFormat: IMParts_Catalog.jquery_datepicker.dateFormat,
                    onSelect: (function () {
                        var thisId = targetId;
                        var thidNode = targetNode;
                        return function (dateText) {
                            thidNode.value = dateText;
                            IMLibUI.valueChange(thisId);
                        }
                    })()
                });
            }
        }
        this.ids = [];
    }
};