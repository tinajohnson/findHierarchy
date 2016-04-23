var app = angular.module( 'hierarchyTree', [] );

app.controller("mainController", function($http, $scope) {
    $scope.familyTree = null;
    $scope.sons = [];
    $scope.daughters = [];
    $scope.husbands = [];
    $scope.wives = [];
    $http.get( 'data/familyTree.json')
        .success( function( data ) {
            $scope.familyTree = data;

            //assuming that root has an id:1 always
            for (var i=0; i<$scope.familyTree.length; i++) {
                var obj = $scope.familyTree[i];
                if( obj.relationWith == '1' && obj.relation == 'wife') {
                    $scope.rootWife = obj;
                }
            }
        });


    $scope.getTree = function( id ) {
        for (var i=0; i<$scope.familyTree.length; i++) {
            var obj = $scope.familyTree[i];
            if( obj.relationWith == id && obj.relation == 'son') {
                for (var j=0; j<$scope.familyTree.length; j++) {
                    var object = $scope.familyTree[j];
                    if( object.relationWith == obj.id && object.relation == 'wife') {
                        obj.spouse = object;
                    }
                }
                $scope.sons.push( obj );
            }
        }

        for (var i=0; i<$scope.familyTree.length; i++) {
            var obj = $scope.familyTree[i];
            if( obj.relationWith == id && obj.relation == 'daughter') {
                for (var j=0; j<$scope.familyTree.length; j++) {
                    var object = $scope.familyTree[j];
                    if( object.relationWith == obj.id && object.relation == 'husband') {
                        obj.spouse = object;
                    }
                }
                $scope.daughters.push( obj );
            }
        }
    }
});

app.directive("tree", function($compile) {
    return {
        restrict: "E",
        scope: {family: '='},
        template:
        '<ul '+
            '<li>' +
                '<a href="#" ng-repeat="data in family" ng-controller="mainController" ng-click="getTree(data.id)">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                            '<h3 class="panel-title">'+
                                '{{data.name}}' +
                            '</h3>' +
                        '</div>' +
                        '<div class="panel-body">' +
                            '{{data.spouse.name}}' +
                        '</div>' +
                    '</div>' +
        '<ul>' +
        '<li>' +
                    '<tree family="sons"></tree>' +
        '</li>' +
        '</ul>'+
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

