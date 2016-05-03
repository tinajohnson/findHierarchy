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
    };
});
