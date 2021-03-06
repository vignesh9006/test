var myApp = angular.module("myApp", []);
myApp.controller("studentController", [
  "$scope",
  "$http",
  function($scope, $http) {
    //Buttons Settings
    $scope.submit = true;
    $scope.update = false;
    $scope.cancel = false;
    $scope.albumid = true;
    $scope.rowlimit = 10;

    //Getting Users List
    //$http GET function
    //fetch(ULR).then(result=>result.json()).then(json=>console.log(json))
    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/photos"
    }).then(
      function successCallback(response) {
        $scope.photos = response.data;
      },
      function errorCallback(response) {
        alert("Error. Try Again!");
      }
    );

    //Create New User
    $scope.createphoto = function() {
      //$http POST function
      $http({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/photos",
        data: $scope.photo
      }).then(
        function successCallback(response) {
          $scope.photos.push(response.data);
          alert("User has created Successfully");
        },
        function errorCallback(response) {
          alert("Error. while created user Try Again!");
        }
      );
    };

    //Update User
    $scope.updatephoto = function(photo) {
      //$http PUT function
      $http({
        method: "PUT",
        url: "https://jsonplaceholder.typicode.com/photos/" + photo.id,
        data: $scope.photo
      }).then(
        function successCallback(response) {
          $scope.photos.push(response.data);
          alert("User has updated Successfully");
        },
        function errorCallback(response) {
          alert("Error. while updating user Try Again!");
        }
      );
    };

    //Delete User
    $scope.deletephoto = function(photo) {
      //$http DELETE function
      $http({
        method: "DELETE",
        url: "https://jsonplaceholder.typicode.com/photos/" + photo.id
      }).then(
        function successCallback(response) {
          var index = $scope.photos.indexOf(photo);
          $scope.photos.splice(index, 1);
          alert("User has deleted Successfully");
        },
        function errorCallback(response) {
          alert("Error. while deleting user Try Again!");
        }
      );
    };

    //Set $scope on Edit button click
    $scope.editphoto = function(photo) {
      $scope.photo = photo;
      $scope.submit = false;
      $scope.update = true;
      $scope.cancel = true;
      $scope.userid = false;
    };

    //cancel Uodate
    $scope.cancelUpdate = function() {
      $scope.photo = null;
      $scope.submit = true;
      $scope.update = false;
      $scope.cancel = false;
      $scope.userid = true;
    };

    //////////////////Shortcut methods for $http//////

    //$http GET
    //$http.get('https://jsonplaceholder.typicode.com/users', function successCallback(response) {
    //
    //  alert("User has updated Successfully")
    //
    //}, function errorCallback(response) {
    //
    //  alert("Error. while updating user Try Again!");
    //
    //});

    //$http POST
    //$http.post('https://jsonplaceholder.typicode.com/users', $scope.user, function successCallback(response) {
    //
    //  $scope.users.push(response.data);
    //alert("User has created Successfully")
    //
    //}, function errorCallback(response) {
    //
    //  alert("Error. while created user Try Again!");
    //
    //});

    //$http PUT
    //$htp.put('https://jsonplaceholder.typicode.com/users/' + $scope.user.id, $scope.user, function successCallback(response) {
    //
    //  alert("User has updated Successfully")
    //
    //}, function errorCallback(response) {
    //
    //  alert("Error. while updating user Try Again!");
    //
    //});

    //$http DELETE
    //$http.delete('https://jsonplaceholder.typicode.com/users/' + user.id, function successCallback(response) {
    //
    //  alert("User has deleted Successfully");
    //var index = $scope.users.indexOf(user);
    //$scope.users.splice(index, 1);
    //
    //  }, function errorCallback(response) {
    //
    //  alert("Error. while deleting user Try Again!");
    //
    //  });
  }
]);
