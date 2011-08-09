// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var myApp = {};

Ti.include(
	'lib/utils.js',
	'lib/functions.js'
);


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Video',
    backgroundColor:'#fff',
    barColor:'black'
});
win1.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
]; 



var b_AddVideo = Titanium.UI.createButton({title:'New Video'});
b_AddVideo.addEventListener('click', function()
{
	myApp.camera();
});

win1.rightNavButton = b_AddVideo;
win1.add(myApp.getVideoList());


var tab1 = Titanium.UI.createTab({  
    icon:'images/clapboard.png',
	title:'Video',
	window:win1
});







var win2 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff',
    barColor:'black'
});
win2.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
]; 
var tab2 = Titanium.UI.createTab({  
    icon:'images/preferences.png',
    title:'Settings',
    window:win2
});



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
