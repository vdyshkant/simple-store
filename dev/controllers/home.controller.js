// homeCtrl controller
app.controller('homeCtrl', function($scope, $location, dataService){


    // get products from database
    $scope.items = dataService.data;


    // go to product item view
    $scope.showProduct = (item) => {
      $location.path(`/product/${item.id}`);
    };


    // delete product from database
    $scope.delete = (item) => {
      if (confirm("Are you sure?")){
        dataService.data.forEach(function(elem, index){
          if (elem.id === item.id) {
            dataService.data.splice(dataService.data.indexOf(elem), 1);
            dataService.updateStorage(dataService.data);
          }
        });
      }
    };


    // go to edit view
    $scope.edit = (item) => {
      $location.path(`/edit/${item.id}`);
    };


    // go to create 'view'
    $scope.create = (item) => {
      $location.path('/create');
    };

});
