//新mp3
 function thisMovie(movieName) {
	 if (navigator.appName.indexOf("Microsoft") != -1) {
		 return window[movieName];
	 } else {
		 return document[movieName];
	 }
 }
 function icibaMp3Complete(){
	 mp3Finish('#000000');
 }
 function icibaMp3Error(){
	//alert('error');
	mp3Finish('#000000');
 }
 function mp3Finish(color){
	 D.isRead= false;
	$(D.onte).parent().find('span').css('color',color);	
	D.nowIndex++;
	LD();
 }
function icibaMp3Begin(time){	     
		 D.time= parseInt(time)*0.7;
		 if(D.time<=0) return ;
		 p=D.onte.parentNode;
		 D.txt=p.getAttribute('content');
		 //alert(p.getAttribute('hidden'));
		 D.hidden=parseInt (p.getAttribute('hidden') );

		 p.setAttribute('hidden',0);
		 tem=p.getElementsByTagName('span');		 
		 D.changOnte=tem[0];		
		 D.ctime=0;
		 timeChang();
}

function timeChang(){
	return ;
	if(D.ctime>=D.time){ return;}
	D.ctime+=10;
	//len= D.txt.length;
	eveT= D.time/D.txt.length;
	len= Math.ceil(D.ctime/eveT);
	sStr=D.txt.substring(0,len);
	eStr=D.txt.substring(len,D.txt.length);
	if(D.hidden)str= '<b>'+sStr+'</b>';
	else str= '<b>'+sStr+'</b>'+eStr;

	//alert(str);
	D.changOnte.innerHTML=str;
	setTimeout(timeChang,10);
}

function changColor(obj){
	$(obj).parent().find('span').css('color','red');	
	
}

 function initMp3Play(){
	 $('.mp3Play').click(function(){
		 //alert($(this).attr('content'));
		 if(D.isLD) return;
		 if(D.isRead) return;
		 mp3=$(this).attr('content');
		 //$(this).parent().find('span').css('color','red');
		 changColor(this);
		 if(mp3!=''){
			 if(mp3.indexOf('.mp3')==-1){
				 mp3= mp3+'.mp3';
			 }
			D.onte=this;
			var swf=thisMovie('icibaMp3Id');
			D.isRead= true;
			swf.icibaMp3(mp3);
		 }
		 
		 //playMp3();
		 
	 });
	 $('.mp3Play2').click(function(){
		 if(D.isLD) return;
		  if(D.isRead) return;
		 //alert($(this).attr('content'));
		 mp3=$(this).attr('content');
		 //$(this).parent().find('span').css('color','red');	
		  changColor(this);
		 if(mp3!=''){
			 if(mp3.indexOf('.mp3')==-1){
				 mp3= mp3+'.mp3';
			 }
			 D.onte=this;
			var swf=thisMovie('icibaMp3Id');
			D.isRead= true;
			swf.icibaMp3(mp3);
		 }
		
		 
		 //playMp3();
		 
	 });
	 if($('#duAll')){
		 $('#duAll').click(function(){
			 D.isLD=true;
			 if(D.isRead) return;
			 D.nowIndex=0;			
			 LD();			 
		 });
	 }
 }
 function playMp3(){
	    var url=document.getElementById('url');
		var swf=thisMovie('icibaMp3Id');
		swf.icibaMp3(url.value);
}

//连读
var D={};
D.nowIndex=0;
D.isLD=false;
D.onte='';
D.txt='';
D.changOnte= null;
D.time=0;
D.ctime=0;
D.isRead=false;
function LD(){
	//alert( $('.mp3Play').length );	
	if($('.mp3Play').length <=D.nowIndex ){
		D.isLD=false;
	}
	if(!D.isLD) return;
	//alert('Ok');
	$('.mp3Play').each(function(i){
		if(i==D.nowIndex){
			//$(this).click();
		   mp3=$(this).attr('content');
		   //$(this).parent().find('span').css('color','red');
		    changColor(this);
		   if(mp3!=''){
			 if(mp3.indexOf('.mp3')==-1){
				 mp3= mp3+'.mp3';
			 }
			D.onte=this;
			var swf=thisMovie('icibaMp3Id');
			D.isRead= true;
			swf.icibaMp3(mp3);
		 }
		}
	});

}
 //end 新mp3
