String.prototype.trim=function(){ return this.replace(/^\s+||\s+$/ig,'');}

function regCheck(){
	//alert('alert');
	$('.regItem').find('input').focus(regFocus);
	$('.regItem').find('input').blur(regBlur);	
	$('#regIm').find('input').click(regIm);
	$('.regButton').find('button').click(regSubmit);
	$('.regButton>button').hover(function(){$(this).attr('className','regBtn_over')},function(){$(this).attr('className','regBtn')});
	//$('.regItem').find('input').focus();
}

function regIm(){
	//alert(  );
	if( $(this).val()=='teacher' ){
		$('.regStudent').css('display','none');
		$('.regTeacher').css('display','block');
	}
	if($(this).val()=='student'){
		$('.regStudent').css('display','block');
		$('.regTeacher').css('display','none');
	}
}
 
function getTorS(){
	var tearcher_or_stuent='';
	$('#regIm').find('input').each( function(i){
		if($(this).attr('checked')) tearcher_or_stuent= $(this).val();
	});

	if( tearcher_or_stuent == 'teacher' ){
		$('.regStudent').css('display','none');
		$('.regTeacher').css('display','block');
	}
	if( tearcher_or_stuent == 'student'){
		$('.regStudent').css('display','block');
		$('.regTeacher').css('display','none');
	}
	return tearcher_or_stuent;
}
function regSubmit(){
	//alert('456');
	var is_check=true;
	var obj='';
	var tearcher_or_stuent=getTorS();	
	//alert( tearcher_or_stuent );
	if( tearcher_or_stuent ==''){
		//$('#regIm').find('font').;
		regShow( $('#regIm').find('input') ,'请选择身份！',0);
		$('#regIm').attr('content', tearcher_or_stuent) ;
		//alert();
		return false;
	}

	$('.regItem').find('input').each(
		function(i){
		if( $(this).attr('type')=='radio' ){
			return true;
		}
		if(  $(this).attr('value').trim() ==''){
			ptem= $(this).parents('.regItem').css('display');
			if(ptem!='none'){
				regShow($(this),'不允许为空',0);
				is_check=false;
				obj=$(this);
				$(this).focus();
				return false;
			}

		}
		/*
		if( !$(this).attr('content') || $(this).attr('content')!='1'){
			if(tearcher_or_stuent=='teacher'){
			}
			is_check=false;
			$(this).attr('content','0');
			$(this).focus();
			$(this).blur();
			obj=$(this);
			return false;
		}*/
	});
	//alert(is_check);
	if(is_check ){  $('#regFrom2').submit() ; 	}
	else{
		//alert( obj.attr('id') );
	}
	return is_check;
}

function regBlur(){	
	var sname=$(this).attr('name');
	switch(sname){
		case 'userName':
			var search_str = /[*?+ \'\"\/\\]/;
			if(!$(this).attr('value') ||  $(this).attr('value').trim()=='' ){
				regShow($(this),'用户名不允许为空！',0);
				return false;
			}else if(search_str.test($(this).val().trim()) ){				
				regShow($(this),'请勿使用"空格\'*？等特殊符号',0);
				return false;
			}else if(  $(this).val().trim().length<3 || $(this).val().trim().length>50){
				regShow($(this),'用户名必须在3-50个字间!',0);
				return false;
			}else{
				obj=$(this);
				$.post("/?c=ajax&a=regCheckUname",{username:$(this).val().trim() },function(d){
					//alert(d);
					if(d.trim()=='1')regShow(obj,'',1);
					else if(d.trim()=='-1'){
						regShow(obj,'该用户名已经被占用！',0);
						return false;
					}else{
						regShow(obj,'发生不可预知的错误！',0);
						return false;
					}
				});
				
			}
		break;
		case'password':
			if(!$(this).attr('value') ||  $(this).attr('value').trim()=='' ){
				regShow($(this),'密码不允许为空！',0);
				return false;
			}else if( $(this).attr('value').trim().length<6 || $(this).attr('value').trim().length>20 ){
				regShow($(this),'密码必须在6-20字符间',0);
				return false;
			}else{
				regShow($(this),'',1);
			}
		break;
		case'password2':
			//alert($('#password').blur() );
			//if( 1 ){ alert('asdf');return false;}
			if(!$(this).attr('value') ||  $(this).attr('value').trim()==''  ){
				regShow($(this),'密码不允许为空！',0);
				return false;
			}else if( $(this).attr('value').trim() != $('#password').attr('value').trim() ){
				//
				regShow($(this),'两次密码输入不一',0);
				return false;
			}else{
				regShow($(this),'',1);
			}
		break;
		case'email':
			var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;			
			if( !search_str.test( $(this).val().trim())  ){
				regShow($(this),'Email格式错误',0);
				return false;
			}else{
				var obj=$(this);
				$.post("/?c=ajax&a=regEmail",{email:$(this).val().trim() },function(d){		
					//alert(d);
					//alert(  obj.parents('forgetPsw').length  );
					//alert(  );
					if( $('#forgetPsw').attr('id') ){
						if(d.trim()=='-1') regShow(obj,'',1);
						else if(d.trim()=='1'){
							regShow(obj,'该email未注册过！',0);
							return false;
						}
						
					}else{
						if(d.trim()=='1') regShow(obj,'',1);
						else if(d.trim()=='-1'){
							regShow(obj,'此email已经注册过',0);
							return false;
						}
						else{
							regShow(obj,'发生不可预知的错误',0);
							return false;
						}
					}
				});
			}
		break;
		case 'yzm':
			if($(this).val().trim()==''){
				regShow($(this),'验证码不允许为空',0);
				return false;
			}
			obj=$(this);
			$.post("/?c=ajax&a=regYzm",{yzm:$(this).val().trim() },function(d){
				//$('#yzmImg').hide();
				//alert(d);
				if(d.trim()=='1'){
					//alert(d);
					regShow(obj,'',1);				
				}else{
					regShow( obj,'验证码错误',0);
					return false;
				}
			});
		break;
		case'teacher_name':
			//alert( getTorS() );
			if('teacher'==getTorS() ){
				//alert('good');
				if($(this).val().trim()==''){
					regShow($(this),'请填写教师名称',0);
					return false;
				}
			regShow( $(this),'',1);
			}
		break;
		case'student_name':
			//alert( getTorS() );
			if('student'==getTorS() ){
				//alert('student');
				if($(this).val().trim()==''){
					regShow($(this),'请填写学生姓名',0);
					return false;
				}
			regShow( $(this),'',1);
			}
		break;
		case'student_number':
			//alert( getTorS() );
			if('student'==getTorS() ){
				//alert('student');
				if($(this).val().trim()==''){
					regShow($(this),'请填写学号',0);
					return false;
				}
			regShow( $(this),'',1);
			}
		break;
		case'student_class':
			//alert( getTorS() );
			if('student'==getTorS() ){
				//alert('student');
				if($(this).val().trim()==''){
					regShow($(this),'请填写班级',0);
					return false;
				}
			}
		break;
	}
	$(this).attr('content',1);
	return true;
}
function regShow(obj,txt,isSuccess){
	d=obj.parents('.regItem');//.find('font');
	//alert(d.length);
	if(d.length==0) d=obj.parents('.regItem2');//.find('font');
	d=d.find('font');
	txt= txt==''?'&nbsp;':txt;
	if(!isSuccess)d.html('<div class="regErr">'+txt+'</div>');
	else d.html('<div class="regSuccess">'+txt+'</div>');
}

function regFocus(){
	//function(){}
	//alert($(this).attr('name') )
	d=$(this).parents('.regItem').find('font');
	d.css('opacity',0.1);
	if( !d.attr('content')  ){
		if(!$(this).attr('content') || $(this).attr('content')!='0')d.attr('content', d.text() );
		//d.text('错误');
	}else{
		//alert( d.attr('content') );
		d.text(   d.attr('content') );
	}	 
	d.animate({opacity:1},1000);
	var sname=$(this).attr('name');
	if(sname=='yzm'){
		//alert('验证码');//res/kcaptcha/?js=4545
		$('#yzmImg').find('img').attr('src','res/kcaptcha/?js='+Math.random() );
		$('#yzmImg').show();
	}
	$(this).attr('content',-1);
}

function regLogin(){
	$('.regButton').find('button').click(loginSubmit);
	$('.regButton>button').hover(function(){$(this).attr('className','loginBtn_over')},function(){$(this).attr('className','loginBtn')});
	
}

function loginSubmit(){
	var q= $('#userName');//.val();
	var psw= $('#password');
	//alert(q.val());
	if(q.val().trim()==''){
		regShow(q,'请填写用户名',0);
		q.focus();
		return false;
	}
	if(psw.val().trim()==''){
		regShow(psw,'请填写密码',0);
		psw.focus();
		return false;
	}
	 $('#regFrom2').submit() ; 
	return false;
}


function forgetLogin(){
	
	$('.regItem').find('input').focus(regFocus);
	$('.regItem').find('input').blur(regBlur);
	$('.regButton').find('button').click(
		function(){
		$('#regFrom2').submit();
		}
	);

	$('.regButton>button').hover(function(){ $(this).attr('className','forgetBtn_over')},function(){$(this).attr('className','forgetBtn')});
}


function bdTonji( cat,action,lab){
	try{
		_hmt.push(['_trackEvent',  cat,action, lab] );
		console.log("[百度统计] cat="+cat+',action='+action+',lab='+lab );
	}catch(e){		 
	}
}

