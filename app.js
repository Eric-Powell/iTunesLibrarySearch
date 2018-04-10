var app = angular.module('AlbumFinder', []);

app.service('iTunesService', function($http) {
	return function(artist) {
  	var API_BASE = 'https://itunes.apple.com/search?entity=album&term=ARTIST_NAME';
  
    return $http({
      method: 'GET',
      url: API_BASE,
      params: {term: artist}
    }).then(function(res) {
      return res.data;
    }).catch(function(res) {
      console.error('Error occured on call to API: ', res.status, res.data); 
    });
  }  
});

app.controller('AlbumsController', function($scope, iTunesService) {
	$scope.searchPhrase = "";
  $scope.noGrid = false;
  $scope.searchError = false;
  
  $scope.search = function() {
    iTunesService($scope.searchPhrase).then(function(searchResults) {    	
      if (!searchResults.results.length) {
      	$scope.noGrid = false;
      	$scope.searchError = true;
      } else {
      	$scope.noGrid = true;
      	$scope.searchError = false;
      }
      
      $scope.searchResults = searchResults.results;
      
    }).catch(function(error) {
      console.error('Oops something went wrong, here is the error: ', error)
    })    
  };  
});
