angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('HomeCtrl',function ($scope,$ionicLoading,$state) {
    $scope.search = function(){
        $ionicLoading.show({
            template:"Please wait...",
            duration: 1000
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
        $state.go('contact');
    }
})

.controller('ContactCtrl',function($scope, $cordovaContacts){
    $scope.getContactList = function() {
        $cordovaContacts.find({filter: ''}).then(function(result) {
            $scope.contacts = result;
            console.log("huhuhu");
        }, function(error) {
            console.log("ERROR: " + error);
        });
    }
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
