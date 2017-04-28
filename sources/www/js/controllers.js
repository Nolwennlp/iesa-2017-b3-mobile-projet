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


        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the default SMS app
                //intent: ''        // send SMS without open any other app
            }
        }


        $scope.sms = {
            number: '',
            message: 'Rejoins moi sur le Schmilbrick'
        };
        document.addEventListener("deviceready", function() {
            $scope.sendSMS = function () {
                alert(sms.number);
                alert(sms.message);
                $cordovaSms
                    .send('0677293397', 'sms.message', options)
                    .then(function () {
                        alert('Success');
                    }, function (error) {
                        alert('Error');
                    });
            }
        });
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
