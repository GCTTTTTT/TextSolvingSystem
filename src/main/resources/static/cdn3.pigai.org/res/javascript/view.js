_isPost=false;//是否在提交当中
var st= {modify_time:0 };

function initView(){	 
	$('html',docId).keyup( bodyKeyup);
	$('#buttonsb').click(viewSubmit);       
	$('#myEssayForm').submit( essayAjaxPost );
}

function bodyKeyup(){  
	 var essay= $(this).text();
	 if(essay.length >50) $('#buttonsb').attr('className','buttonsbYes');
	 else $('#buttonsb').attr('className','buttonsbNo');
}
function viewSubmit(){
	if( $('#buttonsb').attr('className').indexOf('buttonsbNo')>-1 ) return;
	//alert( $('body',docId).text() );
	$('#myEssayForm').submit();
}
function initJuPing(){	
	$('.dianping').click( dianping); //句评
	$('.duanping').click( dianping); //段评语
	$('.sentDPModify2').click( dianpingPost2 ); 
        
	//if( $('.tdianping_input').find('a').length>0 ) $('.tdianping_input').find('.dptermpingDel').click( delDianping);
	if( $('.tdianping').find('a').length>0 ) $('.tdianping').find('.dptermpingDel').click( delDianping);
	if( $('.tdianping_input').find('a').length>0 ) { $('.tdianping_input').find('.sentDPModify').click( mDianping );}
	$('.dp_input').keyup( function(e){ if (13==e.keyCode ){ dianpingPost2() };} );
	$('body').keyup( leftRight );
        $('.sent_zan').click(sentZan);
        getZanData();
}

var _dpian;
var _dtxt;
var overZan;
function dianping(){
	_dpian = this;
	_dtxt = $(_dpian).parents('.view3Sent').text();
	_dtxt = _dtxt.replace(/\[([^\[\]]*)\]/ig,''); 
	if(_dp_type=="1") juDianping(); //新版本
	else showWinDianping();//旧版本 弹框 
}
function getZanData(){
    var date={essay_id:_eid,version:_version,request_id:_request_id};
    $.post(_self+'?c=ajax&a=sentZanData',date,function(msg){
        eval("obj="+msg+";");  
	for(var m in obj){     
            if(obj[m]['overZan']){
                $('#zan_'+m).attr('overZan','1');
                $('#zan_'+m).attr('style','background: rgba(0, 0, 0, 0) url(/res/images/zanok.png) no-repeat scroll 0 0;background-position:left;');
                
            }
            $('#zan_'+m).attr('title',obj[m]['txt']);           
            $('#zan_'+m).html(obj[m]['ct']);
        }	
    });
}
function sentZan(){
        _dpian = this;
	var p=$(_dpian).parents('.view3Sent');
        var overZan = $(_dpian).attr('overZan');
	var sent= p.text();
	var sent_id= p.attr('content');
	sent = sent.replace(/\[([^\[\]]*)\]/ig,'');
        if(overZan>0){
            var str = '<b>-1</b>';
        }else{
            var str = '<b>+1</b>';
        }
        effectZan({
                obj: $(this),  //jq对象，要在那个html标签上显示
                str: str,   
                startSize: "5px",  //动画开始的文字大小
                endSize: "40px",    //动画结束的文字大小
                interval: 1000,  //动画时间间隔
                color: "#297ACC",    //文字颜色
                callback: function () { }    //回调函数
        });
	var date={sent:encodeURIComponent(sent),sent_id:sent_id,essay_id:_eid,version:_version,request_id:_request_id};

	$.post(_self+'?c=ajax&a=sentZan',date,function(d){	
            if(overZan>0){
                $('#zan_'+sent_id).attr('style','background: rgba(0, 0, 0, 0) url(/res/images/zan.png) no-repeat scroll 0 0;background-position:left;');
                $('#zan_'+sent_id).text(parseInt($('#zan_'+sent_id).text())-1);
                $(_dpian).attr('overZan','0');
                return;
		
            }else{
                $('#zan_'+sent_id).text(parseInt($('#zan_'+sent_id).text())+1);
                $(_dpian).attr('overZan','1');
                $('#zan_'+sent_id).attr('style','background: rgba(0, 0, 0, 0) url(/res/images/zanok.png) no-repeat scroll 0 0;background-position:left;');
            }    
	});
        	
}

function effectZan(options){
    /*
    options =  {
                obj: null,  //jq对象，要在那个html标签上显示
                str: "+1",   
                startSize: "5px",  //动画开始的文字大小
                endSize: "40px",    //动画结束的文字大小
                interval: 1000,  //动画时间间隔
                color: "#297ACC",    //文字颜色
                callback: function () { }    //回调函数
        }
     */
    $("body").append("<span class='num'>" + options.str + "</span>");
    var box = $(".num");
    var left = options.obj.offset().left + options.obj.width() / 2-10;
    var top = options.obj.offset().top - options.obj.height();
    box.css({
            "position": "absolute",
            "left": left + "px",
            "top": top + "px",
            "z-index": 9999,
            "font-size": options.startSize,
            "line-height": options.endSize,
            "color": options.color
    });
    box.animate({
            "font-size": options.endSize,
            "opacity": "0",
            "top": top - parseInt(options.endSize) + "px"
    }, options.interval, function () {
            box.remove();
            options.callback();
    });
}


function leftRight(e){
	if( _isteacher !="1" ) return false;
	try{
		if( 39== e.keyCode && e.ctrlKey ){
			//alert( $('#swNextHref').length );
			if($('#swNextHref').length>0 ){				
				url=$('#swNextHref').attr('href'); 
				location.href= url;
			}
		}
		if( 37== e.keyCode  && e.ctrlKey ){
			if($('#swPreHref').length>0 ){
				url=$('#swPreHref').attr('href'); 
				location.href= url;
			}
		}
	}catch(e){
	}
}
function juDianping(){ 

	var p=$(_dpian).parents('.view3Item');
	
	if( p.find('.tdianping').length <=0 ) return ;
	//var str = p.find('.tdianping').find('.ts').text();
	//p.find('.tdianping').hide();
	p.find('.tdianping_input').show(); 
	p.find('.dp_input').val('' );
	p.find('.dp_input').focus();
	

}
function juDianClose(){
	var p=$(_dpian).parents('.view3Item');
	var str =p.find('.dp_input').val();
	p.find('.tdianping').find('.ts').text( str );
	p.find('.tdianping').show();
	p.find('.tdianping_input').hide();
}
function dianpingPost2(){
	//alert('good newss');
	var p=$(_dpian).parents('.view3Sent');
	var p2=$(_dpian).parents('.view3Item');	
	var sent= p.text();
	var sent_id= p.attr('content');
	sent = sent.replace(/\[([^\[\]]*)\]/ig,'');
	var dianping= p2.find('.dp_input').val(); 
	if( $.trim(dianping)=='' ){
		 
		p2.find('.dptermpingDel').click();
		return ;
	}
	//$('#Chunkmsg').show();
	var date={dianping:encodeURIComponent( dianping),sent:encodeURIComponent(sent),sent_id:sent_id,essay_id:_eid,version:_version,reid:0};
	date.type= $(_dpian).attr('className')=="duanping" ?1:0;

	$.post(_self+'?c=ajax&a=dianping',date,function(d){		
		var _i = parseInt( d.trim());
		date.reid=_i; 
		if( _i<=0  ){ alert( d );}
		else{
			 //juDianClose( );
			 $('.tdianping_input').hide();
			 modifyDianping( date );
		}
	});
}
/*function dianPingBySent(obj,str){
	_dpian = obj;
	_dtxt = str;
	showWinDianping();
}*/
function dianPingDelWord(){
	var obj = $('.chunkPigaiShowTitle b');
	var txt = $obj.html();
	alert(txt);
}
function showWinDianping( ){
	var htmlStr='';	  
	htmlStr='<div id="chunkPigaiShow">';
	htmlStr+='<div id="Chunkmsg" style="display:none;">正在提交......</div>';
	var cls= $(_dpian).attr('className');
	var dstr= cls=="duanping" ?'段落评语':'句子:';
	htmlStr+='<div class="chunkPigaiShowTitle"><span>'+dstr+'</span><b>'+_dtxt+'</b></div>'; 

	htmlStr+='<div class="chunkPigaiShowContent" style="margin-top:10px;">点评内容:<TEXTAREA name="error_txt" id="error_txt"></TEXTAREA></div>';
	htmlStr+='<div id="chunkOption" style="display:none"></div>';
	htmlStr+='</div>';

	var btArrry=  [ [ dianpingPost ,' 确  定 '] ];

	if(J.readCookie('_APIF')=='xuekewangpigai'){   
		F.show('点评-学科网批改通',htmlStr,btArrry,500,0);	
	}else if(J.readCookie('_APIF')=='yidong_zpg'){
		F.show('点评-智批改',htmlStr,btArrry,500,0);		
	}else{
		F.show('点评-批改网(pigai.org)',htmlStr,btArrry,500,0);	
	}
	joinDianping();
	$('#error_txt').focus();
	try{enterV2( dianpingPost );}catch(e){}
	if( cls!="duanping" ){ 
		try{juDianOption();}catch(e){}
	}
}
function juDianOption(){
	//alert('good news');
	var str ='<ul>';
	for( p in _dianpingCat  ){
		str +='<li><input type="checkbox" name="opt" value="'+p+'" id="opts_'+p+'"> <label for="opts_'+p+'">'+_dianpingCat[p]+'</label></li>';
	}
	str+='</ul><div style="clear:both;"></div>';
	$('#chunkOption').html( str );
	$('#chunkOption').show();
	$('#chunkOption').find('input').click(function(){ 
		var str = $('#error_txt').val(); 
		var ss =  $(this).parents('li').find('label').text();
		if(this.checked){
			str += str!=''?',':'';
			str +=ss ;			
		}else{
			str=str.replace(','+ss,'');
			str=str.replace(ss+',','');
			str=str.replace(ss,'');
		}
		$('#error_txt').val(str);
	});
	var str = $('#error_txt').val();
	$('#chunkOption li').each(function(){
		var s= $(this).find('label').text();
		if(str.indexOf(s)>=0) $(this).find('input').attr('checked',true);
	});
}
function joinDianping(){
	var p=$(_dpian).parents('.view3Item');	
	if( p.find('.tdianping').length <=0 ) return ;
	//var str = p.find('.tdianping').find('span').text();
	var str = p.find('.tdianping').find('.ts').text();
	$('#error_txt').val( str );
}

function dianpingPost(){
	var p=$(_dpian).parents('.view3Sent');
	var sent= p.text();
	var sent_id= p.attr('content');
	sent = sent.replace(/\[([^\[\]]*)\]/ig,'');
	var dianping= $('#error_txt').val();
	$('#Chunkmsg').show();
	var date={dianping:encodeURIComponent( dianping),sent:encodeURIComponent(sent),sent_id:sent_id,essay_id:_eid,version:_version,reid:0};
	date.type= $(_dpian).attr('className')=="duanping" ?1:0;
	var dd ='';
	$('#chunkOption').find('[type=checkbox][checked=true]').each(function(){
		dd+= (dd==''?'':',')+$(this).val();
	});
	date.tag= encodeURIComponent(dd); 

	$.post(_self+'?c=ajax&a=dianping',date,function(d){
		var _i = parseInt( d.trim());
		date.reid=_i;
		if( _i<=0 ){ alert( d );}
		else{
			$('#Chunkmsg').html('确定成功...');
			try{ modifyDianping( date ); }catch( e ){ }
			F.hide();
		}
	});
}

function modifyDianping( date ){	
	var p=$(_dpian).parents('.view3Item');	
	var dianping=  decodeURIComponent( date.dianping );
	if( p.find('.tdianping').length <=0 ) {
		//
	}else {
		/*
		p.find('.tdianping').find('.ts').html(dianping);
		p.find('.tdianping').show();
		p.find('.tdianping').find('.lab').html( _isteacher=="1"?"[教师点评]":"[学生互评]");
		p.find('.tdianping').removeClass('student');
		if( _isteacher!="1"){ p.find('.tdianping').addClass('student');	}
		*/
		var str ='<li class="tdianping '+(_isteacher=="1"?'teacher':'student')+'"><span class="lab">'+( _isteacher=="1"?"[教师点评]":"[学生互评]" )+'</span> <span class="ts">'+dianping+'</span>[<a href="javascript:;" content="'+ date.reid+'" class="dptermpingDeltem">删除</a>]</li>';
		p.find('ul').prepend( str );
		$('.dptermpingDeltem').unbind('click').click( delDianping );
	}
}

function delDianping(){
	//alert('asdf'); 
	var ttt= $(this).parents('.view3Item').find('.dp_input').val();
	//alert(ttt);
	if( ttt !=''   ){
		var re= confirm("您确定要删除");
		if( ! re) return false;
	}
	var p= $(this).parents('.view3Item');
	var sent_id= $(this).parents('.view3Item').find('.view3Sent').attr('content'); 
        var content = $(this).parents('.view3Item').find('.ts').text();
	var date={essay_id:_eid,sent_id:sent_id,version:_version,'id': $(this).attr('content') };
	//date.type= $(this).parents('.view3Item').find('.duanping').length>0 ? 1:0;
	var d_self= $(this).parents('.tdianping');
	var d_self2= p.find('.tdianping_input '); 
	
	$.post(_self+'?c=ajax&a=deldianping',date,function(d){
		//alert(d);
		if( d.trim()!='1' ){ alert( d );}
		else{
			//alert('点评删除成功'); 
			d_self.hide();
			d_self2.hide();
                       
		}
                
	});
        
}
function delGoodSent(sent_id,html){
    var date = {essay_id:_eid,sent_id:sent_id,version:_version,del_html:html}
    $.post(_self+'?c=ajax&a=delgoodsent',date,function(d){
    });
}
function mDianping(){ 
	if( $(this).parents('.view3Item').find('.dianping').length>0 ) $(this).parents('.view3Item').find('.dianping').click();
	if( $(this).parents('.view3Item').find('.duanping').length>0 ) $(this).parents('.view3Item').find('.duanping').click();
	
}
//教师确认点评
var dobj= null ;
function initZdianping(){
	if( $('.keyi').length>0 ){
		$('.keyi').find('a').click( function(){
			var ct=  $(this).attr('content') ;
			 dobj =  $(this).parents('.keyi') ;
			if(ct=='2'){
				var ok = confirm('您确认要删除！'); 
				if(!ok) return false;
				var _id = dobj.attr('content') ;
				$.post(_self+'?c=ajax&a=ztermdel',{id:_id},function(d){ 
					if(d.trim()!='1'){ alert( d );}
					else{
						alert('删除成功');
						location.reload();
					}
				});

			}else{				 
				var ob= ob || {};
				ob.str= dobj.html(); 
				ob.str= ob.str.replace(/\[([^\[\]]*)\]/ig,'');
				ob.essay_id = _eid ;
				ob.request_id  = _request_id ;
				//
				var po= $(this).parents('.view3Item') ;
				var po_sent= po.find('.view3Sent');
				ob.sent_id = po_sent.attr('content') ;
				ob.sent_txt = po_sent.find('.sentTxt').html(); 

				var key=  dobj.attr('content') ;//$(zobj).html();
				key = key.replace(/\[([^\[\]]*)\]/ig,'');
				key = key.replace('&lt;','<');
				key = key.replace('&gt;','>');
				key = key.trim(); 
				ob.term= key ;
				ob.type= dobj.attr('title');
				var btArrry=  [[ zdianpingPost ,' 确 认 '],[ F.hide ,' 关 闭 ']];
				showWinZdianping(ob,btArrry);
				// ob.str 显示 ob.essay_id ob.request_id ob.sent_id ob.sent_txt ob.term ob.type类别
			}
		});
	}
}



var dd=false ;
var gb_obj = null;
function mangErrorInit(){
	//vSentError
	//alert('error');
	$('.vSentError').find('li').hover(
		function(e){
			gb_obj= this;
			var xy= divPos(this);
			var left = xy[0] - parseInt($('#url').css('width'))+15 ;//-$(#url).css('width');
			$('#url').css('left',left+'px');
			$('#url').css('top',xy[1]+'px');
			$('#url').css('opacity',0.9);
			$('#url').show();
			//dd= false ;
		},
		function(e){
			dd=true ;
			setTimeout(closeUrl,10000);
		}
		);
	$('#url').find('.good').click( goodBad );
	$('#url').find('.bad').click( goodBad );
}

function goodBad(){
	//alert('asdfasdf');
	var gd= $(this).attr('className') ;
	alert( $(gb_obj).attr('content') );
}
function closeUrl(){
	if(dd) $('#url').hide();
}

function divPos(obj){
	var left = obj.offsetLeft;
	var top = obj.offsetTop;
	while (obj = obj.offsetParent) {
		left += obj.offsetLeft;
		top += obj.offsetTop;
	}
	//left= obj.offsetWidth;
	return [left,top];
}

function getPos(obj, e){
	
	e = e || window.event;
	var ex =  0;
	var ey =  0;
	clX= e.clientX;
	clY= e.clientY;
	if(clX==0 && clY==0){
		//clX= parseInt(K.$(K.config.icibaDiv).getAttribute('clientX'));
		//clY= parseInt(K.$(K.config.icibaDiv).getAttribute('clientY'));
	}
	if (document.documentElement) {
		ex = clX + document.documentElement.scrollLeft + document.body.scrollLeft;
		ey = clY + document.documentElement.scrollTop + document.body.scrollTop;
	} else {
		ex =  clX + window.scrollX;
		ey =  clY + window.scrollY;
	}
	
	return [ex, ey];
}

//处理知识库
function initKB(){
	//alert('ddddd');
	$('.kb_id').click(function(){
			//alert('dddd');
			F.show('提示 批改网(pigai.org)','<div style="padding:10px;padding-bottom:10px;">载入内容请稍后.....</div>'	,[],400,0);
			var ob={};
			ob.term = $(this).html();
			ob.kb_id = $(this).attr('content'); 
			 
			$.post(_self+'?c=ajax&a=getKB',ob,function(d){
				 //alert( d );	
				 if(d=='-1'){
					 alert('该知识库不存在');
					 F.hide();
					 return false;
				 }
				 try{
					 //alert(d);
					 eval("var tem="+d+";");
					 ob.kb=tem;
					 showKB(ob);
					 //alert(tem.html);
				 }catch(e){
					 alert("出错：\n"+d);
				 }
			});
	});
}

function showKB(ob ){
	var html='<div id="showKB">';
	html += '<div class="showKBTitle">'+ob.term+'</div>';
	html += '<div class="showKBHr">&nbsp;</div>';
	html += '<div class="showKBHtml">'+ob.kb.html+'</div>';
	html += '</div>';
	F.show('知识库-批改网(pigai.org)',html,[[ F.hide ,' 关 闭 ']],500,0);
}

function initClose(){
	//alert('446');
	$('.ttClose span').click( function(){
		//alert('asdfadfs');
		var is_display= $('#view3').css('display');
		//alert( is_display );
		if( is_display=='none'){
			$('#view3').show();			
			$('.ttClose span').removeClass('select');
		}else{
			$('#view3').hide();
			$('.ttClose span').addClass('select');
		}
	});
}

function initDptemOver(){
	//alert( $('.sentTxt').length );
	$('.sentTxt').each(function(i){
		$(this).attr('content', $(this).text() );
	});
	if( $('.dptermping').length >0 ) {
		$('.dptermping').hover( dp_over_fn1,dp_over_fn2);
	}
}

function dp_over_fn1(){
	//alert("good news");
	var obj = $(this).parents('.view3Item').find('.sentTxt');
	var str = obj.attr('content') ;
	var gg  = $(this).find('.dp_term').text();
	gg= gg.replace(/[\(\)\[\]]/,'');
	gg= gg.replace('.','\\.');
	eval("reg=/("+gg.replace('$','\\$')+")/ig;");
	str= str.replace(reg,'<span style="color:green">$1</span>');
	obj.html( str );

}
function dp_over_fn2(){
	var obj = $(this).parents('.view3Item').find('.sentTxt');
	var str = obj.attr('content') ;
	obj.html( str );
}

function delFBack(){ 
	var re= confirm("确认删除否？");
	if(!re) return false;
	var date ={'id':$(this).attr('content') };
	var obj = this;
	$.post(_self+'?c=ajax&a=delFeedback',date,function(d){
		//alert(d);
		d = $.trim(d);
		if(d=='yes'){
			$(obj).parents('li').fadeOut();
		}else if( d.indexOf('msg')>=0 ){
			var str = d.replace('msg:','');
			alert("发生错误：\n"+str);
		}else{
			alert("发生错误！");
		}
	});
	return false;
}
function initPymoban(){ 
	$('#pymobanw select').change(function(){  			
		var str = $(this).val() ; 
		if( $.trim(str)=="") return; 
		//$('#teacher_yijian').val(  $(this).val() );  //txt_jianyi
		if( $('#teacher_yijian').length>0 ) $('#teacher_yijian').val(  $(this).val() ); 
		if( $('#txt_jianyi').length>0 ) $('#txt_jianyi').val(  $(this).val() ); //txt_jianyi
	});
}

function initTj(){
	//alert(  $(this).attr('content') );
	$('#essay_tj').click( function(){
		var htmlStr='<div id="tj_pop" content="'+$(this).attr('content')+'" style="margin-bottom:10px;">';
		htmlStr +='<div>推荐理由：<br><textarea name="tjinfo"  id="tjinfo" style="overflow:auto;width:98%;height:60px;"></textarea></div>';
		htmlStr +='</div>'; 
		if(J.readCookie('_APIF')=='xuekewangpigai'){
			F.show('句子查看-学科网批改通',htmlStr,[[tjpost,'确 定'] ],500,0);		
		}else if(J.readCookie('_APIF')=='yidong_zpg'){
			F.show('句子查看-智批改',htmlStr,[[tjpost,'确 定'] ],500,0);		
		}else{
			F.show('句子查看-批改网(pigai.org)',htmlStr,[[tjpost,'确 定'] ],500,0);		
		}
	});
	
	$('#essay_tj_del').click(function(){
		var date = { "essay_id" : $(this).attr('content')  };
		var re = confirm("确定要取消推荐！");
		if( !re) return false;
		$.post(_self+'?c=ajax&a=tj_del',date,function(d){
			if( $.trim(d)=="1" ){ 
				//msg2("取消推荐成功"); location.reload();
				if(J.readCookie('_APIF')=='xuekewangpigai'){
					F.show('提示--学科网批改通','<div style="padding:20px;">取消推荐成功</div>',[[function(){F.hide();location.reload();},'确 定'] ],400,0);
				}else if(J.readCookie('_APIF')=='yidong_zpg'){
					F.show('提示--智批改','<div style="padding:20px;">取消推荐成功</div>',[[function(){F.hide();location.reload();},'确 定'] ],400,0);	
				}else{
					F.show('提示--批改网(pigai.org)','<div style="padding:20px;">取消推荐成功</div>',[[function(){F.hide();location.reload();},'确 定'] ],400,0);
				}
			}
			else if( d.indexOf('msg:')>=0 ){ alert( "错误："+d.replace('msg:','') );
			}else{ 
				alert("发生未知错误！"  );
			}

		});
	});
}

function tjpost(){
	var date = { "essay_id" : $('#tj_pop').attr('content'),'date': encodeURIComponent( $('#tjinfo').val() ) };
	$.post(_self+'?c=ajax&a=tj',date,function(d){
		if( $.trim(d)=="1" ){ 
			if(J.readCookie('_APIF')=='xuekewangpigai'){
				F.show('提示--学科网批改通','<div style="padding:20px;">成功推荐</div>' ,[[function(){F.hide();location.reload();},'确 定'] ],400,0);
			}else if(J.readCookie('_APIF')=='yidong_zpg'){
				F.show('提示--智批改','<div style="padding:20px;">成功推荐</div>' ,[[function(){F.hide();location.reload();},'确 定'] ],400,0);
			}else{
				F.show('提示--批改网(pigai.org)','<div style="padding:20px;">成功推荐 , 查看<a href="/?c=home">个人网站</a></div>' ,[[function(){F.hide();location.reload();},'确 定'] ],400,0);
			}
		}
		else if( d.indexOf('msg:')>=0 ){ alert( "错误："+d.replace('msg:','') );
		}else{ alert("发生未知错误！");	}
	});
}

function initUpload(){
	//alert("good news");
	initUfile();

}
function initUfile(){
	$('.ufile').unbind('change');
	$('.uitem a').unbind('click');
	$('.ufile').change( function(){
		var ufile= $(this).val();
		var t= ufile.match(/^(.*)(\.)(.{1,8})$/) ;
		if( t.length!=4 ){ alert("文件格式不正确！"); return false;}
		//alert( t[3])
		var p= t[3].toLowerCase();
		if( !isExt(p)){ alert("不支持该格式的文件上传！"); $(this).val(""); return false;}
		$(this).parents('.uitem').find('a').show();
		//aler("ddddd");
		//alert( $('#uploadw .ufile').length  );
		if( $('#uploadw .ufile').length >=5 ) return ;
		$('#uploadw').append( $('#example').html() );
		initUfile();
	});
	$('.uitem a').click( function(){ $(this).parents('.uitem').remove(); });
}
function isExt( ext){
	var str ="doc,docx,ppt,pptx,xls,xlsx,vsd,pot,pps,rtf,wps,et,dps,pdf,rar,zip,tgz";
	var arr = str.split(',');
	for( i=0;i<arr.length;i++ ){ if( arr[i]==ext ) return true;}
	return false;
}

function initHome(){
	$('.zwen_item').hover(
		function(){ $('.idel').hide(); $(this).find('.idel').show() ; }
	,	function(){  }
	);
	$('.idel a').click( homeDel);
	$('#bfselect').hover(
	function(){
		$(this).find('ul').css('border-color','red').show();
		$(this).find('span').css('border-color','red');
	},
	function(){ $(this).find('ul').hide(); $(this).find('span').css('border-color','#ffffff'); 	});
}

function homeDel(){
	var type= $(this).attr('class');

        var id = $(this).attr('content');
        if(type == 'adddoc') {
            addDocNote(id);
            return false;
        }
	//alert(type);
	var str = 'deldoc'==type ? "您确定要删除该文件么？" : "您确定要取消推荐么？" ;
	re = confirm(str);
	if( !re ) return false;
	//alert("del");
	
	//alert( id );
	var date= {"type":type , "id":id};
	//return false;
	$.post(_self+'?c=ajax&a=delDocTj',date,function(d){
		//alert( d );
		if($.trim(d)=="1" ){ 
			alert("操作成功！");
			location.reload();
		}else if( d.indexOf("msg")>=0 ){
			alert( d.replace("msg:","") );
		}else{
			alert("发生错误！");
		}
	});
	return false; 
}

function addDocNote(id){
    var doc_txt = '';
    $.post(_self+'?c=home&a=getNote',{"doc_id":id},function(d){
        doc_txt = d;
        var htmlStr = '';
        htmlStr='<div id="chunkPigaiShow">';
        htmlStr+='<div class="chunkPigaiShowContent">说明:<TEXTAREA name="doc_note_txt" id="doc_note_txt" style="width: 456px; height: 91px;">'+doc_txt+'</TEXTAREA></div>';
        htmlStr+="<input type='hidden' value='"+id+"' id='doc_note_id' />";
        htmlStr+='</div>';
        var btArrry=[ [addDocNotePost ,' 保 存 '],[ F.hide ,' 取 消 ']];
        F.show('修改文档简介', htmlStr, btArrry, 500, 0);
    })
}

function addDocNotePost(){
    var id=$('#doc_note_id').val();
    var txt = $('#doc_note_txt').val();
    var data = {"doc_id":id,"doc_txt":txt};
    $.post(_self+'?c=home&a=addNote',data,function(d){
        if(d == 'success')
            window.location.reload();
        else {
            alert('更新失败！');
            F.hide();
        }
    })
}


function initRecoder(){
	$('#recoder').click(function(){
		//$('');
		var id= $(this).attr('content');
		//htmlStr='<iframe src="/res/recorder/call.php?eid='+id+'" style="width:100%;margin:0px;padding:0px;background-color:#fff" height="180" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowTransparency="true"></iframe>';
		htmlStr='<iframe src="/?c=v2&a=recorder&eid='+id+'" style="width:100%;margin:0px;padding:0px;background-color:#fff;height:290px"   frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowTransparency="true"></iframe>';
		var btArrry=[];
		if(J.readCookie('_APIF')=='xuekewangpigai'){
			F.show('语音点评-学科网批改通',htmlStr,btArrry,526,0);
		}else if(J.readCookie('_APIF')=='yidong_zpg'){
			F.show('语音点评-智批改',htmlStr,btArrry,526,0);		
		}else{
			F.show('语音点评-批改网(pigai.org)',htmlStr,btArrry,526,0);
		}

		$('#icibaWin').css('height','350px');
	});//res/recorder/play.php
	
}

var _snttxt = '';
var _sid = '-1';
var _realsid='';
//#句子修改
function initSntModify(){
	$('.snt_modify').click(function(){
		//var sid= $(this).attr('');
		var s_obj= $(this).parents('.view3Sent'); 
		var s_obj2= $(this).parents('.view3Item'); 
		
		var _snttxtY = s_obj.find('.sentTxt').text();
		if( s_obj2.find('.new_sentTxt').length>0 ){
			_snttxt = s_obj2.find('.new_sentTxt').text();
		}else{
			_snttxt = _snttxtY;
		}
		_sid = $.trim( $(this).parents('.view3Item').find('.view3xh').text());
		
		_realsid = s_obj.attr('content');

		var ysnt ='';
		// var btArrry=[  [ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 ']];

		if(J.readCookie('_APIF')=='yidong_zpg'){
			var btArrry=[ [function(){ SntModify(s_obj) } ,'继续修改'],[ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 ']];
		}else{
			if( _no_paste == "1"){
				var btArrry=[ [function(){ SntModify(s_obj) } ,'继续修改'],[ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 '],[ function(){ online_ask() } ,'在线答疑']];
			}else{
				if (_eid == 174225971) {
					var btArrry=[ [function(){ AISnts() } ,'AI改写'],[function(){ SntModify(s_obj) } ,'继续修改'],[function(){ similarSnts() } ,'相似表达'],[ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 ']];
				}else{
					var btArrry=[ [function(){ SntModify(s_obj) } ,'继续修改'],[function(){ similarSnts() } ,'相似表达'],[ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 ']];
				}
			}
		}

		try{
			if('15'==_ttype) {
				var btArrry=[  [ function(){ SntModify(s_obj); sent_save_anly() } ,'保存分析'],[ F.hide ,' 取 消 ']];
				ysnt = '<div >原句：'+ _snttxtY +'</div>';
			}
		}catch(e){}
		var htmlStr='目前编辑的是第'+$(this).parents('.view3Item').find('.view3xh').text() +'句 '+ ysnt +'<div style="padding-bottom:10px;"><textarea name="now_snt" id="now_snt"  style="width:450px;height:80px;">'+ _snttxt +'</textarea></div>';


		//F.show('句子修改-批改网(pigai.org)',htmlStr,btArrry,500,ysnt==''?140:180);
		if(J.readCookie('_APIF')=='xuekewangpigai'){
			F.show('句子修改-学科网批改通',htmlStr,btArrry,500,'' );
		}else if(J.readCookie('_APIF')=='yidong_zpg'){
			F.show('句子修改-智批改',htmlStr,btArrry,500,'' );		
		}else{
			F.show('句子修改-批改网(pigai.org)',htmlStr,btArrry,500,'' );
		}
		
		try{ if('15'==_ttype) requestChat( _request_id,'[修改] 开始修改作文句子，第'+ _sid +'句'   );
		}catch(e){
		}

		st.modify_time= Math.round(new Date() / 1000) ;
		//s_obj.find('.sentTxt')..attr('contentEditable',true);
		// 设置 相似表达 字体颜色
		$('input[value=AI改写]').css('color', 'red');
		// $('input[value=相似表达]').css('color', 'red');
		$('#icibaWin').append("<div id='similarBox' style='width: 100%;'></div>");
		// 给弹框设置层级
		$('#icibaWin').css('zIndex',2000);
		// 设置 在线答疑 字体颜色
		// $('input[value=在线答疑]').css('color', 'red');
		init_no_paste_by_snt()
	});

	$('#icibaWinClose').click(function () {
		$('#similarBox').html('');
	})
}

function init_no_paste_by_snt(){

	if( _no_paste == "1"){
		var cobj = $('#now_snt');
		if(arguments.length>0) cobj=arguments[0];
		cobj.bind("contextmenu", function() {  return false;});
		cobj.keydown(function(e){ if (e.keyCode==86 && e.ctrlKey ){alert('您的老师启用了“禁止粘贴”选项 '); return false;}});
		cobj.bind( 'dragenter', function (e) {
			$(this).attr('disabled',true);
			F.show("请勿拖拽","<div style='padding:10px 0 20px 0;'>老师启用了“禁止粘贴”选项 请勿拖拽</div>"
				,[[ function(){ cobj.attr('disabled',false); F.hide(1) }," 回到写作 "] ],400,0);

			return false;
		} );
	}
}

function SntModify(s_obj){
	_snt_is_change= true;
	var str = $('#now_snt').val();	
	s_obj.find('.sentTxt').text( str ).css('color','blue').addClass("snt_change"); 
	var d ={};

	d.s1 = encodeURIComponent( _snttxt );
	d.s2 = encodeURIComponent( str  );
	d.essay_type= _ttype==undefined? '':_ttype ;
	 
	d.k= _request_id+'_'+_eid+'_'+_version+'_' + _sid+'_'+_realsid;
    var sobj = $('#rescoreTxt');
    if(sobj.length>0){
        console.log( "score:"+ sobj.text()+", dtime=" );
        d.score= sobj.text();
    }
    d.timing= ( Math.round(new Date() / 1000) - st.modify_time );

	F.hide(1);
	$.post(_self+'?c=ajax&a=save_snt_modify',d,function(d1){
		 
	});

	try{ if('15'==_ttype) requestChat( _request_id,'[提交] 提交修改作文，第'+ _sid +'句'   );
	}catch(e){ 	}
}

var mEssaySents = new Array();

function sent_save_anly(){
	var str='';
	var is_duan = false ; 
	mEssaySents = [];
	pid = 1;
	$('.view3Item').each(function(){
		var obj = $(this);

		var a_countent =  obj.find('.view3Sent').attr('content');
		  
		 if( a_countent =='-1' || a_countent =='-2' ) return true;
		 var c_name = obj.attr('class').toLocaleLowerCase() ;
		 if( c_name.indexOf('view3duan')>0 ) {
			 //str+="\n";
			 is_duan  = true;
			 pid++;
		 }else{
			 
			 snt =  obj.find('.sentTxt').text();
			 var old_snt= '';
			 var old_obj = obj.find('.new_sentTxt') ;
			 if( old_obj.length>0 ){
				 old_snt = old_obj.text();
			 }

			 old_color = obj.find('.sentTxt').attr('class');
			 is_change = old_color.indexOf('snt_change')>-1?1:0;

			 if( old_snt!='' &&  is_change==0){ snt= old_snt; }

			 if( is_duan && snt.indexOf("\n")<0  ){
				 snt="\n"+ snt ;
			 }
			 str+= snt ;
             if(snt.lastIndexOf('.')<0){
                is_duan = true;
             }else{
                 is_duan= false;
             }

			 var sntItem={};
			 //console.log('[debug sid]'+a_countent +"\told_color:"+ old_color);
			 sntItem.sid=  a_countent;
			 sntItem.pid= pid;			 
			 sntItem.snt= snt;
			 sntItem.is_change = is_change ;
			 
			 mEssaySents.push( sntItem );
		 }
		 //return false;
	});
	//alert( str );	return false;
	//console.log('mEssaySents',mEssaySents);	return false;

	var data={};
	data.utContent = encodeURIComponent( $.trim( str ,"\n"));
	data.utTitle = encodeURIComponent( $('#swTitle').text() ); 
	data.rid= _request_id ;
	data.eid= _eid ;
	_snt_is_change = false;
	//将修改的句子打包进来
	if(  typeof mEssaySents!= 'undefined' && mEssaySents.length>0 ){
		data.msnts= mEssaySents; 
	}
	postSave2( data );
}

function online_ask(){
	var snt = $('#now_snt').val();
	wim(encodeURIComponent(snt));
    // window.open("http://wim.pigai.org/?snt="+encodeURIComponent(snt))
}

function similarSnts() {
	var tm = new Date().getTime();
	var sign = md5(tm +  "!#@PGyyd" + _eid);
	var snt = $('#now_snt').val();

	$.ajax({
		url:'/?c=write&a=similarSnts',
		data: {'snt': snt, 'eid': _eid, 'tm': tm, 'sign': sign},
		dataType: 'json'
		,type: 'GET'
		,success:function(rep){
			if (rep.error == 100) {
				var htmlStr = '<div style="width: 90%;padding: 10px 0 10px 0;border-top:1px solid #ddd;">共找到'+rep.data.total_num+'句供你参考，点击句子替换：<span snt="'+snt+'" onclick="recoverSnt(this)" style="display: inline-block;color: #336699;float: right;cursor: pointer;">还原</span>';
				var listStr = '';
				for (var i=0; i < rep.data.snts_arr.length; i++) {
					var index = i + 1;
					listStr += "<div style='padding:5px;border-bottom:1px solid #ddd;cursor: pointer;'>"+index+".<span onclick='replaceSimilarSnt(this)'>"+rep.data.snts_arr[i]+"</span></div>";
				}
				htmlStr += listStr;
				if (rep.data.snts_arr.length < rep.data.total_num) {
					htmlStr += '<div onclick="showVipBox()" style="padding: 10px;background: red;text-align: center;' +
						'font-size: 16px;margin-top: 20px;cursor: pointer;width: 150px;border-radius:5px;letter-spacing: 1px;color: #fff;">查看剩余内容</div>';
				}
				htmlStr += '</div>';
				$('#similarBox').html(htmlStr);
			}else {
				msg(rep.error_des);
			}
		}
	});
}

function AISnts() {
	var snt = $('#now_snt').val();
	$.ajax({
		url:'http://api.jukuu.com:8006/paraphrase',
		data: {'snt': snt, 'num_beams': 10, 'num_beam_groups': 10, 'num_return_sequences': 10, 'repetition_penalty':10,'diversity_penalty':3,'no_repeat_ngram_size':2,'temperature':0.7,'max_length':1000},
		dataType: 'json'
		,type: 'GET'
		,success:function(rep){
			if (rep.length > 0) {
				var htmlStr = '<div style="width: 90%;padding: 10px 0 10px 0;border-top:1px solid #ddd;">共找到'+rep.length+'句供你参考，点击句子替换：<span snt="'+snt+'" onclick="recoverSnt(this)" style="display: inline-block;color: #336699;float: right;cursor: pointer;">还原</span>';
				var listStr = '';
				for (var i=0; i < rep.length; i++) {
					var index = i + 1;
					listStr += "<div style='padding:5px;border-bottom:1px solid #ddd;cursor: pointer;'>"+index+".<span onclick='replaceSimilarSnt(this)'>"+rep[i]['snt']+"</span></div>";
				}
				htmlStr += listStr;
				// if (rep.data.snts_arr.length < rep.data.total_num) {
				// 	htmlStr += '<div onclick="showVipBox()" style="padding: 10px;background: red;text-align: center;' +
				// 		'font-size: 16px;margin-top: 20px;cursor: pointer;width: 150px;border-radius:5px;letter-spacing: 1px;color: #fff;">查看剩余内容</div>';
				// }
				htmlStr += '</div>';
				$('#similarBox').html(htmlStr);
			}else {
				msg(rep.error_des);
			}
		}
	});
}

function showVipBox() {
	F.show('<div style="text-align:center;font-size:18px;font-weight:bold;margin-left:55px;margin-top:50px;color:#68726f;">你需要升级成VIP才可以查看详细按句点评</div>',
		'<a href="index.php?c=v2&a=payCenter" style="color:#fff;"><div style="height:54px;width: 360px;font-size: 18px;text-align:center;margin-top:77px;' +
		'line-height:54px;margin-left:38px;background:#f26665;border: 1px solid #f26665;border-radius:5px;">' +
		'升级VIP</div></a>',288,480);
}

// 用相似句子替换当前句子
function replaceSimilarSnt(obj) {
	$('#now_snt').text($(obj).text());
	return false;
}

// 恢复原句
function recoverSnt(obj) {
	$('#now_snt').text($(obj).attr('snt'));
	return false;
}

function xiangshiv5( fdata,fun ){
	$.ajax({
		url:'/?c=ajax&a=essaylistCopyV5',
		data: fdata,
		dataType: 'json'
		,type: 'POST'
		,success:function(rep){
			if(rep.stats=200 ){
				fun( rep );
			}
		}		
	});
}
//悬赏批改
function pigai_reward(eid){
    var that = $(this); 
    $.ajax({
            url:'https://open.pigai.org/d3/xuanshang/create_qcode.php?essay_id='+eid,
            dataType: 'text'
            ,type: 'GET'
            ,success:function(rep){
                var htmlStr='<img src="'+ rep +'">';
                
                F.show('微信扫码悬赏找高手帮你改作文',htmlStr,[],500,'' );
            },fail:function(){
                alert('网络错误，请刷新重试');
            }		
    });
    
}

function pigai2_copy5( conf ){
	var config= {'version':'','eid':'','rid': '','xs':0}
	$.extend(config,conf );
	config.xs = parseFloat( config.xs );
	//alert( );
	if( config.xs<=0)  return;
	if( config.version=='' ||config.eid=='' ||config.rid=='' )  return;
	fdata= 'rid='+config.rid +'&e_v='+config.eid+'_'+config.version+'&xs='+config.xs/100;
	//alert( fdata );
	xiangshiv5(fdata,function(rep){
		//alert(rep.stats);
		//console.log(rep);
		if(rep.stats==200 ){
			 for( p in rep.sm  ){
				 iobj =  rep.sm[p]; 
				 if(iobj.max<  config.xs ) return;	

				 var is_show_xs = false ;
				 var xs_msg = '当前作文相似度'+iobj.max+'，查看 <a href='+iobj.url+'>相似详情</a>';
				 if( $('.score_xs').find('.wx_qrcode').length>0 ){
					 $('.score_xs').find('.wx_qrcode').html('相似').click(function(){
						 var that = $(this);
						 // var htmlStr='<img src="'+ that.attr('href') +'">';
						 // F.show('微信扫一扫查看相似详情',htmlStr,[],500,'' );
						 window.open(that.attr('href'), '_blank');
						 return false;
					 });

					 $('#xs_detail').click(function(){

					 });
					 is_show_xs = true;
					 xs_msg = '当前作文相似度为过高，可能会被认定为抄袭，查看 <a href="javascript:void(0)" onclick="wx_qrcode_pop()">相似详情</a>';

				 }else if( $('.score_xs').find('b').length>0 ){
					 $('.score_xs').find('b').html('相似');
					 is_show_xs =true;
				 }else if( $('.score_xs').find('a').length>0 ){
					 $('.score_xs').find('a').html('相似').attr('href', iobj.url);
					  is_show_xs =true;
				 }
				 if( $('#pigai_xstis_a').length>0 ){
					 $('#pigai_xstis_a').html('最高相似：<a href="'+ iobj.url+'" target="_blank">'+iobj.max+'%</a>');
					  is_show_xs =true;
				 }
				 try{ if( is_show_xs ) {tipsobj.add(xs_msg); $('.essay_tags').append('<span class="xiangsi_tag">相似</span>');}			 }catch(e){}
				 break;
			 }
		}
	})
}

// 弹出相似微信小程序码
function wx_qrcode_pop() {
	var url = $('.wx_qrcode').attr('href');
	// var htmlStr='<img src="'+ url +'">';
	// F.show('微信扫一扫查看相似详情',htmlStr,[],500,'' );
	window.open(url, '_blank');
	return false;
}


function tipsClas (){
	var tui={
		tips :$('.tips_head'),
		ul: $('.tips_head').find('ul')
	}
	var self= this;
	var tipsStart=function(){
		checkShow();		
	}
	var checkShow=function(){
		if( tui.ul.find('li').length >0 ){
			tui.tips.show();
		}else 	tui.tips.hide();	
	}
	this.add=function( str ){
		tui.ul.append('<li>'+ str +'</li>');
		checkShow();
	}
	tipsStart();	
}

var tipsobj=null ; 

function  initTipsHeader(){	
	tipsobj= new tipsClas();
}


function regPenyou(){
	$('.s_pengyou').hover(function(){
			try{
				obj = $('#pigai-qrcode');
				if(obj.data("open")!='1'){					
					obj.qrcode({ text:obj.attr('content') ,'width': 120,'height': 120 	});
					obj.data("open",'1');
				}
				obj.show();
			}catch(e){
			}
		}
		, function(){ obj.hide(); });
}

function modifyWall( rid ){

	$.ajax({
		url:'/wall/wall/count/'+rid,
		dataType: 'json'
		,type: 'GET'
		,success:function(rep){
			console.log('wall',rep );
			let cnt =rep.data.cnt;
			if(cnt>0){
				if(cnt>999) cnt='999+';
				$('.pigai-wall-count').html( cnt);
				$('.pigai-wall').show();
			} 
	}});

	function pigai_toggle(){ $('#pigai_ct').toggle();   }
	$('.pigai-close').click(function(){
		let iframeDom= document.getElementById('iframe100001');
		iframeDom.contentWindow.postMessage("closeMessage", "*");
		pigai_toggle();
	});
	$('.pigai-wall').click(function(){
		pigai_toggle();
		$('#iframe100001').attr('src', '/wall/view/rid/'+rid  ) ;
	});

}
