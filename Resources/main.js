var win = Titanium.UI.currentWindow;

win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
]; 
var myApp = {};

var db = Titanium.Database.open('mydb');
db.execute('CREATE TABLE IF NOT EXISTS videos (vid INTEGER PRIMARY KEY, nome TEXT,  data DATETIME DEFAULT CURRENT_TIMESTAMP, uploaded INTEGER)');
db.execute('CREATE TABLE IF NOT EXISTS settings (name TEXT,  value TEXT');
db.close();

Ti.include(
	'lib/utils.js',
	'lib/functions.js'
);



var b_AddVideo = Titanium.UI.createButton({title:'New Video'});
b_AddVideo.addEventListener('click', function()
{
	myApp.camera();
});

win.rightNavButton = b_AddVideo;
win.add(myApp.getVideoList());