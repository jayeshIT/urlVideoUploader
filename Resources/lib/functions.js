(function() {
	
	myApp.camera = function (_args){ 
		
			Titanium.Media.showCamera({
	
				success:function(event)
				{
					var video = event.media;
					movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
					movieFile.write(video);
					myApp.uploadDialog('mymovie.mov');
				},
				cancel:function()
				{
	
				},
				error:function(error)
				{
					// create alert
				/*	var a = Titanium.UI.createAlertDialog({title:'Video'});
	
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
					a.show();*/
					myApp.uploadDialog('mymovie.mov');
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
				backgroundColor:'purple'
			});
			var b = Ti.UI.createButton({
				title:'Close '+nomevideo,
				width:100,
				height:30
			});
			b.addEventListener('click',function()
			{
				w.close();
			});
			w.add(b);
			w.open({modal:true,modalTransitionStyle:style,modalStyle:presentation,navBarHidden:true});
	};
	
	myApp.getVideoList = function(){
			var data = [];
			for (var c=0; c<10; c++) 
			{
				var row = Ti.UI.createTableViewRow({
					title:'TitleVideo',
					videoId:c,
					backgroundColor:'#ffffff',
					selectedBackgroundColor:'#dddddd'
				}); 
				data.push(row);
			}
			
		
		
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