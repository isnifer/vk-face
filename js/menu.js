var gui = require('nw.gui');

var menu = new gui.Menu({'type': 'menubar'});

menu.append(new gui.MenuItem({ label: 'Пункт А' }));
menu.append(new gui.MenuItem({ label: 'Пункт Б' }));
menu.append(new gui.MenuItem({ label: 'Пункт В' }));

gui.Window.get().menu = menu;