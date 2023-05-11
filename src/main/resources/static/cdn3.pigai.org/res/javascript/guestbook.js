var G=G||{}
G.config={'id':"#guestbook",'title':'留言内容','txt':"老师，您好:\n   ",'t_user_id':0
,'src':0,'src_id':0
}
G.init=function(opt){
	 for( p in opt )G.config[p]=opt[p];
	 if( $( G.config.id).length==0 ) return false;
	 $( G.config.id).click( G.initClick);
}
G.initClick=function(){ 
	try{
		if( !J.config.isLogin ){
			alert('请先登录');
			J.show();
			return false;
		}
	}catch(e){
	}
	var html='<div style="padding-bottom:10px;">';
	html +='<div id="Chunkmsg" style="display: none;">正在提交......</div>';
	html +='<div ><span style="font-size:12px;">'+G.config.title+':</span>';
	html +='<textarea id="error_txt" name="error_txt" style="height:120px;width:450px;">'+G.config.txt +'</textarea></div>';
	html +='</div>';
	//F.show("批改网留言",html,[[G.post,' 确 定 '],[F.hide,'关闭']],500,0);
	F.show("留言",html,[[G.post,' 确 定 '],[F.hide,'关闭']],500,0);
	$('#error_txt').select().focus();
}

G.post = function(){
	G.config.txt= $('#error_txt').val();
	var data={};
	for( p in G.config )data[p]=encodeURIComponent(G.config[p]) ;
	$('#Chunkmsg').text('正在提交......').show();
	$.post('/?c=ajax&a=guestbook',data,function(d){
		if( $.trim(d)=='1'){ $('#Chunkmsg').text('提交成功') ;F.hide();	}
		else if( d.indexOf('msg')>=0){ $('#Chunkmsg').text(d.replace('msg:','') ); }
		else{
			alert("发生未知错误！\n\n"+d );
		}
	});
}
G.rep = function(rid ,opt,callback ){
	var data={};
	data.id= rid;
	for( p in opt )data[p]=encodeURIComponent(opt[p]) ;
	$.post('/?c=ajax&a=guestbook_rep',data,function(d){		 
		try{  callback(d);
		}catch(e){}
	});
}
