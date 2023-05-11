String.prototype.trim = function () { return this.replace(/^\s+||\s+$/ig, ''); }
String.prototype.int = function () { var re = parseInt(this); if (isNaN(re)) re = 0; return re; }

var _page = 15;//每页显示数 
var _preNextLent = 30;//字符数
var _SentNow;//现在的句子
var CS = CS || {};//Catch Sent 缓存句子
var CEssay = CEssay || {};// Catch Essay 缓存文章

var worAttr = { "token_cnt": "词汇", "noun_cnt": "名词", "verb_cnt": "动词", "adj_cnt": "形容词", "adv_cnt": "副词", "prep_cnt": "介词", "pron_cnt": "代词", "conj_cnt": "连词", "char_cnt": "标点" };
function initEssay() {
	//alert('good');
	initEssayWord();
	initEssayTitle();
}

function initModify() {
	$('.mdSub').find('button').click(function () {
		if (!textCheck()) return false;
		$('#modifyForm').submit();
	});
}

function initEssayTitle() {
	var str = '';
	for (p in _STitle) {
		str += '<p><a href="javascript:;" onclick="javascript:sentInArtSql(\'' + p + '\',\'asdfasdf\',\'asdfasdfasdf\');">' + _STitle[p] + '</a></p> ';
	}
	$('#essayAnlyTitle').html(str);
	str = initTotalS('');
	$('#totalAny').html(str);

}

function initTotalS(id) {
	var o = anlyTotal(id);
	//alert(o.token_cnt);
	//str='<table cellspacing="1">';
	if (id == '') {
		var th = '<th>文章</th><th>句子</th>';
		var pCnt = 0;
		for (var p in _STitle) {
			pCnt++;
		}
		var td = '<td>' + pCnt + '</td><td>' + o.sent_cnt + '</td>';
	} else {
		var th = '<th>句子</th>';
		var td = '<td>' + o.sent_cnt + '</td>';
	}
	for (var p in worAttr) {
		th += '<th>' + worAttr[p] + '</th>';
		td += '<td>' + o[p] + '</td>';
	}
	str = '<table cellspacing="1"><tr>' + th + '</tr><tr>' + td + '</tr></table>';
	//alert(str);
	return str;
}

function requestToggle(t) {
	//alert('456789....');
	//alert($(t).attr('className'));
	if ($(t).attr('className') == 'requestOpen') {
		$(t).attr('className', 'requestClose');
		$(t).text('开启详情');
		$('#requestW').css('display', 'none');
	} else {
		$(t).attr('className', 'requestOpen');
		$(t).text('关闭详情');
		$('#requestW').css('display', 'block');
	}
}

function initEssayWord() {
	//setEssayHtml(0,_page);
	setEssayPage(1);
	$('#word_page>.PageHeader').click(function () { setEssayPage(1); });
	$('#word_page>.PageFooter').click(function () { total = Math.ceil(_Word.length / _page); setEssayPage(total); });
	total = Math.ceil(_Word.length / _page);
	$('#word_page>.PageTotal').text('共' + total + '页');
	$('#word_page>.PageNext').click(
		function () {
			total = Math.ceil(_Word.length / _page);
			var pageNo = parseInt($('#word_page>.PageNow').text());
			//alert(pageNo);
			pnext = pageNo + 1;
			if (total < pnext) pnext = total;
			setEssayPage(pnext);
		}
	);
	$('#word_page>.PagePre').click(
		function () {
			var pageNo = parseInt($('#word_page>.PageNow').text());
			pnext = pageNo - 1;
			if (pnext < 1) pnext = 1;
			setEssayPage(pnext);
		}
	);

}
function setEssayPage(pageNo) {
	setEssayHtml((pageNo - 1) * _page, _page);
	$('#word_page>.PageNow').text(pageNo);
	$('#word_content>tr').click(essayTrClick);
	$('#word_content>tr').each(function (i) { $(this).click(); return false; });
}

function essayTrClick() {
	//alert('asdf');
	$('#word_content>tr').attr('className', '');
	$(this).attr('className', 'tSelect');
	var keyWord = $(this).find('.t1').text();
	keyWord = keyWord.trim();

	var re = initSent(keyWord);

	if (!re && keyWord.indexOf('_') >= 0) {
		//alert(re);
		keyWord = keyWord.replace(/_/ig, ' ');
		//alert(keyWord );
		initSent(keyWord);
	}
}


function sentTrClick() {
	var key = $(this).attr('content');
	var key = parseInt(key);
	//var sentStr= _Sent[key].sent;
	$('#sent_content>tr').attr('className', '');
	$(this).attr('className', 'tSelect');

	var keyWord = $(this).find('.t2').text();

	showSentInfo(key, keyWord.trim());
}

function showSentInfo(key, keyWord) {
	//alert(keyWord);
	eval('var reg=/([^a-z_])+(' + keyWord + ')+([^a-z_])/ig');
	//eval('var reg2=/[^a-z_]+'+keyWord+'/i');
	eval('var reg2=/([^a-z_])+(' + keyWord + ')$/ig');
	eval('var reg3=/^(' + keyWord + ')+([^a-z_])/ig');

	var tSent = ' ' + _Sent[key].sent + ' ';
	tSent = tSent.replace(reg, "$1<b>$2</b>$3");
	if (keyWord.indexOf('\'') == 0 || keyWord.indexOf('`') == 0) {
		eval('var reg=/(' + keyWord + ')+([^a-z_])/ig');
		tSent = tSent.replace(reg, "<b>$1</b>$2");
	}
	//tSent=tSent.replace(keyWord,"<b>"+keyWord+"</b>");
	//alert( tSent );
	//var 
	var htmlStr = '<div id="showSentInfo">';
	htmlStr += '<div id="showSentInfoW">';
	htmlStr += '<div class="showSentInfoTitle">完整句子</div>';
	htmlStr += '<div id="showSentInfoSent">' + tSent + '</div>';
	htmlStr += '<div class="showSentInfoTitle">句子词统计</div>';
	//htmlStr+='<div class="showSentInfoTable"><span>：</span><b>'+ +'</b></div>';
	var tmpA = _Sent[key];
	var th = '';//'<th>词数</th>';
	var td = '';// '<td>'+_Sent[key].token_cnt +'</td>';;
	for (p in worAttr) {
		th += '<th>' + worAttr[p] + '</th>';
		td += '<td>' + tmpA[p] + '</td>';
		//htmlStr+='<div class="showSentInfoItem"><span>'+worAttr[p]+'：</span><b>'+ tmpA[p]+'</b></div>';
	}
	htmlStr += '<div id="showSentInfoTable"><table width="100%" cellspacing="1" >';
	htmlStr += '<tr >' + th + '</tr><tr >' + td + '</tr></table></div>';
	htmlStr += '<div class="showSentInfoItem"><span class="showSentInfoTitle">句子所在文章位置：</span>';
	htmlStr += '<a href="javascript:;" onclick="javascript:sentInArt(' + key + ',\'' + keyWord.replace('\'', '\\\'') + '\');">' + _STitle[tmpA.essay_id] + '</a></div>';
	//alert();
	if (tmpA.root_verb != '') htmlStr += '<div class="showSentInfoItem"><span class="showSentInfoTitle">主动词：</span><span>' + tmpA.root_verb + '</span></div>';

	htmlStr += '</div></div>';
	F.show('句子查看', htmlStr, [[F.hide, ' 关 闭 ']], 500, 0);
}
function sentInArt(key, keyWord) {
	_eid = _Sent[key].essay_id;
	sentInArtSql(_eid, _Sent[key].sent, keyWord);
	//alert(essay_id);
}
//原版
function sentInArtSql(_eid, sent, keyWord) {
	eval('reg=/(' + sent + ')/ig ;');
	eval('var regSent=/([^a-z_])+(' + keyWord + ')+([^a-z_])/ig');
	var sent2 = ' ' + sent + ' ';
	sentTo = sent2.replace(regSent, "$1<u>$2</u>$3");
	//eval( 'reg2=/('+sent2+')/ig ;');	

	F.show('文章查看'
		, '<div id="showArt"><div id="showArtTitle"></div><div id="showArtW">Loading....</p></div></div>'
		, [[F.hide, ' 关 闭 ']]
		, 600, 0);

	//alert(Key);
	if (CEssay[_eid]) {
		var d = CEssay[_eid];
		//d= d.replace(reg,"<b>$1</b>");
		//alert(sentTo);
		d = d.replace(reg, '<B>' + sentTo + '</b>');
		$('#showArtW').html(d);
		$('#showArtTitle').html(_STitle[_eid]);
	} else {
		//alert( _eid );
		$('#showArtW').html('Loading......');
		$.post(_self + "?c=ajax&a=getEssay", { essayid: _eid }, function (d) {
			//alert(d);
			CEssay[_eid] = d;
			//d= d.replace(reg,"<b>$1</b>");
			d = d.replace(reg, '<B>' + sentTo + '</b>');
			$('#showArtW').html(d);
			$('#showArtTitle').html(_STitle[_eid]);
		});
	}
}

//初始化 句子
function initSent(keyWord) {
	var tem = searchSent(keyWord);
	if (tem.length == 0) return false;
	_SentNow = initSentHtml(tem, keyWord);
	setSentPage(1);


	var total = Math.ceil(_SentNow.length / _page);
	$('#sent_page>.PageTotal').text('共' + total + '页');
	if (total > 1) {
		$('#sent_page>.PageHeader').show();
		$('#sent_page>.PageNext').show();
		$('#sent_page>.PageFooter').show();
		$('#sent_page>.PageNow').show();
		$('#sent_page>.PagePre').show();

		$('#sent_page>.PageHeader').click(function () { setSentPage(1); });
		$('#sent_page>.PageFooter').click(function () { var total = Math.ceil(_SentNow.length / _page); setSentPage(total); });
		$('#sent_page>.PageNext').click(
			function () {
				var total = Math.ceil(_SentNow.length / _page);
				var pageNo = parseInt($('#sent_page>.PageNow').text());
				var pnext = pageNo + 1;
				if (total < pnext) pnext = total;
				setSentPage(pnext);
			}
		);
		$('#sent_page>.PagePre').click(
			function () {
				var pageNo = parseInt($('#sent_page>.PageNow').text());
				var pnext = pageNo - 1;
				if (pnext < 1) pnext = 1;
				setSentPage(pnext);
			}
		);
	} else {
		$('#sent_page>.PageHeader').hide();
		$('#sent_page>.PageNext').hide();
		$('#sent_page>.PageFooter').hide();
		$('#sent_page>.PageNow').hide();
		$('#sent_page>.PagePre').hide();
	}
	return true;
}

//统计先不
function anlyTotal(eid) {
	/*if(eid==''){
	}*/
	var o = {};
	for (var p in worAttr) {
		//worAttr
		o[p] = 0;
	}
	var tem, tj = 0;
	//alert( _Sent.length );
	for (var i = 0; i < _Sent.length; i++) {
		tem = _Sent[i];
		for (var p in worAttr) {
			o[p] += parseInt(tem[p]);
		}
		tj++;
	}
	o.sent_cnt = tj;
	//alert(o.token_cnt);
	return o;
}



function searchSent(keyWord) {
	var tArr = new Array();
	eval('var reg=/[^a-z_]+' + keyWord + '+[^a-z_]/i');
	//eval('var reg2=/[^a-z_]+'+keyWord+'/i');
	//eval('var reg2=/[^a-z_]+'+keyWord+'$/i');
	//eval('var reg3=/^'+keyWord+'+[^a-z_]/i');
	for (var i = 0; i < _Sent.length; i++) {
		if (reg.test(' ' + _Sent[i].sent + ' ')) { tArr[tArr.length] = i; continue; }
		//if( reg2.test(_Sent[i].sent) ){ tArr[tArr.length]=i; continue;}
		//if( reg3.test(_Sent[i].sent) ){ tArr[tArr.length]=i; continue;}
	}
	if (tArr.length == 0) {
		if (keyWord.indexOf('\'') == 0 || keyWord.indexOf('`') == 0) {
			eval('var reg=/' + keyWord + '+[^a-z_]/i');
			for (var i = 0; i < _Sent.length; i++) {
				if (reg.test(' ' + _Sent[i].sent + ' ')) { tArr[tArr.length] = i; continue; }
			}
		}
	}
	return tArr;
}

//把得到的id 初始化 html
function initSentHtml(tArr, keyWord) {
	if (CS[keyWord]) return CS[keyWord];
	var t = new Array();
	for (var i = 0; i < tArr.length; i++) {
		no = i + 1;
		//
		strSent = _Sent[tArr[i]].sent;//,keyWord;
		preNext = splitHeadword(strSent, keyWord);
		pre = reverseStr(subWord(reverseStr(preNext[0]), _preNextLent));
		next = subWord(preNext[1], _preNextLent);
		str = '<tr content="' + tArr[i] + '"><td class="t0">' + no + '</td><td class="t1">' + pre + '</td><td class="t2">';
		str += keyWord + '</td><td class="t3">' + next + '</td></tr>';
		t[i] = str;
	}
	CS[keyWord] = t;
	return t;
}
//分割中心词
function splitHeadword(str, keyword) {
	//return new Array(str,keyword);
	eval('var reg=/[^a-z_]+' + keyword + '+[^a-z_]/i');
	str = ' ' + str + ' ';

	t = str.split(reg);
	if (t.length < 2) {
		if (keyword.indexOf('\'') == 0 || keyword.indexOf('`') == 0) {
			eval('var reg=/' + keyword + '+[^a-z_]/i');
			t = str.split(reg);
		}

	}
	if (t.length > 2) {
		pre = t[0] + ' ' + keyword + ' ' + t[1];
		var cont = '';
		next = '';
		for (var i = 2; i < t.length; i++) {
			next += cont + t[i];
			cont = keyword + ' ';
		}
	} else {
		pre = t[0];
		next = t[1];
	}

	//pre=t[0];
	//next=t[1];
	//alert(pre);
	return new Array(pre, next);
}
//sent分页
function setSentPage(pageNo) {
	setSentHtml((pageNo - 1) * _page, _page);
	$('#sent_page>.PageNow').text(pageNo);
}

function setSentHtml(from, length) {
	var str = '';
	var max = length + from;
	var j = 0;
	for (var i = from; i < _SentNow.length && i < max; i++) {
		str += _SentNow[i];
	}
	$('#sent_content').html(str);
	$('#sent_content>tr').click(sentTrClick);
}


//往token（左边）里面填数据
function setEssayHtml(from, length) {
	var str = '';
	var max = length + from;
	//alert(_Word.length);
	for (var i = from; i < _Word.length && i < max; i++) {
		//trClass= i==from?' class="tSelect"':'';
		str += '<tr ><td class="t1">' + _Word[i].word + '</td><td class="t2">' + _Word[i].cnt + '</td></tr>';
	}
	//alert(str);
	$('#word_content').html(str);
	//$('#word_page>.PageNow').text(1);
}


function subWord(str, len) {
	//alert(str{len});
	if (!str) return '';
	if (str.length <= len) return str;
	var re = str.substr(0, len);
	var reg = /[a-z\-_]+/i;
	for (var i = len; i < str.length; i++) {
		tChar = str.substr(i, 1);
		if (reg.test(tChar)) re += tChar;//str[i];
		else { break; }
	}
	return re + '...';
}
//字符串反转
function reverseStr(str) {
	var re = '';
	for (var i = str.length; i > 0; i--) {
		re += str.substr(i - 1, 1);
	}
	return re;
}

function initUpload() {
	//alert('asdf');
	uploadFileInit();
	uploadZipInit();
	//uploadTextInit();
	$('.utSub').find('button').click(uploadSub);

}
function uploadSub() {
	var type = $(this).attr('content');
	//alert(type);
	if (type.trim() == 'upTextAdd') textAdd();
}

function textCheck() {
	var ttitle = $('#utTitle').val().trim();
	var tContent = $('#utContent').val().trim();
	//alert('456789');
	if (ttitle == '') { msg('标题不允许为空，请填写标题'); $('#utTitle').focus(); return; false }
	if (tContent == '') { msg('内容不允许为空，请填写内容'); $('#utContent').focus(); return; false }
	return true;
}
function textAdd() {
	if (!textCheck()) return false;
	$('.utSub').find('button').attr('disabled', true);
	var ttitle = $('#utTitle').val().trim();
	var tContent = $('#utContent').val().trim();
	msg('提交中......', false);
	$.post(_self + "?c=ajax&a=textAdd", { utTitle: encodeURIComponent(ttitle), utContent: encodeURIComponent(tContent) }, function (d) {
		$('.utSub').find('button').attr('disabled', false);
		msgHide();
		//alert(d);
		//alert( typeof parseInt( d.trim() ) )
		if (parseInt(d.trim()) < 0 || !parseInt(d.trim())) msg2(d);
		else {
			$('#utTitle').val('');
			$('#utContent').val('');
			var str = '语料库添加成功;<a href="' + _self + '?c=essay&a=view&id=' + d + '">查看语料库分析结果！</a>';
			msg2(str);
		}
	});
}

function uploadZipInit() {
	$('#upZipAdd').find('input').change(function () {
		var str = $(this).val();
		var pos = str.lastIndexOf('.');
		var ext = str.substring(pos + 1, str.length);
		if (ext.toLowerCase() != 'zip') {
			$(this).val('');
			msg('打包上传至语料库,只支持.zip文件');
			return false;
		}
	});
}
function uploadFileInit() {
	$('#upFileAdd').find('input').unbind('change');
	$('#upFileAdd').find('input').change(uploadFileChange);
}
function uploadFileChange() {
	//alert('asdf');
	var str = $(this).val();
	//alert( str );
	var pos = str.lastIndexOf('.');
	var ext = str.substring(pos + 1, str.length);
	//alert(ext.toLowerCase() )
	if (ext.toLowerCase() != 'txt') {
		$(this).val('');
		msg('文件上传至语料库,只支持.txt文件');
		return false;
	}

	Jnum = 0;
	var obj = $('#upFileAdd').find('input');
	obj.each(
		function (i) {
			if ($(this).val() == '') return false;
			Jnum++;
		});
	//alert( Jnum );
	if (Jnum == obj.length) {
		//alert('456');
		var div = document.createElement('div');
		div.className = 'uploadItem2';
		div.innerHTML = '<span>文件' + (Jnum + 1) + '：</span><input type="file" name="userfile[]">';
		//appendChild
		document.getElementById('upFileAdd').appendChild(div);
		uploadFileInit();
	}
}

function msg(msg) {
	if (undefined != dialog) {
		var d = dialog({ content: msg });
		d.show();
		setTimeout(function () {
			d.close().remove();
		}, 2000);

	} else {
		var uiwang = $('#icibaWinWarning');
		uiwang.css('opacity', 1);
		msg = '<div style="padding:30px 20px;color:#336699;  text-align:center">' + msg + '</div>';
		F.msg(msg, 260, 0, 0);
		if (uiwang.length <= 0) uiwang = $('#icibaWinWarning');
		uiwang.css({ 'opacity': 1, 'background-color': '#fff', 'box-shadow': '0 0 8px rgba(0, 0, 0, 0.1)', 'border-radius': '6px' });
		//uiwang.addClass('pigaiDialog' );
		var isClose = true;
		if (arguments.length > 1) {
			isClose = arguments[1];
		}
		if (isClose) {
			setTimeout(function () { uiwang.slideUp("fast", msgHide); }, 3000);
		}
	}
}
function msgHide() { F.msgHide(); }
function msg2(msg) {
	/*
		F.show('提示 批改网(pigai.org)','<div style="padding:20px;">'+msg+'</div>'
		,[[F.hide,'关闭'] ],400,0);*/
	F.show('提示', '<div style="padding:20px;">' + msg + '</div>'
		, [[F.hide, '关闭']], 400, 0);

}
function initMy() {
	//alert('456');
	//$('#esMy').find('table>tbody>tr>.t1').click(myTrClick);
	//$('#esMy').find('table>tbody>tr>.t2').click(myTrClick);
	$('#esMy').find('tbody').find('input').click(inputMyClick);
	$('.esMySub>button').click(esMySub);
	//$('#esMy').find('table>tbody>tr').click(myTrClick);
}

function esMySub() {
	ids = '';
	cont = '';
	$('tbody').find('input').each(function (i) {
		if ($(this).attr('checked')) {
			ids += cont + $(this).val();
			cont = ',';
		}
	});
	//alert(ids);	
	if (ids.trim() == '') {
		msg('请选择您要分析的语料库！');
		return;
	}
	//alert(_self);
	location.href = _self + '?c=essay&a=view&id=' + ids;
}
function myTrClick() {
	var p = $(this).parent();
	//p.find('input').click();
	var ch = p.find('input').attr('checked');
	if (!ch) p.attr('className', 'tSelect');
	else p.attr('className', '');
	p.find('input').attr('checked', !ch);
	toInput();
}
function inputMyClick() {
	var p = $(this).parent().parent();
	var ch = $(this).attr('checked');
	//alert(ch);
	if (ch) p.attr('className', 'tSelect');
	else p.attr('className', '');
	toInput();
}

function toInput() {
	ids = '';
	cont = '';
	$('tbody').find('input').each(function (i) {
		if ($(this).attr('checked')) {
			ids += cont + $(this).val();
			cont = ',';
		}
	});
	$('#esMyinput').val(ids);
}

function wCheck(obj, msgStr) {
	if (obj.val().trim() == '') {
		obj.focus();
		try {
			var d = dialog({
				content: msgStr,
				//quickClose: true// 点击空白处快速关闭
			});
			d.show(obj[0]);
			setTimeout(function () { d.close().remove(); }, 2000);

		} catch (e) {
			msg(msgStr);
		}
		return false;
	}
	return true;
}

function initTeacherPigai() {
	if ($('.sentCheckChunkTeacher')) {
		$('.sentCheckChunkTeacher').find('u').click(chunkPigai);
		$('.sentCheckTripleTeacher').find('u').click(triplePigai);
	}
}
function chunkPigai() {
	//alert($(this).text());
	var str = $(this).text();
	var idStr = $(this).attr('id');
	var cssStr = $(this).parents('span').attr('className');
	_isChunk_Trp = 'chunk';
	showError(idStr, str, cssStr);
	chunkLoad(str);

}
function showError(idStr, str, cssStr) {
	var htmlStr = '';
	htmlStr = '<div id="chunkPigaiShow" content="' + idStr + '">';
	htmlStr += '<div class="chunkPigaiShowTitle"><span>词组:</span><b>' + str + '</b></div>';
	if (cssStr == 'error_select' || cssStr == 'error_chunk') {
		htmlStr += '<div class="chunkPigaiShowError"><span style="font-size:12px;">正在载入教师批改建议......</span></div>';
	}
	if (cssStr != 'error_chunk') {
		htmlStr += '<div class="chunkPigaiShowContentW">批改类型：<INPUT TYPE="radio" NAME="error_type" value="1" > 错误';
		htmlStr += ' <INPUT TYPE="radio" NAME="error_type" value="2"> 警告 ';
		htmlStr += '<INPUT TYPE="radio" NAME="error_type" value="3" checked> 建议 </div>';
		htmlStr += '<div class="chunkPigaiShowContent"><TEXTAREA name="error_txt" id="error_txt"></TEXTAREA></div>';
	} else {
		htmlStr += '<Br><Br>';
	}
	htmlStr += '</div>';
	var btArrry = [[chunkPigaiSub, ' 批 改 '], [F.hide, ' 关 闭 ']];
	if (cssStr == 'error_chunk') {
		btArrry = [[F.hide, ' 关 闭 ']];
	}
	F.show('批改词组', htmlStr, btArrry, 500, 0);
}
function delError(id, type) {
	//alert( id );
	$.post(_self + "?c=ajax&a=delChunkError&type=" + type, { 'id': id }, function (d) {
		F.show('提示 批改网(pigai.org)', '<div style="padding:20px;">' + d + '</div>'
			, [[function () { F.hide(); location.reload(); }, '关闭']], 400, 0);
		//F.hide();
	});
}
function chunkLoad(str) {
	if (str.trim() == '') { return false; }
	if ($('.chunkPigaiShowError').length > 0) {
		//alert(str);
		$.post(_self + "?c=ajax&a=getChunkError&type=" + _isChunk_Trp, { name: encodeURIComponent(str) }, function (d) {
			//alert(d);
			try {
				eval("var error=" + d + ";");
				var str = '';
				for (var i = 0, c = error.length; i < c; i++) {
					//alert( error[i].user_id +':'+ J.config.userId);
					is_delete = error[i].user_id.int() == J.config.userId.int() ? ' <a href="javascript:;" onclick="javascript:delError(\'' + error[i].id + '\',\'' + _isChunk_Trp + '\')" >删除</a>' : '';
					str += '<div>';
					if (error[i].teacher_name.trim() != '') str += '<span>' + error[i].teacher_name + '老师指出</span>:';
					else str += '<span>系统指出</span>:';
					str += '<b>' + error[i].exp + '</b>' + is_delete + '</div>';
				}
				$('.chunkPigaiShowError').html(str);
			} catch (e) {
				msg(d);
			}
		});
	}
}
function getPostStrTrp(eName, ids) {
	eName = eName.replace('...', '~');
	eName = eName.replace(' ', '_');
	var posrel_id = $('#' + ids).attr('content');
	if (posrel_id == '2') {
		var Tarr = eName.split('~');
		eName = Tarr[1] + '~' + Tarr[0];
	}
	return eName;
}
function chunkPigaiSub() {
	if ($('#error_txt').val().trim() == '') {
		msg('错误内容不允许为空!');
		$('#error_txt').focus();
		return false;
	}
	//chunkPigaiShowContentW
	//alert( $('.chunkPigaiShowContentW>input').length );
	var type = 1;
	$('.chunkPigaiShowContentW>input').each(function (i) {
		if ($(this).attr('checked')) {
			type = $(this).val();
			return false;
		}
	});
	//alert(type);
	//return false;
	var ids = $('#chunkPigaiShow').attr('content');

	var eName = $('.chunkPigaiShowTitle>b').text().trim();
	var error_txt = $('#error_txt').val().trim();
	if (_isChunk_Trp == 'trp') {
		eName = getPostStrTrp(eName, ids);
	}
	$('#icibaWinBotton').find('input').attr('disabled', true);
	msg('正在提交......', false);
	$.post(_self + "?c=ajax&a=chunkPigai&type=" + _isChunk_Trp, { eid: _eid, name: encodeURIComponent(eName), exp: encodeURIComponent(error_txt), tp: type }, function (d) {
		msg(d);
		var ids = $('#chunkPigaiShow').attr('content');
		$('#icibaWinBotton').find('input').attr('disabled', false);
		F.hide();
		$('#' + ids).parents('span').attr('className', 'error_select');
	});
	//alert(eName);
}
function triplePigai() {
	var str = $(this).text();
	var idStr = $(this).attr('id');
	var cssStr = $(this).parents('span').attr('className');
	_isChunk_Trp = 'trp';
	showError(idStr, str, cssStr);
	str = getPostStrTrp(str, idStr);
	chunkLoad(str);
}

function initPigaiView() {
	//alert('asdf');
	if ($('.error_chunk')) {
		$('.error_chunk').click(errorChunkClick);
	}
	if ($('.pigaiShow')) {
		$('.pigaiShow').click(pigaiShow);
		countShow();
	}
	if ($('.show2')) {
		$('.show2').click(pigaiShow2);
	}
}
function countShow() {
	$('.pigaiShow').each(
		function (i) {
			//alert( $(this).attr('content') );
			var classStr = '.' + $(this).attr('content') + 'ico';
			var len = $(classStr).length;
			$(this).find('b').html(len);
		}
	);
}
function pigaiShow() {
	if ($(this).find('b').text().int() == 0) {
		return false;
	}
	$('.pigaiShow').parents('li').attr('className', '');
	$(this).parents('li').attr('className', 'select');
	$('.tbContent').find('.item').hide();
	var classStr = '.' + $(this).attr('content') + 'ico';
	$(classStr).parents('li').show();
}

function pigaiShow2() {
	//alert(  );
	$('.show2').parents('li').removeClass('select');//attr('className','');
	$(this).parents('li').addClass('select');//attr('className','select');
	$('.myItem').hide();
	var id = $(this).attr('content');
	$('#' + id).show();
}

function errorChunkClick() {
	//alert( $(this).text()  );
	_isChunk_Trp = 'chunk';
	var str = $(this).text();
	showError('-1', str, 'error_chunk');
	chunkLoad(str);
}


//用ajax 提交 然后记录过程
function essayAjaxPost() {
	_isPost = true;
	var eid = $("input[name=eid]").val();
	var cStr = $('#utContent').length > 0 ? $('#utContent').val() : $('body', docId).html();//内容
	//alert(cStr);
	//return false; 
	dd = '';
	if ($('input[name="del[]"]').length > 0) {
		$('input[name="del[]"]').each(function () {
			if (!$(this).is(':checked')) dd += $(this).val() + ',';
		});
	}
	//alert(dd);
	//return false;

	initViewSqs(eid);
	$.post(_self + "?c=ajax&a=PostV2"
		, {
			utContent: encodeURIComponent(cStr)
			, rid: $("input[name=rid]").val()
			, eid: $("input[name=eid]").val()
			, type: 0
			, gao: 1
			, uncheck: dd
		}
		, function (d) {
			if (d.trim() == 'ok') {
				_isPost = 2;
			} else {
				var dmsg = d.trim();
				if (dmsg.indexOf('msg:') == 0) {
					_isPost = false;
					alert(d.trim().replace('msg:', ''));
					F.hide();
				} else {
					//从新提交
					essayAjaxPost();
				}
				//msg2( d.trim() );
				return false;
			}
		});
	return false;
}

function initViewSqs(eid) {
	startSqs(eid);
	var html = '';
	//html+='<li content="post">[<span>分析中...</span>] 入库</li>';
	html += '<li content="system">[<span>分析中...</span>] 解析</li>';
	html += '<li content="pigai_essay_stat">[<span>分析中...</span>] 文章统计</li>';
	//html+='<li content="check_term">[<span>分析中...</span>] 语言点检查</li>';
	html += '<li content="pos">[<span>分析中...</span>] 词汇统计</li>';
	html += '<li content="relevance">[<span>分析中...</span>] 语义关联</li>';
	html += '<li content="wgrammar">[<span>分析中...</span>] 语法检查</li>';
	html += '<li content="term_count">[<span>分析中...</span>] 语言点检查</li>';
	html += '<li content="spell_check">[<span>分析中...</span>] 词汇检查</li>';
	F.show('分析进度 批改网(pigai.org)', '<h1>正在分析请勿关闭......</h1><div style="padding:0 20px;" id="viewSqs">' + html + '<ul></ul></div>'
		, [], 400, 0);
}


function initViewSqsV2(eid) {
	//startSqs( eid );
	var html = '';
	/*
	html+='<li content="sntbr">[<span>分析中...</span>] 句子切分</li>';
	html+='<li content="parse">[<span>分析中...</span>] 语义分析</li>';
	html+='<li content="kp">[<span>分析中...</span>] 语言点分析</li>';
	html+='<li content="grammar">[<span>分析中...</span>] 语法检查</li>';
	*/
	//html+='<li content="v3_anly">[<span>分析中...</span>] 语言分析</li>';
	//html+='<li content="v3_save">[<span>分析中...</span>] 数据保存</li>';
	html += '<span class="progressbar" id="uploadprogressbar" style="font-size:12px;">0%</span>';
	F.show('分析进度 批改网(pigai.org)', '作文已提交成功<br>正在分析请勿关闭......<div style="padding:0 20px;" id="viewSqs">' + html + '<ul></ul></div>'
		, [], 400, 0);
	var strlen = 10000;
	try {
		if ($('#contents').length > 0) {
			strlen = $('#contents').val().length || $('#contents').text().length;
		}
	} catch (e) { strlen = 10000; }
	initProgressBar(strlen, '#uploadprogressbar');
}

function startSqs(eid) {
	$.post(_self + "?c=ajax&a=delSqs", { eid: eid }, function (d) {
		viewSqs(eid);
	});
}
function viewSqs(eid) {
	//alert(eid);
	if (!_isPost) return;
	if (_isPost == 2) {
		location.href = _self + '?c=write&a=view2&eid=' + eid;
		return;
	}
	$.post(_self + "?c=ajax&a=viewSqs", { eid: eid }, function (d) {
		try {
			eval("var o=" + d);
			var str = '';
			for (p in o) {
				//alert(p);
				str = o[p] == 0 ? '小于0.001秒' : o[p] + '秒';
				$('#viewSqs').find('li[content=' + p + ']').find('span').html(str);
			}
		} catch (e) {
		}
		//setTimeout(viewSqs,50 ,eid);
		setTimeout("viewSqs(" + eid + ")", 1500);
	});
}

//postSave + postAnly 等于 essayAjaxPost 的功能
function postSave() {
	//alert('save');
	if ($('.tips').length > 0) { alert($('.tips').text()); return; }

	var eid = $("input[name=eid]").val();
	var cStr = $('#utContent').length > 0 ? $('#utContent').val() : $('body', docId).html();//内容
	var cTitle = $('#utTitle').length > 0 ? $('#utTitle').val() : '未定义'; //标题
	dd = '';
	if ($('input[name="del[]"]').length > 0) {
		$('input[name="del[]"]').each(function () {
			if (!$(this).is(':checked')) dd += $(this).val() + ',';
		});
	}
	msg2("正在提交......");
	$.post(_self + "?c=ajax&a=postSave"
		, {
			utContent: encodeURIComponent(cStr)
			, utTitle: encodeURIComponent(cTitle)
			, rid: $("input[name=rid]").val()
			, eid: $("input[name=eid]").val()
			, type: 0
			, gao: 1
			, bzold: $('#beizhu').length == 0 ? '' : encodeURIComponent(bzold)
			, bz: $('#beizhu').length == 0 ? '' : encodeURIComponent($('#beizhu').val())
			, uncheck: dd
		}
		, function (d) {
			F.hide();
			var dmsg = d.trim();
			if (dmsg.indexOf('eid') == 0) {
				eid = dmsg.replace('eid=', '');
				//alert(eid);
				if ($('#fktime').val() == '2') {
					alert("保存成功，系统在1小时后提供反馈");
					location.href = _self + "?c=write";
				} else {
					postAnly(eid);
				}
			} else if (dmsg.indexOf('msg:') == 0) {
				alert(d.trim().replace('msg:', ''));
			} else {
				alert("发生错误！\n\n错误信息：\n" + dmsg);
			}
			return false;

		});

}

//postSave + postAnly 等于 essayAjaxPost 的功能 
function postAnly(eid) {
	_isPost = true;
	initViewSqs(eid);
	$.post(_self + "?c=ajax&a=postAnly", { eid: eid }
		, function (d) {
			var dmsg = (d.trim());
			if (dmsg.indexOf('msg:') == 0) {
				_isPost = false;
				F.hide();
				alert(dmsg.replace("msg:", ""));
				location.href = _self + "?c=write";
			} else if (dmsg == 'ok') {
				//分析成功
				location.href = _self + "?c=write&a=view2&eid=" + eid;
				_isPost = false;
			} else {
				_isPost = false;
			}
		});

}
//end 用ajax 提交 然后记录过程
function setQ(key, value) {
	eval('var test=/' + key + '=([^&]*)/g');
	_url = arguments.length > 2 ? arguments[2] : location.href;
	_url = _url.replace(test, '');
	//alert(_url);
	_pos = _url.indexOf('?');
	if (_pos > 0)
		if (_pos + 1 == _url.length)
			_url += '';
		else
			_url += '&';
	else
		_url += '?';
	_url += key + '=' + value;
	_url = _url.replace(/&{2}/, '&');
	_url = _url.replace(/\?&/, '?');
	//alert(_url);
	return _url;
}

//语言点增加
function showWinZdianping(ob, btArray) {
	// ob.str 显示 ob.essay_id ob.request_id ob.sent_id ob.sent_txt ob.term ob.type类别
	var htmlStr = '';
	htmlStr += '<div id="ChunkToggle" content="v1">缩起▲</div>';
	htmlStr += '<div id="chunkPigaiShow">';
	htmlStr += '<div class="chunkPigaiShowTitle"><b>' + ob.str + '</b></div>';

	htmlStr += '<div class="chunkPigaiShowContentW">打分建议：'
	htmlStr += '<INPUT TYPE="radio" NAME="error_type" value="-2" > 减分';
	htmlStr += ' <INPUT TYPE="radio" NAME="error_type" value="0" > 只做提示 ';
	//htmlStr+='<INPUT TYPE="radio" NAME="error_type" value="1" > 加分 </div>';
	htmlStr += '<INPUT TYPE="radio" NAME="error_type" value="-1" checked> 减分并显示 </div>';

	htmlStr += '<div id="chunkContentTxt"><div class="chunkPigaiShowContentW">';
	htmlStr += '错误标签(可以选择或者直接输入)<br><INPUT TYPE="text" NAME="" style="width:450px;" id="tabTxt" value="">';
	htmlStr += '</div>';

	htmlStr += '<div class="chunkPigaiShowContentW chunkPigaiTab">';
	htmlStr += '常用标签:<span>大小写错误</span><span>构词错误</span><span>主谓不一致</span><span>语态错误</span>';
	htmlStr += '</div>';
	try {
		var dcat = '';
		for (var i = 0; i < cat.length; i++) {
			dcat += '<option value="' + i + '">' + cat[i] + '</option>' + "\n";
		}
		htmlStr += '<div class="chunkPigaiShowContentW" id="t_dcat">';
		htmlStr += '全部标签:<select name="cat" id="t_cat">' + dcat + '</select> (请选择标签分类) <a href="http://wiki.pigai.org/doc-view-228.html" target="_blank" style="font-size:12px;">标签说明</a>';
		htmlStr += '</div>';
		htmlStr += '<div class="chunkPigaiShowContentW chunkPigaiTab" style="" id="chunkPigaiTab_all">';
		htmlStr += '</div>';
	} catch (e) {
	}


	htmlStr += '<div class="chunkPigaiShowContent">简单说明:<TEXTAREA name="error_txt" id="error_txt"></TEXTAREA></div>';
	htmlStr += '<div class="chunkPigaiShowContentW2">可替换为(选填):<INPUT TYPE="text" NAME="chang_to" id="chang_to"></div>';

	htmlStr += '</div></div>';
	htmlStr += '<INPUT TYPE="hidden" NAME="essay_id" id="t_essay_id" value="' + ob.essay_id + '">';
	htmlStr += '<INPUT TYPE="hidden" NAME="request_id" id="t_request_id" value="' + ob.request_id + '">';
	htmlStr += '<INPUT TYPE="hidden" NAME="sent_txt" id="t_sent_txt" value="' + ob.sent_txt + '">';
	htmlStr += '<INPUT TYPE="hidden" NAME="sent_id" id="t_sent_id" value="' + ob.sent_id + '">';
	htmlStr += '<INPUT TYPE="hidden" NAME="term" id="t_term" value="' + ob.term + '">';
	htmlStr += '<INPUT TYPE="hidden" NAME="type" id="t_type" value="' + ob.type + '">'; //dobj.attr('title');


	F.show('批改', htmlStr, btArray, 500, 0);
	ChunkToggleInit();
	chunkAllTabMore();
	chunkPigaiTab();
}

function showWinZdianpingV2(ob, btArray) {
	//alert(ob.str);
	var htmlStr = '';
	htmlStr += '<div id="Chunkmsg" style="display:none">正在提交......</div>';
	htmlStr += '<div id="ChunkToggle" content="v2">高级(标签和说明) ▼</div>';
	htmlStr += '<div id="chunkPigaiShow">';
	htmlStr += '<div id="chunkPigaiShowText"><div><b>预览</b>  <span id="chunkPigaiChacha">查字典</span></div>';
	var sst = ob.str.replace('"', "“");
	sst = sst.replace('"', "”");
	//alert( sst );
	htmlStr += '<div class="chunkPigaiShowTitle">[教师点评]<span id="chunkDisplay" content="' + sst + '">' + sst + '</span></div></div>';
	htmlStr += '<div>';
	htmlStr += '<div id="chunkContentTxt" style="display:none;">';
	htmlStr += '<div id="chunkPigaiOther" style="display:none;"></div>';
	htmlStr += '<div class="chunkPigaiShowContentW">';
	htmlStr += '错误标签(可以选择或者直接输入)<br><INPUT TYPE="text" NAME="" style="width:450px;" id="tabTxt" value="">';
	htmlStr += '</div>';
	htmlStr += '<div class="chunkPigaiShowContentW chunkPigaiTab">';
	htmlStr += '常用标签:<span>大小写错误</span><span>构词错误</span><span>主谓不一致</span><span>语态错误</span>';
	htmlStr += '</div>';
	try {
		var dcat = '';
		for (var i = 0; i < cat.length; i++) {
			dcat += '<option value="' + i + '">' + cat[i] + '</option>' + "\n";
		}
		htmlStr += '<div class="chunkPigaiShowContentW" id="t_dcat">';
		htmlStr += '全部标签:<select name="cat" id="t_cat">' + dcat + '</select> (请选择标签分类) <a href="http://wiki.pigai.org/doc-view-228.html" target="_blank" style="font-size:12px;">标签说明</a>';
		htmlStr += '</div>';
		htmlStr += '<div class="chunkPigaiShowContentW chunkPigaiTab" style="" id="chunkPigaiTab_all">';
		htmlStr += '</div>';
	} catch (e) {
	}
	htmlStr += "</div>";

	htmlStr += '<div class="chunkPigaiShowContent"><div id="chunkPigaiInfo">简单说明:</div><TEXTAREA name="error_txt" id="error_txt"></TEXTAREA></div>';
	htmlStr += '<div class="chunkPigaiShowContentW2" style="display:none;">可替换为(选填):<INPUT TYPE="text" NAME="chang_to" id="chang_to"></div>';
	htmlStr += '</div></div>';
	F.show('批改', htmlStr, btArray, 500, 0);
	ChunkToggleInit();
	chunkAllTabMore();
	chunkPigaiTab();
	//$('#ChunkToggle').click();
	initChunkV2();
	enterV2(function () { var s = btArray[0][0]; s(); });
}
function enterV2(fnt) {
	$('#error_txt').keyup(function (e) { if (e.keyCode == 13) fnt(); });
}
function initChunkV2() {
	//$('#error_txt').val('请检查是否使用正确');
	$('#tabTxt').blur(blurChunk);
	$('#error_txt').blur(blurChunk);
	$('#chang_to').blur(blurChunk);
	$('#tabTxt').keyup(blurChunk);
	$('#error_txt').keyup(blurChunk);
	$('#chang_to').keyup(blurChunk);
	$('#tabTxt').focus(blurChunk);
	$('#error_txt').focus(blurChunk);
	$('#chang_to').focus(blurChunk);
	$('#error_txt').focus();
}

function blurChunk() {
	var str = $('#chunkDisplay').attr("content");
	var tab = $.trim($('#tabTxt').val());
	var error_txt = $.trim($('#error_txt').val());
	var chang_to = $.trim($('#chang_to').val());
	var st_str = str + " : ";
	if (tab != '') {
		st_str += " 是" + tab;//+",";
		if (tab.indexOf("错误") < 0) st_str += '错误';
		st_str += ',';
	}
	if (error_txt != '') { st_str += error_txt; }
	if (chang_to != '') { st_str += '建议替换为' + chang_to; }
	$('#chunkDisplay').html($.trim(st_str, ':'));
}
function chunkAllTabMore() {
	//alert('addd');
	$('#t_cat').unbind('change');
	$('#t_cat').change(function () {
		//alert('dddd'); 
		var ix = this.options[this.selectedIndex].value;
		//alert( ix );
		ix = parseInt(ix);
		if (ix < 0) return false;
		var str_html = '';
		//alert( cat_cn[ix].length );
		for (var i = 0; i < cat_cn[ix].length; i++) {
			str_html += '<span>' + cat_cn[ix][i] + '</span>';
		}
		$('#chunkPigaiTab_all').html(str_html);
		$('#chunkPigaiTab_all').show();
		chunkPigaiTab();

	});
}

function ChunkToggleInit() {
	$('#ChunkToggle').click(function () {
		//$('input[name=error_type]').attr('checked',false);
		if ($('#chunkContentTxt').css('display') == 'none') {
			$('#chunkContentTxt').show();
			$(this).html('缩起▲');
			$('input[name=error_type][value=-1]').attr('checked', true);
		} else {
			$('#chunkContentTxt').hide();
			$(this).html('高级(标签和说明) ▼');
			$('input[name=error_type][value=-2]').attr('checked', true);
		}
		$('#error_txt').focus();
	});
}
function chunkPigaiTab() {
	$('.chunkPigaiTab').find('span').unbind('click');
	$('.chunkPigaiTab').find('span').click(function () {
		var v = $('#ChunkToggle').attr('content');
		//alert( v );
		if (v == 'v2') {
			$('#tabTxt').val($(this).html());
			$('.sp_select').removeClass('sp_select');
			$(this).addClass('sp_select');
			$('#tabTxt').focus();
			return;
		}
		var str = $('#tabTxt').val();
		if ($(this).attr('className').indexOf('sp_select') >= 0) {
			$(this).removeClass('sp_select');
			str = str.replace($(this).html() + " ", '');
		} else {
			$(this).addClass('sp_select');
			str += $(this).html() + " ";
		}
		$('#tabTxt').val(str);
	});
}

function getZpigaiData() {
	var key = $('#t_term').val();
	var scrot_adj = $('.chunkPigaiShowContentW').find("input[name='error_type'][checked]").val();
	var chunTab = $('#tabTxt').val();
	chunTab = chunTab.trim();
	var des = $('#error_txt').val();
	var chang = $('#chang_to').val();
	des = des.trim();
	var _type = $('#t_type').val();
	var data = { tab: encodeURIComponent(chunTab), term: encodeURIComponent(key), des_htm: encodeURIComponent(des), change_to: chang, score_adjust: scrot_adj, term_type: _type };
	data.request_id = $('#t_request_id').val();
	data.essay_id = $('#t_essay_id').val();
	data.sent_id = $('#t_sent_id').val();
	data.sent_txt = $('#t_sent_txt').val();
	return data;
}

function zdianpingPost() {
	var data = getZpigaiData();
	if (data.tab == '' && $('#chunkContentTxt').css('display') != 'none') {
		alert('请错误标签');
		$('#tabTxt').focus();
		return false;
	}
	if (data.des == '' && $('#chunkContentTxt').css('display') != 'none') { alert('请填写说明'); $('#error_txt').focus(); return; }

	$.post(_self + '?c=ajax&a=zterm', data, function (d) {
		if (d.trim() != '1') { alert(d); }
		else {
			alert('感谢您的确认！');
			F.hide();
			location.reload();
		}
	});
}

//end 增加语言点

function initStime() {
	alert("dddddd");
}

function setPop(left, top) {
	$('#pop').css('top', top + 'px');
	$('#pop').css('left', left + 'px');
	$('#pop').fadeIn("slow");
	//alert( $('#pop').attr('clientHeight') );
}
function initPop() {

	$('#pop_close').click(function () {
		$('#pop').fadeOut("slow");
	});
	try {
		if ($('.dptermping').length > 0 || parseInt(_dianping_term_cnt) > 0) { return; }
	} catch (e) { }
	$('.sentTxt').hover(function () {
		if ($('#pop').attr("content") == "1") return;
		$('#pop').attr("content", '1');
		var pos = getCoords(this);
		setPop(pos.x, pos.y - 65);
	}, function () { });

	//alert(pos.x);
}

function getCoords(node) {
	var x = node.offsetLeft;
	var y = node.offsetTop;
	var parent = node.offsetParent;
	while (parent != null) {
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		x: x,
		y: y
	};
}

function purview() {
	//msg2("您目前使用的是基础版，请升级为更高版本！");
	var html = '<div style="padding-left:50px;background:url(/res/images/fts.gif) no-repeat;height:80px;">';
	html += '<div style="color:#2e5f88;padding-top:10px;">您需要升级到更高版本才能使用此功能！</div>';

	/*
	html +='<div style="padding:30px 0 0 80px;">';
	html +='<a style="float:left;background:url(/res/images/tan.gif) no-repeat;width:92px;height:30px;" href="/?a=upgrade" target="_blank" onclick="javascript:F.hide();"></a>';
	html +='<input type="button" value="关闭">';
	html +='<a href="javascript:;" style="font-size:12px;float:left;padding-left:10px;padding-top:10px" onclick="javascript:F.hide();">关闭</a>';
	html +='<div style="clear:both;"></div> ';
	html +='</div>';
	*/
	html += '</div>';//icibaWinBotton

	F.show('提示 批改网(pigai.org)', html, [[function () { location.href = '/?a=upgrade'; }, "了解详情"], [function () { location.href = '/?c=teacher&a=invite'; }, '邀请老师获得延期']], 400, 0);
}

function purview_new() {

    F.show('<div style="padding-left:10px;background:url(/res/images/fts.gif) no-repeat;height:70px;margin-left:20px;"><div style="text-align:center;font-size:18px;font-weight:bold;margin-left:55px;margin-top:50px;color:#68726f;">您需要升级到更高版本才能使用此功能！</div>',
        '<a href="/?c=teacher&a=zhifu" style="color:#fff;"><div style="height:54px;width: 360px;font-size: 18px;text-align:center;margin-top:77px;' +
        'line-height:54px;margin-left:38px;background:#f26665;border: 1px solid #f26665;border-radius:5px;">' +
        '升级版本</div></a></div>',288,480);

}

function initTop() {
	var pos = $('#write').position();
	//alert(pos.left );
	var Lleft = (pos.left + 960) + "px";
	//alert( document.documentElement.scrollTop  );

	$(window).load(function () {
		//alert("left="+Lleft);
		$('.scroll').css({ "left": Lleft });
		topHideShow();
	}).scroll(function () {
		topHideShow();
	}).resize(function () {
		topHideShow();
	});
}
function topHideShow() {
	//$('.scroll').css( {"bottom":"100px"}); 
	if (document.documentElement.scrollTop > 0) { $('.scroll').fadeIn(); }
	else { $('.scroll').fadeOut(); }
}

function initProgressBar(len, id) {
	$(id).progressBar();
	$(id).fadeIn();
	var inum = 0;
	//$( id ).progressBar( 50 );
	var _ttime = 0.365 + 0.007 * len / 5.56 + 0.042 * Math.sqrt(len / 5.56);
	//alert( _ttime  );
	var _titem = 50;
	var i = setInterval(function () {
		//if(inum>=100) return;	
		var numbar = 100.0 * inum * _titem / (_ttime * 1000);
		//alert( numbar );
		if (numbar > 100) { clearInterval(i); return; }
		$(id).progressBar(numbar);
		inum++;

	}, _titem);
}

function dd_more() {
	var now_show;
	var APIF = J.readCookie('_APIF' );
	$('.df_more').hover(function () { now_show = $(this); dd_show(); }, dd_hide);
	$('#more_dd').hover(dd_show, dd_hide);

	function dd_show() {
		//alert('dddd');
		var id = now_show.attr('content');
		var node = now_show.get(0);
		var essy_type = now_show.data("type");
		var pos = J.getCoords(node);
		var essy_type2=now_show.attr('data-type2');

		$('#more_dd').attr('style', 'height:203px');

		if (essy_type == "101") {
			var str = '<li><a href="http://tiku.pigai.org/index.php?m=Translation&c=Index&a=answerTransLog&eid=' + id + '" >查看</a></li>';
			str += '<li><a href="http://tiku.pigai.org/index.php?m=Translation&c=Student&a=index&id=' + id + '">自测</a></li>';
			str += '<li><a type="101" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '<li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a></li>';
		} else if (essy_type == "104") {
			var str = '<li><a href="http://tiku.pigai.org/Tkdictation/Index/answerTransLog/eid/' + id + '" >查看</a></li>';
			str += '<li><a href="http://tiku.pigai.org/Tkdictation/Student/index/rqid/' + id + '">自测</a></li>';
			str += '<li><a type="104" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '<li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a></li>';

		} else if (essy_type == "103") {
			var str = '<li><a href="/tkread/index/rlist/rid/' + id + '" >查看</a></li>';
			str += '<li><a href="http://tiku.pigai.org/tkread/student/index/rid/' + id + '" >自测</a></li>';
			str += '<li><a type="103" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '<li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a></li>';
		} else if (essy_type == "102") {
			var str = '<li><a href="http://tiku.pigai.org/decorate/Index/answerLog?eid=' + id + '" >查看</a></li>';
			str += '<li><a href="http://tiku.pigai.org/index.php?m=decorate&c=Index&a=stuWork&eid=' + id + '">自测</a></li>';
			str += '<li><a type="102" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '<li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a></li>';
		} else if (essy_type == "24") {
			var str = '<li><a href="/?c=write&a=writeFrom&rid=' + id + '" >自测</a>';
			str += '</li><li><a type="24" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '</li><li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'活动作文不支持自主修改，删除之后，将无法再重新布置，确定要删除吗？\');">删除</a>';
			str += '</li>';
			$('#more_dd').attr('style', 'height:76px');
		}else if(essy_type2=="-3"){
			var str='';
			str += '<li><a href="http://qq.pigai.org/index.php?c=moxie&a=download&rid='+id+'" target="_blank">下载作业</a></li>';
			if (APIF != 'china_mobile_edu_he_pigai') {
				str += '<li><a href="http://qq.pigai.org/res/scan_ocr/moxie.html?rid='+id+'" target="_blank">手写批改</a></li>';
			}
			str += '<li><a href="/index.php?c=v2&a=write&rid='+id+'">自测</a></li>';
			str += '</li><li><a type="-3" href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '<li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a></li>';
		} else {
			var str = '<li><a href="/?c=write&a=writeFrom&rid=' + id + '" >自测</a>';
			str += '</li><li><a href="javascript:void(0)" onclick="preview(' + id + ',this)">预览</a>';
			str += '</li><li><a href="/?c=teacher&a=createv2&fid=' + id + '">复制要求</a>';
			str += '</li><li><a href="/?c=teacher&a=create_copy&fid=' + id + '">一键布置</a>';
			// str += '</li><li><a href="/?c=teacher&a=goto&rid='+id+'&to=zhihui">智慧课堂</a>';
			if (APIF != 'china_mobile_edu_he_pigai') {
				if (essy_type == '15' || essy_type == '16' || essy_type == '20' || essy_type == '21' || essy_type == '22') {
					str += '</li><li><a href="/index.php?c=teacher&a=createview2&rid=' + id + '" target="_blank">一键分享</a>';
				} else {
					str += '</li><li><a href="http://tiku.pigai.org/index.php?m=Home&c=Upload&a=uploadPgArticle&id=' + id + '" target="_blank">一键分享</a>';
				}
				str += '</li><li><a href="index.php?c=teacher&a=createview&rid=' + id + '" target="_blank">二维码</a>';
				if (essy_type2 == "-1") {
					str += '</li><li><a href="http://qq.pigai.org/res/scan_ocr/index.html?rid=' + id + '" target="_blank">手写批改</a>';
					str += '</li><li><a href="/res/images/ocr_common.jpg" download="手写批改通用答题纸" >通用题纸</a>';
				}
				if (essy_type2 == "-2") {
					str += '</li><li><a href="http://qq.pigai.org/res/scan_ocr/test.html?rid=' + id + '" target="_blank">手写批改</a>';
					str += '</li><li><a href="/res/images/ocr_common.jpg" download="手写批改通用答题纸">通用题纸</a>';
				}
			}
			str += '</li><li><a href="/?c=teacher&a=del&rid=' + id + '" onclick="return confirm(\'确认删除！\');">删除</a>';
			str += '</li>';
		}
		$('#more_dd').html(str).css({ "left": (pos.x - 50) + "px", "top": (pos.y + 20) + "px" }).show();
	}

	function dd_hide() {
		$('#more_dd').hide();
	}

}


function addMemberLog(data) {
	//data={'cat_id':100101,'obj_id':'10086','txt':'this is essay?'}
	$.post(_self + "?c=ajax&a=addMemberLog", data, function (d) {
	});
}

function msgShow(dmsg) {
	if (dmsg.indexOf('msg:') >= 0) {
		str = dmsg.replace('msg:', '');
		msg2(str);
		return true;
	}
	return false;
}

function msg2Obj(dmsg) {
	try {
		eval("var obj=" + dmsg + ";");
		return obj;
	} catch (e) {
		return false;
	}
}

//checkGTP
function checkGTP2(str,cb){
	let arr =str.replace(/\r/ig,'').replace(/\t{2}/ig,'').split("\n").filter( function(v){ return /[a-zA-Z]+/.test(v) });
	let rz={info:[],total:{score:0}};
	if(arr.length<=0 ){
		cb(rz);
		return ;
	}
	let data= JSON.stringify( arr);
	$.ajax({
		url:'/gpt8000/chatgpt/check', 
		data:data, 
		method:'POST',
		contentType: 'application/json; charset=UTF-8',
		success:function (d) {
			//console.log('chatgpt',d );
			let total=0;
			rz.info= d.map(function(v2){
				let v=v2[0];
				if(v.label!='ChatGPT' ) return 0;
				total+=parseInt(v.score*1000);
				return parseInt(v.score*1000);
			});
			rz.total=total>0? parseInt( total/d.length):0;
			cb( rz );
		}
	});

}

function checkGTPScore(eid,version,str ,cb ){
	let t= getCheckGtpFromLocal( eid,version );
	if(t>=0) {
		cb(t, eid);
		return ;
	}
	checkGTP2( str, function(d){ 
		console.log("checkGTP", d , localStorage.getItem('g'+eid) ) ;
		localStorage.setItem('g'+_eid, JSON.stringify( {vr: parseInt( version),v:d.total}) );
		cb(d.total, eid);
	});
}
function getCheckGtpFromLocal(eid,version){

	//return -3;
	let s =localStorage.getItem('g'+eid) ;
	if(s===null) return -1;
	let o = JSON.parse( s);
	if(o.vr!= version)return -2;
	return o.v ;
}
