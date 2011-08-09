// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');



// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Video',
    backgroundColor:'#fff',
    barColor:'black',
    url:'main.js'
});





var tab1 = Titanium.UI.createTab({  
    icon:'images/clapboard.png',
	title:'Video',
	window:win1
});



var win2 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff',
    barColor:'black',
  	url:'settings.js',
});

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
