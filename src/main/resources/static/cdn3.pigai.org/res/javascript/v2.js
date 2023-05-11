function initHx(){
	$('.snt_hx').find('.snt_bt').click(function(){
		var ds = $(this).parents('.snt_hx').find('.snt_info').css('display');
		if(ds=='none'){
			$(this).parents('.snt_hx').find('.snt_info').css('display','block');
			$(this).html(">>收缩");
			$(this).parents('.snt_hx').css('background-color','#d0d0d0');
		}else{
			$(this).parents('.snt_hx').find('.snt_info').css('display','none');
			$(this).html("<<展开");
			$(this).parents('.snt_hx').css('background-color','#ffffff');
		}
	});
}

function initBaogao(){
	$('.ss').find('a').click( function(){ 
		var cls=  $(this).attr( 'content'); 
		if( $('.'+cls).css('display')!='none' ){
			$('.'+cls).hide();
			return;
		}
		$('.ss_item').hide();
		$('.'+cls).show();
	});
	$('.ss_ch').show();
}

var showAll = function(){var str = $('#allpingyu_txt').attr('content');		msg2( str );}


var scoreEnterCnt=0;

$(function(){
	$(document).keydown(function( e ){
		//if( e.keyCode==13 ) alert( scoreEnterCnt );
		
		if(e.keyCode==13 ) {
			e = e || window.event;
			var x = e.target; 
			//alert( x.id );
			if(x.id=='rescoreTxtV'  ) return ; 
			if( scoreEnterCnt==1 ) scoreEnterCnt=2;
		}
	});
});

//评语 评分
function initDafenPingYu(){ 
	//评语
	$('#repinyu').click( function(){ 
		var _that= $(this);
		var str = $('#teacher_yijian').val(); 
		str = $.trim( str );
		if( str==''){ alert("评语内容不允许为空！") ;  $('#teacher_yijian').focus();return ;}
		var data = { essayid:_eid , txt:encodeURIComponent(str)};
		$('.repingyTs').html( '提交中...' );	
		$('.repingyTs').show();

		if( _that.attr("content")=="1") return false ;
		_that.attr("content","1");
		
		$.post(_self+"?c=ajax&a=addPy",data,function(d){ 
			var ss=  $.trim(d)=='1' ? "评语修改成功！" :"发生错误！";
			$('.repingyTs').html( ss );	
			$('.repingyTs').fadeOut( 4000 );
			_that.attr("content","0");
		});
	});
	
	//评分
	$('#rescore').click( function(){ 
		var str= $('#rescoreTxt').text();
		var htmlStr = '<div ><iNPUT TYPE="text" id="rescoreTxtV" value="'+str+'" style="font-size:60px;line-height:60px;width:200px;">';
		htmlStr +='<div style="padding-bottom:10px;font-size:12px;color:#7d7d7d">请在输入框输入分数，比如88.5</div>';
		htmlStr +='</div>';
		if(J.readCookie('_APIF')=='xuekewangpigai'){
			F.show('打分-学科网批改通',htmlStr,[ [postScore2,' 确 认 '] ,[ F.hide ,' 取 消 ']],300,0);
		}else if(J.readCookie('_APIF')=='yidong_zpg'){
			F.show('打分-智批改',htmlStr,[[postScore2,' 确 认 '] ,[ F.hide ,' 取 消 ']],300,0);
		}else{
			F.show('打分-批改网(pigai.org)',htmlStr,[ [postScore2,' 确 认 '] ,[ F.hide ,' 取 消 ']],300,0);
		}
		$('#rescoreTxtV').select().keydown(function( e ){
			if(e.keyCode==13){ scoreEnterCnt=1; postScore2();		}
		});
		 
	});

	$('#teacher_yijian').click( changeBt );
	var str = $('#teacher_yijian').val();
	$('#teacher_yijian').attr('content',encodeURIComponent(str) );
	
	$('#teacher_yijian').blur( function(){
		var str = $('#teacher_yijian').val();
		if(encodeURIComponent(str)==$('#teacher_yijian').attr('content') ) return ;
		$('#repinyu').click();
	});
}
function changeBt(){
	//alert('good news');
	$('#repinyu').removeClass('st_py');
}
function postScore2(){
	var str= $('#rescoreTxtV').val();
	var manfen = $('#rescoreTxt').attr("content") ;  
	str = DBC2SBC(str);
	str = parseFloat( $.trim(str));
	s =   parseFloat( $.trim(manfen));
	manfen= 100;
	if( !isNaN( s ) && s>0 ){ manfen=s;} 
	if( isNaN(str) ){ 
		alert("请使用数字给学生评分！");
		$('#rescoreTxtV').select();
		return false;
	}
	if( str>manfen ){
		alert("本文满分为："+manfen+",请填写不超过 "+manfen+" 的数字！");
		$('#rescoreTxtV').select();
		return false;
	}
	y = str*10%10; 
	y2= str*10%5; 
	if(y<3 ) str= parseInt(str);
	if(y>=3 &&  y<7) str= parseInt(str)+0.5;
	if(y>=7) str= parseInt(str)+1;

	if(str<0  ){
		alert("给学生一些鼓励，请打高些");
		$('#rescoreTxt').focus();
		return false;
	}
	if(y2>0) alert("系统已帮助您做标准化为"+str+"分!");
	//$.post($.post(_self+"?c=ajax&a=getEssay",{essayid:_eid},function(d){	});
	var data= {essayid:_eid,score:str};
	if( $('#bs_py').length>0 ){	
		data.py= $('#bs_py').val(); 	
	}
	msg2("正在提交......");
	$.post(_self+"?c=ajax&a=scoreV2",data,function(d){
		F.hide(); 
		if( $.trim(d)=='1'){				
			$('#rescoreTxt').html(str); 
			if($('#swNextHref').length>0 && scoreEnterCnt==2 ){
				msg2("提交成功，正在载入下一篇");
				url=$('#swNextHref').attr('href'); 
				location.href= url;
			}
			try{ scoreCricle(); } catch(e){}
		}else if( d.indexOf("msg")>=0 ){
			alert( d.replace("msg","错误") );
		}else{ alert("发生错误！"); }
	});
	
}



function initCixing(){
	//alert("good news");
	$('.kps').click( function(){
		//alert("good news ");
		var list=( $(this).attr('content') );		 
		var arr= list.split(',');
		$('.ssDim').find('span').removeClass('select');
		for(var i=0; i<arr.length ; i++){
			  var sid= 'd_'+arr[i];
			  //$('#'+sid ).css('color','red')  ;
			  $('#'+sid ).addClass('select')  ;
		}
	});
}

function DBC2SBC(str)
{
	var result = '';
	for(var i=0;i<str.length;i++){
		code = str.charCodeAt(i);//获取当前字符的unicode编码
		if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
		{
		result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
		}else if (code == 12288)//空格
		{
		 result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
		}else
		{
		result += str.charAt(i);
		}
	}
	return result;
}


function initError(){
	//alert("good news");
	$('#error_type').change(function(){ 
		var ecat = $(this).val(); 		
		//alert( ecat );
		displayError( ecat );
	});
	$('#rankword_type').change(function(){ 
		var ecat = $(this).val(); 
		//alert( ecat );
		displayRankword( ecat );
		//displayError( ecat );
	});
}
function displayRankword( ecat ){
	clearParahtml();
	if( ecat=="-1") return ;
	//alert( rk_word[ecat].length );
	var html= $('#parahtml').html();
	if('undefined'== typeof rk_word[ecat] ) return false;
	
		for(i=0;i<rk_word[ecat].length; i++ ){
			if( rk_word[ecat][i] =="class" ||  rk_word[ecat][i] =="style" ) continue;
			eval('var reg=/([^a-z_])('+ rk_word[ecat][i] +')([^a-z_])/ig');
			html= html.replace(reg,'$1<b>$2</b>$3');
		}
		$('#parahtml').html( html ); 
	
	
}
function displayError( ecat ){
	clearParahtml();
	//
	for( p in  fb_js){
		if( fb_js[p].category == ecat ){ 
			//alert(  fb_js[p].sid+":"+ fb_js[p].kp );
			//alert( fb_js[p]  );
			for(i=0 ; i<fb_js[p].sid.length; i++ ){
				var tSent = $('#s_'+fb_js[p].sid[i]).text() ;
				eval('var reg=/([^a-z_])('+fb_js[p].kp+')([^a-z_])/ig');
				if( reg.test( tSent ) ){
					tSent=tSent.replace(reg,'$1<b>$2</b>$3');
					$('#s_'+fb_js[p].sid[i]).html( tSent );
				}else{ 
					//匹配句子
					//$('#s_'+fb_js[p].sid[i]).addClass("dp_sent"); 
					//$('#s_'+fb_js[p].sid[i]).attr("content", p); 
				}

				var iobj= $('#i_'+ fb_js[p].sid[i])  ;
				if( iobj.length >0 ){
					//alert( iobj.length );
					var itext= iobj.text();
					iobj.text( parseInt(itext) +1) ;
				}else{
					$('#parahtml').find('#s_'+fb_js[p].sid[i]).before('<i content="'+ecat+'"   id="i_'+fb_js[p].sid[i]+'"  class="isnts">1</i>') ;
				}
			}
		}
	}
	initErrorEvent();
}

function initErrorEvent(){
	//alert("dddd");
	$('#parahtml b').hover( displayInfo , function( e){ /*hide(e);*/ } ); //$('#infotipW').hide();
	//$('#parahtml b').click( displayInfo );
	//$('#parahtml .dp_sent').click( displayInfo );
	//$('#contents').scroll( function(){ alert("good new"); $('#infotipW').hide(); } );
	$('#parahtml .isnts').hover( displayInfoIsnts , function( e){   } );
}

function displayInfoIsnts( event ){
	var ecat= $(this).attr('content');
	var id= $(this).attr('id');
	var sid =parseInt( id.replace('i_','') );
	//alert(sid);
	var html="";
	var ik=1;
	for( p in  fb_js){
		if( fb_js[p].category == ecat ){  
			for(i=0 ; i<fb_js[p].sid.length; i++ ){
				if( sid==fb_js[p].sid[i] ){
					html+= '<li>'+ik+' '+ fb_js[p].txt +'</li>' ;
					ik++;
				}
			}
		}
	}
	show( event ,'<ul>'+ html+'</ul>' );
	$('.sntselect').removeClass('sntselect');
	$('#parahtml').find('#s_'+sid).addClass('sntselect');
}
function callBack2(){
	//alert('dddd');
}
function displayInfo( event ){
	/* 
	if(  typeof $.powerFloat  !='undefined'){
		$(this).powerFloat({
				eventType: null,
				targetMode: "remind",
				target:'<div  id="from_txt"><div style="height:50px;width:400px">78</div></div>',
				position: "7-5",
				showCall:callBack2
			});
		return ;
	} */
	
	var kp= $(this).attr('content'); 
	  
	if( typeof kp =='undefined' ){
		var kp = $(this).text();		
	} 
	kp = kp.toLowerCase();  
	show( event ,fb_js[kp].txt );
}
function clearParahtml(){
	$('#parahtml span').each(function(i){
		$(this).text( $(this).text() );
		$(this).removeClass('dp_sent');
		$(this).attr('content','');
	});
}

getCoords=function (node){
        var x = node.offsetLeft;
        var y = node.offsetTop;
        var parent = node.offsetParent;
        while (parent != null){
                x += parent.offsetLeft;
                y += parent.offsetTop;
                parent = parent.offsetParent;
        }
        return {
                x: x,
                y: y
        };
}
function show( event ,txt ){
	//fb_js[kp].txt
	var html='<div id="infotip_bar"><b>x</b></div> <div id="infotip_txt">'+txt+'</div>' ;
	$('#infotipW').css("left", event.pageX +'px');
	$('#infotipW').css("top",(event.pageY +10)+'px');
	$('#infotip').html(  html  );
	$('#infotipW').show();
	$('#infotipW').css('opacity',0.9);
	$('#infotip_bar b').click( hide );
	 
}
function hide(event){
	//return ;
	$('#infotipW').hide();
	$('.sntselect').removeClass('sntselect');
}

function initTips(){
	/*$('.stips').hover(
		function(){
			//alert( "do news");
			var p= $(this).position();
			initDetail( this );
			$('#tipsContext').css({"left":p.left+"px","top":p.top+"px"} ).show("fast");
			
		},
		function(){ 			
		}
	);
	*/
	$('.stips').click(function(){ 
		var p = $( this).parent('li'); 
		var display = $(p).find('.snt_info').toggle();	
		var st= $(p).find('.snt_info').css("display");
		
		if(st!="none"){
			p.css("background-color",'#D0D0D0');
			$(this).addClass('stips2');
		}else{				 
			p.css("background-color",'');
			$(this).removeClass('stips2');
		}
	});
	$('.tipsGood').click(function(){
		var p = $( this).parents('li'); 
		// var id= p.attr('content') ;
		// var d={};d.id=id ; d.type=1;
		// feedbackByUser(d );
		tipsClassicGoodPost(p)
	});
	$('.tipsBad').click(function(){
		var p = $( this).parents('li'); 
		tipBad(p);
	});
	
	$('.tipsIgnore').click(function(){
		var p = $( this).parents('li');
		tipsIgnore(p);
	});

	$('.tipsClassicErr').click(function(){
		var p = $( this).parents('li');
        tipsClassicErrPost(p);
    })
	$('.tipsDel').click(function(){
		var p = $( this).parents('li'); 
		tipsDel(p) ;
	});
	 $('#tipsContext').hover(
		 function(){},
		 function(){ $('#tipsContext').hide(); }		 
	 );
}

function initDetail( ob){
	$('#tipsContextW a').unbind('click');
	var p = $(ob).parent('li');
	var sf = p.find('.snt_info');
	//展开
	if( sf.length>0 ){
		$('#tipsOpen').show();
		$('#tipsOpen a').click( function(){ 
			var st= $(sf).css("display");
			if(st=="none"){
				$(sf).css("display",'block');
				$(this).html("收缩");
				p.css("background-color",'#D0D0D0');
			}else{
				$(this).html("展开");
				$(sf).css("display",'none');
				p.css("background-color",'');
			}
		});
	}else{
		$('#tipsOpen').hide();
	}
	//end展开

	//删除
	if( $('#tipsDel').length>0 ){
		$('#tipsDel a').click(function(){ tipsDel(p);} );
	}
	//end 删除

	//好评
	$('#tipsGood a').click(
		function(){
			var id= p.attr('content') ;
			var d={};d.id=id ; d.type=1;
			feedbackByUser(d );
	} );
	//end好评
	
	//好评
	$('#tipsBad a').click( function(){ tipBad(p) } );
	//end好评
}

function tipsDel( p ){
	var pp= p.attr('content'); 
	var date ={'id':pp };
	$.post(_self+'?c=ajax&a=delFeedback',date,function(d){
		d = $.trim(d);
		if(d=='yes'){
			$(p).fadeOut();
		}else if( d.indexOf('msg')>=0 ){
			var str = d.replace('msg:','');
			alert("发生错误：\n"+str);
		}else{
			alert("发生错误！");
		}
	});
}

function feedbackByUser( date ){
	//alert( date.id);
	$.post(_self+'?c=ajax&a=kp_feedback',date,function(d){
				d = $.trim(d);
				if(d=='yes'){ 
					if( date.type==-1){
						$('#Chunkmsg').html("提交成功"); 
						//F.hide(1);
					}else{
						alert("提交成功");
					}
				}else if( d.indexOf('msg')>=0 ){
					var str = d.replace('msg:','');
					alert("发生错误：\n"+str);
				}else{
					alert("发生未知错误！");
				}
				if( date.type !=-1) F.hide(1);
	});
}

function tipBad(p){
	//alert( p.attr('content') );
	var htmlStr = '';
	htmlStr='<div id="chunkPigaiShow"><div style="display: none;" id="Chunkmsg">正在提交......</div>';
	htmlStr+='<div class="chunkPigaiShowContent">错误理由:<TEXTAREA name="error_txt" id="error_txt" ></TEXTAREA></div>';
	//htmlStr+="<input type='hidden' value='"+id+"' id='doc_note_id' />";
	htmlStr+='</div>';
	var btArrry=[ [function(){ tipBadPost(p); } ,' 保 存 ']];
	F.show('报错--批改网', htmlStr, btArrry, 500, 0);
	$('#error_txt').focus();
}

function tipsIgnore(p) {
	var d={};
	try{
		d.kp=  encodeURIComponent(p.attr('content')) ;
		d.cate = encodeURIComponent(p.attr('cate') );
		d.short_msg= encodeURIComponent( p.attr('short_msg'));
		d.essay_id= _eid;
		//alert('good news');
	}catch (e) {

	}

	$.post(_self+'?c=v2&a=ignore&do=add&_display=json',d,function(d){
		console.log(d);
		/*
		d = $.trim(d);
		if(d=='yes'){
			if( date.type==-1){
				$('#Chunkmsg').html("提交成功");
				//F.hide(1);
			}else{
				alert("提交成功");
			}
		}else if( d.indexOf('msg')>=0 ){
			var str = d.replace('msg:','');
			alert("发生错误：\n"+str);
		}else{
			alert("发生未知错误！");
		}
		if( date.type !=-1) F.hide(1);
		 */
	});
	p.hide();
}

function tipBadPost(p){
	$('#Chunkmsg').show(); 
	var d={};
	d.id= -1 ;// p.attr('content');
	d.type= -1;
	d.txt= $('#error_txt').val();
	var pp= p.parents('.view3Item');
	var snts = pp.find('.sentTxt').text();
	d.snt = encodeURIComponent(  snts );
	try{
		d.eid = _eid ;
		d.version= _version;
		d.kp= p.attr('content') ;
		d.cate = p.attr('cate') ;
	}catch(e){}
	feedbackByUser(d );

	return true;

	//bbs 开始	
	var str =  p.text() ; 
	var str2 = p.find('.snt_info').text() ;
	var url= 'http://bbs.pigai.org/plugin.php?id=pigai:pigai';
	str = str.replace( str2,'');
	str = $.trim( str );
	var msg ='[quote][color=blue]句子：[/color]'+snts+'';
	msg +="\n\r\n\r"+str+'[/quote]';
	if( d.txt &&  d.txt!='' ) msg += '[color=green]'+d.txt+'[/color]';
	var data='subject='+encodeURIComponent( substr(str,80 ))+'&message='+encodeURIComponent(msg);
	url += '&'+data;
	$.getScript( url );
	//end bbs 开始
	 
	return false;
}


function tipsClassicGoodPost(p){
	var d={};
    d.request_id = _request_id;
    d.snt = encodeURIComponent(   $.trim(p.attr('snt')) );
    d.title = encodeURIComponent($.trim($('#swTitle').text()));
    d.err= encodeURIComponent($.trim(p.attr('short_msg')));
    d.sid = p.attr('sid');
    // console.log(d);
    try{
        d.eid = _eid ;
        d.version= _version;
        d.cate = p.attr('cate') ;
    }catch(e){}
	$.ajax({
		type: 'POST',
		url: _self+'?c=ajax&a=classicGoodPost',
		data:d,
		success:function(res){
			console.log(res)
            msg2(res.error_des)
		}
	});

}

function tipsClassicErrPost(p){
    var d={};
    d.request_id = _request_id;
    d.snt = encodeURIComponent(   $.trim(p.attr('snt')) );
    d.title = encodeURIComponent($.trim($('#swTitle').text()));
    d.err= encodeURIComponent($.trim(p.attr('short_msg')));
    d.sid = p.attr('sid');
    // console.log(d);
    try{
        d.eid = _eid ;
        d.version= _version;
        d.cate = p.attr('cate') ;
    }catch(e){}
	$.ajax({
		type: 'POST',
		url: _self+'?c=ajax&a=classicErrPost',
		data:d,
		success:function(res){
			console.log(res)
            msg2(res.error_des)
		}
	})
}
//跟php 的 strlen 一样
function strlen(str, encode){
	var encodelen = 3;
	if(encode && encode.substr(0, 2).toLowerCase() === 'gb') encodelen = 2;
	var bytelen = 0;
	var chars = str.split('');
	for(i = 0; i<chars.length; i++){
		var urichar = encodeURI(chars[i]);
		bytelen += urichar.length == 1 ? 1 : urichar.length / 9 * encodelen;
	}
	return bytelen;
}

function substr(str,len, encode){
	var encodelen = 3;
	var re='';
	if(encode && encode.substr(0, 2).toLowerCase() === 'gb') encodelen = 2;
	var bytelen = 0;
	var chars = str.split('');
	for(i = 0; i<chars.length; i++){
		var urichar = encodeURI(chars[i]);
		bytelen += urichar.length == 1 ? 1 : urichar.length / 9 * encodelen;
		if( bytelen>=len ) return re;
		re+= chars[i];
	}
	return re;
}

function pigai_bbs_callback( id ){
	//alert(id);
	id = parseInt( id );
	if( id && id>0){
		//alert("id="+id);
		var url = "http://bbs.pigai.org/t"+id+'.html';
		msg2("您的报错已经提交至批改网论坛<br>请在论坛等待我们批改网工作人员回复<br><br><a href='"+url+"' target='_blank' onclick=\"javascript:F.hide(1);\">点击这里查看贴子</a>");
		 
	}else{
		F.hide(1);
	}
}


function init_select_word(){  
	$('#select_word').click(selectWord2 );
}

function selectWord2(){
	if(rk_word!=''){return '';}
	$('#select_word').html('Loading...');
	var type='';
	if(type=='localhost'){
		//ajax load
		$.post(_self+'?c=ajax&a=rankWord&eid='+_eid ,{},function(d){		 
				eval('var obj='+d);
				initRankWords2( obj ); 
		});
	}else{
		//js load
		$.getScript( 'http://kp.pigai.org/?c=api&a=rankWord&eid='+_eid );
	}
}

function initRankWords2(obj){
	try{ 
		rk_word=  obj.word ;
		var str ='<a href="/?c=test&a=help_1" target="_blank" title="词汇分级说明" style="font-size:12px;">词汇</a>:';
		str += '<select id="rankword_type" name="rankword_type"  style="width:78px;height:20px;overflow:hidden;">';
		str +='<option value="-1">选择词汇</option>';
		for( p in obj.cat){
			str += '<option value="'+p+'">'+obj.cat[p]+'</option>';
		}
		$('#select_word').html( str);

		$('#rankword_type').change(function(){ 
			var ecat = $(this).val(); 
			displayRankword( ecat ); 
		});
	}catch(e){
		//alert('good');
	}
}

function ps_del(){
	var re = confirm('确认删除？');
	if( !re) return false;
	var obj= $(this) ;
	var id= obj.attr('content') ;
	//alert( id );
	$.post(_self+"?c=ajax&a=ps_del",{'id':id},function(d){
		//alert( d );
		if( d=='1'){
			obj.parents( '.psitem').hide();
			msg2('删除成功！');
			return ;
		}else if(d.indexOf('msg:')>=0 ){
			msg2(d.replace('msg:','') );
		}else{
			alert("发生错误！");
		}
	});
}

function view_callback( eid,rid ){
	$.post(_self+"?c=ajax&a=v2Callback&eid="+eid+"&rid="+rid,{},function(d ){
		//alert(d );
		try{
			eval("obj="+d+";");  
			var str='第'+obj.rank.rank+'(共'+obj.rank.cnt+')，最高分:'+obj.rank.max+'，最低分:'+obj.rank.min+' <a href="/?c=v2&a=rankList&rid='+rid+'">排行榜</a>';
			$('#i_pm').html('排名：'+str );
		}catch(e){}
	});
}

function initTab( tab ){
    if(typeof writutor_conf != 'undefined'){
        $('#tab-reference span').show()
    }
	$('.ttab li').click(function(){
		$('.ttab li').removeClass('ttselect');
		$('.tabtext').hide(); 
		var id= $(this).addClass('ttselect').attr('content');
		$('#'+id).show();
		if( id=='pigai_tuijian'){
                    if(typeof writutor_conf != 'undefined'){
                        writuor_click(3,_uid)
                    }else{
                        pigai_tuijian(  _request_id , $('#'+id).find('.tabtext2') );
                    }
			
		}else if( id=='pigai_zhou' ){
			pigai_log( _eid);
		}
	});
	$('.ttab').find( 'li[content='+tab+']' ).click();

        $('#tuijian_title').attr('style','display:block;color:#999;');
        $('#tuijian_title a').attr('style','color:gray')
        $('[data-id=1]').attr('style','color:#297ACC')

}

function tuijian_click(type){
    var id = $('.ttselect').attr('content');
    var obj = $('#'+id).find('.tabtext2')
    $('#tuijian_title a').attr('style','color:gray')
    $('[data-id='+type+']').attr('style','color:#297ACC')
    if(type == '1'){       
        pigai_tuijian(  _request_id , obj );
    }else if(type == '2'){
 
        pigai_tuijian_snt(  _request_id , obj );
    }else if(type == '4'){
        pigai_area_tj(  _request_id , obj);
    }
    
} 
function writuor_click(type,uid){
    var id = $('.ttselect').attr('content');
    var obj = $('#'+id).find('.tabtext2')
    $('#tuijian_title a').attr('style','color:gray')
    $('[data-id='+type+']').attr('style','color:#297ACC')
    $.post(_self+"?c=ajax&a=writutor&eid="+_eid+"&rid="+_request_id+"&uid="+uid+"&v="+_version,{},function(d ){
        obj.html( d.data );
    });

}
function pigai_tuijian( rid, obj ){
	$.post(_self+"?c=ajax&a=tuijianlist&rid="+rid,{},function(d ){
		obj.html( d );
	});
}
function pigai_tuijian_snt( rid, obj ){
	$.post(_self+"?c=ajax&a=sentList&rid="+rid+"&v="+_version,{},function(d ){
		obj.html( d );
	});
}
/**
 * 区域推荐
 */
function pigai_area_tj( rid, obj){
    $.post(_self+"?c=ajax&a=areaList&rid="+rid,{},function(d ){
         obj.html( d );
    });
}
function pigai_log( eid ){
	if('1'==$('#zhouhtml').attr('content')){
		return ; 
	}
	$.ajax({
	   type: "POST",
	   url: _self+"?c=ajax&a=essay_log" ,
	   data: "eid="+eid,
       dataType : 'json' 
	}).done(function(rep){
		   var str='';
		   if( typeof rep.error!='undefined'){
			    $('#zhouhtml').html( rep.error );
			   return ;
		   }
		   for(p1 in rep){
			   str+='<div class="zhou"><div class="zhoup"><em>&nbsp;</em><span>'+p1+'</span></div><ul class="zhoulist">';
			   var tp=rep[p1];
			   for(p2 in tp){
				   tpp= tp[p2];
				   str+='<li class="z_'+tpp.type+'">['+tpp.time+'] '+tpp.u+tpp.txt+'</li>';
			   }
			   str+='</ul></div>';
		   }
		   $('#zhouhtml').html( str ).attr('content','1');
	}); 
}

function scoreCricle(){
	var sc= $('#scoreCricle');
	var sobj = $('#rescoreTxt');
	if( sc.length==0 ){
		sobj.after("<div id='scoreCricle'></div>" );
	} 

	try {
		var mafen = parseFloat(sobj.attr('content'));
		var score = parseFloat(sobj.text());
		if (mafen <= 0 || mafen > 100)mafen = 100;
		var myCircle = Circles.create({
			id: 'scoreCricle',
			value: score,
			maxValue: mafen,
			radius: 42,
			width: 7,
			colors: ['#BEE3F7', '#45AEEA']
		});
		sobj.hide();
	}catch(e){	 	}
}


