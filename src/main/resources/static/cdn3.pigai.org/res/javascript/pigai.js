String.prototype.trim=function(){ return this.replace(/^\s+||\s+$/ig,'');}
var J=J||{};
J.readCookie=function(key){
	
	var cookieValue = "";
	var search = key + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) {
				end = document.cookie.length;
			}
			cookieValue = document.cookie.substring(offset, end);
		}
	}
	return decodeURIComponent(cookieValue);
}

J.setCookie=function(name,value) {
	var date=new Date();
	var now=date.getTime();
	date.setTime(now+60*60*1000*30*24);
	document.cookie=name+"="+encodeURIComponent (value)+"; path=/; expires="+date.toGMTString();
}

J.config={
	userName:''
	,userId:0
	,isLogin:false
	,nickName:''
	,lang:'cn'
	,isV:0
}

J.init=function(){	
	try{
		J.config.lang=J.readCookie('__PIGAI_LANG');//
	}catch(e){ }

	if(!J.$('jukuu_login'))J.wHTML();
	J.getInfo();	
	//J.show();
	J.setUserInfo(); 
	
    //pigai_jf
	 
}
function pigai_jifen_callback( pigai_jf ){
	//alert( pigai_jf );
	J.$('pigai_jf').innerHTML = '('+ pigai_jf+'分)' ;
}
J.footHeight=function(){
	//
	try{
		var id= document.getElementById('write');
		//alert(id.offsetHeight);
		if(id.offsetHeight <100 ){
			id.style.height="400px";
			id.style.overflow="visible";
		}
	}catch(e){
	}
}
J.hide=function(){
	try{
		J.$('jukuu_login_win').style.display='none';
		J.$('jukuu_login').style.display='none';
	}catch(e){
	}
}
J.login=function(){
	//alert("test");
	try{
		if( J.$('jukuu_username').value.trim()=='') {
			alert('请填写用户名');
			J.$('jukuu_username').focus();
			return false;
		}
		if( J.$('jukuu_password').value.trim()=='') {
			alert('请填写密码');
			J.$('jukuu_password').focus();
			return false;
		}
	}catch(e){
		//return 
		//alert('456');
	}
	//alert('456');
	J.$('jukuu_loginFrom').submit();
	return true;
}
J.goReg= function(){
	location.href='/?a=reg&type=s&reurl='+encodeURIComponent(location.href);
	return false;
}
J.show=function(){

	try{
		var w, h;
		if (self.innerHeight) {
			w = self.innerWidth;
			h = self.innerHeight;
		}else if(document.documentElement && document.documentElement.clientHeight) {
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}else if (document.body){
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}
		sh = document.body.scrollTop;
		sh = sh ? sh : document.documentElement.scrollTop;
		mh = document.body.scrollHeight;
		mh = mh > h ? mh:h;		
		J.$('jukuu_login_win').style.display='';
		J.$('jukuu_login_win').style.height= mh + 'px';
		var o=J.$('jukuu_login');
		o.style.display='block';
		o.style.left=(w - 280)/2 +'px';
		o.style.top=((h - 395)/2+sh) +'px';
	}catch(e){
      return true;
	}
	return false;


}
J.W=function(str){
	document.write(str);
}
J.$=function(id){
	return document.getElementById(id);
}
J.getInfo=function(){
	try{
		u=J.readCookie('_JUKU_USER');
		if(u!=''){
			u= eval('('+u+')'); 

			J.config.userId=u.i;
			J.config.userName=u.u;
			J.config.isLogin=true;
			J.config.nickName=u.u2;
			J.config.nickName=J.config.nickName.replace(/\++/ig,' '); 
			J.config.isV= u.iv; 
			J.config.ts= u.ts;

            J.config.school = u.s;
		}
	}catch(e){
		//alert('J.setUserInfo');
	}
	
}
J.changLang=function(){
	//alert( J.config.lang );
	var v= J.config.lang=='cn'?'en':'cn';
	J.setCookie('__PIGAI_LANG',v);
	location.reload();
}
J.setUserInfo=function(){
	var _is_offline = _is_offline||0;
	if(!J.$('pigai_userinfo')) return false;
	try{
		o=J.$('pigai_userinfo');
		var isEnglish= (J.config.lang!='cn') ;
		str='';
		var ispku=  location.host=='writing.pku.edu.cn' ;
		var isPigai= location.host.indexOf('pigai.org');
		//if( isPigai >=0 ) str +='<a href="/?a=bbs" target="blank" >论坛</a>';
		if(J.config.isLogin){ 
			var jf= J.$('pigai_userinfo').getAttribute('content');
			var is_teacher =  J.$('jeUserInfo').getAttribute('content');
			var cz="";

            if(!is_teacher && J.config.school === '华中科技大学') str = '<a href="http://hust.read.pigai.org/" title="读书"  target="_blank">读书</a>|'+str;
            if(!is_teacher && J.config.school === '山西师范大学') str = '<a href="http://sxnu.read.pigai.org/" title="读书"  target="_blank">读书</a>|'+str;

            try{
            	if( "1"== $('#pigai_userinfo').data('ischongzhi') ){ 
            		 //cz = '<a href="/tp/pigai/pay/student" id="pigai_chongzhi">充值</a>|' ;
            		 cz = '<a href="/index.php?c=teacher&a=zhifu" id="pigai_chongzhi">充值</a>|' ;
            	}

            }catch(e){

            }

			 
            var redDot = '';
            if(is_teacher !== '1') {
                redDot = '<sup style="margin-left: -4px;margin-top: -5px;color: red; display: inline-block;">•</sup>';
            }
			var ostr = str;
			str ='<a href="/?a=modifyPassword" id="pigai_nickname"  '+(J.config.isV==1 ?'class="pigaiVip"':'');
			str +=' ><span id="pigai_name">'+J.config.nickName+'</span></a>';
			if( !ispku )
				if(!_is_offline){
				str +=(jf==null?'':'<a id="pigai_jf" href="//mall.pigai.org/" target="_blank">('+jf+'分)</a>')+redDot;
			str +=  '|' + cz + ostr;
			
			//str +='|<a href="/?c=write&a=guestbook" id="pigai_msg">消息</a>';
			str +='|<a href="/?c=write&a=guestbook" id="pigai_msg" target="_blank">消息</a>';}
			str +='|<a href="javascript:;" id="pigai_changpf" onclick="chang_pf()">皮肤</a>';
                        // if(is_teacher){
                        //     str +='|<a href="/?index.php?c=teacher&chview=2017" style="color:red;">体验新版</a>';
                        // }else{
                        //     str +='|<a href="/?c=write&chview=2017" style="color:red;">体验新版</a>';
                        // }
			str +='|<a href="/?a=logout" id="pigai_logout">'+(isEnglish?'退出':'Logout')+'</a>';
		}else{
			str +='|<a href="/" onclick="return J.show();">'+(isEnglish?'登录':'Login')+'</a>';
			str+='|<a href="/?a=reg&type=s">'+(isEnglish?'注册':'Register')+'</a>';
		}
		

		o.innerHTML=str.replace("||",'|');

		if(J.config.isLogin){
			if (typeof _isNet !='undefined' && _isNet=='1' && location.host!='www.pigai.org'  ){
				return ;
			}
			try{
				if( !ispku){ 
					$.getScript('//mall.pigai.org/index.php/ajax/index?uid='+J.config.userId+'&r='+Math.random()  );
					setTimeout( J.pigaiMsg  , 3*1000);
				} 
			}catch(e ){
			}
		} 
	

	}catch(e){		
		//console.error("初始化 用户处问题"+ e.getMessage() );
		console.error("初始化 用户处问题"+ e );
	}
}
J.pigaiMsg = function(){
	/* //20170118 取的消息调试
	var jk_cng= J.readCookie('JK_GCNT');
	jk_cng = parseInt(jk_cng);
	if( jk_cng>0){
		var str='消息<sup style="font-size:10px;color:red">'+jk_cng+'条</sup>';
		J.$('pigai_msg').innerHTML = str ;
	}
	//alert( jk_cng );
	*/
	if( $==undefined) return false;
	var msgobj = $('#pigai_msg');
	if(msgobj.length >0) {		 
		/*
		$.ajax({
			url: "//msg.pigai.org/?c=test&a=notice",
			dataType: "jsonp",
			success: function (msg) {
				//funcb(msg, chat_id);
				if(msg.error==0 &&  msg.data.noread>0 ) {
					msgobj.append("<b class='pigai-notice-noread'>" + msg.data.noread + "</b>");
				}
			}
		}).fail(function(){
			console.warn("载入未读小时失败"); 
		});
		msgobj.attr( {"href":'http://www.pigai.org/index.php?c=write&a=guestbook',"target":"pigaichat"}) ;
		msgobj.click(	function(){ try{	bdTonji( "chat" ,'chat-click','chat-click-from-xiaoxi');	}catch(e){	}		});
	   */
	}
}
J.wHTML=function(){
	J.W('<style>');
	J.W('#jukuu_login{position:absolute;top:40px;left:100px;z-index:101;}');
	J.W('#jukuu_loginC{background-color:#ffffff;margin:5px;position:absolute;width:340px;border:1px solid #949494;padding-bottom:30px;}');
	J.W('#jukuu_loginF{padding:20px 10px 5px 10px;;}');
	J.W('#jukuu_loginFrom{padding:0;margin:0;margin-top:8px;}');
	J.W('#jukuu_login #jukuu_loginClose {float:right;margin:10px 10px 0 0;cursor:pointer;font-size:0px;width:22px;height:22px;overflow:hidden;}');
	J.W('#jukuu_login  .closeOver{background:url("/res/css/login.gif") no-repeat -121px -200px;color:#717171;}');
	J.W('#jukuu_login  .closeOut{color:#ffffff;	background:url("/res/css/login.gif") no-repeat -181px -200px;}');
	J.W('#jukuu_loginTitle{float:left; width:250px;background:#ffffff url("/res/css/login.gif") no-repeat -30px -30px;height:60px;margin:10px 0 0 5px;font-size:0;color:#ffffff;}');
	J.W('#jukuu_login button{cursor:pointer;}');
	J.W('#jukuu_login .jukuu_login_item{clear:both;padding:0;margin:0;height:40px;}');
	J.W('#jukuu_login .jukuu_login_item b{display:inline;float:left;width:80px;text-align:right;font-size:14px;font-weight:normal;line-height:22px;}');
	J.W('#jukuu_login .jukuu_login_item span{float:left;display:inline;}');
	J.W('#jukuu_login .jukuu_login_item span input{width:160px; }');
	J.W('#jukuu_login #btm{padding-left:80px; }');
	J.W('#jukuu_login #btm .loginBtn{background:url("/res/css/v2.gif") no-repeat -3px -34px;width:70px;height:24px;border:0;overflow:hidden;line-height:100px;}');
	J.W('#jukuu_login #btm .loginBtn_over{background:url("/res/css/v2.gif") no-repeat -103px -34px;width:70px;height:24px;border:0;overflow:hidden;line-height:100px;}');
	J.W('.jukuu_login_regBtn{background:url("/res/css/v2.gif") no-repeat -0px -2px;width:150px;height:24px;border:0;overflow:hidden;line-height:100px;margin-left:80px;}');
	J.W('#jukuu_login_regBtnC {margin:0 auto;clear:both;}');
	J.W('#jukuu_login_regBtnC hr{height:1px; color:#949494;   padding:0;margin:0 0 15px 0;  }');	
	J.W('</style>');
	J.W('<div id="jukuu_login" style="display:none;">');
	J.W('	<div id="jukuu_loginC">');
	J.W('		<div id="jukuu_loginClose" title="关闭" onclick="J.hide();" class="closeOut" onmouseover="javascript:this.className=\'closeOver\'" onmouseout="javascript:this.className=\'closeOut\'">x</div>');
	J.W('		<div id="jukuu_loginTitle">用户登录</div>');
	J.W('		<div style="clear:both;"></div>');
	J.W('		<div id="jukuu_loginF">');
	J.W('			<FORM METHOD="POST" action="/?a=login&refurl='+encodeURIComponent(location.href)+'" id="jukuu_loginFrom"  >');
	J.W('				<div class="jukuu_login_item"><b>账户名：</b><span><INPUT TYPE="text" NAME="username" id="jukuu_username" value="'+J.readCookie('_jukuu_username')+'"></span><div style="clear:both;"></div></div>');
	J.W('				<div class="jukuu_login_item"><b>密&nbsp;码：</b><span><INPUT TYPE="password" NAME="password" id="jukuu_password"></span><div style="clear:both;"></div></div>');
	J.W('				<div class="jukuu_login_item"><b>&nbsp;</b><font style="float:left;font-size:12px;"><INPUT TYPE="checkbox" NAME="remember" value="1" checked> 记住登陆状态</font><div style="clear:both;"></div></div>');
	J.W('				<div class="jukuu_login_item" id="btm"><button onclick="return J.login();" class="loginBtn" onmouseover="this.className=\'loginBtn_over\'" onmouseout="this.className=\'loginBtn\'">&nbsp;</button>');
	J.W('				<font style="font-size:12px;padding-left:10px;">忘记密码,<a href="/?a=forgetPsw&reurl='+encodeURIComponent(location.href)+'" style="font-size:12px;" onclick="J.hide();" target="_blank">取回密码</a></font>');
	J.W('				</div>');
	J.W('				<div id="jukuu_login_regBtnC">');
	J.W('					<hr>');
	J.W('					<button onclick="return J.goReg();" class="jukuu_login_regBtn" title="注 册">  </button><input type="hidden" name="ref" />');
	J.W('				</div>');
	J.W('			</FORM>');
	J.W('		</div><!-- end jukuu_loginF -->');
	J.W('	</div><!-- end jukuu_loginC -->');
	J.W('  </div><!-- end jukuu_login -->');
	J.W('<div id="jukuu_login_win" style="display:none;position:absolute;z-index:100;background:#000;margin:0px;width:100%;filter:alpha(opacity=50);opacity:0.5;-moz-opacity:0.05;top:0px;left:0px;" onclick="J.hide();">&nbsp;</div>');
	 
}
J.init();
function chang_pf(){
	//alert('皮肤');
	try{
		var str='<div >';
		var old = J.readCookie('old'); 
		str+='<a href="/?chview=2010" style="text-decoration:none"> 简洁</a>'+( (old=="2010" || old=="2011" || old=="")?'<sup style="font-size:11px">已选</sup>':'' ) ;
		str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  href="/?chview=2012"  style="text-decoration:none"> 清风</a>'+( (old=="2012")?'<sup  style="font-size:11px">已选</sup>':'' ) ;
		str+='</div>';
		var btArrry=  [  ];
		F.show('皮肤选择',str,btArrry,200,0);
	}catch(e){
		location.href='/?a=modifyPassword&type=t10';
	}
}
//alert();
try{
	$(function(){ pigai_qqkf();});
}catch(e){ }

function pigai_qqkf(){ 
	$('#pigai_qq').hover( J.qq,J.qqclose);
	$('#jukuu_qqkf').hover(J.qq,J.qqclose);
}
J.qq= function( e ){ 
	var pos = J.getCoords( J.$('pigai_qq')  ); 
	if( $('#jukuu_qqkf').html()=='' ) $('#jukuu_qqkf').html( qq_str_info ); 
	$('#jukuu_qqkf').show().css( {"left":(pos.x-100)+"px","top":pos.y+"px"} );
}
J.qqclose =function( e ){	$('#jukuu_qqkf').hide();} 
J.getCoords=function (node){
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
var qq_str_info = '客服：小批 <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2976617198&site=句酷批改网&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2976617198:42" alt="句酷批改-小批" title="句酷批改-小批"></a><br>';
qq_str_info+='客服：小改 <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3113867050&site=句酷批改网&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:3113867050:42" alt="句酷批改-小改" title="句酷批改-小改"></a><br>';
qq_str_info+='客服：批改 <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1312608519&site=句酷批改网&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1312608519:42" alt="句酷批改" title="句酷批改"></a>';


