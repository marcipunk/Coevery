﻿define(['angular-detour', 'core/app/formdesignerservice'], function () {
    'use strict';

    var coevery = angular.module('coevery', ['ng', 'ngGrid', 'ngResource', 'agt.detour', 'ui.utils', 'coevery.formdesigner']);
    coevery.config(['$locationProvider', '$provide', '$detourProvider',
        function ($locationProvider, $provide, $detourProvider) {
            $detourProvider.loader = {
                lazy: {
                    enabled: true,
                    routeUrl: 'api/CoeveryCore/Route',
                    stateUrl: 'api/CoeveryCore/State'
                },
                crossDomain: true,
                httpMethod: 'GET'
            };
        }]);

    coevery.value('$anchorScroll', angular.noop);

    coevery.run(['$rootScope', '$detour', '$stateParams', '$templateCache',
        function($rootScope, $detour, $stateParams, $templateCache) {

            //"cheating" so that detour is available in requirejs
            //define modules -- we want run-time registration of components
            //to take place within those modules because it allows
            //for them to have their own dependencies also be lazy-loaded.
            //this is what requirejs is good at.

            //if not using any dependencies properties in detour states,
            //then this is not necessary
            coevery.detour = $detour;

            //the sample reads from the current $detour.state
            //and $stateParams in its templates
            //that it the only reason this is necessary
            $rootScope.$detour = $detour;
            $rootScope.$stateParams = $stateParams;

            $rootScope.i18nextOptions = {
                resGetPath: 'i18n/__ns_____lng__.json',
                lowerCaseLng: true,
                ns: 'resources-locale'
            };
            
            function getMin() {
                var minHeight = window.innerHeight -
                    $("#header").outerHeight()-
                    $("#main-header").outerHeight() -
                    $(".widget.toolbar-Container").outerHeight() -
                    $("table.table-container").parent().parent().outerHeight() -
                    $("#footer").outerHeight();
                //alert(window.innerHeight);
                //alert($("#main-header").outerHeight());
                //alert($(".widget.toolbar-Container").outerHeight());
                //alert($("table.table-container").parent().parent().outerHeight());
                //alert($("#footer").outerHeight());
                return minHeight;
            }
            
            $rootScope.defaultGridOptions = {
                plugins: [new ngGridFlexibleHeightPlugin({ minHeight: getMin })],
                multiSelect: false,
                enableRowSelection: false,
                enableColumnResize: true,
                enableColumnReordering: true,
                enablePaging: true,
                showFooter: true,
                totalServerItems: "totalServerItems",
                footerTemplate: 'Coevery/CoeveryCore/GridTemplate/DefaultFooterTemplate'
            };
        }
    ]);

    return coevery;

});

$(function () {
    $('body').on("submit", 'form', function (event) {
        event.preventDefault();
    });
});
