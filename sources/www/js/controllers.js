angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicPopup) {
        $scope.invitePeople=function(){
            $ionicPopup.alert({
                title: 'Contact',
                template: 'Select someone to share the game with'
            });
        }
    })

    .controller('GeoCtrl',function($scope, $cordovaGeolocation, $ionicPopup, $ionicPlatform){
        $ionicPopup.alert({
            title:'test',
            template:'debut'
        });
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log('latitude : '+lat);
                console.log('Longitude : '+long);
                console.log(position);

                $ionicPlatform.ready(function() {
                    var myLatlng = new google.maps.LatLng(lat,long);

                    var mapOptions = {
                        center: myLatlng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    $scope.map = map;

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        title:"Hello World!"
                    });
                    marker.setMap(map);

                    $ionicPopup.alert({
                        title:'fin',
                        template:'fini'
                    });
                });


            }, function(err) {
                $ionicPopup.alert({
                    title:'erreur',
                    template: err
                });
                console.log(err);
            });
    })

    .controller('InviteCtrl',function ($scope, $cordovaContacts, $cordovaSms, $ionicPopup, $cordovaStatusbar, $ionicPlatform) {
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

        $scope.sendsms = function(){
            $ionicPlatform.ready(function () {

                var options = {
                    replaceLineBreaks: false,
                    android:{
                        intent : 'INTENT',
                        // intent : ''
                    }
                };
                $cordovaSms.send('0677293397','This is a test sms', options).then(function(){
                    alert("success! sms was sent");
                },function(error){
                    console.log(error);
                    alert('Error sending sms!');
                    console.log(error);

                });
            })
        };
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
