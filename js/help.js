helpHtml = "";
verInfo = "<div style='text-align:center;'><img src='favicon.ico' width=96 height=96></div><div style='text-align:left;'><strong>ぷりおアニメーカー（ダウンロード版）</strong><br>Ver.1.00<br>最終更新：2019年10月8日<br>(C)かりこ</div>";

function helpWrite(mode){
	if(mode=="メニュー"){
		window.open("site/howto.htm","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="ログウィンドウ"){
		window.open("site/maker_description/etc.htm#log","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
		
	}
	if(mode=="プレビューウィンドウ"){
		window.open("site/maker_description/preview.htm","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="タイムラインウィンドウ"){
		window.open("site/maker_description/time.htm","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="パーツ画像ウィンドウ"){
		window.open("site/maker_description/part.htm","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="データ読み書きウィンドウ"){
		window.open("site/maker_description/prianidata.htm#saveload","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="ぷりアニデータ設定ウィンドウ"){
		window.open("site/maker_description/prianidata.htm#set","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="JSONデータ書き出しウィンドウ"){
		window.open("site/maker_description/json.htm#save","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	
	if(mode=="パーツ画像の差し替えウィンドウ"){
		window.open("site/maker_description/part.htm#change","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="タイムライン編集ウィンドウ"){
		window.open("site/maker_description/time.htm#menu","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="オプションウィンドウ"){
		window.open("site/maker_description/etc.htm#option","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="JSONデータ編集ウィンドウ"){
		window.open("site/maker_description/json.htm#edit","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="JSONデータの読み込みウィンドウ"){
		window.open("site/maker_description/json.htm#load","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="パーツ画像の回転軸設定ウィンドウ"){
		window.open("site/maker_description/part.htm#kaiten","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	if(mode=="スプライト画像の書き出しウィンドウ"){
		window.open("site/maker_description/etc.htm#sprite","prianiHelp","width=800,height=400,scrollbars=1,resizable=1");
	}
	
	
}