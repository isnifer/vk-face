var gui = require('nw.gui');
var win = gui.Window.get();

var appId = '4126371';
var appSecret = 'oh5IjOwseEXgXTmMMjnr';
var redirectUri = 'https://oauth.vk.com/blank.html';
var permissions = 'friends,photos,audio,video,docs,notes,pages,status,wall,groups,messages,notifications,offline';

var getCode = gui.Window.get(
    window.open(
        'https://oauth.vk.com/authorize?' +
            'client_id=' + appId + '&' +
            'scope=' + permissions + '&' +
            'redirect_uri=' + redirectUri + '&' +
            'display=page&' +
            'v=5.5&' +
            'response_type=token'
    )
);

getCode.on('close', function () {

    var code = getCode.window.location.hash;
    window.token = code.substring(code.indexOf('=') + 1, code.indexOf('&'));
    window.id = code.substring(code.indexOf('user_id=') + 8, code.length);
    console.log('Window is closing...');
    this.hide();
    this.close(true);

});