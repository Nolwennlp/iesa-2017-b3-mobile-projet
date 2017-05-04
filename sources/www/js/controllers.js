angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicPopup) {
        $scope.invitePeople=function(){
            $ionicPopup.alert({
                title: 'Contact',
                template: 'Select someone to share the game with'
            });

            $scope.getCallPermission = function() {
                                    cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function(status) {
                                        switch (status) {
                                            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                                                break;
                                            case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                                                $scope.setPhonePermission();
                                                break;
                                            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                                                $scope.setPhonePermission();
                                                break;
                                            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                                                $scope.setPhonePermission();
                                                break;
                                        }
                                    }, function(error) {}, cordova.plugins.diagnostic.runtimePermission.CALL_PHONE);
                                };
                                $scope.setPhonePermission = function() {
                                            cordova.plugins.diagnostic.requestRuntimePermission(function(status) {
                                                switch (status) {
                                                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                                                        break;
                                                    case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                                                        break;
                                                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                                                        break;
                                                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                                                        break;
                                                }
                                            }, function(error) {}, cordova.plugins.diagnostic.runtimePermission.CALL_PHONE);
                                        };

        }


    })

    .controller('GeoCtrl',function($scope, $cordovaGeolocation, $ionicPopup, $ionicPlatform){
        $scope.$on('$ionicView.enter', function() {
                var isAndroid = ionic.Platform.isAndroid();
                if (isAndroid) {
                    $scope.getCallPermission();
                    $ionicPopup.alert({
                        title:'testPerm',
                        template:'android'
                    });

                }
                else
                {
                    $ionicPopup.alert({
                        title:'testPermi',
                        template:'not android'
                    });
                }
        });

        $scope.centerOnMe = function () {
            $ionicPlatform.ready(function () {
                $ionicPopup.alert({
                    title:'test',
                    template:'debut'
                });
                var posOptions = {timeout: 10000, enableHighAccuracy: true};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        console.log('latitude : '+lat);
                        console.log('Longitude : '+long);
                        console.log(position);
                        var myLatlng = new google.maps.LatLng(lat,long);

                        var mapOptions = {
                            center: myLatlng,
                            zoom: 17,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                        $scope.map = map;
                        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                title:"Hello World!",
                                map: $scope.map
                            });
                            var infoWindow = new google.maps.InfoWindow({
                                content: "Here I am!"
                            });
                            google.maps.event.addListener(marker, 'click', function () {
                                infoWindow.open($scope.map, marker);
                            });
                        });
//                        marker.setMap(map);

                        $ionicPopup.alert({
                            title:'fin',
                            template:'fini'
                        });

                    }, function(err) {
                        $ionicPopup.alert({
                            title:'erreur',
                            template: JSON.stringify(err)
                        });
                        console.log(err);
                    });
            })
        }
    })

    .controller('InviteCtrl',function ($scope, $cordovaContacts, $cordovaSms, $ionicPopup, $cordovaStatusbar, $ionicPlatform) {
        var isAndroid = ionic.Platform.isAndroid();
            if (isAndroid) {
                $ionicPopup.alert({
                        title:'testPerm',
                        template:'android'
                });
                $scope.getCallPermission();
            }
            else
            {
                $ionicPopup.alert({
                    title:'testPermi',
                    template:'not android'
                });
            }

        $ionicPlatform.ready(function () {
            // StatusBar.hide();

            $cordovaContacts.find({multiple:true}).then(function(allContacts) {
                    $scope.consoleContacts = JSON.stringify(allContacts);
                    $scope.contacts = allContacts;
                }
            );

            $scope.sendTextMsg = function (name, phoneNumber) {

                alert(name + ' : '+ phoneNumber);

                var options = {
                    replaceLineBreaks: false,
                    android: {
                        intent: ''
                    }
                };

                var content = 'Salut '+name+' ! Rejoins l\'aventure et aide-moi à résoudre le Schmilblick !';

                alert("voici le contenu: "+content);

                $cordovaSms.send(phoneNumber, content, options).then(function () {
                    alert('Votre message a été envoyé!');
                }, function(error){
                    alert(error);
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
