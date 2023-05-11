_isPost = true;
function postSave2( data ){
	
	

	if( $('.tips').length>0  ){ alert( $('.tips').text() ); return;}

	try{
		if( $('#c_limit_tj').val()=='1' ){			
			var rs = confirm("提交之后，即结束考试。确定提交？");
			if( !rs ) return false;
		}		
	}catch(e){ }


	var mst_str = "<div>正在提交作文...</div>";	
	mst_str += "<div style='font-size:12px;padding-top:12px;line-height:20px;display:none;' id='pigai_nosave'>";
	mst_str +="系统有点儿忙，建议先保存为Word文档 ，30分钟后再尝试";
	mst_str +="<br>紧急情况下请发邮件至 pigai@jukuu.com 由工作人员帮助提交";
	mst_str +="<br>（发邮件的时候请加上学生账号、作文号和正文）";
	mst_str += "</div>";

	msg2(mst_str); 
	try{
	setTimeout( function(){ $('#pigai_nosave').slideDown(   );} ,10000);
	}catch(e){} 

	

	$.post( _self+"?c=ajax&a=postSave",data,function(d){
		var dmsg=d.trim();
		if(  dmsg.indexOf('eid')==0 ){
			 var eid = dmsg.replace('eid=','');
			 //F.hide();
			 try{ saveUserdata('editor', '' );}catch(e){  }
			 //F.hide();
			 var re = true;// eid=="2" ? true : confirm("作文已经成功提交给老师!\n\n是否等待些时间立即查看结果？");
			 //alert( 'good');
			if(data.rid != 10) {
                try{
                    if( data.utContent.length>20000 ) {
                        alert( "您的作文已经提交成功！\n\n作文属于长篇文章，系统将启动后台分析程序！" );
                        location.href='/';
                        re = false;
                    }
                }catch(e){ }
			}

			 try{
				 if( _save_first=="1"){
					 F.hide(1);
					 alert( "作文已经提交成功！\n\n老师设置了后台分析。\n\n如果想继续完善，回到页面后请点击“完善”" );
					 //location.href= _self+'?c=v';
					 location.href= '/?c=write&a=view2&eid='+eid;
					 re = false;
					 return ;
				 }
			 }catch(e){
			 }
			 if( re){
				 
				 //spssAnly( eid ,data);		
				if( typeof data.utTitle =="undefined" ){
					var cStr= $('.from_contents').val();
					var cTitle= $('#title').val();
					spssAnly2015( eid, encodeURIComponent(cTitle) , encodeURIComponent( cStr),data);
				}else{
					spssAnly2015( eid, data.utTitle , data.utContent,data);
				}
				 

			 }else{
				 location.href = _self;
			 }
		}
		else if( dmsg.indexOf('msg')>=0){
			str= dmsg.replace('msg:','');
			F.hide(1);
			if( dmsg.indexOf('浏览器')>=0 ){
				//F.hide();
				//postTar( data , _self+"?c=write&a=postSave" );
				msg2( '不幸，没有提交成功！<br>建议：请将您的作文复制（即使禁止粘贴也能复制用Ctrl+C）保存到word里！然后更换浏览器再提交，推荐用谷歌浏览器或者联系我们客服！<br><a href="http://bbs.360safe.com/thread-2393278-1-1.html" target="_blank">为什么提交不成功？</a>' ); 
			}else{
				if( str.indexOf('e_')==0 ){
					location.href='/?c=v2&a=cashview&rid='+str ;
					return;
				}

				if (str != '作文内容超出300词上限，开通年VIP，最高支持10000词批改。'){
					msg2(str);
					return false;
				}

				// 限制数量
				$.ajax({
					url:'/?c=api&a=getLimitNum',
					success:function(res){

						var leftNum = (5-res.data) > 0 ? (5-res.data):0;

                        F.show('开通VIP', '<div style="height:450px;"><div style="margin-left: 5px;">' + str + '</div><div class="price-wrapper">' +
                            '<a class="price-box price-box-active" data-type="1" data-price="48.00">' +
                            '<div class="sameMark">送相似检测一年</div><div class="price"><span class="price-unit">¥</span><font class="price-tag">48.00</font>/年<div class="origin-price"><del>¥96</del></div></div>' +
                            '</a>' +
                            '<a class="price-box" data-type="2" data-price="99.00">' +
                            '<div class="sameMark">每日限量 还剩'+leftNum+'个</div><div class="price"><span class="price-unit">¥</span><font class="price-tag">99.00</font>/3年<div class="origin-price"><del>¥288</del></div></div>' +
                            '</a>' +
                            // '<a class="price-box" data-type="3" data-price="899.00">' +
                            // '<div class="sameMark">送论文人工精批</div><div class="price"><span class="price-unit">¥</span><font class="price-tag">899.00</font><div class="origin-price"><del>¥2400</del></div></div>' +
                            // '</a>' +
                            '</div>' +
                            '<div class="price-desc" style="margin-top: 15px;">相似检测：开通服务1年内，当作文提示相似时，可免费查看相似详情。</div>' +
                            '<div style="width: 100%;text-align: center;margin-top: 50px;"><div style="display: flex;flex-flow: row;width: 60%;height:164px;">' +
                            '<div style="position: relative;">' +
                            // 图片
                            '<div style="position:relative;z-index:9;"><img class="qrcode-img" style="display: inline-block;" src="/?c=write&a=mixPay&type=1"></div>' +
                            // 图片四个角
                            '<span class="corner-lt"></span><span class="corner-rb"></span><span class="corner-lb"></span><span class="corner-rt"></span>' +
                            '</div>' +
                            '<div style="margin-top:50px;text-align:left;"><span class="current-unit">¥</span><font class="price-tag current-price">48.00</font><p style="color:#999;font-size:14px;">使用支付宝、微信扫码支付</p></div>' +
                            '</div>' +
							'<p style="color:red;font-size:14px;margin-top: 20px;">支付完成后，请先关闭弹窗，再重新提交</p>' +
							'<p style="color:red;font-size:14px;margin-top: 20px;">支付宝扫码，如支付页面加载失败，点击提示页面下方【刷新】即可</p>' +
                            '</div>' +
                            '</div>'
                            ,[], 400, 0);
                        $('#icibaWin').css({width:'650px',left:'600px'})
					}
				})
			}
			 
		}
		else{
			alert("发生错误！\n\n错误信息：\n"+dmsg);
			F.hide();
			postTar( data , _self+"?c=write&a=postSave" );
			return false; 
		}
		
	});
}
_spss_count=0;
_spss_eid='';
_icomet_cnt=0;
_iscoment_doing = 0;
function spssAnlyStartIcomet( eid ){
	_spss_eid = eid;
	_icomet_cnt=0;
	msg2('作文已提交成功，正在分析请勿关闭......'+spssAD());
	//spssAnlyProcessWithIcomet('abc');
	var icomet_channel='pg_'+eid+'_'+ parseInt( Math.random()*100000);
	var _imsgserver = '';//(_isNet !=undefined && _isNet=="1")?"":"http://imsg.pigai.org";
	if( typeof iComet != 'undefined' ){
		var comet = new iComet({
			channel: icomet_channel ,
			signUrl:_imsgserver+ '/icomet/sign',
			subUrl: _imsgserver+'/icomet/sub',
			callback: function(content){ 			
				try{
					eval("var obj="+content+";");
					
					if( typeof  obj.finished !='undefined' ){ //完成
						comet.stop(); ;
						_iscoment_doing =0;						
						if( typeof  obj.goto !='undefined' ){
							msg2('分析成功，正在跳转... '+spssAD()+'<div style="font-size:12px;color:#666666;padding-top:10px">长时间没有跳转请点击<a href="'+obj.goto+'">这里</a></div>');
							location.href= obj.goto ;
							return ;
						}
						processEndByIcomet( obj.key ); 
						return ;
						
					}else{
						var b_prs = getBar(obj);//
						if( b_prs>=0 ){
							initViewSqsV3( b_prs  );
						}
						//_iscoment_doing++;
					}

				}catch(e){
					errorPost('spssAnlyStartIcomet',content+ " catch:" + e.message  );
				} 
			},
			sign_fun:function( content ){   processStartIcomet( {"eid": eid,'icomet':icomet_channel }, comet  ); }
		});
	}else{
		processStartIcomet(  {"eid": eid } );
	}

}

function processStartIcomet( data ){
	 _iscoment_doing=1;
	 var comet = false;
	 if( arguments.length>1  ) comet= arguments[1];

	 //将修改的句子打包进来
	 if(  typeof mEssaySents!= 'undefined' && mEssaySents.length>0 ){
		data.msnts= mEssaySents; 
	 }
	$.post( _self+"?c=ajax&a=processStartIcomet",data ,function(d){
		if( typeof d === 'string' &&  d.indexOf('msg')==0 ){
			msg2( d.replace('msg:','') );
			if( comet!=false  ){
				comet.stop(); 
			}
		}else{
			try{ 
        if(typeof d === 'object') {
          var obj = d;
        } else {
          eval("var obj="+d+";");
        }
				if( obj.mcnt>0 ){
					 var ms = (obj.sleep/1000);
					 str = '作文已保存成功，正在分析<br><br>前面还有 <b>'+obj.mcnt+'</b>人，估计要等<b>'+ms +'</b>秒后分析';
					 if( ms>60 ){
						 str += "<div style='font-size:12px;color:#666666'>你的作文已经提交成功，分析结果等待的时间比较长，您可以先离开一会儿回来查看结果！</div>";
					 }
					  msg2(str);
				 }
				 
				 //setTimeout( function(){ processEndByIcomet( obj.key ); } ,4000 );
			}catch(e){
				errorPost('processStartIcomet',d +"======= eid:"+ eid + " catch:" + e.message); 
				msg2('作文已提交成功,点击<a href="javascript:;" onclick="processStartIcomet('+eid+');">这里</a>重新分析');
			}
		}
	});	
}


function processEndByIcomet( key ){
	/*
	if( _iscoment_doing ==1  ){
		setTimeout( function(){ processEndByIcomet( key ); } ,4000 );	
		return ; 
	}*/
	_icomet_cnt++;
	$.post( _self+"?c=ajax&a=processEndByIcomet" ,{'key':key},function(d){
		try{
			eval("var obj="+d+";");
			if( obj.error != undefined){
				msg2( obj.error );
				if( _GB_EID != undefined ){
					location.href='/?c=v2&a=view&eid='+ _GB_EID;
				}
				return ;
			}
			if(  obj.url != undefined && obj.url!='' ){
				msg2('分析成功，正在跳转... <div style="font-size:12px;color:#666666;padding-top:10px">长时间没有跳转请点击<a href="'+obj.url+'">这里</a></div>');
				location.href= obj.url ;
			}else if(_icomet_cnt<10 ) {
				//setTimeout( function(){ processEndByIcomet( key ); } ,(4+_icomet_cnt)*1000 );				
			}else{
				 
				//msg2('作文已提交成功,点击<a href="javascript:;" onclick="spssAnlyStartIcomet('+_spss_eid+');">这里</a>重新分析');
				

				errorPost('processEndByIcomet','_icomet_cnt:'+ _icomet_cnt+", key="+key );
				msg2('作文已保存成功！分析的人过多，请稍后查看分析结果');
				location.href= '/' ;
			}
		}catch(e){
			errorPost('processEndByIcomet',d  + " catch:" + e.message); 
		}
	});
}


function spssAnlyStart( eid ){
	
	//initViewSqsV2( eid );
	//html ='<span class="progressbar" id="uploadprogressbar" style="font-size:12px;">0%</span>';
	msg2('作文已提交成功，正在分析请勿关闭......');

	$.post( _self+"?c=ajax&a=processStart",{"eid": eid },function(d){
		 if(  d.indexOf('msg')==0 ){
			msg2( d.replace('msg:','') );
		 }else if( d==''){
			 _spss_count++;
			 if( _spss_count>10 ){
			 errorPost('spssAnlyStart',d +"======= eid:"+ eid+'===_spss_count:'+ _spss_count );
				//setTimeout( function(){ spssAnlyStart( eid ); } ,1500 );
				msg2('作文已提交成功,点击<a href="javascript:;" onclick="spssAnlyStart('+eid+');">这里</a>重新分析');
			 }else{
				  setTimeout( "spssAnlyStart("+eid +")", 5*1000);
			 }
			
		 }else{
			 _spss_count=0;
			 try{
				 //errorPost('spssAnlyStart',d );
				 
				 eval("var obj="+d+";");
				 if( obj.s =='ok'){
					 msg2('分析成功，正在跳转... <div style="font-size:12px;color:#666666;padding-top:10px">长时间没有跳转请点击<a href="'+obj.url+'">这里</a></div>');
					 location.href= obj.url ;
					 return;
				 }else{
					 if( obj.mcnt>0 ){
						 var ms = (obj.sleep/1000);
						 str = '作文已保存成功，正在分析<br><br>前面还有 <b>'+obj.mcnt+'</b>人，估计要等<b>'+ms +'</b>秒后分析';
						 if( ms>60 ){
							 str += "<div style='font-size:12px;color:#666666'>你的作文已经提交成功，分析结果等待的时间比较长，您可以先离开一会儿回来查看结果！</div>";
						 }
						  msg2(str);
					 }
					 spssAnlyProcessV2( obj.key,1);					 
				 }
				 
			 }catch(e){
				// alert("发送错误！");
				errorPost('spssAnlyStart',d +"======= eid:"+ eid + " catch:" + e.message);
				//setTimeout( function(){ spssAnlyStart( eid ); } ,1500 );
				msg2('作文已提交成功,点击<a href="javascript:;" onclick="spssAnlyStart('+eid+');">这里</a>重新分析');
				
			 }
		 }
	});
}

function errorPost( where,msg){
	msg +=" url:"+ location.href ;
	$.post( _self+"?c=ajax&a=errorPost",{"where": where,"msg":msg },function(d){
	});
}
function initViewSqsV3( numbar ){
	//alert( $( '#uploadprogressbar' ).length );
	var html ='<div>作文已提交成功，正在分析请勿关闭...</div>';
	//alert('good');
	try{
		if( $( '#uploadprogressbar' ).length<=0 ){			
			html +='<div style="padding-top:10px;"><span class="progressbar" id="uploadprogressbar" style="font-size:12px;">0%</span></div>';
			html+=spssAD();
			msg2( html);		
		}
		$( '#uploadprogressbar' ).progressBar( numbar );
	}catch( e ){
		html +='<div style="padding-top:10px;">分析已经完成:<b style="color:red;"> '+numbar +'%</b></div>';
        html+=spssAD();
		msg2( html);	
	}
}


function spssAD() {

	return '';
	var html='';
	html='<div style="padding-top: 10px;">';
	html+='<div style="float: left; width: 80px; height: 80px;"><img style="width: 100%;" src="/res/images/dtips.png"></div>';
	html+='<div style="float: left; text-align: center;color: green; ">分数上不去，老师来帮忙！<br>一对一辅导，手把手教你高分写作！ <br> <a href="/?c=test&a=rengong" target="_blank" style="text-decoration: none; color: red">点击求助高手</a> ' +
		'</div>';
	html+='<div style="clear: both"></div></div>';
	return html;
}

 

function spssAnlyProcessV2( key, i ){
	$.post( '/process/?q='+key,{},function(d){
		try{console.log("i="+i+"\n"+d);}catch(e){}
		 
		if(  d.indexOf('msg')==0 ){
			msg2( d.replace('msg:','') );
		 }else{
			 try{
				 i= parseInt(i)+1; 
				 if( d=='[]' ){
					setTimeout( function(){ spssAnlyProcessV2( key, i); } ,800+i*200 );
				 }else{
					eval("var obj="+d+";");
					if( typeof  obj.finished !='undefined' ){ //完成
						spssAnlyProcess( key, i); 
					}else{
						var b_prs = getBar(obj);//
						if( b_prs>=0 ){
							initViewSqsV3( b_prs  );
						}
						setTimeout( function(){ spssAnlyProcessV2( key, i); } ,800+i*200 );
					}
				 }

				 /*
				 if( obj.s =='ok'){
					 msg2('分析成功，正在跳转... <div style="font-size:12px;color:#666666;padding-top:10px">长时间没有跳转请点击<a href="'+obj.url+'">这里</a></div>');
					 location.href= obj.url ;
					 return;
				 }else{
					if( obj.s =='process' && obj.prs>0 ){
						initViewSqsV3(100*obj.prs );
					}
					setTimeout( function(){ spssAnlyProcess( key, i); } ,obj.sleep );
				 }*/
				 
			 }catch(e){
				 //msg2("发送错误！");
				errorPost('spssAnlyProcessV2',d + " catch:" + e.message  );
				setTimeout( function(){ spssAnlyProcessV2( key, i); } ,800+i*200 );
			 }
		 }

		 
	});
}

function getBar( obj ){
	try{
		var s = parseInt( 100*obj.cur/obj.sc );
		return s;
	}catch(e ){
		return -1;
	}
	return -1;

}

function spssAnlyProcess( key, i ){
	$.post( _self+"?c=ajax&a=process",{"key": key,"i":i },function(d){
		//alert(d );
		//return ;
		
		if(  d.indexOf('msg')==0 ){
			msg2( d.replace('msg:','') );
		 }else{
			 try{
				 i= parseInt(i)+1; 
				 eval("var obj="+d+";");
				 if( obj.s =='ok'){
					 msg2('分析成功，正在跳转... <div style="font-size:12px;color:#666666;padding-top:10px">长时间没有跳转请点击<a href="'+obj.url+'">这里</a></div>');
					 location.href= obj.url ;
					 return;
				 }else{
					if( obj.s =='process' && obj.prs>0 ){
						initViewSqsV3(100*obj.prs );
					}
					setTimeout( function(){ spssAnlyProcess( key, i); } ,obj.sleep );
				 }
			 }catch(e){
				 //msg2("发送错误！");
				 errorPost('spssAnlyProcess',d + " catch:" + e.message );
				 setTimeout( function(){ spssAnlyProcess( key, i); } ,800+i*200 );
			 }
		 }
		 try{console.log("i="+i+"\n"+d);}catch(e){}
		 
	});
}
function init_tj_copy(){
	 
	if(window.clipboardData) {
		window.clipboardData.clearData();
		try{
			var txt	="";
			txt +="作文号："+_rid;
			txt +="\n\n题目："+$('#title').val();
			txt +="\n\n"+$("#contents").val();
			window.clipboardData.setData("Text", txt);
			alert("复制成功！");
		}catch(e){
		}
	} else {

	}

	
}

function postTar( data, url){	
	var ft = document.getElementById("sponeLeftS");
	var f = document.createElement("form");
	f.action = url; 
	f.method = "post"; 
	//f.target='_blank';	
	
	for(var k in data){ 
		var hh = document.createElement("input");
		hh.type='hidden';
		hh.name= k;
		hh.value= data[k];
		f.appendChild( hh );
	}
	ft.appendChild( f );
	//alert('ddd5');
	f.submit();
	//alert('ddd4');
}

function spssAnly( eid , ddata ){
	var data={};
	data.eid = eid;
	//alert(typeof ddata.tiku_id );
	if(typeof ddata.tiku_id == 'undefined'){}
	else{ data.tid= ddata.tiku_id ; } 
	if(typeof ddata.engine == 'undefined'){}
	else{  data.engine= ddata.engine ; } 
	//msg2("作文提交成功！<br>正在对作文进行分析，请稍候……");
	initViewSqsV2( eid );
	$.post( _self+"?c=ajax&a=spssAnly",data,function(d){
		//alert( _utype );
		var dmsg=d.trim();
		if(  dmsg.indexOf('yes')==0 ){
			if( _utype=='guest' ){
				var sdata="cfg[mean]="+$('#mean').val()+'&cfg[mean_min]='+$('#mean_min').val()+"&cfg[mean_max]="+$('#mean_max').val();
				location.href= _self+'?c=spss&type=guest&a=viewone&cat_id='+_cat_id+"&ji=eng&did="+data.eid+'&'+sdata;
			}else if( _utype=='user' ){
				location.href= _self+'?c=v2&eid='+data.eid+'&a=view';
			}else{
				location.href= _self+'?c=spss&a=viewone&cat_id='+_cat_id+"&ji=eng&did="+data.eid;
			}
		}else if(  dmsg.indexOf('msg')==0 ){
			msg2( dmsg.replace('msg:','') );
		}else{
			alert("发生错误！");
		}
	});
}

var _GB_EID= '' ;
function spssAnly2015( eid ,title, doc, ddata ){
	
	try{ 
		_GB_EID= eid;
		//||  J.config.userId ==21
		var request_id= 0;
		if( typeof _rid != 'undefined'){
			request_id= _rid
		}else if( typeof _request_id != 'undefined' ){
			request_id= _request_id
		}
		//if( request_id ==10  &&   J.config.userId ==21   ){
			/*
		if( request_id ==10 || parseInt( eid )%5<4    ){
			spssAnlyStartIcomet(eid);
		}else{
			spssAnlyStart( eid);
			return ;
		 }*/

		 spssAnlyStartIcomet(eid);
		 return ;
		 
	 }catch( e){
		//spssAnlyStart( eid);
		spssAnlyStartIcomet( eid);
		return ;
	 }
	 return ;
	
	var data={};
	data.eid = eid;
	data.title = ( title) ;
	data.doc = ( doc ) ;
	//alert(typeof ddata.tiku_id );
	if(typeof ddata.tiku_id == 'undefined'){}
	else{ data.tid= ddata.tiku_id ; } 
	if(typeof ddata.engine == 'undefined'){}
	else{  data.engine= ddata.engine ; } 
	//msg2("作文提交成功！<br>正在对作文进行分析，请稍候……");
	initViewSqsV2( eid );
	$.post( _self+"?c=ajax&a=spssAnly",data,function(d){
		//alert( _utype );
		var dmsg=d.trim();
		if(  dmsg.indexOf('yes')==0 ){
			if( _utype=='guest' ){
				var sdata="cfg[mean]="+$('#mean').val()+'&cfg[mean_min]='+$('#mean_min').val()+"&cfg[mean_max]="+$('#mean_max').val();
				location.href= _self+'?c=spss&type=guest&a=viewone&cat_id='+_cat_id+"&ji=eng&did="+data.eid+'&'+sdata;
			}else if( _utype=='user' ){
				location.href= _self+'?c=v2&eid='+data.eid+'&a=view';
			}else{
				location.href= _self+'?c=spss&a=viewone&cat_id='+_cat_id+"&ji=eng&did="+data.eid;
			}
		}else if(  dmsg.indexOf('msg')==0 ){
			msg2( dmsg.replace('msg:','') );
		}else{
			alert("发生错误！");
		}
	});
}


function qm_click(){
	var tt_display = $(this).parents('.v2_rq_itme').find('.jiandan').css('display');
		//alert( tt_display );
		if(tt_display=='none'){
			$(this).parents('.v2_rq_itme').find('.jiandan').show();
			$(this).parents('.v2_rq_itme').find('.quanmian').hide();
			$(this).html('&gt;&gt;展开');
		}else{
			$(this).parents('.v2_rq_itme').find('.jiandan').hide();
			$(this).parents('.v2_rq_itme').find('.quanmian').show();
			$(this).html('&lt;&lt;收起');
		}
}

var pgQmClick=function(){
	$('.qm').click( qm_click );
}


function clock(){ 
	_is_clock= true;
}
function clock_init(){
	var ctime=1000;
	setTimeout( clock_init , ctime );
	//alert( ctime );
	if( _is_clock ){
		_c_time +=ctime ;
        if( typeof usedTs !='undefined' )usedTs +=ctime;
        //console.log(usedTs);
		s_time = _c_time/1000;
		var h = parseInt(s_time/3600);
		var m = parseInt((s_time%3600)/60);
		var s = parseInt(s_time%60);
		var str ='';
		if(h) str= h+":";
		if(m<=9) m  =  "0"+m ;
		str += m+":";
		if(s<=9) s = "0"+s ;
		str += s;

		$('.contentsW_bar_ctime span').html( str );//用时
		var ntime = $('#now_time span').attr('content');
		var nd = new Date(  parseFloat(ntime)*1000+ ctime ); 
		$('#now_time span').attr('content', parseFloat(ntime)+ ctime/1000 );
		var nd_str = (nd.getYear()>1000?nd.getYear():(nd.getYear()+1900) )+'-'+ (nd.getMonth()+1)+'-'+ nd.getDate()+ ' '+nd.getHours()+':'+nd.getMinutes()+':'+nd.getSeconds()  ;
		//$('#now_time span').text( nd.toLocaleString() );
		$('#now_time span').text(  nd_str  );
		var tips_len = $('.tips').length ;

		if(!J.config.isLogin) showLog("请先登录才能保存！");
		else if( _rid=='10'){
			showLog("自测作文不保存！");
		}else{
			var ts_count= 210;
			var sy= s_time%ts_count;
			if(sy==0){   saveData(); }
			if( sy>=30){ $('#after_time').html( (ts_count-sy)+ ' 秒后保存');		
			}else $('#after_time').html(''); 
		}
		if( _time_limit >0 &&  (_time_limit*60000-_c_time==5*60000 ) ){
			if( $('#requestWForm').attr('content')!='1' && tips_len==0 ){
				//alert();
				msg2('<div>时间不到5分钟，请准备提交。截止时间后提交以补交处理1111！</div>');
			} 
			$('#requestWForm').attr('content','1');
		}
		if( _time_limit >0 && _c_time>_time_limit*60000 && tips_len==0  ){ 
			_is_clock = false;
			saveData2();
			alert('时间到，马上提交！ ' );
			$('#dafen').click();
			_time_limit= _c_time/60000+0.2;
		}
        //考试竞赛模式新增--start
		if( _time_limit_s >0 &&  (_time_limit_s*1000-usedTs<5*60000 ) ){
			if( $('#requestWForm').attr('content')!='1' && tips_len==0 ){
				//alert();
				msg2('<div>还剩不到5分钟，请抓紧时间。到截止时间作文将会被强制提交</div>');
			} 
			$('#requestWForm').attr('content','1');
		}
		if( _time_limit_s >0 && usedTs>_time_limit_s*1000 && tips_len==0  ){ 
			_is_clock = false;
			$('#requestWForm').attr('content','1');//控制不到5分钟，是否提醒
			showLog('时间到，你的作文已被强制提交。' );
			saveData2();
			$('#dafen').click();
		}
        //end
	}
}

function beizu_init(){
	$('#bzbtn').click( function(){
		var display = $('#beizhuw').css("display");
		if( display=="none") $('#beizhuw').fadeIn();
		else $('#beizhuw').fadeOut();
		return false;
	});//
}
// 总管写的代码
/*function initUploadBz(  ){
	$('#uploader').upload( {
		autoSubmit: false,
		//action: _self+'?c=ajax&a=uploadBz&eid='+_eid ,
		action: '/upload/do-ajax-uploadBz?eid='+_eid ,
		onSelect: function() {
			//alert( _eid );
			if( $.trim(_eid)=="" ) { alert("请先提交作文后，才能上传附件！"); return ;}
			var file = this.filename();
			var ext = (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
			if(!(ext && /^(jpg|png|jpeg|gif|doc|docx|ppt|pptx|xls|xlsx|rar|zip)$/.test(ext))){
				alert('目前只支持图片跟Office系列文件；请重新选择！');
				return;
			}
			//$('#uploadLoading').show();
			//$('#uploadLoading').html("上传中...");
			msg2("上传中...");
			this.submit();
		},
		onComplete: function(response) {
			//alert( response );
			var arr = response.split(':');
			//alert( arr[0] );
			if( $.trim(arr[0])=="msg" ){
				msg2("发生错误："+arr[1] );
				return ;
			}else if( $.trim(arr[0])=="success"){

				$('#ufile_txt').html( arr[1] );
				$('#uploader_text').show();
				F.hide();
				alert("上传成功！");
				if($('#ufile_txt').length==0 ) location.reload();
			}else{
				msg2("发生未知错误！");
			}
		}
	});

	$('#upload_del').click(function(){
		$.post( _self+"?c=ajax&a=uploadBzDel&eid="+_eid,{},function(d){
			//alert( d );
			var arr = d.split(':');
			if( $.trim(arr[0])=="success"){
				alert("删除成功！");
				$('#uploader_text').hide();
				//location.reload();
			}else if( $.trim(arr[0])=="msg" ){
				msg2("发生错误："+arr[1]);
			}else msg2("发生未知错误！");
		});
		return false;
	});
}*/

// 自己修改过的
function initUploadBz(  ){
    $('#uploader').upload( {
        autoSubmit: false,
        //action: _self+'?c=ajax&a=uploadBz&eid='+_eid ,
        action: '/upload/do-ajax-uploadBzNew',
        onSelect: function() {
            //alert( _eid );
            var file = this.filename();
            var ext = (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
            if(!(ext && /^(jpg|png|jpeg|gif|doc|docx|ppt|pptx|xls|xlsx|rar|zip|pdf)$/.test(ext))){
                alert('目前只支持图片、Office系列和pdf格式文件；请重新选择！');
                return;
            }
            //$('#uploadLoading').show();
            //$('#uploadLoading').html("上传中...");
            msg2("上传中...");
            this.submit();
        },
        onComplete: function(response) {
            //alert( response );
            // console.log(response);
            // response = "success:dhfkjdkf:/2017/1827/5.jpg";
            var arr = response.split(':');
            // alert( arr[2] );return;
            if( $.trim(arr[0])=="msg" ){
                msg2("发生错误："+arr[1] );
                return ;
            }else if( $.trim(arr[0])=="success"){

                $('#ufile_txt').html( arr[1] );
                $('#ufile_txt').attr('filepath',arr[2]);
                $('#uploader_text').show();
                F.hide();
                alert("上传成功！");
                if($('#ufile_txt').length==0 ) location.reload();
            }else{
                msg2("发生未知错误！");
            }
        }
    });

    $('#upload_del').click(function(){
        var delFilePath = encodeURIComponent($('#ufile_txt').attr('filepath'));
        // console.log(delFilePath);
        $.post( _self+"?c=ajax&a=uploadBzDelNew&eid="+_eid+"&filePath="+delFilePath,{},function(d){
            console.log(d);
        	// return;
            var arr = d.split(':');
            if( $.trim(arr[0])=="success"){
                alert("删除成功！");
                $('#uploader_text').hide();
                //location.reload();
            }else if( $.trim(arr[0])=="msg" ){
                msg2("发生错误："+arr[1]);
            }else msg2("发生未知错误！");
        });
        return false;
    });
}

function saveUserdata(name, data) {
	if( $.browser.msie ){ 
		if(data.length < 54889) { $.cookie('pigai_'+ name, data); }
	}else if(window.localStorage){
		localStorage.setItem('pigai_' + name, data);
	}else if(window.sessionStorage){
		sessionStorage.setItem('pigai_' + name, data);
	}	 
}

function loadUserdata(name) {
	if( $.browser.msie ){
		 return $.cookie('pigai_'+ name );
	} else if(window.localStorage){
		return localStorage.getItem('pigai_' + name);
	} else if(window.sessionStorage){
		return sessionStorage.getItem('pigai_' + name);
	}
}

function bar_init(){   
    $(window).load(function(){
        $("#icibaToolBar").css({"right":"0px","bottom":"1px"});
        $("#icibaToolBar").slideDown("slow");		
		if( $.browser.msie && $.browser.version<7 ){}else $('#iciba_plug').css('position','fixed');
       
    }).scroll(function(){ 
		if( $.browser.msie && $.browser.version<7){
			$("#icibaToolBar").hide();
			$("#icibaToolBar").css({"right":"0px","bottom":"1px"});
			$("#icibaToolBar").fadeIn( ); 
			$('#iciba_plug').hide();
			//$("#iciba_plug").fadeIn( ); 
		}else{
			$("#icibaToolBar").css({"right":"0px","bottom":"1px"});
		}
    }).resize(function(){
        $("#icibaToolBar").css({"bottom":""});
        $("#icibaToolBar").css({"right":"0px","bottom":"1px"});  
		if( $.browser.msie && $.browser.version<7 ){}else $('#iciba_plug').hide();
    });
	if( $.browser.msie && $.browser.version<7 ){}else {
		$('#icibaOutWord').click( function(){ $('#iciba_plug').css('position','fixed');} );
		$('#icibaOutWord').keyup( function(){ $('#iciba_plug').css('position','fixed');} );	 
	}
	try{
		K.config.inited = false;
		K.init();
	}catch(e){}
 }

 function init_editor(){
	 $('#save_re').click(loadData);
	 $('#save_bt').click(saveData);
	 return true;//2013-4-11 
	 var str = loadUserdata('editor');
	 str =  $.trim(str );
	 if( str!=""     ){
		 //var re= confirm("您有上次未提交成功的数据 是否需要恢复数据？");
		 //if( re ) loadData();
		 F.show("恢复数据","<div style='padding:10px 0 20px 0;'>您有上次未提交成功的数据 是否需要恢复数据？</div>"
		 ,[[ function(){ F.hide(1);loadData();saveUserdata('editor', ''); }," 恢  复 "],[function(){F.hide(1);}," 关 闭 "]],400,0);
	 }
	 return true;
 }

 function loadData(){
	 loadData2();
	 return false;
	 var str = loadUserdata('editor');
	 str =  $.trim(str );
	 if( str=="" ){ alert("无数据无法恢复"); return false;}
	 var str2= $('#contents').val();
	 str2=  $.trim(str2);
	 if(str2!=""){
		if( !confirm("此操作将覆盖当前作文内容，确定要恢复数据吗？")) return false;		  
	 }
	 $('#contents').val( str );
	 return false;
 }

 function saveData(){ 
	 var str=$('#contents').val();
	 if( $.trim(str)=="" ) { showLog("无数据可保存！"); return false;}
	 saveData2();
	 return false;
	 //alert( str );
	 saveUserdata('editor', str);
	 saveSuccess();
	 return false;
	 //
 }
 function saveSuccess(){
	 var d = new Date();var h = d.getHours();
	 var m = d.getMinutes();h = h < 10 ? '0' + h : h;m = m < 10 ? '0' + m : m;
	 showLog("数据已于 "+h+":"+m+" 保存成功，将在10小时后失效！"); 
 }
 function saveData2(){
	showLog("正在保存...");
	var cdata= cdata || {};
	cdata.content = encodeURIComponent ($('#contents').val());
	cdata.title= encodeURIComponent( $('#title').val());
	cdata.rid= _rid;
	cdata.time= _c_time/1000;
	//alert( _c_time );
	$.post( _self+"?c=ajax&a=saveCaogao2",cdata,function(d){		 
		if(d=='1') saveSuccess();
		else if(d=="-1") showLog('请先登录！');
		else if(d=="-2") showLog('参数错误！');
		else{
			showLog("未知错误！");
		}
	});
 }

 function loadData2(){
	 showLog('正在恢复...');
	 $.post( _self+"?c=ajax&a=loadCaogao2",{"rid":_rid},function(d){	
		if(d=="-1") showLog('请先登录！');
		else if(d=="-2") showLog('参数错误！');
		try{
			eval("var obj="+d+";");
			$('#title').val( obj.title );
			$('#contents').val(obj.essay );
			showLog("恢复完成！");
		}catch(e){
			showLog("未知错误！");
		}
	 });
 }
 function showLog( str ){
	 $('#save_dilog').html( str );
 }

 function init_no_paste(){
	 $('.no_paste').bind("contextmenu", function() {  return false;});
	 $('.no_paste').bind("selectstart", function() {  return false;});
	 $('.no_paste *').bind("selectstart", function() {  return false;});
	 //$('.no_paste').keydown(function(e){ if (  e.ctrlKey ){  return false;}});; 
	 if( _no_paste!="1") return; 
	 var cobj = $('#contents');
	if(arguments.length>0) cobj=arguments[0];
	 cobj.bind("contextmenu", function() {  return false;});
	 //cobj.keydown(function(e){ if ( (e.keyCode==86 && e.ctrlKey)|| e.code=='' ){alert('您的老师启用了“禁止粘贴”选项 '); return false;}} );
	 document.onpaste= function (e){ alert("您的老师启用了“禁止粘贴”选项");e.preventDefault()}
	 cobj.bind( 'dragenter', function (e) {
		$(this).attr('disabled',true); 
		 F.show("请勿拖拽","<div style='padding:10px 0 20px 0;'>老师启用了“禁止粘贴”选项 请勿拖拽</div>"
		 ,[[ function(){ cobj.attr('disabled',false); F.hide(1) }," 回到写作 "] ],400,0);
	 
		return false;
	 } );
 }

 function inti_wc( ){
	if( $('#init_wc') ){
		$('#contents').keyup( inti_wc2 );
		inti_wc2();
	}
	init_isLogin();
 }

function init_isLogin(){
	try{
		if(!J.config.isLogin){
			J.show();
		}
	}catch(e){

	}
}
function inti_wc2(){
	try{
		if(!J.config.isLogin){
			J.show(); return false;
		}
	}catch(e){}
	var len = spss_countwords( $('#contents').val() );
	$('#init_wc').html( len );
}

 function spss_countwords( str ){
	var content = new String();
	content = $.trim( str );;// $( "#"+id ).val());
	if(content == ''){
		return 0;
	}else{
		var arr = new Array();
		//arr = content.match(/(\d+[\d\.\/,]*\d+)|([a-zA-Z\d]+[a-zA-Z\d-]*[a-zA-Z\d]+|[a-zA-Z\d]+)/g);
		//arr = content.match(/([a-zA-Z\d]+[a-zA-Z\d-]*[a-zA-Z\d]+|[a-zA-Z\d]+)/g);
		arr = content.match(/([a-zA-Z'\d]+[a-zA-Z'\d-]*[a-zA-Z'\d]+|[a-zA-Z'\d]+)/g);
		if(arr == null){
			return 0;
		}else{
			return arr.length;
		}
	}
}

function initCopy_write(){
    var txt	="";
    txt +="作文号："+_rid;
    txt +="\n\n题目："+$('#title').val();
    txt +="\n\n"+$("#contents").val();
    var clipboard = new ClipboardJS('#copy_re',{
        text: function() {
            return txt;
        }
    });
    clipboard.on('success', function(e) {
        alert("成功复制到剪贴板！");
    });

    clipboard.on('error', function(e) {
        alert("复制到剪贴板失败!");
    });
}

function writeMobile(){
	if(  isMobile() ){
		var search = location.search ;
		search= search.toLowerCase();
		if(  search.indexOf('from=tfabc')>=0 ){
			//location.href= '/?c=m&rid='+_rid+'&a=write';
			location.href= '/?c=tfabcm&a=require&rid='+ _rid;
			return;

		}else	if( search.indexOf('from=koalagogo')>=0 ||  search.indexOf('from=rongcheng')>=0 ||  search.indexOf('ismobile=1')>=0){
			location.href= '/?c=m&rid='+_rid+'&a=write';
			return;
		}
		var div = document.createElement("div");
		div.innerHTML='<a href="/?c=m&rid='+_rid+'&a=write" style="line-height:30px;color:#FF6600; ">点击这里，切换到手机版本？</a>';
		//div.style="position: fixed; top: 0; width: 100%; z-index: 11;height:100px;background-color:#FEF5D3;border-bottom:#FBE6B9 solid 2px;height:30px;line-height:30px;padding-left:10px;";
		div.id="pigaiMobile";
		document.body.appendChild( div ); 
		$('#pigai').css("margin-top","32px");
		var css= {"position": "fixed", "top": 0, "width": "100%", "z-index": 11, "height":"100px", 'background-color':'#FEF5D3','border-bottom':"#FBE6B9 solid 2px",'height':"30px","line-height":"30px","padding-left":"10px"};
		$('#pigaiMobile').css( css );
		//if( _rid=='476236' ) alert( _rid);
	}
}
function isMobile(){
	var system = { 
            win: false, 
            mac: false, 
            xll: false, 
            ipad:false 
        }; 
        //检测平台 
        var p = navigator.platform; 
        system.win = p.indexOf("Win") == 0; 
        system.mac = p.indexOf("Mac") == 0; 
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false; 
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面 
        if (system.win || system.mac || system.xll||system.ipad) { 
			return false;
        } else { 
			return true;
         }
}

function writeKetang(){
	if( _ketang==undefined || _ketang=="") return false ;

	var wk_iswrtie= false;
	var wk_time=0;
	var wk_everytime= 25000; 
	var ui={};
	ui.content= $('#contents');
	ui.title= $('#title');
	if(!ui.content || ui.content.length<=0 ){
		ui.content= $('#contents2');
	}

	function wkstart(){
		ui.content.keyup(  wk_keyup );
		ui.title.keyup( wk_keyup  );
		setInterval(wkRealDo,wk_everytime  );
	}

	var wk_keyup= function(){
		 wk_iswrtie=true ;
		 if( wk_time>5){
		 	wkRealDo();
		 }
	}
	function wkRealDo(){
		wk_time +=1 ; 
		if( !wk_iswrtie ){			
			return false; 
		}
		var dt= {};
		dt.rid= _rid;
		dt.eid= _eid;
		dt.version= _version;
		dt.title= ui.title.val();
		dt.content= ui.content.val();
		wk_iswrtie= false ;
		wk_time=0;
		$.post('/?c=ajax&a=ketang', dt , function(data ) {
			console.log("success",data );
			/*optional stuff to do after success */
		});
		/*$.ajax({
			url: '/?c=ajax&a=ketang',
			type: 'POST',
			dataType: 'json',
			data: dt,
			success:function(d){
				console.log("success",d );
			}
		});
		.done(function(d) {
			console.log("success",d );
		}).fail(function() {
			console.log("error");
		});*/
		

	}

	wkstart();
}


//icomet
 
if( typeof iComet == 'undefined'  ){
	 try{ 
		 jQuery.ajax({
			  url: "/res/javascript/icomet.js",
			  dataType: "script",
			  cache: true
		});
	 }catch(e){
	 }
}
