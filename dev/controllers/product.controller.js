// productCtrl controller
app.controller("productCtrl", function($scope, $location, dataService, $route){

  // get data for product via its id
  $scope.currentItem = dataService.getProduct($route.current.params.id);

});
