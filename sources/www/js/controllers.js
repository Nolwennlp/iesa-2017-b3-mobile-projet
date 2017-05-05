angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicPopup, $cordovaMedia, $cordovaStatusbar) {
        $ionicPlatform.ready(function () {
            $cordovaStatusbar.show();

            var isAndroid = ionic.Platform.is('android');
            $scope.invitePeople=function(){
                $ionicPopup.alert({
                    title: 'Contact',
                    template: 'Select someone to share the game with'
                });
            };

            var src = null;
            var media = null;

            $scope.music_one = function(){
                src = "js/mario.mp3";
                media = $cordovaMedia.newMedia(src);

                var iOSplayoption = {
                    numberOfLoops: 1,
                    playAudioWhenScreenIsLocked : false
                };

                if(isAndroid){
                    media.play();
                }
                else
                {
                    media.play(iOSplayoption).then(function () {
                        alert('played');
                    }, function(error){
                        alert(error);
                    });
                }
            };

            $scope.music_two = function(){
                src = "js/pokemon.mp3";
                media = $cordovaMedia.newMedia(src);

                var iOSplayoption = {
                    numberOfLoops: 2,
                    playAudioWhenScreenIsLocked : false
                };

                if(isAndroid){
                    media.play();
                }
                else{
                    media.play(iOSplayoption).then(function () {
                        alert('played');
                    }, function(error){
                        alert(error);
                    });
                }
            };

            $scope.stop = function(){
                media.stop();
            };

            $ionicPlatform.on('pause',function(){
                media.stop();
            })
        })
    })

    .controller('GeoCtrl',function($scope, $cordovaGeolocation, $ionicPopup, $ionicPlatform){
        $scope.centerOnMe = function () {
            $ionicPlatform.ready(function () {
                $cordovaStatusbar.show();

                var posOptions = {timeout: 10000, enableHighAccuracy: true};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        console.log('latitude : '+lat);
                        console.log('Longitude : '+long);
                        console.log(position);

                        alert('Latitude :'+ lat +' Longitude : '+long);

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
        $ionicPlatform.ready(function () {
            $cordovaStatusbar.styleHex('#6BF672');


            $cordovaContacts.find({multiple:true}).then(function(allContacts) {
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

    .controller('ProfilCtrl', function (Joueur, $scope, $cordovaStatusbar) {
        $cordovaStatusbar.styleHex('#F6DF6B');
        $scope.joueur = Joueur.all();
    })

    .controller('SuggestCtrl', function ($scope,$cordovaStatusbar){
        $cordovaStatusbar.hide();
        alert('propose');

        var propositions = firebase.database().ref("propositions");
        propositions.on('value',function (snap) {
            $scope.totalProp = [];
            for( var m in snap.val()){
                var res = snap.val()[m];
                console.log(res);

                $scope.totalProp.push(res);
            }
            console.log($scope.totalProp);
        })

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
