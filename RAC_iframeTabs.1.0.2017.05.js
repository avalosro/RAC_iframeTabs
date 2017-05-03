/*******************************************************************/
/*  This jquery plugin use libraries jquer and jquery ui           */
/*  Plgin name: RAC_iframeTabs.js                                  */
/*  Version: 1.0.2017.05.01                                        */
/*	Create by Roman Avalos Castillo                                */
/*  Date time: 2017-05-01 17:30:22                                 */
/*  Contact: avalosro@gmail.com 								   */
/*           avalosro@hotmail.com   							   */
/*  License: MIT License                                           */
/*  github: https://github.com/avalosro/jquery.RAC_iframeTabs      */
/*                                                                 */
/*/////////////////////////////////////////////////////////////////*/

(function ( $ ) {
	var closeimage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAgxJREFUOI2FkTFPU1EYhp/v3HiJZSjCJAzGKC2JiwHa3t4SUhtC4DewmYCDi2N3FkpoHEwI9h84uilJ5VZoacHBuJkS0j9gC4s1hXuPQ+8tbSH6Tt/58r3nnPf5hCFVLGvWcN1XQMYTeQSgPK+ByBdgL3F6+r1/XoLi29xcyFXqHSIvhy8dkNYF1zDe2NVqu3eBb/6MyMI/zb48+KqVWrGr1bYC8F9eAJhYXkZM85ZJjYwwsbrarWHRcN23AEbFsmYV7AXmJ5ubjM7M0Dw4ANftGkyT6Xyeh2trtBsN2ufnIDK/Pjn5UfnAAGg6DpeVCmO2TSSXQ0yza97ZIRyP0yqVaDnODQ6RDanFYnVEnvaomiaRXI6wbXN5fAwihC2L1uEhZ9ks+vq6n8VPOY7HOwru9ecV0ySyvU04mQTg4uiIejaLvroahtlRd1EWAJG+hgye++Eqz2sMNILMlsVFucxFucxYKsX01tat7QicG+tTU88QmYfuqqbzecKJRC9zs1hkNBplLJViNBod2I5o/UHhrxDgQSbTo33mZ9adDvVstveT8XT6hoFSBQGoxWLvEdkAGF9aouU4A7QDsOPpNL/29wHQsGudnLwWgIpl3RfP+6Rg8U5Sw9La+R0Krb4olf4oALtabWulVtC68F8v7AZmH+SgarHYcy2yoSEDPA5oi9ZFT6lCslb70T//F+uPyBWLhzWwAAAAAElFTkSuQmCC";
	$.fn.RAC_iframeTabs = function(UserOptions, tabinfo)
	{
		var objectID = $(this).attr('id');
		var tabindex=[];
		var RacSummaryQtyTabs =-1;		
		var focustab = -1;

		/********* Set properties of the contruct dialog **********/
		var options = {
			UseMaxSize: 'container', //this option set (container, document, body)
			tabButtonClose:true,
			img_ButtonClose:closeimage,
			OnAddTab: function(){},
			OnRemoTab: function(){},
		};
		$.extend(options, UserOptions);
		
		/*Clear all div container*/
		//this.innerHTML = "";
		
		var RAC_iframeTabs = {
			//Here Component functions
			AddTab: function(itabinfo)
			{
				var objectgetid = objectID;
				for(i = 0; i < itabinfo.length; i++)
				{
					var tbid = doAddNewTab(objectgetid, itabinfo[i].title, itabinfo[i].Extrabuttons);
					var tb = "actby" + tbid;
					switch(options.UseMaxSize)
					{
						case 'container':
							$('#' + tb).css("height", $("#"+objectID).height() - 65);
						break;
						case 'document':
							$('#' + tb).css("height", $(document).height()  -65);
						break;
						case 'body':
							$('#' + tb).css("height", $('body').height() - 65);
						break;
					}
					$('#' + tb).css("width", $(document).width() -20);
					document.getElementById(tb).src =itabinfo[i].link;
					$( "#" + objectgetid ).tabs( "option", "active", tabindex.length);
					tabindex.push({title:itabinfo[i].title, link:itabinfo[i].link, id:tbid});
					options.OnAddTab({title:itabinfo[i].title, link:itabinfo[i].link, id:tbid});
				}
			},
			RemoveTabFromIndex: function(index)
			{	
				for(i = 0; i < tabindex.length; i++)
				{
					if(i == index)
					{
						var idtab = tabindex[i].id;
						tabindex.splice(i, 1);
						$("#" + objectID + '-' + idtab).remove();
						$("#"+objectID+"_t" + idtab).remove();
						$("div#"+objectID).tabs( "refresh" );
						break;
					}
				}
			},
			RemoveTabFromId: function(id)
			{	
				var preid = id.split('-'); 
				for(i = 0; i < tabindex.length; i++)
				{
					if(tabindex[i].id == preid[1])
					{
						tabindex.splice(i, 1);
						$("#" + objectID + '-' + preid[1]).remove();
						$("#"+objectID+"_t" + preid[1]).remove();
						$("div#"+objectID).tabs( "refresh" );
						break;
					}
				}
			},
			ClearAll: function(){
				for(i = 0; i < tabindex.length; i++)
				{
					var idtab = tabindex[i].id;
					$("#" + objectID + '-' + idtab).remove();
					$("#"+objectID+"_t" + idtab).remove();
					$("div#"+objectID).tabs( "refresh" );
				}
				while(tabindex.length > 0){tabindex.pop();}
			},
			GetAllTabs: function ()
			{
				return tabindex;
			},
			indexOfTab: function(tabname)
			{
				for(i = 0; i < tabindex.length; i++)
				{
					if(tabindex[i].title == tabname)
					{
						return i;
						break;
					}
					else
					{
						var n = tabindex[i].title.indexOf(tabname);
						fi(n > -1)
						{
							return i;
							break;
						}
					}
				}
				return -1;
			},
			FocusTabyIndex: function(index)
			{
				$( "#" + objectgetid ).tabs( "option", "active", index );
			},
			FocusTabyName: function(name)
			{
				for(i = 0; i < tabindex.length; i++)
				{
					if(tabindex[i].title == name)
					{
						$( "#" + objectgetid ).tabs( "option", "active", i );
						break;
					}
				}
			},
			ChangeLink: function(tabIndex, newlink){
				document.getElementById('actby' + tabIndex).src= newlink;
			},
			reloadTab:function(tabid){
				document.getElementById('actby' + $('#' + tabid).data('tid')).src = document.getElementById('actby' + $('#' + tabid).data('tid')).src;
			},
			GetActiveTabById:function(){
				return focustab;
			},
			GetActiveTabByIndex: function(){
				return $( "#" + objectgetid ).tabs('option', 'active');
			},
		};
		
		/***** Excecute RAC-iframeTabs actions ****/
		if(UserOptions == "add")
		{
			var objectgetid = $(this).attr('id');
			for(i = 0; i < tabinfo.length; i++)
			{
				var tbid = doAddNewTab(objectgetid, tabinfo[i].title);
				var tb = "actby" + tbid;
				$('#' + tb).css("height", $(document).height());
				document.getElementById(tb).src =tabinfo[i].link;
				tabindex.push({title:tabinfo[i].title, link:tabinfo[i].link, id:tbid});
			}
			return true;
		}	
		
		/**************** imnternal Functions *****************/
		function doAddNewTab(obj, tab_title, Extrabuttons)
		{
			var tabclose = "";
			var buttonLeft = '';
			var buttonRigth = '';
			if(options.tabButtonClose == false){tabclose = "display:none;";}
			//****************** Define id tab *****************
			RacSummaryQtyTabs++;
			//****************** add tab *****************
			if(typeof(Extrabuttons) != 'undefined') {
				if(Extrabuttons.Position.toUpperCase() == "LEFT")
				{
					buttonLeft = Extrabuttons.MButton;
				}
				else buttonRigth = Extrabuttons.MButton;
			}

			$("#" + obj + '_tabsmenu').append("<li id='"+obj+"_t" + RacSummaryQtyTabs + "'><a href='#"+obj+"-" + RacSummaryQtyTabs + "' class'aclose'>"+buttonLeft+tab_title+" "+buttonRigth+"<img id='tid-" + RacSummaryQtyTabs + "' src='"+closeimage+"' style='position:relative; top:0px;left:5px;cursor:pointer;"+tabclose+"' data-type='close' data-obj='"+obj+"' data-objid='"+RacSummaryQtyTabs+"' title='Remove tab: " + tab_title + "' class='Tab-close'></a></li>");
			$("#" + obj).append("<div id='"+obj+"-" + RacSummaryQtyTabs + "' data-tid='"+RacSummaryQtyTabs+"'><iframe id='actby" + RacSummaryQtyTabs + "' name='actby" + RacSummaryQtyTabs + "' src='' align='center' style='width:100%; height:100%; margin-left:-25px; top:-8px;border: 0' align='center' scrolling='yes' allowtransparency='true'></iframe></div>");
			$("div#" + obj).tabs("refresh");
			var indexc = $('#'+obj+' a[href="#'+obj+'-' + RacSummaryQtyTabs + '"]').parent().index();
			$( "#" + obj ).tabs({ active: indexc });
			return RacSummaryQtyTabs;
		}

		/***************** Construct iframe tabs *****************/
		var objectgetid = $(this).attr('id');
		this.append(""+
			"	<ul id='"+objectgetid+"_tabsmenu'>"+
			"		<span style='font-size:10px; position:relative !important;top:0px; color:#BCBCBC !important;'><a href='mailto:avalosro@gmail.com?Subject=Hello%20' style='text-decoration: none;color:#BCBCBC !important;' target='_top'>Developer by Roman Avalos Castillo</a></span>" + 
			"	</ul>");
			
		$( "#" + objectgetid ).tabs({
			activate: function( event, ui ) {
				//alert($('#' + ui.newPanel[0].id).data('tid'));
				focustab = ui.newPanel[0].id;
				$('#actby' + $('#' + ui.newPanel[0].id).data('tid')).show(function(){
					$('#actby' + $('#' + ui.newPanel[0].id).data('tid')).scrollLeft(0);
				});
				
				//var id = parseInt((ui.newPanel[0].id).split('-')[1]);
				//currentAction = id-1;
			}
		});
		
		$( "#" + objectgetid ).on('click', 'img', function(){
			//data-obj='"+obj+"' data-tabname
			if($(this).data('type') == 'close')
			{
				var objname = $(this).data('obj');
				var objid = $(this).data('objid');
				var tabtitle = '';
				
				for(i = 0; i < tabindex.length; i++)
				{
					if(tabindex[i].id == objid)
					{
						tabtitle = tabindex[i].title;
						tabindex.splice(i, 1);
						break;
					}
				}
				
				$("#" + objname + '-' + objid).remove();
				$("#"+objname+"_t" + objid).remove();
				$("div#"+objname).tabs( "refresh" );
				options.OnRemoTab({title:tabtitle, id:objid});
			}
			//alert('clicked');
		});
		
		/***************** End Construct iframe tabs *****************/
		return RAC_iframeTabs;
	};
}( jQuery ));