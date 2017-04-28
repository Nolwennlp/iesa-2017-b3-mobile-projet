angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicPopup) {
        $scope.invitePeople=function(){
            $ionicPopup.alert({
                title: 'Contact',
                template: 'Select someone to share the game with'
            });
        }
    })

    .controller('InviteCtrl',function ($scope, $cordovaContacts, $cordovaSms) {
        $cordovaContacts.find({multiple:true}).then(function(allContacts) {
                $scope.consoleContacts = JSON.stringify(allContacts);
                $scope.contacts = allContacts;
            }
        );
        $scope.sendsms=function()

        {
            document.addEventListener("deviceready", function () {
                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT' // send SMS with the native android SMS messaging
                        intent: '' // send SMS without open any other app
                    }
                };

                $cordovaSms
                    .send('0677293397', 'SMS content', options)
                    .then(function() {
                        alert("sent");
                    }, function(error) {
                        alert("can't sent");
                    });
            });

        }

    })
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
