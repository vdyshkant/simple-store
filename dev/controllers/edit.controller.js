// editCtrl controller
app.controller("editCtrl", function($scope, $location, dataService, $route){


    // discard edits and go back to home view
    $scope.cancelEdit = () => $location.path("/");


    if ($route.current.params.id) {
      // $scope.currentItem = dataService.getProduct($route.current.params.id);
      $scope.currentItem = ($route.current.params.id) ? angular.copy(dataService.getProduct($route.current.params.id)) : {};
    } else {
      $scope.currentItem = "";
    }


    // saving changes
    $scope.saveEdit = (item) => {
      if (angular.isDefined(item.id)){
        // $currentItem.image = $tempItem.image;
        $scope.update(item);
      } else {
        $scope.create(item);
      }
    }


    // updating element
    $scope.update = (item) => {
      dataService.data.forEach(function(elem, index){
      	if (elem.id === item.id){
      		dataService.data.splice(index, 1, item);
      		dataService.updateStorage(dataService.data);
      	}
      });
      $location.path("/");
    };


    // creating new element
    $scope.create = (item) => {
      $scope.currentItem.id = new Date().getTime().toString();
      dataService.addToBase(item);
      $location.path("/");
    }


    // get image from input on change
    $scope.getImage = (elem, callback) => {
        var reader = new FileReader();
        if( $scope.fileIsImage(elem.files[0].type) ){
            reader.onload = callback;
            reader.readAsDataURL(elem.files[0]); // running file reader.
        }
        else {
            angular.element(elem).val(null); // очищаем input type="file";
        }
    };


    $scope.fileIsImage = (file) => {
        var types = [ 'image/png', 'image/jpeg'/*, 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'*/ ];

        return types.some((type) => {
            return file.indexOf(type) !== -1;
        })
    };

    // $scope.tempItem.image = $currentItem.image;
    // $scope.tempItem;

    // callback when image file uploaded
    $scope.imageIsLoaded = (e) => {
        $scope.$apply(() => {
            $scope.currentItem.image = e.target.result;
        });
        angular.element(document.querySelector('#edit_avatar')).val(null);
    };

}); // EOF homeCtrl
