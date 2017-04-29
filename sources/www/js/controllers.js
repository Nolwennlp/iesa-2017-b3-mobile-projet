angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicPopup) {
        $scope.invitePeople=function(){
            $ionicPopup.alert({
                title: 'Contact',
                template: 'Select someone to share the game with'
            });
        }
    })

    .controller('InviteCtrl',function ($scope, $cordovaContacts, $cordovaSms, $ionicPopup, $cordovaStatusbar) {
        // $cordovaContacts.find({multiple:true}).then(function(allContacts) {
        //         $scope.consoleContacts = JSON.stringify(allContacts);
        //         $scope.contacts = allContacts;
        //     }
        // );

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log(StatusBar);
            StatusBar.hide();
        }

        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                // intent: '' // send SMS with the native android SMS messaging
                // intent: '' // send SMS without open any other app
                intent: 'INTENT' // send SMS inside a default SMS app
            }
        };

        $scope.sendsms = function(){
            var promptPopup = $ionicPopup.prompt({
                title: 'Votre message',
                template: 'Ecrivez un message',
                inputType: 'text'
            });

            promptPopup.then(function(res) {
                console.log(res);
            }).then(function (res) {
                $cordovaSms.send('0677293397',res).then(function(){
                    console.log('bien vu');
                })
            })

            // $cordovaSms.send('0677293397', 'Hello', options)
            //     .then(function() {
            //         // Success! SMS was sent
            //         $ionicPopup.alert({
            //             title:'succes',
            //             template:'succes'
            //         });
            //     }, function(error) {
            //         // An error occurred
            //         $ionicPopup.alert({
            //             title:'Fail',
            //             template:'Fail'
            //         });
            //     });
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
