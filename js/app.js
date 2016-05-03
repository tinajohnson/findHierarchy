var app = angular.module( 'hierarchyTree', [] );

app.directive("tree", function($compile) {
    return {
        restrict: "E",
        scope: {family: '='},
        template:
        '<ul>'+
            '<li>' +
                '<a href="#" ng-repeat="data in family" ng-controller="mainController" ng-click="getTree(data.id)" ng-keydown="">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                            '<h3 class="panel-title">'+
                                '{{data.name}}' + '</br>b. {{data.dob}}' +
                            '</h3>' +
                        '</div>' +
                        '<div class="panel-body">' +
                            '{{data.spouse.name}}' +'</br>b. {{data.spouse.dob}}' +
                        '</div>' +
                    '</div>' +
                    '<tree family="sons"></tree>' +

                    '<tree family="daughters"></tree>' +
                '</a>' +
            '</li>' +
        '</ul>',
        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                    iElement.append(clone);
                });
            };
        }
    };
});


