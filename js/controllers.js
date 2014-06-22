var myApp = angular.module('myApp', []);

myApp.controller('DataCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$scope.data = [];
		$scope.reloader = {
			"icon": "fa fa-refresh fa-spin",
			"currentStep": 0,
			"totalSteps": 99
		};


		$scope.siteSummary = function(){
			$scope.data = [];
			$scope.reloader.icon = "fa fa-refresh fa-spin";
			$scope.reloader.currentStep = 0;

			for (var index in $scope.urls){
				(function(index){
					$http.get('http://fourtonfish.com/sitesummary?url=' + $scope.urls[index] + '&social=true').success(function(data) {
							if (!data.image){
								data.image = 'http://fourtonfish.com/1px.png';
							}

							$scope.data.push({
								"url": $scope.urls[index].replace(/http(s)?:\/\//, "").replace(/\/*$/, ""),
								"data": data
							});
						$scope.reloader.currentStep++;
						if ($scope.reloader.currentStep === $scope.reloader.totalSteps){
							$scope.reloader.icon = "fa fa-refresh";
						}
					});
				})(index);
			}
		};

		$http.get('urls.txt').success(function(data) {
			$scope.urls = data.split('\n');
			$scope.siteSummary();

			$scope.reloader = {
				"icon": "fa fa-refresh",
				"currentStep": 0,
				"totalSteps": $scope.urls.length
			};
		});
}]);

myApp.directive("scrolltotop", function(){
	return function(scope, element, attrs){
		element.bind("click", function(element){
			element.preventDefault();
			$('html,body').animate({
				 scrollTop: 0
			}, 700);
			return false;
		});
	};
});
