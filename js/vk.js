var vk = angular.module('vk', ['ngRoute', 'ngResource', 'ngSanitize']);

/* Routes */
vk.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // Make routes
    $routeProvider
        // My Profile
        .when('/', {
            templateUrl: 'templates/profile.html',
            controller: 'Default'
        })
        .when('/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'Default'
        })
        // Friends
        .when('/friends', {
            templateUrl: 'templates/friends.html',
            controller: 'Friends'
        })
        // Friend Page
        .when('/profile/:id', {
            templateUrl: 'templates/friend.html',
            controller: 'Friend'
        })
        // Photo
        .when('/photo', {
            templateUrl: 'templates/photo.html',
            controller: 'Photo'
        })
        // Album
        .when('/album/:id', {
            templateUrl: 'templates/album.html',
            controller: 'Album'
        })
        // Video
        .when('/video', {
            templateUrl: 'templates/video.html',
            controller: 'Video'
        })
        // Music
        .when('/music', {
            templateUrl: 'templates/music.html',
            controller: 'Music'
        })
        // IM
        .when('/im', {
            templateUrl: 'templates/im.html',
            controller: 'IM'
        })
        // Groups
        .when('/groups', {
            templateUrl: 'templates/groups.html',
            controller: 'Groups'
        })
        // Group by ID
        .when('/group/:id', {
            templateUrl: 'templates/group.html',
            controller: 'Group'
        })
        // News
        .when('/news', {
            templateUrl: 'templates/news.html',
            controller: 'News'
        })
        // Bookmarks
        .when('/bookmarks', {
            templateUrl: 'templates/bookmarks.html',
            controller: 'Bookmarks'
        })
        // Settings
        .when('/settings', {
            templateUrl: 'templates/settings.html',
            controller: 'Settings'
        });
        //.otherwise({redirectTo: '/'});
}]);

vk.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://*.vk.me/**', 'http://*.vk.com/**', 'http://vk.com/**', 'http://rutube.ru/**', 'http://*.youtube.com/**']);
  });

/* Controllers */
vk.controller('Default', function ($scope) {

    $scope.menuName = [
        {"ru": "Моя Страница", "en": "My Profile", "url": "#/profile"},
        {"ru": "Мои Друзья", "en": "My Friends", "url": "#/friends"},
        {"ru": "Мои Фотографии", "en": "My Photos", "url": "#/photo"},
        {"ru": "Мои Видеозаписи", "en": "My Videos", "url": "#/video"},
        {"ru": "Мои Аудиозаписи", "en": "My Music", "url": "#/music"},
        {"ru": "Мои Сообщения", "en": "My Messages", "url": "#/im"},
        {"ru": "Мои Группы", "en": "My Communities", "url": "#/groups"},
        {"ru": "Мои Новости", "en": "My News", "url": "#/news"},
        {"ru": "Мои Закладки", "en": "My Bookmarks", "url": "#/bookmarks"},
        {"ru": "Мои Настройки", "en": "My Settings", "url": "#/settings"}
    ];

    $scope.specialNames = {
        "phone": {"ru": "Телефон", "en": "Phone"},
        "groups": {"ru": "Группы", "en": "Groups"},
        "friends": {"ru": "Друзья", "en": "Friends"},
        "photosInAlbum": {"ru": "Фотографий в альбоме", "en": "Photos in album"}
    };

});

vk.controller('Profile', function ($scope, $http) {

    $http
        .jsonp(baseUrl('wall.get', '&count=50&filter=all&extended=1'))
        .success(function (data) {
            $scope.profilePostCounter = data.response.wall[0];
            $scope.profileWall = data.response.wall.slice(1);
            $scope.profileGroups = data.response.groups;
            $scope.profilePeople = data.response.profiles;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

    $scope.insertAttach = function (type, obj) {

        var result,
            src,
            srcBig;

        switch (type) {

            case 'photo':
                src = obj.photo.src;
                srcBig = obj.photo.src_big;
                result =
                    '<a href="' + srcBig + '" ' + 'class="b-wall__attach-photo-link">' +
                        '<img src="' + src + '" class="b-wall__attach-photo" />' +
                    '</a>';
                return result;
                break;
        }

    };

});

vk.controller('Friends', function ($scope, $http) {

    var callback = function (data) {

        $scope.friends = data.response;

    };

    $http
        .jsonp(baseUrl('friends.get', '&fields=uid,first_name,last_name,nickname,sex,bdate,city,country,timezone,photo_medium,photo_big,domain,has_mobile,rate,contacts'))
        .success(function (data) {
            callback(data);
            console.log(data);
        })
        .error(function (err) {
            console.log(err);
        });

});

vk.controller('Friend', function ($scope) {

});

vk.controller('Photo', function ($scope, $http) {

    $http
        .jsonp(baseUrl('photos.getAlbums', '&need_covers=1'))
        .success(function (data) {
            $scope.albums = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

});

vk.controller('Album', function ($scope, $http, $routeParams) {

    $http
        .jsonp(baseUrl('photos.get', '&aid=' + $routeParams.id))
        .success(function (data) {
            $scope.album = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

});

vk.controller('Video', function ($scope, $http) {

    $http
        .jsonp(baseUrl('video.get', '&count=30'))
        .success(function (data) {
            $scope.videos = data.response.slice(1);
            console.log(data);
        })
        .error(function (err) {
            console.log(err);
        });

});

vk.controller('Music', function ($scope, $http) {
    $http
        .jsonp(baseUrl('audio.get', '&count=300'))
        .success(function (data) {
            $scope.tracks = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log(err);
        });
});

vk.controller('IM', function ($scope, $http) {

    $http
        .jsonp(baseUrl('messages.get', '&count=50&filters=4'))
        .success(function (data) {
            $scope.im = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log(err);
        });

});

vk.controller('Groups', function ($scope, $http) {
    $http
        .jsonp(baseUrl('groups.get', '&extended=1&fields=country,description,members_count,counters'))
        .success(function (data) {
            $scope.groups = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log(err);
        });

    $scope.pageType = function (type) {
        switch (type) {

            case 'page':
                return 'Страница';
                break;
            case 'group':
                return 'Группа';
                break;
            case 'event':
                return 'Мероприятие';
                break;
            default:
                return 'Страница';
                break;

        }
    };

});

vk.controller('Group', function ($scope, $http, $routeParams) {

    $http
        .jsonp(baseUrl('', 'owner_id=' + $routeParams.id + '&filter=all&extented=1'))
        .success(function (data) {
            $scope.groupWall = data.response;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

});

vk.controller('News', function ($scope) {

});

vk.controller('Bookmarks', function ($scope) {

});

vk.controller('Settings', function ($scope) {

});

vk.directive('bPlayer', function () {

    return {
        restrict: 'C',

        link: function (scope, elem, attrs) {

            var getElem = function (selector) {
                return document.querySelector(selector);
            };

            var tracklist = getElem('.b-player__list');

            var controls = {
                title: getElem('.b-player__track-title'),
                minimize: getElem('.b-player__minimize'),
                prev: getElem('.b-player__controls-prev'),
                play: getElem('.b-player__controls-play'),
                next: getElem('.b-player__controls-next'),
                mute: getElem('.b-player__controls-mute'),
                audio: getElem('.b-player__audio')
            };

            var tmpVolume = controls.audio.volume,
                listStatus = true;

            var changeTrack = function (direction) {

                var current = getElem('.b-player__item_state_active'),
                    next;

                if (current) {
                    current.classList.toggle('b-player__item_state_active')
                }

                if (direction === 'prev') {
                    next = current.previousElementSibling;
                } else {
                    next = current.nextElementSibling;
                }

                next.classList.toggle('b-player__item_state_active');

                controls.audio.src = next.dataset.url;
                controls.audio.play();

                var title = 'Now playing',
                    options = {
                        icon: 'img/icon.png',
                        body: next.dataset.artist + ' - ' + next.dataset.title
                    };


                if (Notification.permission === "granted") {
                    var notification = new Notification(title, options);
                    setTimeout(function () {
                        notification.close();
                    }, 5000);
                }

            };

            var mute = function () {
                if (controls.audio.volume !== 0) {
                    controls.audio.volume = 0;
                } else {
                    controls.audio.volume = tmpVolume;
                }
                return this;
            };

            controls.play.addEventListener('click', function () {
                if (controls.audio.paused) {
                    controls.audio.play();
                } else {
                    controls.audio.pause();
                }
            }, false);

            controls.audio.addEventListener('ended', function () {
                changeTrack('next');
            });

            controls.prev.addEventListener('click', function () {
                changeTrack('prev');
            }, false);

            controls.next.addEventListener('click', function () {
                changeTrack('next');
            }, false);

            controls.mute.addEventListener('click', function () {
                mute();
                this.classList.toggle('b-player__controls-mute_on')
            }, false);

            controls.minimize.addEventListener('click', function () {
                tracklist.style.display = (listStatus) ? 'none' : 'block';
                listStatus = !listStatus;
            }, false);

        }
    }

});

vk.directive('bPlayerItem', function () {

    return {
        restrict: 'C',
        link: function (scope, elem, attrs) {

            var getElem = function (selector) {
                return document.querySelector(selector);
            };

            var player = getElem('.b-player__audio'),
                playerTitle = getElem('.b-player__track-title'),
                active = function () {
                    return document.querySelector('.b-player__item_state_active');
                };

            elem[0].addEventListener('click', function () {

                player.pause();
                player.src = this.dataset.url;
                player.play();

                playerTitle.textContent = this.dataset.title;

                var nowPlaying = active();

                if (nowPlaying) {
                    nowPlaying.classList.toggle('b-player__item_state_active');
                }

                this.classList.add('b-player__item_state_active');

                var title = 'Now playing',
                    options = {
                        icon: 'img/icon.png',
                        body: this.dataset.artist + ' - ' + this.dataset.title
                    };


                if (Notification.permission === "granted") {
                    var notification = new Notification(title, options);
                    setTimeout(function () {
                        notification.close();
                    }, 5000);
                }

            });

        }
    }
});

vk.directive('bPlayerControlsProgress', function () {

    return {
        restrict: 'C',

        link: function (scope, elem, attrs) {

            var progress = elem[0],
                player = document.querySelector('.b-player__audio');

            var getNormalDuration = function (data) {

                var dirtyTime = data || player.duration,
                    seconds = parseInt(dirtyTime),
                    minutes = parseInt(seconds / 60);

                return {
                    minutes: (function () {
                        if (minutes < 10) {
                            return '0' + minutes;
                        }
                        return minutes;
                    }()),
                    seconds: (function () {
                        if ((seconds - minutes * 60) < 10) {
                            var t = seconds - minutes * 60;
                            return '0' + t;
                        }
                        return seconds - minutes * 60;
                    }())
                };
            };

            var updateProgressbar = function () {
                progress.value = Math.floor((100 / player.duration) * player.currentTime);
            };

            var goToPosition = function (percents) {
                player.currentTime = parseInt((percents / 100) * player.duration);
            };

            // Update progress bar
            player.addEventListener('timeupdate', function () {
                updateProgressbar();
            }, false);

            // Change video position by click on progress bar
            progress.addEventListener('click', function (e) {
                var coords = Math.floor((100 / this.offsetWidth) * e.offsetX);

                goToPosition(coords);
                this.value = coords;

                if (player.paused) {
                    player.play();
                }
            }, false);

        }
    }

});

vk.directive('bFancybox', function () {
    return {
        restrict: 'C',
        link: function (scope, elem, attrs) {
            $('.b-fancybox').fancybox({
                padding: 0
            });
        }
    }
});

var baseUrl = function (method, parameters) {
  return 'https://api.vk.com/method/' + method + '?' + 'uid=' + id + parameters + '&access_token=' + window.token + '&callback=JSON_CALLBACK';
};
