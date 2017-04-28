angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })
    .controller('IonicAppCtrl', function ($scope) {
    })


    .controller('UserlistCtrl', function ($scope) {
        $scope.userlist = ['Ilyace', 'Nolwenn', 'NW', 'NB'];
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });

module.controller('ContactCtrl', function ($scope, $cordovaContacts, $ionicPlatform) {
    $scope.addContact = function () {
        $cordovaContacts.save($scope.contactForm).then(function (result) {
            // Contact saved
        }, function (err) {
            // Contact error
        });
    };

    $scope.getAllContacts = function () {
        $cordovaContacts.find().then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
            $scope.contacts = allContacts;
        })
    };


    $scope.findContactsBySearchTerm = function (searchTerm) {
        var opts = {                                           //search options
            filter: searchTerm,                                 // 'Bob'
            multiple: true,                                      // Yes, return any contact that matches criteria
            fields: ['displayName', 'name'],                // These are the fields to search for 'bob'.
            desiredFields: [id]    //return fields.
    }

        if ($ionicPlatform.isAndroid()) {
            opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
        }

        $cordovaContacts.find(opts).then(function (contactsFound) {
            $scope.contacts = contactsFound;
        })
    }


    });
