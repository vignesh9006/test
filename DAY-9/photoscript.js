// Code goes here
var myApp = angular.module('myApp', []);
myApp.controller('studentController', ['$scope', '$http', function ($scope, $http) {

    //Buttons Settings
    $scope.submit = true;
    $scope.update = false;
    $scope.cancel = false;
    $scope.photoid = true;
    $scope.startno = 0;
    $scope.endno = 8;
    $scope.reverse = false;

    //Getting Users List
    //$http GET function
    //fetch(ULR).then(result=>result.json()).then(json=>console.log(json))
    getPhotodata();

    function getPhotodata() {
        $http({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/photos?_start=` + $scope.startno + `&_limit=8`
    
        }).then(function successCallback(response) {
    
            $scope.photos = response.data;
    
        }, function errorCallback(response) {
    
            alert("Error. Try Again!");
    
        });
    }

    $scope.searchByName = function () {
        var searchTitle = document.getElementById("searchVal").value;
        var photoID = 0;
        console.log('Search title ', $scope.photos.length);
        for (i = 0; i < $scope.photos.length; i++) {
            //console.log('Search title ', $scope.photos.length);
            if ($scope.photos[i].title == searchTitle) {
                
                photoID = $scope.photos[i].id;
                
                getSearchdata(photoID);
            }
        }

    }

    function getSearchdata(photoID) {
        // console.log("Hai", photoID);
        var url = "https://jsonplaceholder.typicode.com/photos/"+ photoID;
        console.log("url", url);
        $http({
            method: 'GET',
            url: url
    
        }).then(function successCallback(response) {
            var result = Object.keys(response.data).map((key) => [Number(key), response.data[key]]);

            console.log(result);
    
            $scope.photos = response.data;
    
        }, function errorCallback(response) {
    
            alert("Error. Try Again!");
    
        });
    }

    $scope.nextPhotos = function () {

        $scope.startno = $scope.startno + 8;
        $scope.endno = $scope.endno + 8;

        console.log($scope.startno,'-',$scope.endno);

        getPhotodata();

    };

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };

    $scope.prevPhotos = function () {
        if ($scope.startno > 7) {
            $scope.startno = $scope.startno - 8;
            $scope.endno = $scope.endno - 8;

            getPhotodata();
        }

    };

    //Create New createPhoto
    $scope.createPhoto = function () {

        //$http POST function
        $http({

            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/photos',
            data: $scope.photo

        }).then(function successCallback(response) {

            $scope.photos.push(response.data);
            alert("Photo has added Successfully")

        }, function errorCallback(response) {

            alert("Error. while added photo Try Again!");

        });

    };


    //Update Photo
    $scope.updatePhoto = function () {

        console.log($scope.photo.id);
        //$http PUT function
        $http({

            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/photos/' + $scope.photo.id,
            data: $scope.photo

        }).then(function successCallback(response) {

            alert("Photo has updated Successfully")

        }, function errorCallback(response) {

            alert("Photo has updated Successfully");
            for (i = 0; i < photos.length; i++) {
                if (photos[i].id == $scope.photo.id) {
                    $scope.photos[i].id = $scope.photo.id;
                    $scope.photos[i].name = $scope.photo.name;
                    console.log('search users :: ', photo[i]);

                    alert("photo has updated Successfully");
                }
            }

            alert("Error. while updating photos Try Again!");

        });

    };


    //Delete photos
    $scope.deletePhoto = function (photo) {

        //$http DELETE function
        $http({

            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/photos/' + photo.id

        }).then(function successCallback(response) {

            alert("Photo has deleted Successfully");
            var index = $scope.photos.indexOf(photo);
            $scope.photos.splice(index, 1);

        }, function errorCallback(response) {


            alert("Error. while deleting photo Try Again!");

        });

    };

    //Set $scope on Edit button click
    $scope.editPhoto = function (photo) {

        $scope.photo = photo;
        $scope.submit = false;
        $scope.update = true;
        $scope.cancel = true;
        $scope.photoid = false;

    };


    //cancel Uodate
    $scope.cancelUpdate = function () {
        $scope.photo = null;
        $scope.submit = true;
        $scope.update = false;
        $scope.cancel = false;
        $scope.photoid = true;
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

    


}]);