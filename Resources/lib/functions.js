(function() {
	
	myApp.camera = function (_args){ 
		
			Titanium.Media.showCamera({
	
				success:function(event)
				{
					var d=new Date();
					var filename = 'video-'+d.getTime();
					var video = event.media;
					movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
					movieFile.write(video);
					
					var db = Titanium.Database.open('mydb');
					db.execute('INSERT INTO videos (nome, uploaded) VALUES(?,?)', filename, 0);
					db.close();
					myApp.uploadDialog(filename);

				},
				cancel:function()
				{
	
				},
				error:function(error)
				{
					// create alert
					var a = Titanium.UI.createAlertDialog({title:'Video'});
	
					// set message
					if (error.code == Titanium.Media.NO_VIDEO)
					{
						a.setMessage('Device does not have video recording capabilities');
					}
					else
					{
						a.setMessage('Unexpected error: ' + error.code);
					}
	
					// show alert
					a.show();
				},
				mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
				videoMaximumDuration:600000,
				videoQuality:Titanium.Media.QUALITY_HIGH,
			});
	};
	
	myApp.uploadDialog = function(nomevideo){
			var style = Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL;
			var presentation = Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET;
			var w = Ti.UI.createWindow({
				backgroundColor:'white'
			});
			
			var l_Video = Titanium.UI.createLabel({
				top:10,
				left:10,
				width:50,
				height:35,
				font:{fontSize:18, fontWeight:'bold'},
				text:'Video'
			});
			var Video = Titanium.UI.createTextField({
				height:35,
				top:10,
				left:60,
				width:200,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
				value:nomevideo,
				font:{fontSize:20, fontWeight:'bold'},
				color:'#888',
				editable:false
			});
	
			w.add(l_Video);
			w.add(Video);
			
			
			var l_Params = Titanium.UI.createLabel({
				text:'Parametri',
				font:{fontSize:18, fontWeight:'bold'},
				left:10,
				top:50,
				width:300,
				height:'auto'
			});
			w.add(l_Params);
			
			
			var ta1 = Titanium.UI.createTextArea({
				editable: true,
				value:'nomeparam1=valore1;nomeparam2=valore2',
				height:200,
				width:300,
				top:80,
				font:{fontSize:20, fontWeight:'bold'},
				color:'#888',
				textAlign:'left',
				appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
				keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
				returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
				borderWidth:2,
				borderColor:'#bbb',
				borderRadius:5,
				suppressReturn:false
				
			});
			w.add(ta1);


			var b = Ti.UI.createButton({
				title:'Chiudi',
				width:100,
				height:30,
				top:400,
				left:50
			});
			b.addEventListener('click',function()
			{
				w.close();
			});
			
			var u = Ti.UI.createButton({
				title:'Upload',
				width:100,
				height:30,
				top:400,
				left:200,
			});
			u.addEventListener('click',function()
			{
				alert('upload');
			});
			w.add(b);
			w.add(u);
			w.open({modal:true,modalTransitionStyle:style,modalStyle:presentation,navBarHidden:true});
	};
	
	myApp.getVideoList = function(){
			var db = Titanium.Database.open('mydb');
			var rows = db.execute("SELECT nome,strftime('%m-%d', data) data, uploaded, vid FROM videos");
			var data = [];
			while (rows.isValidRow()) {
				
				var row = Ti.UI.createTableViewRow({
					title:'TitleVideo',
					videoId:c,
					backgroundColor:'#ffffff',
					selectedBackgroundColor:'#dddddd'
				}); 
				var name = Ti.UI.createLabel({ 
					text: rows.fieldByName('name'), 
					color: '#000', 
					font:{fontWeight:'bold',fontSize:16}
					});
				row.add(name);
				row.name = 	rows.fieldByName('name');
				data.push(row);
				rows.next();
			}
			rows.close();
			db.close();
		
		
		// create table view
		var tableview = Titanium.UI.createTableView({
			data:data,
			editable:true,
			allowsSelectionDuringEditing:true
		});

		tableview.addEventListener('click',function(e)
		{
			alert('ID:'+ e.rowData.videoId);
		});
		
		tableview.addEventListener('delete',function(e)
		{
			var s = e.section;
			Ti.API.info('rows ' + s.rows + ' rowCount ' + s.rowCount + ' headerTitle ' + s.headerTitle + ' title ' + e.rowData.title);
		
			alert("deleted - row="+e.row+", index="+e.index+", section="+e.section + ' foo ' + e.rowData.foo);
		});
		
		
		return tableview;
	};


		
})();