// ★：upState使用関数　☆：upState未使用関数　◎：dataStock使用関数

// ☆：◎起動時の処理
function startMaker(){
	// ウィンドウの定義
	logWindow = document.getElementById("logWindow");					// ログウィンドウ
	canvasWindow = document.getElementById("canvasWindow");				// プレビューウィンドウ
	partWindow = document.getElementById("partWindow");					// パーツ画像ウィンドウ
	timelineWindow = document.getElementById("timelineWindow");			// タイムラインウィンドウ
	basicWindow = document.getElementById("basicWindow");				// ぷりアニデータの設定ウィンドウ
	dataWindow = document.getElementById("dataWindow");					// ぷりアニデータの読み込み/書き出しウィンドウ
	exportJSONWindow = document.getElementById("exportJSONWindow");		// JSONデータの書き出しウィンドウ
	alertWindow = document.getElementById("alertWindow");				// アラート用ウィンドウ
	helpWindow = document.getElementById("helpWindow");					// ヘルプウィンドウ
	timelineMenuWindow = document.getElementById("timelineMenuWindow");	// タイムライン右クリックメニュー
	timelineEditWindow = document.getElementById("timelineEditWindow");	// タイムライン関係編集ウィンドウ
	configWindow = document.getElementById("configWindow");				// オプションウィンドウ
	alertConfirmWindow = document.getElementById("alertConfirmWindow");	// 確認アラート用ウィンドウ
	partSrcChangeWindow = document.getElementById("partSrcChangeWindow"); // パーツ画像の差し替えウィンドウ
	editJSONWindow = document.getElementById("editJSONWindow");			// JSONデータ編集ウィンドウ
	inportJSONWindow = document.getElementById("inportJSONWindow");		// JSONデータの読み込みウィンドウ
	axisEditWindow = document.getElementById("axisEditWindow");			// パーツ画像の回転軸設定ウィンドウ
	spriteExportWindow = document.getElementById("spriteExportWindow");	// スプライト画像の書き出しウィンドウ
	
	// プレビューウィンドウとタイムラインウィンドウはウィンドウドラッグ用の画像を用意
	canvasWindowDrag = document.getElementById("canvasWindowDrag");
	timelineWindowDrag = document.getElementById("timelineWindowDrag");
	
	// ぷりアニデータの設定ウィンドウ関係の定義
	basicIdText = document.getElementById("basicIdText");				// ぷりアニデータIDテキストフォーム
	basicCvxText = document.getElementById("basicCvxText");				// キャンバスサイズ横テキストフォーム
	basicCvyText = document.getElementById("basicCvyText");				// キャンバスサイズ縦テキストフォーム
	basicFpsText = document.getElementById("basicFpsText");				// アニメーション速度（fps）テキストフォーム
	
	// ぷりアニデータの設定ウィンドウのフォームにあらかじめ値を代入しておく
	basicIdText.value = loadDataPriani.id;
	basicCvxText.value = loadDataPriani.cvWidth;
	basicCvyText.value = loadDataPriani.cvHeight;
	basicFpsText.value = loadDataPriani.fps;
	
	// パーツ画像ウィンドウ関係の定義
	partListDiv = document.getElementById("partListDiv");				// パーツ画像ウィンドウのリストを表示する部分のDIV
	
	// タイムラインウィンドウ関係の定義
	timelineListDiv = document.getElementById("timelineListDiv");		// タイムラインウィンドウの表を表示する部分のDIV
	
	// JSONデータの書き出しウィンドウ関係の定義
	jsonDirText = document.getElementById("jsonDirText");				// 画像フォルダテキストフォーム
	jsonDirText.value = loadDataPriani.dir;
	jsonIdText = document.getElementById("jsonIdText");					// ぷりアニデータIDテキストフォーム
	jsonIdText.value = loadDataPriani.id;
	jsonExportTypeSelect = document.getElementById("jsonExportTypeSelect");	// 出力形式選択フォーム
	
	// JSONデータの編集ウィンドウ関係の定義
	editJSONFileInput = document.getElementById("editJSONFileInput");	// JSONファイル選択フォーム
	editJSONTypeSelect = document.getElementById("editJSONTypeSelect");	// 出力形式選択フォーム
	editJSONExportText = document.getElementById("editJSONExportText");	// JSON出力テキストエリア
	editJSONList = document.getElementById("editJSONList");				// 読み込んだJSONファイルについての情報記載
	
	// JSONデータの読み込みウィンドウ関係の定義
	inportJSONFileInput = document.getElementById("inportJSONFileInput");	// JSONファイル選択フォーム
	
	// その他の変数の定義
	exportText = document.getElementById("exportText");					// ぷりアニデータの書き出しテキストエリア
	inportText = document.getElementById("inportText");					// ぷりアニデータの読み込みテキストエリア
	frameText = document.getElementById("frameText");					// プレビューウィンドウのフレームNo表示テキストフォーム
	logText = document.getElementById("logText");						// ログウィンドウのログ表示テキストエリア
	logSetButton = document.getElementById("logSetButton");				// ログウィンドウの固定用ボタン
	nowStateText = document.getElementById("nowStateText");				// ログウィンドウの処理状況表示テキストフォーム
	canvasScaleSelect = document.getElementById("canvasScaleSelect");	// プレビューウィンドウのキャンバス拡大率セレクトフォーム
	canvasColorSelect = document.getElementById("canvasColorSelect");	// プレビューウィンドウのキャンバス背景色セレクトフォーム
	canvasRepeatSelect = document.getElementById("canvasRepeatSelect"); // プレビューウィンドウのアニメ再生の繰り返しのセレクトフォーム
	fpsText = document.getElementById("fpsText");						// プレビューウィンドウのfps表示テキストフォーム
	menuTop = document.getElementById("menuTop");						// 左上メニューのディティールス
	partSelectNo = [];													// パーツ画像の選択状態を格納する配列
	aniNow = "off";														// アニメーションを再生中か否かを格納する変数("on":再生中/"off":停止中)
	timelineSize = 20;													// タイムラインの１フレームのサイズ
	timelineFont = 1;													// タイムラインのフレームNoのフォントサイズ
	
	// キャンバスの定義
	cvPriani = document.getElementById("cvPriani");						// プレビューウィンドウのキャンバス
	ctxPriani = cvPriani.getContext("2d");								// プレビューウィンドウのキャンバスのコンテキスト
	
	// その他、変数の定義や初期化など
	settingFrame = [];													// タイムライン設定の編集ウィンドウの実行範囲を格納する配列
	settingPart = [];													// タイムライン設定の編集ウィンドウの実行範囲を格納する配列
	smoothingFrame = [];												// アニメーション補間の実行範囲を格納する配列
	smoothingPart = [];													// アニメーション補間の実行範囲を格納する配列
	nowState = "free";													// 現在の処理状況を格納する変数を初期化する("free":処理なし/"busy":処理中)
	nowStateText.value = nowState;										// ログウィンドウの処理状況表示テキストフォームの表示を初期化する
	framePriani = 0;													// 現在表示中のフレームNoを格納する変数を初期化する
	frameText.value = framePriani;										// プレビューウィンドウのフレームNo表示テキストフォームの表示を初期化する
	detailsOpen = [];													// パーツ画像ウィンドウの各パーツ画像の設定画面の開閉状態を格納する配列
	stockData = {};														// UNDO・REDO用にストックしているデータを格納する連想配列
	stockNo = -1;														// 現在画面に適用されているストックデータNoを格納する変数を初期化する
	dataStock("起動時の状態");											// 起動時の状態をUNDO・REDO用にストックする
	zindexReset();														// 各ウィンドウのz-indexをリセットする
	selectFrame = [];													// タイムラインウィンドウの表をドラッグして選択されているフレームNoを格納する配列
	selectPart = [];													// タイムラインウィンドウの表をドラッグして選択されているパーツNoを格納する配列
	timelineList();														// タイムラインウィンドウの表示をリセットする
	copyFrame = [];														// タイムラインウィンドウの表の操作でコピーする範囲のフレームNoを格納する配列
	copyPart = [];														// タイムラインウィンドウの表の操作でコピーする範囲のパーツNoを格納する配列
	copyTimeline = {};													// タイムラインウィンドウの表の操作でコピーしたタイムライン設定を格納する連想配列
	fpsText.value = loadDataPriani.fps;									// プレビューウィンドウのfps表示テキストフォームの表示を初期化する
	logWindow.style.left = (innerWidth - logWindow.clientWidth - 20) + "px"; // ログウィンドウの初期位置を指定
	repeatSet = true;													// 繰り返し再生をするかしないか格納する変数
	
	
	// イベントハンドラの設定
	// ぷりアニデータの読み込み/書き込みウィンドウのテキストエリアをクリックした時の処理
	exportText.onclick = function(){
		exportText.select();
	}
	inportText.onclick = function(){
		inportText.select();
	}
	editJSONExportText.onclick = function(){
		editJSONExportText.select();
	}
	
	// 各ウィンドウをクリックした時の処理
	logWindow.onclick = function(e){
		zindexReset();
		logWindow.style.zIndex = "20";
	}
	canvasWindow.onclick = function(e){
		zindexReset();
		canvasWindow.style.zIndex = "20";
	}
	partWindow.onclick = function(e){
		zindexReset();
		partWindow.style.zIndex = "20";
	}
	timelineWindow.onclick = function(e){
		zindexReset();
		timelineWindow.style.zIndex = "20";
		timelineList();
	}
	basicWindow.onclick = function(e){
		zindexReset();
		basicWindow.style.zIndex = "20";
	}
	dataWindow.onclick = function(e){
		zindexReset();
		dataWindow.style.zIndex = "20";
	}
	exportJSONWindow.onclick = function(e){
		zindexReset();
		exportJSONWindow.style.zIndex = "20";
	}
	helpWindow.onclick = function(e){
		zindexReset();
		helpWindow.style.zIndex="21";
	}
	timelineEditWindow.onclick = function(e){
		zindexReset();
		timelineEditWindow.style.zIndex = "20";
	}
	configWindow.onclick = function(e){
		zindexReset();
		configWindow.style.zIndex = "20";
	}
	partSrcChangeWindow.onclick = function(e){
		zindexReset();
		partSrcChangeWindow.style.zIndex="20";
	}
	editJSONWindow.onclick = function(e){
		zindexReset();
		editJSONWindow.style.zIndex = "20";
	}
	inportJSONWindow.onclick = function(e){
		zindexReset();
		inportJSONWindow.style.zIndex = "20";
	}
	axisEditWindow.onclick = function(e){
		zindexReset();
		axisEditWindow.style.zIndex = "20";
	}
	spriteExportWindow.onclick = function(e){
		zindexReset();
		spriteExportWindow.style.zIndex = "20";
	}
	
	// 各ウィンドウをドラッグした時の処理
	logWindow.ondragstart = function(e){
		if(logSetButton.value=="固定解除"){
			xxx = parseInt(e.pageX) - parseInt(logWindow.style.left);
		}else{
			xxx = parseInt(e.pageX) - parseInt(logWindow.style.left);
			yyy = parseInt(e.pageY) - parseInt(logWindow.style.top);
		}
		zindexReset();
		logWindow.style.zIndex = "20";
	}
	logWindow.ondrag = function(e){
		if(logSetButton.value=="固定解除"){
			var x = e.pageX - xxx;
			logWindow.style.left = x+"px";
		}else{
			var y = e.pageY - yyy;
			var x = e.pageX - xxx;
			logWindow.style.top = y+"px";
			logWindow.style.left = x+"px";
		}
	}
	logWindow.ondragend = function(e){
		if(logSetButton.value=="固定解除"){
			var x = e.pageX - xxx;
			logWindow.style.left = x+"px";
			delete xxx;
			
		}else{
			var y = e.pageY - yyy;
			var x = e.pageX - xxx;
			logWindow.style.top = y+"px";
			logWindow.style.left = x+"px";
			delete xxx;
			delete yyy;
		}
	}
	
	canvasWindowDrag.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(canvasWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(canvasWindow.style.top);
		zindexReset();
		canvasWindow.style.zIndex = "20";
	}
	canvasWindowDrag.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		canvasWindow.style.top = y+"px";
		canvasWindow.style.left = x+"px";
	}
	canvasWindowDrag.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		canvasWindow.style.top = y+"px";
		canvasWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	partWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(partWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(partWindow.style.top);
		zindexReset();
		partWindow.style.zIndex = "20";
	}
	partWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		partWindow.style.top = y+"px";
		partWindow.style.left = x+"px";
	}
	partWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		partWindow.style.top = y+"px";
		partWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	timelineWindowDrag.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(timelineWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(timelineWindow.style.top);
		zindexReset();
		timelineWindow.style.zIndex = "20";
	}
	timelineWindowDrag.ondrag = function(e){
			var y = e.pageY - yyy;
			var x = e.pageX - xxx;
			timelineWindow.style.top = y+"px";
			timelineWindow.style.left = x+"px";
	}
	timelineWindowDrag.ondragend = function(e){
			var y = e.pageY - yyy;
			var x = e.pageX - xxx;
			timelineWindow.style.top = y+"px";
			timelineWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	basicWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(basicWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(basicWindow.style.top);
		zindexReset();
		basicWindow.style.zIndex = "20";
	}
	basicWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		basicWindow.style.top = y+"px";
		basicWindow.style.left = x+"px";
	}
	basicWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		basicWindow.style.top = y+"px";
		basicWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	dataWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(dataWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(dataWindow.style.top);
		zindexReset();
		dataWindow.style.zIndex = "20";
	}
	dataWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		dataWindow.style.top = y+"px";
		dataWindow.style.left = x+"px";
	}
	dataWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		dataWindow.style.top = y+"px";
		dataWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	exportJSONWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(exportJSONWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(exportJSONWindow.style.top);
		zindexReset();
		exportJSONWindow.style.zIndex = "20";
	}
	exportJSONWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		exportJSONWindow.style.top = y+"px";
		exportJSONWindow.style.left = x+"px";
	}
	exportJSONWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		exportJSONWindow.style.top = y+"px";
		exportJSONWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	helpWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(helpWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(helpWindow.style.top);
	}
	helpWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		helpWindow.style.top = y+"px";
		helpWindow.style.left = x+"px";
	}
	helpWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		helpWindow.style.top = y+"px";
		helpWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	timelineEditWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(timelineEditWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(timelineEditWindow.style.top);
		zindexReset();
		timelineEditWindow.style.zIndex = "20";
	}
	timelineEditWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		timelineEditWindow.style.top = y+"px";
		timelineEditWindow.style.left = x+"px";
	}
	timelineEditWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		timelineEditWindow.style.top = y+"px";
		timelineEditWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	configWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(configWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(configWindow.style.top);
		zindexReset();
		configWindow.style.zIndex = "20";
	}
	configWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		configWindow.style.top = y+"px";
		configWindow.style.left = x+"px";
	}
	configWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		configWindow.style.top = y+"px";
		configWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	partSrcChangeWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(partSrcChangeWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(partSrcChangeWindow.style.top);
		zindexReset();
		partSrcChangeWindow.style.zIndex = "20";
	}
	partSrcChangeWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		partSrcChangeWindow.style.top = y+"px";
		partSrcChangeWindow.style.left = x+"px";
	}
	partSrcChangeWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		partSrcChangeWindow.style.top = y+"px";
		partSrcChangeWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	editJSONWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(editJSONWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(editJSONWindow.style.top);
		zindexReset();
		editJSONWindow.style.zIndex = "20";
	}
	editJSONWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		editJSONWindow.style.top = y+"px";
		editJSONWindow.style.left = x+"px";
	}
	editJSONWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		editJSONWindow.style.top = y+"px";
		editJSONWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	inportJSONWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(inportJSONWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(inportJSONWindow.style.top);
		zindexReset();
		inportJSONWindow.style.zIndex = "20";
	}
	inportJSONWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		inportJSONWindow.style.top = y+"px";
		inportJSONWindow.style.left = x+"px";
	}
	inportJSONWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		inportJSONWindow.style.top = y+"px";
		inportJSONWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	axisEditWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(axisEditWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(axisEditWindow.style.top);
		zindexReset();
		axisEditWindow.style.zIndex = "20";
	}
	axisEditWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		axisEditWindow.style.top = y+"px";
		axisEditWindow.style.left = x+"px";
	}
	axisEditWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		axisEditWindow.style.top = y+"px";
		axisEditWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	spriteExportWindow.ondragstart = function(e){
		xxx = parseInt(e.pageX) - parseInt(spriteExportWindow.style.left);
		yyy = parseInt(e.pageY) - parseInt(spriteExportWindow.style.top);
		zindexReset();
		spriteExportWindow.style.zIndex = "20";
	}
	spriteExportWindow.ondrag = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		spriteExportWindow.style.top = y+"px";
		spriteExportWindow.style.left = x+"px";
	}
	spriteExportWindow.ondragend = function(e){
		var y = e.pageY - yyy;
		var x = e.pageX - xxx;
		spriteExportWindow.style.top = y+"px";
		spriteExportWindow.style.left = x+"px";
		delete xxx;
		delete yyy;
	}
	
	// タイムラインウィンドウにて右クリックの無効化
	timelineWindow.oncontextmenu = function(e){
		e.preventDefault();
	}
	
	// プレビューウィンドウのキャンバス拡大率・背景色セレクトフォームが変更されたときの処理
	canvasScaleSelect.onchange = function(e){
		var cv = document.getElementById("cvPriani");
		cv.style.transform = "scale("+canvasScaleSelect.value+","+canvasScaleSelect.value+")";
		
		windowOrderGo("canvasOnly");
	}
	canvasColorSelect.onchange = function(e){
		var cv = document.getElementById("cvPriani");
		cv.style.backgroundColor = canvasColorSelect.value;
	}
	canvasRepeatSelect.onchange = function(e){
		aniNow = "off";
		clearInterval(timerPriani);
		drawCanvasMaker(framePriani);
		
		if(canvasRepeatSelect.value=="ON"){
			repeatSet = true;
		}else{
			repeatSet = false;
		}
		
	}
	
	// プレビューウィンドウのキャンバスをドラッグした時の処理
	cvPriani.ondragstart = function(e){
		cvDragEvent = e;
		canvasDragStart();
	}
	cvPriani.ondrag = function(e){
		cvDragEvent = e;
		canvasDragMove();
	}
	cvPriani.ondragend = function(e){
		cvDragEvent = e;
		canvasDragEnd();
	}
	
	// ぷりおアニメーカーのページ全体をクリックした時の処理
	window.onclick = function(e){
		timelineMenuWindow.style.visibility = "hidden";
		if(menuTop.open == true){
			menuTop.open = false;
		}
		if(selectFrame.length!=0 || selectPart.length!=0){
			timelineDragReset();
			timelineList();
		}
		try{
			clearInterval(buttonTimer);
		}catch(e){
			
		}
	}
	
	// ローカルストレージが有効かつ存在していればオプション情報をローカルストレージから読み込む（無ければ初期化する）
	try{
		makerConfig = JSON.parse(localStorage.getItem("PRIANI_CONFIG"));
		if(makerConfig==null){
			makerConfig = {
				"autocopy":false
			};
			localStorage.setItem("PRIANI_CONFIG",JSON.stringify(makerConfig));
		}
		
	}catch(e){
		makerConfig = {
			"autocopy":false
		};
	}
	
	// ログ：起動完了のお知らせ
	logPriani("ぷりおアニメーカー起動しました。","normal");
}

// ☆：各ウィンドウのz-indexをリセットする
function zindexReset(){
	logWindow.style.zIndex = "3";
	canvasWindow.style.zIndex = "1";
	partWindow.style.zIndex = "1";
	timelineWindow.style.zIndex = "1";
	basicWindow.style.zIndex = "2";
	dataWindow.style.zIndex = "2";
	exportJSONWindow.style.zIndex = "2";
	alertWindow.style.zIndex = "50";
	alertConfirmWindow.style.zIndex = "50";
	helpWindow.style.zIndex = "21";
	timelineMenuWindow.style.zIndex = "25";
	timelineEditWindow.style.zIndex = "2";
	configWindow.style.zIndex = "2";
	partSrcChangeWindow.style.zIndex = "21";
	editJSONWindow.style.zIndex = "2";
	inportJSONWindow.style.zIndex = "2";
	axisEditWindow.style.zIndex = "2";
	spriteExportWindow.style.zIndex = "2";
	
	// 基本的にクリックされたウィンドウはz-indexが20になる（ヘルプウィンドウのみ21）
}

// ★：◎ユーザーのローカルの画像ファイルを読み込む関数
function loadImg(){
	// 処理状況判定・処理状況更新・ログ表示
	if(nowState != "free"){
		logPriani("＜E:loadImg1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	logPriani("画像ファイル読み込み開始。","normal");
	
	// ファイルフォームからファイルを取得する
	fileInput = document.getElementById("fileInput");
	var file = fileInput.files[0];
	
	// キャンセル処理：ファイルが無ければキャンセル
	if(!file){
		logPriani("＜E:loadImg2＞ファイルが選択されていません。","error");
		upState("free");
		return;
	}
	
	// キャンセル処理：ファイルがPNGやJPEG以外ならキャンセル
	if(file.type!="image/png" && file.type!="image/jpeg"){
		alertPop("エラー番号＜E:loadImg3＞<br>未対応のファイル形式です。<br>（対応ファイル：PNGまたはJPEG）");
		logPriani("＜E:loadImg3＞未対応のファイル形式です。（対応ファイル：PNGまたはJPEG）："+file.name,"error");
		upState("free");
		return;
	}
	
	// キャンセル処理：ファイルが3MB以上ならキャンセル
	if(file.size>3200000){
		alertPop("エラー番号＜E:loadImg4＞ファイルサイズが大きすぎます。<br>（最大3MBくらいまで）");
		logPriani("＜E:loadImg4＞ファイルサイズが大きすぎます。（最大3MBくらいまで）："+file.name,"error");
		upState("free");
		return;
	}
	
	// ファイルリーダー定義
	var fileReader = new FileReader();
	
	// データURLとして読み終わった後の処理方法
	fileReader.onload = function(e){
		// ロードしたファイルを格納する番号を決める
		var fileNo = loadDataPriani.src.length;
		
		// 新しいimageオブジェクトを作ってロードファイルを代入
		var image = new Image();
		image.src = fileReader.result;
		
		// 新しく読み込んだパーツ画像はパーツ画像設定画面を開けておく
		detailsOpen[fileNo] = true;
		
		// loadDataPrianiに各種情報を代入していく
		loadDataPriani.src[fileNo] = image.src;
		loadDataPriani.fileName[fileNo] = file.name;
		loadDataPriani.w[fileNo] = loadDataPriani.cvWidth;
		loadDataPriani.h[fileNo] = loadDataPriani.cvHeight;
		loadDataPriani.x[fileNo] = loadDataPriani.cvWidth/2;
		loadDataPriani.y[fileNo] = loadDataPriani.cvHeight/2;
		loadDataPriani.timeline.pp[fileNo] = [];
		loadDataPriani.timeline.r[fileNo] = [];
		loadDataPriani.timeline.sX[fileNo] = [];
		loadDataPriani.timeline.sY[fileNo] = [];
		loadDataPriani.timeline.tlX[fileNo] = [];
		loadDataPriani.timeline.tlY[fileNo] = [];
		loadDataPriani.timeline.al[fileNo] = [];
		loadDataPriani.timeline.page[fileNo] = [];
		for (var i=0; i<loadDataPriani.timeline.point.length; i++){
			loadDataPriani.timeline.pp[fileNo].push(0);
			loadDataPriani.timeline.r[fileNo].push(0);
			loadDataPriani.timeline.sX[fileNo].push(1);
			loadDataPriani.timeline.sY[fileNo].push(1);
			loadDataPriani.timeline.tlX[fileNo].push(0);
			loadDataPriani.timeline.tlY[fileNo].push(0);
			loadDataPriani.timeline.al[fileNo].push(1);
			loadDataPriani.timeline.page[fileNo].push(0);
		}
		
		image.onload = function(){
			
			loadDataPriani.w[fileNo] = image.width;
			loadDataPriani.h[fileNo] = image.height;
			loadDataPriani.aX[fileNo] = image.width/2;
			loadDataPriani.aY[fileNo] = image.height/2;
			
			// タイマーを解除して静止画を描写する
			aniNow = "off";
			clearInterval(timerPriani);
			drawCanvasMaker(framePriani);
		
			// パーツ画像ウィンドウの表示更新
			partImgList();
			
			// タイムラインウィンドウの表示更新
			timelineList();
			
			// UNDO・REDO用のデータをストック
			dataStock("パーツ画像の追加");
		
			// ログ表示・処理状況更新
			logPriani("画像ファイル読み込み完了。："+file.name,"normal");
			upState("free");
		}
		
	};
	
	// データURLとして読み込む
	fileReader.readAsDataURL(file);
}

// ★：ぷりアニデータの書き出し
function dataExport(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:dataExport1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// loadDataPrianiをJSON文章化して、「ぷりアニデータの読み込み/書き出しウィンドウ」の「書き出しテキストエリア」に表示
	exportText.value = JSON.stringify(loadDataPriani);
	
	// 書き出しテキストエリアにフォーカスして全選択しておく
	exportText.focus();
	exportText.select();
	
	// オプションの「書き出し後に自動でクリップボードにコピーする」がオンであれば自動でコピーする
	if(makerConfig.autocopy == true){
		document.execCommand("copy");
		alertPop("ぷりアニデータをクリップボードにコピーしました");
	}
	
	// 処理状況更新
	upState("free");
}

// ★：◎ぷりアニデータの読み込み
function dataInport(){
	// 処理状況判定・処理状況更新・ログ表示
	if(nowState != "free"){
		logPriani("＜E:dataInport1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	logPriani("ぷりアニデータ読み込み開始。","normal");
	
	// 「ぷりアニデータの読み込み/書き出しウィンドウ」の「読み込みテキストエリア」の内容をJSONデータとして読み込む
	try{
		loadDataPriani = JSON.parse(inportText.value);
	}catch(e){
		// JSONデータとしての読み込みに失敗した場合の処理
		// 処理状況更新・ログ表示・リターン
		logPriani("＜E:dataInport2＞正しいデータではありません。","error");
		upState("free");
		return;
	}
	
	// タイマーを解除して静止画を描写する
	aniNow = "off";
	clearInterval(timerPriani);
	for (var i=0; i<loadDataPriani.src.length; i++){
		var image = new Image();
		image.src = loadDataPriani.src[i];
		drawCanvasMaker(0);
	}
	
	// ぷりアニデータ読み込み時は、パーツ画像設定画面を全て閉じておく
	for(var j=0; j<loadDataPriani.src.length; j++){
		detailsOpen[j] = false;
	}
	
	// パーツ画像ウィンドウとタイムラインウィンドウの表示をリセット
	partImgList();
	timelineList();
	
	// 「ぷりアニデータの読み込み/書き出しウィンドウ」を非表示にしておく
	dataWindow.style.visibility = "hidden";
	
	// ウィンドウの整列
	windowOrderGo();
	
	fpsText.value = loadDataPriani.fps;
	
	// UNDO・REDO用のデータをストック
	dataStock("ぷりアニデータの読み込み");
	
	// ログ表示・処理状況更新
	logPriani("ぷりアニデータの読み込み完了。","normal");
	upState("free");

}

// ☆：ログ表示（text：表示内容、type："normal","error"）
function logPriani(text,type){
	var typeIcon = {"normal":"● ","error":"▲ ","etc":"■ ",undefined:"■ "};
	logText.value = typeIcon[type] + text + "\n" + logText.value;
}

// ☆：処理状況更新＆表示
function upState(state){
	nowState = state;
	nowStateText.value = nowState;
}

// ☆：静止画を描画
function drawCanvasMaker(frrr){
	// キャンバスのサイズを取得
	cvPriani.width = loadDataPriani.cvWidth;
	cvPriani.height = loadDataPriani.cvHeight;
	
	// キャンバスの表示をリセット
	ctxPriani.clearRect(0,0,loadDataPriani.cvWidth,loadDataPriani.cvHeight);
	
	// 読み込み用の配列と数値用の変数を定義
	imgPriani = [];
	loadImgPriani = 0;
	
	//　画像を読み込む
	for(var i=0; i<loadDataPriani.src.length; i++){
		imgPriani[i] = new Image;
		imgPriani[i].src = loadDataPriani.src[i];
		imgPriani[i].onload = function(){
			// 読み込みが終わった画像枚数を数えていく
			loadImgPriani++;
		}
	}
	
	// タイマーを解除
	aniNow = "off";
	clearInterval(timerPriani);
	
	// 静止画表示用のタイマーをセットする
	timerPriani = setInterval(function(){
		ctxPriani.clearRect(0,0,loadDataPriani.cvWidth,loadDataPriani.cvHeight);
		// それぞれのレイヤーを描画する
		for(i=0; i<imgPriani.length; i++){
			
			// 変形前の状態をセーブしておく
			ctxPriani.save();
			
			// 角度と位置の計算
			var r = loadDataPriani.timeline.r[i][frrr]*Math.PI/180;
			var x = loadDataPriani.x[i]-(loadDataPriani.w[i]/2);
			var y = loadDataPriani.y[i]-(loadDataPriani.h[i]/2);
			
			// タイムテーブルに沿って変形を開始
			// まずは移動と不透明度適応
			ctxPriani.translate(loadDataPriani.timeline.tlX[i][frrr],loadDataPriani.timeline.tlY[i][frrr]);
			ctxPriani.globalAlpha = loadDataPriani.timeline.al[i][frrr];
			
			// 基準点を画像の回転軸に移動してから回転
			ctxPriani.translate(x+loadDataPriani.aX[i],y+loadDataPriani.aY[i]);
			ctxPriani.rotate(r);
			ctxPriani.translate(-(x+loadDataPriani.aX[i]),-(y+loadDataPriani.aY[i]));
			
			// 基準点を画像の中心点に移動してから拡縮
			ctxPriani.translate(loadDataPriani.x[i],loadDataPriani.y[i]);
			ctxPriani.scale(loadDataPriani.timeline.sX[i][frrr],loadDataPriani.timeline.sY[i][frrr]);
			ctxPriani.translate(-loadDataPriani.x[i],-loadDataPriani.y[i]);
			
			// 描画する
			ctxPriani.drawImage(imgPriani[i],loadDataPriani.w[i]*loadDataPriani.timeline.page[i][frrr],0,loadDataPriani.w[i],loadDataPriani.h[i],x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			
			// 選択中のパーツは縁取りする
			if(partSelectNo[i]==1){
				ctxPriani.strokeStyle = "sandybrown";
				ctxPriani.strokeRect(x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			}
			
			// 変形前の状態をロードしておく
			ctxPriani.restore();
		}
	},1000/8);
	
	// 各パーツ画像の設定画面のフォームの情報更新をする
	try{partImgFormUpState();}catch(e){}
}

// ☆：アニメーションをメーカーで再生する
function startAnimation(){
	// アニメ再生中であることをaniNowに格納、タイマーを解除
	aniNow = "on";
	clearInterval(timerPriani);
	
	// 読み込み用の配列と数値用の変数を定義
	imgPriani = [];
	loadImgPriani = 0;
	
	// パーツ画像を読み込んでいき、読み込んだらloadImgPrianiを+していく
	for(var i=0; i<loadDataPriani.src.length; i++){
		imgPriani[i] = new Image;		
		imgPriani[i].src = loadDataPriani.src[i];	
		imgPriani[i].onload = function(){
			loadImgPriani++;
		}
	}
	
	// フレームNoは今のフレームより-1しておく（drawPrianiで最初にまずframePriani++されるので）
	framePriani = framePriani-1;
	
	// タイマーセットでPrianiOld.jsのdrawPriani()を呼び出す
	timerPriani = setInterval("drawPriani()",1000/loadDataPriani.fps);
}

// ★：ログウィンドウを固定する
function logSet(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:logSet1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// ボタンのvalueで固定・固定解除の処理を使い分ける
	if(logSetButton.value=="下に固定"){
		logWindow.style.position = "fixed";
		logWindow.style.top = innerHeight - 120 + "px";
		logWindow.style.width = "45%";
		logWindow.style.border = "1px solid gray";
		logSetButton.value = "固定解除";
	} else {
		logWindow.style.position = "absolute";
		logWindow.style.top = "1500px";
		logWindow.style.width = "45%";
		logWindow.style.border = "1px solid black";
		logSetButton.value = "下に固定";
	}
	
	// 処理状況更新
	upState("free");
}

// ★：◎ぷりアニデータの設定を適用【フォームインプット】
function basicInput(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:basicInput1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// 入力された情報が適切かチェック
	// チェックにひっかかれば、アラート表示・ログ表示・処理状況更新・リターン
	
	// チェック：ぷりアニデータID【未入力、英数字・アンダースコアのみ、行頭の数字は禁止】
	if(basicIdText.value==""){
		alertPop("エラー番号＜E:basicInput2＞<br>ぷりアニデータIDが未入力です。");
		logPriani("＜E:basicInput2＞ぷりアニデータIDが未入力です。","error");
		upState("free");
		return;
	}
	var reg1 = new RegExp(/^\w+$/);	//英数字とアンダースコアの表記であるか
	var reg2 = new RegExp(/^\d/);	//行頭が数字か
	if(reg1.test(basicIdText.value)==false){
		alertPop("エラー番号＜E:basicInput3＞<br>ぷりアニデータIDは英数字とアンダースコアのみ入力可能です。");
		logPriani("＜E:basicInput3＞ぷりアニデータIDは英数字とアンダースコアのみ入力可能です。","error");
		upState("free");
		return;
	}
	if(reg2.test(basicIdText.value)==true){
		alertPop("エラー番号＜E:basicInput4＞<br>ぷりアニデータIDの1文字目に数字は使えません。");
		logPriani("＜E:basicInput4＞ぷりアニデータIDの1文字目に数字は使えません。","error");
		upState("free");
		return;
	}
	
	//チェック：キャンバスサイズ【未入力、数値のみ、１以上】
	if(basicCvxText.value=="" || basicCvyText.value==""){
		alertPop("エラー番号＜E:basicInput5＞<br>キャンバスサイズが未入力です。");
		logPriani("＜E:basicInput5＞キャンバスサイズが未入力です。","error");
		upState("free");
		return;
	}
	var cvxInput = parseInt(basicCvxText.value);
	var cvyInput = parseInt(basicCvyText.value);
	if(isNaN(cvxInput)==true || isNaN(cvyInput)==true){
		alertPop("エラー番号＜E:basicInput6＞<br>キャンバスサイズは数値で入力してください。");
		logPriani("＜E:basicInput6＞キャンバスサイズは数値で入力してください。","error");
		upState("free");
		return;
	}
	if(cvxInput<1 || cvyInput<1){
		alertPop("エラー番号＜E:basicInput7＞<br>キャンバスサイズは1以上の値を入力してください。");
		logPriani("＜E:basicInput7＞キャンバスサイズは1以上の値を入力してください。","error");
		upState("free");
		return;
	}
	
	//チェック：アニメーション速度（fps）【未入力、数値のみ、１以上】
	if(basicFpsText.value==""){
		alertPop("エラー番号＜E:basicInput8＞<br>アニメーション速度（fps）が未入力です。");
		logPriani("＜E:basicInput8＞アニメーション速度（fps）が未入力です。","error");
		upState("free");
		return;
	}
	var fpsInput = parseInt(basicFpsText.value);
	if(isNaN(fpsInput)==true){
		alertPop("エラー番号＜E:basicInput9＞<br>アニメーション速度（fps）は数値で入力してください。");
		logPriani("＜E:basicInput9＞アニメーション速度（fps）は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(fpsInput<1){
		alertPop("エラー番号＜E:basicInput10＞<br>アニメーション速度（fps）は1以上の値を入力してください。");
		logPriani("＜E:basicInput10＞アニメーション速度（fps）は1以上の値を入力してください。","error");
		upState("free");
		return;
	}
	
	// チェックを通過したらloadDataPrianiに適用する
	loadDataPriani.id = basicIdText.value;
	loadDataPriani.cvWidth = parseInt(basicCvxText.value);
	loadDataPriani.cvHeight = parseInt(basicCvyText.value);
	loadDataPriani.fps = parseInt(basicFpsText.value);
	
	// タイマーを解除し、静止画を描画する
	// stopPriani()はPrianiOld.jsの関数
	stopPriani();
	drawCanvasMaker(0);
	
	// プレビューウィンドウのfps表示テキストフォームも更新する
	fpsText.value = loadDataPriani.fps;
	
	// ぷりアニデータの設定ウィンドウを非表示に
	basicWindow.style.visibility = "hidden";
	
	// ウィンドウを整列する
	windowOrderGo("canvasOnly");
	
	// UNDO・REDO用のデータをストック
	dataStock("ぷりアニデータ設定の変更");
	
	// ログ表示・処理状況更新
	logPriani("ぷりアニデータ設定の変更を適用しました。","normal");
	upState("free");
}

// ☆：パーツ画像ウィンドウのリストの表示
function partImgList(){
	
	// 各パーツ画像の設定画面の開閉を管理（開閉状況をdetailsOpenにセット）
	try{
		for(var k=0; k<loadDataPriani.src.length; k++){
			var partSET = document.getElementById("partSET"+k);
			detailsOpen[k] = partSET.open;
		}
	}catch(e){}
	
	// パーツ画像ウィンドウ上部のボタンの表示・非表示管理
	var partAllDetailsButton1 = document.getElementById("partAllDetailsButton1");
	var partAllDetailsButton2 = document.getElementById("partAllDetailsButton2");
	var partAllSelectButton1 = document.getElementById("partAllSelectButton1");
	var partAllSelectButton2 = document.getElementById("partAllSelectButton2");
	if(loadDataPriani.src.length>1){
		partAllDetailsButton1.style.visibility = "visible";
		partAllDetailsButton2.style.visibility = "visible";
		partAllSelectButton1.style.visibility = "visible";
		partAllSelectButton2.style.visibility = "visible";
	}else{
		partAllDetailsButton1.style.visibility = "hidden";
		partAllDetailsButton2.style.visibility = "hidden";
		partAllSelectButton1.style.visibility = "hidden";
		partAllSelectButton2.style.visibility = "hidden";
	}
	
	// パーツ画像リスト表示用HTMLを格納する変数を定義
	var partHtml = "";
	
	// パーツ画像リスト表示用HTMLの生成・パーツ画像の選択状況の処理
	for(var i=0; i<loadDataPriani.src.length; i++){
		if(partSelectNo[i]!=1){
			partSelectNo[i]=0;
		}
		
		partHtml = "<div id='part"+i+"' class='partImgName"+partSelectNo[i]+"'><img src='img/part"+partSelectNo[i]+".png' style='margin-top:5px;margin-right:5px;margin-left:-5px;cursor:pointer;' onclick='partSelect("+i+")'>"+i+"【"+loadDataPriani.fileName[i]+"】<img src='img/down.png' class='transIcon' onclick='partImgMove("+i+",-1);'><img src='img/up.png' class='transIcon' onclick='partImgMove("+i+",1);'><img src='img/hidden.png' class='transIcon' onclick='partImgDel("+i+");' style='position:absolute;right:25px;'></div><details id='partSET"+i+"'><summary style='cursor:pointer;outline:none;'>設定画面</summary><strong>基本設定</strong><table width='100%' class='piList'><tr><th class='piList'>ファイル名</th><td class='piList'><input type='text' size='10' id='partFILENAME"+i+"' value='"+loadDataPriani.fileName[i]+"'></td></tr><tr><th class='piList'>表示位置　</th><td class='piList'>X:<input type='text' size='4' id='partX"+i+"' value='"+loadDataPriani.x[i]+"'> / Y:<input type='text' size='4' id='partY"+i+"' value='"+loadDataPriani.y[i]+"'></td></tr><tr><th class='piList'>サイズ　</th><td class='piList'>幅:<input type='text' size='4' id='partW"+i+"' value='"+loadDataPriani.w[i]+"'> / 高さ:<input type='text' size='4' id='partH"+i+"' value='"+loadDataPriani.h[i]+"'></td></tr></table><input type='button' value='適用' onclick='partImgSet2("+i+");' style='background-color:lemonchiffon;margin-bottom:15px;'>　<input type='button' value='表示位置を選択パーツ全てに適用' style='margin-bottom:15px;' onclick='partImgSet4("+i+");'>　<input type='button' value='画像を差し替える' style='margin-bottom:15px;' onclick='partSrcChange("+i+");'>　<input type='button' value='回転軸の設定' style='margin-bottom:15px;' onclick='axisEdit("+i+");'><br><strong>タイムライン設定</strong><table width='100%' class='piList'><tr><th class='piList2'>拡縮　</th><td class='piList2'>X:<input type='text' size='4' id='partSX"+i+"' value='"+loadDataPriani.timeline.sX[i][framePriani]+"'> / Y:<input type='text' size='4' id='partSY"+i+"' value='"+loadDataPriani.timeline.sY[i][framePriani]+"'></td></tr><tr><th class='piList2'>移動　</th><td class='piList2'>X:<input type='text' size='4' id='partTLX"+i+"' value='"+loadDataPriani.timeline.tlX[i][framePriani]+"'> / Y:<input type='text' size='4' id='partTLY"+i+"' value='"+loadDataPriani.timeline.tlY[i][framePriani]+"'></td></tr><tr><th class='piList2'>回転　</th><td class='piList2'><input type='text' size='4' id='partR"+i+"' value='"+loadDataPriani.timeline.r[i][framePriani]+"'></td></tr><tr><th class='piList2'>不透明度　</th><td class='piList2'><input type='text' size='4' id='partAL"+i+"' value='"+loadDataPriani.timeline.al[i][framePriani]+"'></td></tr><tr><th class='piList2'>表示ページ　</th><td class='piList2'><input type='text' size='4' id='partPAGE"+i+"' value='"+loadDataPriani.timeline.page[i][framePriani]+"'></td></tr><tr><td colspan='2' class='piList2' style='text-align: right;'><input type='button' value='左右反転' onclick='partRightLeft("+i+");' style='margin:3px;'></td></tr></table><input type='button' value='適用' onclick='partImgSet("+i+")' style='background-color:lemonchiffon;'>　<input type='button' value='選択パーツ全てに適用' onclick='partImgSet3("+i+");'>　<input type='button' value='タイムライン設定の削除' onclick='partImgReset("+i+")'></details><br>"+partHtml;
	}
	
	partListDiv.innerHTML = partHtml + "<hr>";
	
	// 各パーツ画像の設定画面の開閉を管理（detailsOpenの内容を反映）
	try{
		for(var j=0; j<loadDataPriani.src.length; j++){
			var partSET = document.getElementById("partSET"+j);
			partSET.open = detailsOpen[j];
		}
	}catch(e){}
}

// ★：◎パーツ画像ウィンドウからタイムライン設定の変更を適用【フォームインプット】
function partImgSet(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgSet1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// オブジェクト定義
	var partSX = document.getElementById("partSX"+partNo);
	var partSY = document.getElementById("partSY"+partNo);
	var partTLX = document.getElementById("partTLX"+partNo);
	var partTLY = document.getElementById("partTLY"+partNo);
	var partR = document.getElementById("partR"+partNo);
	var partAL = document.getElementById("partAL"+partNo);
	var partPAGE = document.getElementById("partPAGE"+partNo);
	
	// 不正入力じゃないかチェック
	// 不正入力であれば、アラート表示・ログ表示・処理状況更新・リターン
	
	// チェック：全て【未入力、数値のみ】
	if(partSX.value=="" || partSY.value=="" || partTLX.value=="" || partTLY.value=="" || partR.value=="" || partAL.value=="" || partPAGE.value==""){
		alertPop("エラー番号＜E:partImgSet2＞<br>入力されていない項目があります。");
		logPriani("＜E:partImgSet2＞入力されていない項目があります。","error");
		upState("free");
		return;
	}
	var sx = parseFloat(partSX.value);
	var sy = parseFloat(partSY.value);
	var tlx = parseFloat(partTLX.value);
	var tly = parseFloat(partTLY.value);
	var r = parseFloat(partR.value);
	var al = parseFloat(partAL.value);
	var page = parseInt(partPAGE.value);
	if(isNaN(sx)==true || isNaN(sy)==true || isNaN(tlx)==true || isNaN(tly)==true || isNaN(r)==true || isNaN(al)==true || isNaN(page)==true){
		alertPop("エラー番号＜E:partImgSet3＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:partImgSet3＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	
	// チェック：不透明度【0以上1以下】
	if(al>1 || al<0){
		alertPop("エラー番号＜E:partImgSet4＞<br>不透明度は0以上1以下の数値で入力してください。<br>※0で完全に透明、1で完全に不透明です。");
		logPriani("＜E:partImgSet4＞不透明度は0以上1以下の数値で入力してください。","error");
		upState("free");
		return;
	}
	
	// チェック：ページ【0以上】
	if(page<0){
		alertPop("エラー番号＜E:partImgSet5＞<br>表示ページは0以上の数値で入力してください。");
		logPriani("＜E:partImgSet5＞表示ページは0以上の数値で入力してください。","error");
		upState("free");
		return;
	}
	
	// チェックを通過したらloadDataPrianiに格納
	loadDataPriani.timeline.sX[partNo][framePriani] = parseFloat(partSX.value);
	loadDataPriani.timeline.sY[partNo][framePriani] = parseFloat(partSY.value);
	loadDataPriani.timeline.tlX[partNo][framePriani] = parseFloat(partTLX.value);
	loadDataPriani.timeline.tlY[partNo][framePriani] = parseFloat(partTLY.value);
	loadDataPriani.timeline.r[partNo][framePriani] = parseFloat(partR.value);
	loadDataPriani.timeline.al[partNo][framePriani] = parseFloat(partAL.value);
	loadDataPriani.timeline.page[partNo][framePriani] = parseInt(partPAGE.value);
	if(loadDataPriani.timeline.point[framePriani]!=2 && loadDataPriani.timeline.point[framePriani]!=3){loadDataPriani.timeline.point[framePriani] = 1;}
	loadDataPriani.timeline.pp[partNo][framePriani] = 1;
	
	// タイマーを解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示をリセット
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像のタイムライン設定の変更");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像のタイムライン設定を適用しました。："+loadDataPriani.fileName[partNo],"normal");
	upState("free");
}

// ☆：パーツ画像の設定画面のフォームの情報更新
function partImgFormUpState(){
	for(var i=0; i<loadDataPriani.src.length; i++){
		var partX = document.getElementById("partX"+i);
		var partY = document.getElementById("partY"+i);
		var partW = document.getElementById("partW"+i);
		var partH = document.getElementById("partH"+i);
		var partSX = document.getElementById("partSX"+i);
		var partSY = document.getElementById("partSY"+i);
		var partTLX = document.getElementById("partTLX"+i);
		var partTLY = document.getElementById("partTLY"+i);
		var partR = document.getElementById("partR"+i);
		var partAL = document.getElementById("partAL"+i);
		var partPAGE = document.getElementById("partPAGE"+i);
		
		partX.value = loadDataPriani.x[i];
		partY.value = loadDataPriani.y[i];
		partW.value = loadDataPriani.w[i];
		partH.value = loadDataPriani.h[i];
		partSX.value = loadDataPriani.timeline.sX[i][framePriani];
		partSY.value = loadDataPriani.timeline.sY[i][framePriani];
		partTLX.value = loadDataPriani.timeline.tlX[i][framePriani];
		partTLY.value = loadDataPriani.timeline.tlY[i][framePriani];
		partR.value = loadDataPriani.timeline.r[i][framePriani];
		partAL.value = loadDataPriani.timeline.al[i][framePriani];
		partPAGE.value = loadDataPriani.timeline.page[i][framePriani];
		
	}
}

// ☆：タイムラインウィンドウの表の表示
function timelineList(){
	
	// HTMLを格納する変数の定義
	var timelineHtml = "";
	var frameHtml = "<tr><td>フレームNo：</td>";
	var pointHtml = "<tr><td class='tlList2'>全パーツ：</td>";
	var ppHtml = "";
	
	// タイムラインウィンドウの範囲選択を解除する
	selectFrame = [];
	selectPart = [];
	
	// HTMLを生成する（フレームNo等の部分）
	for(var i=0; i<loadDataPriani.timeline.point.length; i++){
		var frameClass = "tlList";
		if(i==framePriani){frameClass+="NOW";}
		
		frameHtml += "<td class='tlList0' style='background-color:whitesmoke;font-size:"+timelineFont+"em;'>"+i+"</td>";
		pointHtml += "<td class='"+frameClass+"' onclick='changeFrame("+i+")' oncontextmenu='timelineMenu(event,"+i+",-1)' style='cursor:pointer;' draggable=true ondragstart='timelineDragStart(event,"+i+","+-1+")' ondragover='timelineDragMove(event,"+i+","+-1+")' id='td"+i+"and"+-1+"'><img src='img/timeline"+loadDataPriani.timeline.point[i]+".png' width='"+timelineSize+"' height='20'></td>";
	}
	
	// HTMLを生成する
	for(var j=loadDataPriani.src.length-1; j>-1; j--){
		ppHtml += "<tr><td class='tlList"+(3+partSelectNo[j])+"'><img src='img/part"+partSelectNo[j]+".png' style='cursor:pointer;margin-right:5px;' onclick='partSelect("+j+")'>"+j+"【"+loadDataPriani.fileName[j]+"】</td>";
		for(var k=0; k<loadDataPriani.timeline.pp[j].length; k++){
			var frameClass = "tlList";
			if(k==framePriani){frameClass+="NOW";}
			ppHtml += "<td class='"+frameClass+"' onclick='changeFrame("+k+")' oncontextmenu='timelineMenu(event,"+k+","+j+")' style='cursor:pointer' draggable=true ondragstart='timelineDragStart(event,"+k+","+j+")' ondragover='timelineDragMove(event,"+k+","+j+")' id='td"+k+"and"+j+"'><img src='img/timeline"+loadDataPriani.timeline.pp[j][k]+".png' width='"+timelineSize+"' height='20'></td>";
		}
		ppHtml += "</tr>";
	}
	
	// HTMLを合成するして代入する
	timelineHtml = "<table class='tlList'>" + frameHtml + "</tr><tr>" + pointHtml + "</tr>" + ppHtml + "</table>";
	
	if(loadDataPriani.src.length>1){
		timelineHtml += "<input type='button' value='全て選択' onclick='partSelect(-2)'> <input type='button' value='選択解除' onclick='partSelect(-1)'>";
	}
	
	timelineHtml += " <input type='button' value='60%' onclick='timelineSize=12;timelineFont=0.5;timelineList();'> <input type='button' value='100%' onclick='timelineSize=20;timelineFont=1;timelineList();'>";
	timelineListDiv.innerHTML = timelineHtml;
	
	// settingFrameやsmoothingFrameがある場合の処理
	if(settingFrame.length!=0 || settingPart.length!=0){
		for(var i=0; i<settingFrame.length; i++){
			for(var j=0; j<settingPart.length; j++){
				var td = document.getElementById("td"+settingFrame[i]+"and"+settingPart[j]);
				td.style.backgroundColor = "lime";
			}
		}
	}
	if(smoothingFrame.length!=0 || smoothingPart.length!=0){
		for(var i=0; i<smoothingFrame.length; i++){
			for(var j=0; j<smoothingPart.length; j++){
				var td = document.getElementById("td"+smoothingFrame[i]+"and"+smoothingPart[j]);
				td.style.backgroundColor = "lime";
			}
		}
	}
}

// ★：現在の表示フレームを変更する
function changeFrame(frrr){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:changeFrame1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// 引数をframePrianiに代入し、静止画を描写
	framePriani = frrr;
	drawCanvasMaker(frrr);
	
	
	// タイムラインウィンドウの表示更新、プレビューウィンドウのフレームNo表示テキストフォームの更新
	timelineList();
	frameText.value = framePriani;
	
	// 処理状況更新
	upState("free");
}

// ★：◎パーツ画像のタイムライン設定を削除
function partImgReset(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgReset1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");

	// 引数のパート画像のframePrianiのフレームの設定をリセットする
	loadDataPriani.timeline.r[partNo][framePriani] = 0;
	loadDataPriani.timeline.sX[partNo][framePriani] = 1;
	loadDataPriani.timeline.sY[partNo][framePriani] = 1;
	loadDataPriani.timeline.tlX[partNo][framePriani] = 0;
	loadDataPriani.timeline.tlY[partNo][framePriani] = 0;
	loadDataPriani.timeline.al[partNo][framePriani] = 1;
	loadDataPriani.timeline.page[partNo][framePriani] = 0;
	
	loadDataPriani.timeline.pp[partNo][framePriani] = 0;
	
	// 一旦framePrianiのフレームNoのpointを0にし、ppが1のパート画像があるか調べ、あればpointを1に変更する
	loadDataPriani.timeline.point[framePriani] = 0;
	for(var i=0; i<loadDataPriani.src.length; i++){
		if(loadDataPriani.timeline.pp[i][framePriani]==1){
			loadDataPriani.timeline.point[framePriani]=1;
		}
	}
	
	// タイマーを解除し、静止画を表示
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウの表示更新
	timelineList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像のタイムライン設定の削除");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像のタイムライン設定を削除しました。","normal");
	upState("free");
}

// ★：◎パーツ画像の削除
function partImgDel(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgDel1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// 引数のパーツNoからそれ以降のパーツNoの画像情報を移行（上書き）していく
	for(var i=partNo; i<loadDataPriani.src.length; i++){
		loadDataPriani.src[i] = loadDataPriani.src[i+1];
		loadDataPriani.fileName[i] = loadDataPriani.fileName[i+1];
		loadDataPriani.x[i] = loadDataPriani.x[i+1];
		loadDataPriani.y[i] = loadDataPriani.y[i+1];
		loadDataPriani.w[i] = loadDataPriani.w[i+1];
		loadDataPriani.h[i] = loadDataPriani.h[i+1];
		loadDataPriani.timeline.pp[i] = loadDataPriani.timeline.pp[i+1];
		loadDataPriani.timeline.r[i] = loadDataPriani.timeline.r[i+1];
		loadDataPriani.timeline.sX[i] = loadDataPriani.timeline.sX[i+1];
		loadDataPriani.timeline.sY[i] = loadDataPriani.timeline.sY[i+1];
		loadDataPriani.timeline.tlX[i] = loadDataPriani.timeline.tlX[i+1];
		loadDataPriani.timeline.tlY[i] = loadDataPriani.timeline.tlY[i+1];
		loadDataPriani.timeline.al[i] = loadDataPriani.timeline.al[i+1];
		loadDataPriani.timeline.page[i] = loadDataPriani.timeline.page[i+1];
	}
	
	// 重複しているはずの最後尾のパーツ画像情報を削除する
	loadDataPriani.src.pop();
	loadDataPriani.fileName.pop();
	loadDataPriani.x.pop();
	loadDataPriani.y.pop();
	loadDataPriani.aX.pop();
	loadDataPriani.aY.pop();
	loadDataPriani.w.pop();
	loadDataPriani.h.pop();
	loadDataPriani.timeline.pp.pop();
	loadDataPriani.timeline.r.pop();
	loadDataPriani.timeline.sX.pop();
	loadDataPriani.timeline.sY.pop();
	loadDataPriani.timeline.tlX.pop();
	loadDataPriani.timeline.tlY.pop();
	loadDataPriani.timeline.al.pop();
	loadDataPriani.timeline.page.pop();
	
	// 一旦framePrianiのフレームNoのpointを0にし、ppが1のパート画像があるか調べ、あればpointを1に変更する
	loadDataPriani.timeline.point[framePriani] = 0;
	for(var i=0; i<loadDataPriani.src.length; i++){
		if(loadDataPriani.timeline.pp[i][framePriani]==1){
			loadDataPriani.timeline.point[framePriani]=1;
		}
	}
	
	// タイマー解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// パーツ画像ウィンドウとタイムラインウィンドウの表示更新
	partImgList();
	timelineList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の削除");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像を削除しました。","normal");
	upState("free");
}

// ☆：左上のメニューからウィンドウを開く
function windowView(id){
	// まずはもうメニューを閉じておく
	menuTop.open = false;
	
	// ぷりアニデータの設定ウィンドウを開く
	if(id=="basicWindow"){
		basicWindow.style.top = 50+scrollY+"px";
		basicWindow.style.left = "50px";
		basicWindow.style.visibility = "visible";
		basicIdText.value = loadDataPriani.id;
		basicFpsText.value = loadDataPriani.fps;
		basicCvxText.value = loadDataPriani.cvWidth;
		basicCvyText.value = loadDataPriani.cvHeight;
		zindexReset();
		basicWindow.style.zIndex = "20";
	}
	
	// ぷりアニデータの読み込み/書き出しウィンドウを開く
	if(id=="dataWindow"){
		dataWindow.style.top = 50+scrollY+"px";
		dataWindow.style.left = "80px";
		dataWindow.style.visibility = "visible";
		zindexReset();
		dataWindow.style.zIndex = "20";
	}
	
	// JSONデータの書き出しウィンドウを開く
	if(id=="exportJSONWindow"){
		exportJSONWindow.style.top = 50+scrollY+"px";
		exportJSONWindow.style.left = "110px";
		exportJSONWindow.style.visibility = "visible";
		jsonDirText.value = loadDataPriani.dir;
		jsonIdText.value = loadDataPriani.id;
		zindexReset();
		exportJSONWindow.style.zIndex = "20";
	}
	
	// JSONデータの編集ウィンドウを開く
	if(id=="editJSONWindow"){
		editJSONWindow.style.top = 50+scrollY+"px";
		editJSONWindow.style.left = "110px";
		editJSONWindow.style.visibility = "visible";
		zindexReset();
		editJSONWindow.style.zIndex = "20";
	}
	
	// JSONデータの編集ウィンドウを開く
	if(id=="inportJSONWindow"){
		inportJSONWindow.style.top = 50+scrollY+"px";
		inportJSONWindow.style.left = "110px";
		inportJSONWindow.style.visibility = "visible";
		zindexReset();
		inportJSONWindow.style.zIndex = "20";
	}
	
	// ヘルプウィンドウを開く
	if(id=="helpWindow"){
		helpWrite("メニュー");
	}
	
	// ストックデータの削除の確認と、削除の実行
	if(id=="dataRefresh"){
		// 確認アラート用ウィンドウのHTMLを設定
		var okcode = 'stockRefresh();logPriani("ストックデータを削除しました。","normal");alertConfirmWindow.style.visibility = "hidden";';
		var cancelcode = 'alertConfirmWindow.style.visibility="hidden";';
		var html = "<div style='text-align:center;'>ストックデータ（UNDO・REDO用のデータ）を<br>削除してもよろしいですか？<br>現在のストックデータ数："+Object.keys(stockData).length+"<br>　<br><input type='button' value='ＯＫ' onclick='"+okcode+"' class='button1'>　<input type='button' value='キャンセル' class='button2' onclick='"+cancelcode+"'></div>";
		
		alertConfirmWindow.innerHTML = html;
		alertConfirmWindow.style.left = (innerWidth-alertConfirmWindow.clientWidth)/2+"px";
		alertConfirmWindow.style.visibility = "visible";

	}
	
	// オプションウィンドウを開く
	if(id=="configWindow"){
		configWindow.style.top = 50+scrollY+"px";
		configWindow.style.left = "80px";
		configWindow.style.visibility = "visible";
		zindexReset();
		configWindow.style.zIndex = "20";
		
		// 現在の設定をフォームに反映させる
		var configForm = document.getElementsByName("configForm");
		if(makerConfig.autocopy==true){
			document.configForm.radioDataExportTime.value = "on";
		}else{
			document.configForm.radioDataExportTime.value = "off";
		}
	}
	
	// ウィンドウの整列
	if(id=="windowOrder"){
		var cancelcode = 'alertConfirmWindow.style.visibility="hidden";';
		var html = "<div style='text-align:center;'>ウィンドウを整列しますか？<br>　<br><input type='button' value='ＯＫ' onclick='windowOrderGo();' class='button1'>　<input type='button' value='キャンセル' class='button2' onclick='"+cancelcode+"'></div>";
		
		alertConfirmWindow.innerHTML = html;
		alertConfirmWindow.style.left = (innerWidth-alertConfirmWindow.clientWidth)/2+"px";
		alertConfirmWindow.style.visibility = "visible";
	}
	
	// スプライト画像の書き出しウィンドウを開く
	if(id=="spriteExportWindow"){
		spriteExportWindow.style.top = 50+scrollY+"px";
		spriteExportWindow.style.left = "110px";
		spriteExportWindow.style.visibility = "visible";
		zindexReset();
		spriteExportWindow.style.zIndex = "20";
	}
	
}

// ★：◎パーツ画像の重ね順を変更
function partImgMove(id,type){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgMove1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が1つしかない場合は処理をキャンセル（ログ表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<2){
		logPriani("＜E:partImgMove2＞パーツ画像は1つしかありません。","error");
		upState("free");
		return;
	}
	
	// 引数のパーツNoの情報をコピーしておく
	var srcNow = loadDataPriani.src[id];
	var fileNameNow = loadDataPriani.fileName[id];
	var xNow = loadDataPriani.x[id];
	var yNow = loadDataPriani.y[id];
	var aXNow = loadDataPriani.aX[id];
	var aYNow = loadDataPriani.aY[id];
	var wNow = loadDataPriani.w[id];
	var hNow = loadDataPriani.h[id];
	var ppNow = loadDataPriani.timeline.pp[id];
	var rNow = loadDataPriani.timeline.r[id];
	var sXNow = loadDataPriani.timeline.sX[id];
	var sYNow = loadDataPriani.timeline.sY[id];
	var tlXNow = loadDataPriani.timeline.tlX[id];
	var tlYNow = loadDataPriani.timeline.tlY[id];
	var alNow = loadDataPriani.timeline.al[id];
	var pageNow = loadDataPriani.timeline.page[id];
	
	// パーツを下に移動できるのか判定（ダメならログ表示・処理状況更新・リターン）
	if(type==-1){
		if(id==0){
			logPriani("＜E:partImgMove3＞このパーツ画像は一番下のパーツです。："+id+"【"+loadDataPriani.fileName[id]+"】","error");
			upState("free");
			return;
		}
	}
	
	// パーツを上に移動できるのか判定（ダメならログ表示・処理状況更新・リターン）
	if(type==1){
		if(id==loadDataPriani.src.length-1){
			logPriani("＜E:partImgMove4＞このパーツ画像は一番上のパーツです。："+id+"【"+loadDataPriani.fileName[id]+"】","error");
			upState("free");
			return;
		}
	}
	
	// 上か下のパーツ画像の情報と入れ替える
	loadDataPriani.src[id] = loadDataPriani.src[id+type];
	loadDataPriani.src[id+type] = srcNow;
	loadDataPriani.fileName[id] = loadDataPriani.fileName[id+type];
	loadDataPriani.fileName[id+type] = fileNameNow;
	loadDataPriani.x[id] = loadDataPriani.x[id+type];
	loadDataPriani.x[id+type] = xNow;
	loadDataPriani.y[id] = loadDataPriani.y[id+type];
	loadDataPriani.y[id+type] = yNow;
	loadDataPriani.aX[id] = loadDataPriani.aX[id+type];
	loadDataPriani.aX[id+type] = aXNow;
	loadDataPriani.aY[id] = loadDataPriani.aY[id+type];
	loadDataPriani.aY[id+type] = aYNow;
	loadDataPriani.w[id] = loadDataPriani.w[id+type];
	loadDataPriani.w[id+type] = wNow;
	loadDataPriani.h[id] = loadDataPriani.h[id+type];
	loadDataPriani.h[id+type] = hNow;
	loadDataPriani.timeline.pp[id] = loadDataPriani.timeline.pp[id+type];
	loadDataPriani.timeline.pp[id+type] = ppNow;
	loadDataPriani.timeline.r[id] = loadDataPriani.timeline.r[id+type];
	loadDataPriani.timeline.r[id+type] = rNow;
	loadDataPriani.timeline.sX[id] = loadDataPriani.timeline.sX[id+type];
	loadDataPriani.timeline.sX[id+type] = sXNow;
	loadDataPriani.timeline.sY[id] = loadDataPriani.timeline.sY[id+type];
	loadDataPriani.timeline.sY[id+type] = sYNow;
	loadDataPriani.timeline.tlX[id] = loadDataPriani.timeline.tlX[id+type];
	loadDataPriani.timeline.tlX[id+type] = tlXNow;
	loadDataPriani.timeline.tlY[id] = loadDataPriani.timeline.tlY[id+type];
	loadDataPriani.timeline.tlY[id+type] = tlYNow;
	loadDataPriani.timeline.al[id] = loadDataPriani.timeline.al[id+type];
	loadDataPriani.timeline.al[id+type] = alNow;
	loadDataPriani.timeline.page[id] = loadDataPriani.timeline.page[id+type];
	loadDataPriani.timeline.page[id+type] = pageNow;
	
	// タイマー解除して静止画表示
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// パーツ画像ウィンドウとタイムラインウィンドウの表示更新
	partImgList();
	timelineList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の順序の変更");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像の順序を変更しました。","normal");
	upState("free");
}

// ★：◎JSONデータの書き出しを実行【フォームインプット】
function jsonExportGo(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:jsonExportGo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// 入力された情報が適切かチェック
	// チェックにひっかかれば、アラート表示・ログ表示・処理状況更新・リターン
	
	// チェック：ぷりアニデータID【未入力、英数字・アンダースコアのみ、行頭の数字は禁止】
	if(jsonIdText.value==""){
		alertPop("エラー番号＜E:jsonExportGo2＞<br>ぷりアニデータIDが未入力です。");
		logPriani("＜E:jsonExportGo2＞＞ぷりアニデータIDが未入力です。","error");
		upState("free");
		return;
	}
	var reg1 = new RegExp(/^\w+$/);	//英数字とアンダースコアの表記であるか
	var reg2 = new RegExp(/^\d/);	//行頭が数字か
	if(reg1.test(jsonIdText.value)==false){
		alertPop("エラー番号＜E:jsonExportGo3＞<br>ぷりアニデータIDは英数字とアンダースコアのみ入力可能です。");
		logPriani("＜E:jsonExportGo3＞ぷりアニデータIDは英数字とアンダースコアのみ入力可能です。","error");
		upState("free");
		return;
	}
	if(reg2.test(jsonIdText.value)==true){
		alertPop("エラー番号＜E:jsonExportGo4＞<br>ぷりアニデータIDの1文字目に数字は使えません。");
		logPriani("＜E:jsonExportGo4＞ぷりアニデータIDの1文字目に数字は使えません。","error");
		upState("free");
		return;
	}
	
	// JSONデータの書き出しウィンドウのテキストフォーム内容をloadDataPrianiに適用
	loadDataPriani.dir = jsonDirText.value;
	loadDataPriani.id = jsonIdText.value;
	
	// JSONデータを表示するテキストフォームのDIV取得
	var jsonExportText = document.getElementById("jsonExportText");
	// 現在のデータをコピーしておく
	var before = dataCopy("json");
	
	// JSONデータのsrcをデータURLからファイル名へ変更
	for (var i=0; i<before.src.length; i++){
		before.src[i] = before.fileName[i];
	}
	
	// JSONデータの生成・整形・表示・フォーカス・全選択
	var jsonData = JSON.stringify(before,function(key,value){return value;},"");
	if(jsonExportTypeSelect.value == "ティラノスクリプト"){
		jsonData = 'TYRANO.kag.stat.f.PRIANI.dataPriani["'+before.id+'"]='+jsonData;
	}else if(jsonExportTypeSelect.value == "HTML"){
		jsonData = 'dataPriani["'+before.id+'"]='+jsonData;
	}
	jsonExportText.value = jsonData;
	jsonExportText.focus();
	jsonExportText.select();
	
	// オプションで「データ書き出し後で自動的にクリップボードにコピー」がオンになってればコピーする
	if(makerConfig.autocopy==true){
		document.execCommand("copy");
		alertPop("JSONデータをクリップボードにコピーしました");
	}
	
	// ログ表示
	logPriani("JSONデータを書き出しました。","normal");
	
	// いらないデータは削除しておく
	delete stockData["json"];
	
	// JSONデータを表示するテキストフォームをクリックしたら全選択するようにイベントハンドラくっつける
	jsonExportText.onclick = function(){
		jsonExportText.select();
	}
	
	// UNDO・REDO用のデータをストック・処理状況更新
	dataStock("JSONデータの書き出し");
	upState("free");
}

// ☆：stockDataにloadDataPrianiをコピーする
function dataCopy(mode){
	stockData[mode] = {};
	stockData[mode].id = loadDataPriani.id;
	stockData[mode].dir = loadDataPriani.dir;
	stockData[mode].fps = loadDataPriani.fps;
	stockData[mode].cvWidth = loadDataPriani.cvWidth;
	stockData[mode].cvHeight = loadDataPriani.cvHeight;
	stockData[mode].src = [];
	stockData[mode].fileName = [];
	stockData[mode].x = [];
	stockData[mode].y = [];
	stockData[mode].aX = [];
	stockData[mode].aY = [];
	stockData[mode].w = [];
	stockData[mode].h = [];
	stockData[mode].timeline = {};
	stockData[mode].timeline.point = [];
	stockData[mode].timeline.pp = [];
	stockData[mode].timeline.r = [];
	stockData[mode].timeline.sX = [];
	stockData[mode].timeline.sY = [];
	stockData[mode].timeline.tlX = [];
	stockData[mode].timeline.tlY = [];
	stockData[mode].timeline.al = [];
	stockData[mode].timeline.page = [];
	for(var i=0; i<loadDataPriani.src.length; i++){
		stockData[mode].src[i] = loadDataPriani.src[i];
		stockData[mode].fileName[i] = loadDataPriani.fileName[i];
		stockData[mode].x[i] = loadDataPriani.x[i];
		stockData[mode].y[i] = loadDataPriani.y[i];
		stockData[mode].aX[i] = loadDataPriani.aX[i];
		stockData[mode].aY[i] = loadDataPriani.aY[i];
		stockData[mode].w[i] = loadDataPriani.w[i];
		stockData[mode].h[i] = loadDataPriani.h[i];
		stockData[mode].timeline.pp[i] = [];
		stockData[mode].timeline.r[i] = [];
		stockData[mode].timeline.sX[i] = [];
		stockData[mode].timeline.sY[i] = [];
		stockData[mode].timeline.tlX[i] = [];
		stockData[mode].timeline.tlY[i] = [];
		stockData[mode].timeline.al[i] = [];
		stockData[mode].timeline.page[i] = [];
		for(var j=0; j<loadDataPriani.timeline.point.length; j++){
			stockData[mode].timeline.point[j] = loadDataPriani.timeline.point[j];
			stockData[mode].timeline.pp[i][j] = loadDataPriani.timeline.pp[i][j];
			stockData[mode].timeline.r[i][j] = loadDataPriani.timeline.r[i][j];
			stockData[mode].timeline.sX[i][j] = loadDataPriani.timeline.sX[i][j];
			stockData[mode].timeline.sY[i][j] = loadDataPriani.timeline.sY[i][j];
			stockData[mode].timeline.tlX[i][j] = loadDataPriani.timeline.tlX[i][j];
			stockData[mode].timeline.tlY[i][j] = loadDataPriani.timeline.tlY[i][j];
			stockData[mode].timeline.al[i][j] = loadDataPriani.timeline.al[i][j];
			stockData[mode].timeline.page[i][j] = loadDataPriani.timeline.page[i][j];
		}
	}
	return stockData[mode];
}

// ☆：タイムライン右クリックメニューの表示
function timelineMenu(e,frameNo,partNo){
	timelineEditWindowHidden();
	
	// 範囲選択なし
	if(selectFrame.length==0 && selectPart.length==0){
		var filename = "";
		if(partNo==-1){
			filename = "【全パーツ】";
		}else{
			filename = "【"+loadDataPriani.fileName[partNo]+"】";
		}
		var menucode = "フレームNo"+frameNo+filename+"<br>・<a onclick='frameCopy("+frameNo+","+partNo+",0);' class='tlmenu'>コピー</a><br>・<a onclick='frameCopy("+frameNo+","+partNo+",1);' class='tlmenu'>カット</a><br>・<a onclick='framePaste("+frameNo+","+partNo+");' class='tlmenu'>ペースト</a><hr>・<a onclick='smoothingWindow("+frameNo+","+partNo+");' class='tlmenu'>アニメーション補間</a><br>・<a onclick='smoothingSimple("+frameNo+","+partNo+");' class='tlmenu'>簡易アニメーション補間　</a><hr>・<a onclick='timelineSettingWindow("+frameNo+","+partNo+");' class='tlmenu'>タイムライン設定の編集</a><br>・<a onclick='frameReset("+frameNo+","+partNo+");' class='tlmenu'>タイムライン設定の削除</a><hr>・<a onclick='timelineFrameAdd("+frameNo+");' class='tlmenu'>フレームの追加</a><br>・<a onclick='frameDel("+frameNo+");' class='tlmenu'>フレームの削除</a><hr>・<a onclick='timelineMaruChange("+frameNo+");' class='tlmenu'>マークの色を変える</a>";
	
	}else{
	// 範囲選択あり
		var menucode = "【範囲選択】<br>・<a onclick='frameCopy("+frameNo+","+partNo+",0);' class='tlmenu'>コピー</a><br>・<a onclick='frameCopy("+frameNo+","+partNo+",1);' class='tlmenu'>カット</a><br>・<a onclick='framePaste("+frameNo+","+partNo+");' class='tlmenu'>ペースト</a><hr>・<a onclick='smoothingWindow("+frameNo+","+partNo+");' class='tlmenu'>アニメーション補間</a><br>・<a onclick='smoothingSimple("+frameNo+","+partNo+");' class='tlmenu'>簡易アニメーション補間　</a><hr>・<a onclick='timelineSettingWindow("+frameNo+","+partNo+");' class='tlmenu'>タイムライン設定の編集</a><br>・<a onclick='frameReset("+frameNo+","+partNo+");' class='tlmenu'>タイムライン設定の削除</a><hr>・<a onclick='frameDel("+frameNo+");' class='tlmenu'>フレームの削除</a><hr>・<a onclick='timelineMaruChange("+frameNo+");' class='tlmenu'>マークの色を変える</a>";
	}
	
	// メニューを表示する位置	
	var menux = e.pageX+10;
	var menuy = e.pageY+10;
	
	// メニューを表示する準備
	timelineMenuWindow.innerHTML = menucode;
	timelineMenuWindow.style.left = menux+"px";
	timelineMenuWindow.style.top = menuy+"px";
	
	// クリック位置が下過ぎる場合の調整
	if(innerHeight-e.clientY<timelineMenuWindow.clientHeight){
		var menuy = e.pageY - timelineMenuWindow.clientHeight;
		timelineMenuWindow.style.top = menuy+"px";
	}
	
	// メニューを表示
	timelineMenuWindow.style.visibility = "visible";
	
	// 普通の右クリメニューは封印
	e.preventDefault();
}

// ☆：タイムラインをドラッグ開始
function timelineDragStart(e,frameNo,partNo){
	// まずは範囲選択をリセット
	timelineDragReset();
	timelineEditWindowHidden();
	
	// ドラッグ開始時のフレームNoとパーツNoを記憶する
	tdStartFrame = frameNo;
	tdStartPart = partNo;
	
	// タイムライン右クリメニューがあれば消しとく
	if(timelineMenuWindow){timelineMenuWindow.style.visibility = "hidden";}
}

// ☆：タイムラインをドラッグ中
function timelineDragMove(e,frameNo,partNo){
	// まずは範囲選択をリセット
	timelineDragReset();
	
	// 選択されてるフレームをselectFrame配列にぶちこむ
	if(tdStartFrame>frameNo){
		for(var i=frameNo; i<=tdStartFrame; i++){
			selectFrame.push(i);
		}
	}else{
		for(var i=tdStartFrame; i<=frameNo; i++){
			selectFrame.push(i);
		}
	}
	
	// 選択されてるパーツ画像をselectPart配列にぶちこむ
	if(tdStartPart>partNo){
		for(var i=partNo; i<=tdStartPart; i++){
			selectPart.push(i);
		}
	}else{
		for(var i=tdStartPart; i<=partNo; i++){
			selectPart.push(i);
		}
	}
	
	// パーツ画像に【全パーツ】を含んでたらパーツ画像は全部選択ってことにする
	if(tdStartPart==-1 || partNo==-1){
		selectPart=[];
		for(var i=-1; i<loadDataPriani.src.length; i++){
			selectPart.push(i);
		}
	}
	
	// selectFrameとselectPartの部分は背景を水色（範囲選択している色）にする
	for(var i in selectFrame){
		for(var j in selectPart){
			var td = document.getElementById("td"+selectFrame[i]+"and"+selectPart[j]);
			td.style.backgroundColor = "aqua";
		}
	}
	
}

// ☆：タイムラインの範囲選択を解除
function timelineDragReset(){
	// 表中の全ての背景を白（範囲選択していない色）にする
	for(var i=-1; i<loadDataPriani.src.length; i++){
		for(var j=0; j<loadDataPriani.timeline.point.length; j++){
			var td = document.getElementById("td"+j+"and"+i);
			td.style.backgroundColor="white";
		}
	}
	
	// 範囲選択されているフレームNoとパーツNoを格納する配列を初期化する
	selectFrame=[];
	selectPart=[];
}

// ☆：タイムラインのフレームを追加するウィンドウを表示
function timelineFrameAdd(frameNo){
	// ウィンドウのHTML用の変数を用意
	var cancelcode = 'timelineEditWindow.style.visibility="hidden";';
	var menucode = "<strong>フレームNo."+frameNo+"</strong><br>";
	var menucode = menucode + "追加するフレームの数：<input type='number' id='addFrameNumber' min='1' max='99' value='1'><br>　<div style='text-align:center;'><input type='button' value='左に追加' class='button1' onclick='frameAdd(0,"+frameNo+")'>　<input type='button' value='右に追加' class='button1' onclick='frameAdd(1,"+frameNo+")'><br>　<br><input type='button' value='キャンセル' class='button2' onclick='"+cancelcode+"'></div>";
	
	// タイムライン編集ウィンドウの本文DIV、タイトルDIVを取得
	var timelineEditDiv = document.getElementById("timelineEditDiv");
	var timelineEditTitle = document.getElementById("timelineEditTitle");
	
	// タイムライン編集ウィンドウを「フレームの追加」ウィンドウとして表示
	timelineEditTitle.innerHTML = "フレームの追加";
	timelineEditDiv.innerHTML = menucode;
	timelineEditWindow.style.top = 50 + scrollY + "px";
	timelineEditWindow.style.left = (innerWidth-timelineEditWindow.clientWidth)/2 + "px";
	timelineEditWindow.style.visibility = "visible";
	zindexReset();
	timelineEditWindow.style.zIndex = "20";
}

// ★：◎タイムラインのフレーム追加【フォームインプット】
function frameAdd(mode,frameNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:frameAdd1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像数が0の場合はキャンセル（アラート表示・タイムライン編集ウィンドウ非表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>フレームの追加を実行することができません。");
		timelineEditWindow.style.visibility="hidden";
		upState("free");
		return;
	}
	
	// 追加する数を入力するフォームを取得
	var addFrameNumber = document.getElementById("addFrameNumber");
	
	// フォーム入力チェック【未入力、1以上のみ】
	// チェックにひっかかれば、アラート表示・ログ表示・処理状況更新・リターン
	if(addFrameNumber.value==""){
		alertPop("エラー番号＜E:frameAdd2＞<br>追加するフレームの数を入力してください。");
		logPriani("＜E:frameAdd2＞追加するフレームの数を入力してください。","error");
		upState("free");
		return;
	}
	if(addFrameNumber.value<1){
		alertPop("エラー番号＜E:frameAdd3＞<br>1以上の数値を入力してください。");
		logPriani("＜E:frameAdd3＞1以上の数値を入力してください。","error");
		upState("free");
		return;
	}
	
	// 現在のloadDataPrianiを保存しとく
	dataCopy("frameadd");
	
	// 追加する箇所より右側のtimeline情報をコピーするようの連想配列を準備しておく
	rightArry = {};
	rightArry.point = [];
	rightArry.pp = [];
	rightArry.r = [];
	rightArry.sX = [];
	rightArry.sY = [];
	rightArry.tlX = [];
	rightArry.tlY = [];
	rightArry.al = [];
	rightArry.page = [];
	for(var j=0; j<loadDataPriani.src.length; j++){
		rightArry.pp[j] = [];
		rightArry.r[j] = [];
		rightArry.sX[j] = [];
		rightArry.sY[j] = [];
		rightArry.tlX[j] = [];
		rightArry.tlY[j] = [];
		rightArry.al[j] = [];
		rightArry.page[j] = [];
	}
	
	// rightArryに追加する箇所より右側のtimeline情報をコピーしていく
	rightArry.point = stockData.frameadd.timeline.point.slice(frameNo+mode,loadDataPriani.timeline.point.length);
	for(var ii=0; ii<loadDataPriani.src.length; ii++){
		rightArry.pp[ii] = stockData.frameadd.timeline.pp[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.r[ii] = stockData.frameadd.timeline.r[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.sX[ii] = stockData.frameadd.timeline.sX[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.sY[ii] = stockData.frameadd.timeline.sY[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.tlX[ii] = stockData.frameadd.timeline.tlX[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.tlY[ii] = stockData.frameadd.timeline.tlY[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.al[ii] = stockData.frameadd.timeline.al[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
		rightArry.page[ii] = stockData.frameadd.timeline.page[ii].slice(frameNo+mode,loadDataPriani.timeline.point.length);
	}
	
	// loadDataPrianiの追加する箇所より右側のtimeline情報を削除していく
	for(var k=frameNo+mode; k<stockData.frameadd.timeline.point.length; k++){
		loadDataPriani.timeline.point.pop();
		for(var kk=0; kk<stockData.frameadd.src.length; kk++){
			loadDataPriani.timeline.pp[kk].pop();
			loadDataPriani.timeline.r[kk].pop();
			loadDataPriani.timeline.sX[kk].pop();
			loadDataPriani.timeline.sY[kk].pop();
			loadDataPriani.timeline.tlX[kk].pop();
			loadDataPriani.timeline.tlY[kk].pop();
			loadDataPriani.timeline.al[kk].pop();
			loadDataPriani.timeline.page[kk].pop();
		}
	}
	
	// loadDataPrianiに追加する数だけ追加していく
	for(var l=0; l<addFrameNumber.value; l++){
		loadDataPriani.timeline.point.push(0);
		for(var ll=0; ll<stockData.frameadd.src.length; ll++){
			loadDataPriani.timeline.pp[ll].push(0);
			loadDataPriani.timeline.r[ll].push(0);
			loadDataPriani.timeline.sX[ll].push(1);
			loadDataPriani.timeline.sY[ll].push(1);
			loadDataPriani.timeline.tlX[ll].push(0);
			loadDataPriani.timeline.tlY[ll].push(0);
			loadDataPriani.timeline.al[ll].push(1);
			loadDataPriani.timeline.page[ll].push(0);
			
		}
	}
	
	// loadDataPrianiにrightArryをくっつけておく
	loadDataPriani.timeline.point = loadDataPriani.timeline.point.concat(rightArry.point);
	for(var m=0; m<stockData.frameadd.src.length; m++){
		loadDataPriani.timeline.pp[m] = loadDataPriani.timeline.pp[m].concat(rightArry.pp[m]);
		loadDataPriani.timeline.r[m] = loadDataPriani.timeline.r[m].concat(rightArry.r[m]);
		loadDataPriani.timeline.sX[m] = loadDataPriani.timeline.sX[m].concat(rightArry.sX[m]);
		loadDataPriani.timeline.sY[m] = loadDataPriani.timeline.sY[m].concat(rightArry.sY[m]);
		loadDataPriani.timeline.tlX[m] = loadDataPriani.timeline.tlX[m].concat(rightArry.tlX[m]);
		loadDataPriani.timeline.tlY[m] = loadDataPriani.timeline.tlY[m].concat(rightArry.tlY[m]);
		loadDataPriani.timeline.al[m] = loadDataPriani.timeline.al[m].concat(rightArry.al[m]);
		loadDataPriani.timeline.page[m] = loadDataPriani.timeline.page[m].concat(rightArry.page[m]);
	}
	
	// タイムラインウィンドウの表示を更新、タイムライン編集ウインドウを非表示
	timelineList();
	timelineEditWindow.style.visibility = "hidden";
	
	// いらないデータは削除しておく
	delete rightArry;
	delete stockData["frameadd"];
	
	// もしコピーデータがありカットモードだったらモードをコピーモードに変更しておく
	try{
		if(copyTimeline.mode==1){
			copyTimeline.mode = 0;
		}
	}catch(e){
		
	}
	
	// UNDO・REDO用のデータをストック
	dataStock("フレームの追加");
	
	// ログ表示・処理状況更新
	logPriani("フレームを追加しました。","normal");
	upState("free");
}

// ★：◎タイムライン設定の削除
function frameReset(frameNo,partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:frameReset1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像数が0の場合はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>タイムライン設定の削除を実行することができません。");
		upState("free");
		return;
	}
	
	// タイムライン設定の削除を実行
	if(selectFrame.length==0 && selectPart.length==0){
		// 範囲選択じゃない場合
		if(partNo==-1){
			// 全パーツの場合
			for(var i=0; i<loadDataPriani.src.length; i++){
				loadDataPriani.timeline.pp[i][frameNo]=0;
				loadDataPriani.timeline.r[i][frameNo]=0;
				loadDataPriani.timeline.sX[i][frameNo]=1;
				loadDataPriani.timeline.sY[i][frameNo]=1;
				loadDataPriani.timeline.tlX[i][frameNo]=0;
				loadDataPriani.timeline.tlY[i][frameNo]=0;
				loadDataPriani.timeline.al[i][frameNo]=1;
				loadDataPriani.timeline.page[i][frameNo]=0;
				
			}
			loadDataPriani.timeline.point[frameNo]=0;
		}else{
			// 全パーツじゃない場合
			loadDataPriani.timeline.pp[partNo][frameNo]=0;
			loadDataPriani.timeline.r[partNo][frameNo]=0;
			loadDataPriani.timeline.sX[partNo][frameNo]=1;
			loadDataPriani.timeline.sY[partNo][frameNo]=1;
			loadDataPriani.timeline.tlX[partNo][frameNo]=0;
			loadDataPriani.timeline.tlY[partNo][frameNo]=0;
			loadDataPriani.timeline.al[partNo][frameNo]=1;
			loadDataPriani.timeline.page[partNo][frameNo]=0;
			
		}
	}else{
		// 範囲選択の場合
		if(selectPart[0]==-1){
			selectPart.shift();
		}
		for(var i in selectFrame){
			for(var j in selectPart){
				loadDataPriani.timeline.pp[selectPart[j]][selectFrame[i]]=0;
				loadDataPriani.timeline.r[selectPart[j]][selectFrame[i]]=0;
				loadDataPriani.timeline.sX[selectPart[j]][selectFrame[i]]=1;
				loadDataPriani.timeline.sY[selectPart[j]][selectFrame[i]]=1;
				loadDataPriani.timeline.tlX[selectPart[j]][selectFrame[i]]=0;
				loadDataPriani.timeline.tlY[selectPart[j]][selectFrame[i]]=0;
				loadDataPriani.timeline.al[selectPart[j]][selectFrame[i]]=1;
				loadDataPriani.timeline.page[selectPart[j]][selectFrame[i]]=0;
			}
			
			loadDataPriani.timeline.point[selectFrame[i]]=0;
			for(var k=0; k<loadDataPriani.src.length; k++){
				if(loadDataPriani.timeline.pp[k][selectFrame[i]]==1){
					loadDataPriani.timeline.point[selectFrame[i]]=1;
				}
			}
		}
		
	}
	
	// タイムラインウィンドウの表示更新
	timelineList();
	
	// もしコピーデータがありカットモードだったらモードをコピーモードに変更しておく
	try{
		if(copyTimeline.mode==1){
			copyTimeline.mode = 0;
		}
	}catch(e){
		
	}
	
	// UNDO・REDO用のデータをストック
	dataStock("フレームのタイムライン設定の削除");
	
	// ログ表示・処理状況更新
	logPriani("フレームのタイムライン設定を削除しました。","normal");
	upState("free");
}

// ★：◎タイムラインのフレーム削除
function frameDel(frameNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:frameDel1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像数が0の場合はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>フレームの削除を実行することができません。");
		upState("free");
		return;
	}
	
	// 
	if(selectFrame.length==0){
		var fNo = frameNo+1;
		var dNo = frameNo;
	}else{
		var fNo = selectFrame[selectFrame.length-1]+1;
		var dNo = selectFrame[0];
	}
	
	// 現在のloadDataPrianiをstockDataに保存しとく
	dataCopy("framedel");
	
	// 削除する箇所より右側のtimeline情報をコピーするようの連想配列を準備しておく
	rightArry = {};
	rightArry.point = [];
	rightArry.pp = [];
	rightArry.r = [];
	rightArry.sX = [];
	rightArry.sY = [];
	rightArry.tlX = [];
	rightArry.tlY = [];
	rightArry.al = [];
	rightArry.page = [];
	for(var j=0; j<loadDataPriani.src.length; j++){
		rightArry.pp[j] = [];
		rightArry.r[j] = [];
		rightArry.sX[j] = [];
		rightArry.sY[j] = [];
		rightArry.tlX[j] = [];
		rightArry.tlY[j] = [];
		rightArry.al[j] = [];
		rightArry.page[j] = [];
	}
	
	// rightArryに追加する箇所より右側のtimeline情報をコピーしていく
	rightArry.point = stockData.framedel.timeline.point.slice(fNo,loadDataPriani.timeline.point.length);
	for(var ii=0; ii<loadDataPriani.src.length; ii++){
		rightArry.pp[ii] = stockData.framedel.timeline.pp[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.r[ii] = stockData.framedel.timeline.r[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.sX[ii] = stockData.framedel.timeline.sX[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.sY[ii] = stockData.framedel.timeline.sY[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.tlX[ii] = stockData.framedel.timeline.tlX[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.tlY[ii] = stockData.framedel.timeline.tlY[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.al[ii] = stockData.framedel.timeline.al[ii].slice(fNo,loadDataPriani.timeline.point.length);
		rightArry.page[ii] = stockData.framedel.timeline.page[ii].slice(fNo,loadDataPriani.timeline.point.length);
	}
	
	// 削除する
	for(var i=dNo; i<stockData.framedel.timeline.point.length; i++){
		loadDataPriani.timeline.point.pop();
		for(var j=0; j<loadDataPriani.src.length; j++){
			loadDataPriani.timeline.pp[j].pop();
			loadDataPriani.timeline.r[j].pop();
			loadDataPriani.timeline.sX[j].pop();
			loadDataPriani.timeline.sY[j].pop();
			loadDataPriani.timeline.tlX[j].pop();
			loadDataPriani.timeline.tlY[j].pop();
			loadDataPriani.timeline.al[j].pop();
			loadDataPriani.timeline.page[j].pop();
		}
	}
	
	// loadDataPrianiにrightArryをくっつけておく
	loadDataPriani.timeline.point = loadDataPriani.timeline.point.concat(rightArry.point);
	for(var m=0; m<stockData.framedel.src.length; m++){
		loadDataPriani.timeline.pp[m] = loadDataPriani.timeline.pp[m].concat(rightArry.pp[m]);
		loadDataPriani.timeline.r[m] = loadDataPriani.timeline.r[m].concat(rightArry.r[m]);
		loadDataPriani.timeline.sX[m] = loadDataPriani.timeline.sX[m].concat(rightArry.sX[m]);
		loadDataPriani.timeline.sY[m] = loadDataPriani.timeline.sY[m].concat(rightArry.sY[m]);
		loadDataPriani.timeline.tlX[m] = loadDataPriani.timeline.tlX[m].concat(rightArry.tlX[m]);
		loadDataPriani.timeline.tlY[m] = loadDataPriani.timeline.tlY[m].concat(rightArry.tlY[m]);
		loadDataPriani.timeline.al[m] = loadDataPriani.timeline.al[m].concat(rightArry.al[m]);
		loadDataPriani.timeline.page[m] = loadDataPriani.timeline.page[m].concat(rightArry.page[m]);
	}

	// タイムラインウィンドウの表示更新
	timelineList();
	
	// いらないデータの削除
	delete rightArry;
	delete stockData["framedel"];
	
	// もしコピーデータがありカットモードだったらモードをコピーモードに変更しておく
	try{
		if(copyTimeline.mode==1){
			copyTimeline.mode = 0;
		}
	}catch(e){
		
	}
	
	// UNDO・REDO用のデータのストック
	dataStock("フレームの削除");
	
	// ログ表示・処理状況更新
	logPriani("フレームを削除しました。","normal");
	upState("free");
}

// ★：タイムラインのフレームコピー
function frameCopy(frameNo,partNo,mode){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:frameCopy1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が１枚もない時はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>コピーを実行することができません。");
		upState("free");
		return;
	}
	
	// コピーする範囲を示す配列
	copyFrame = [];
	copyPart = [];
	
	// copyFrameとcopyPartにコピーする範囲を定義する
	if(selectFrame.length==0 && selectPart.length==0){
		// 範囲選択ではない場合
		copyFrame[0] = frameNo;
		copyPart[0] = partNo;
		if(copyPart[0] == -1){
			for(var i=0; i<loadDataPriani.src.length; i++){
				copyPart.push(i);
			}
			copyPart.shift();
		}
	}else{
		// 範囲選択の場合
		for(var i=0; i<selectFrame.length; i++){
			copyFrame[i] = selectFrame[i];
		}
		for(var j=0; j<selectPart.length; j++){
			copyPart[j] = selectPart[j];
		}
		if(copyPart[0]==-1){
			copyPart.shift();
		}
	}
	
	// 実際にコピーしておく器の連想配列を初期化
	copyTimeline = {};
	copyTimeline.mode = mode;
	copyTimeline.point = [];
	copyTimeline.pp = [];
	copyTimeline.r = [];
	copyTimeline.sX = [];
	copyTimeline.sY = [];
	copyTimeline.tlX = [];
	copyTimeline.tlY = [];
	copyTimeline.al = [];
	copyTimeline.page = [];
	for(var i=0; i<loadDataPriani.src.length; i++){
		copyTimeline.pp[i] = [];
		copyTimeline.r[i] = [];
		copyTimeline.sX[i] = [];
		copyTimeline.sY[i] = [];
		copyTimeline.tlX[i] = [];
		copyTimeline.tlY[i] = [];
		copyTimeline.al[i] = [];
		copyTimeline.page[i] = [];
	}
	
	// copyTimelineにloadDataPrianiのtimeline部分をコピーしておく
	for(var i=0; i<loadDataPriani.timeline.point.length; i++){
		copyTimeline.point[i] = loadDataPriani.timeline.point[i];
		for(var j=0; j<loadDataPriani.src.length; j++){
			copyTimeline.pp[j][i] = loadDataPriani.timeline.pp[j][i];
			copyTimeline.r[j][i] = loadDataPriani.timeline.r[j][i];
			copyTimeline.sX[j][i] = loadDataPriani.timeline.sX[j][i];
			copyTimeline.sY[j][i] = loadDataPriani.timeline.sY[j][i];
			copyTimeline.tlX[j][i] = loadDataPriani.timeline.tlX[j][i];
			copyTimeline.tlY[j][i] = loadDataPriani.timeline.tlY[j][i];
			copyTimeline.al[j][i] = loadDataPriani.timeline.al[j][i];
			copyTimeline.page[j][i] = loadDataPriani.timeline.page[j][i];
		}
	}
	
	
	// ログ表示（コピーかカットでテキスト変更）・処理状況更新
	if(copyTimeline.mode==0){
		logPriani("フレームのタイムライン設定をコピーしました。","normal");
	}else{
		logPriani("フレームのタイムライン設定をカットしました。","normal");
	}
	upState("free");
}

// ★：◎タイムラインのフレームペースト
function framePaste(frameNo,partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:framePaste1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が１枚もない時はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>ペーストを実行することができません。");
		upState("free");
		return;
	}
	
	// ペーストするデータがないときはキャンセル（ログ表示・処理状況更新・リターン）
	if(copyFrame.length==0){
		logPriani("＜E:framePaste2＞ペーストするデータがありません","error");
		upState("free");
		return;
	}
	
	// 現在のデータをstockDataにコピーしておく
	dataCopy("paste");
	
	// ペーストする場所を設定するための変数を定義
	var fNo = frameNo;
	var pNo = partNo;
	if(pNo == -1){
		pNo = loadDataPriani.src.length -1;
	}
	
	// ペースト処理前の準備
	copyPart = copyPart.reverse();
	
	// ペースト処理
	for(var i=0; i<copyFrame.length; i++){
		loadDataPriani.timeline.point[fNo+i] = copyTimeline.point[copyFrame[i]];
		for(var j=0; j<copyPart.length; j++){
			console.log("pNo-j:"+(pNo-j)+"/fNo+i:"+(fNo+i)+"//i:"+i+"/j:"+j);
			console.log("loadDataPriani.timeline.r[pNo-j][fNo+i]:"+loadDataPriani.timeline.r[pNo-j][fNo+i]+"//copyTimeline.r[copyPart[j]][copyFrame[i]]:"+copyTimeline.r[copyPart[j]][copyFrame[i]]);
			
			loadDataPriani.timeline.pp[pNo-j][fNo+i] = copyTimeline.pp[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.r[pNo-j][fNo+i] = copyTimeline.r[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.sX[pNo-j][fNo+i] = copyTimeline.sX[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.sY[pNo-j][fNo+i] = copyTimeline.sY[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.tlX[pNo-j][fNo+i] = copyTimeline.tlX[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.tlY[pNo-j][fNo+i] = copyTimeline.tlY[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.al[pNo-j][fNo+i] = copyTimeline.al[copyPart[j]][copyFrame[i]];
			loadDataPriani.timeline.page[pNo-j][fNo+i] = copyTimeline.page[copyPart[j]][copyFrame[i]];
		}
	}
	
	// 多すぎたら消すため、ペースト前のpoint数を把握
	var trueFrameNumber = stockData.paste.timeline.point.length;
	
	// 多すぎた部分がある間、削除実行する
	while(loadDataPriani.timeline.point.length>trueFrameNumber){
		loadDataPriani.timeline.point.pop();
	}
	
	for(var i=0; i<loadDataPriani.src.length; i++){
		while(loadDataPriani.timeline.pp[i].length>trueFrameNumber){
			loadDataPriani.timeline.pp[i].pop();
		}
		while(loadDataPriani.timeline.r[i].length>trueFrameNumber){
			loadDataPriani.timeline.r[i].pop();
		}
		while(loadDataPriani.timeline.sX[i].length>trueFrameNumber){
			loadDataPriani.timeline.sX[i].pop();
		}
		while(loadDataPriani.timeline.sY[i].length>trueFrameNumber){
			loadDataPriani.timeline.sY[i].pop();
		}
		while(loadDataPriani.timeline.tlX[i].length>trueFrameNumber){
			loadDataPriani.timeline.tlX[i].pop();
		}
		while(loadDataPriani.timeline.tlY[i].length>trueFrameNumber){
			loadDataPriani.timeline.tlY[i].pop();
		}
		while(loadDataPriani.timeline.al[i].length>trueFrameNumber){
			loadDataPriani.timeline.al[i].pop();
		}
		while(loadDataPriani.timeline.page[i].length>trueFrameNumber){
			loadDataPriani.timeline.page[i].pop();
		}
	}
	
	// カットならコピー元のタイムライン設定を削除
	if(copyTimeline.mode!=0){
		for(var i=0; i<copyFrame.length; i++){
			for(var j=0; j<copyPart.length; j++){
				loadDataPriani.timeline.pp[copyPart[j]][copyFrame[i]] = 0;
				loadDataPriani.timeline.r[copyPart[j]][copyFrame[i]] = 0;
				loadDataPriani.timeline.sX[copyPart[j]][copyFrame[i]] = 1;
				loadDataPriani.timeline.sY[copyPart[j]][copyFrame[i]] = 1;
				loadDataPriani.timeline.tlX[copyPart[j]][copyFrame[i]] = 0;
				loadDataPriani.timeline.tlY[copyPart[j]][copyFrame[i]] = 0;
				loadDataPriani.timeline.al[copyPart[j]][copyFrame[i]] = 1;
				loadDataPriani.timeline.page[copyPart[j]][copyFrame[i]] = 0;
			}
		}
		// pointを1か0か判定
		for(var i=0; i<copyFrame.length; i++){
			loadDataPriani.timeline.point[copyFrame[i]] = 0;
			for(var j=0; j<loadDataPriani.src.length; j++){
				if(loadDataPriani.timeline.pp[j][copyFrame[i]]!=0){
					loadDataPriani.timeline.point[copyFrame[i]]=1;
				}
			}
		}
		
	}
	
	// タイムラインウィンドウの表示更新
	timelineList();
	
	// いらないデータは消す
	delete stockData["paste"];
	copyFrame = [];
	copyPart = [];
	copyTimeline = {};
	
	// UNDO・REDO用のデータをストック
	dataStock("フレームのタイムライン設定のペースト");
	
	// ログ表示・処理状況更新
	logPriani("フレームのタイムライン設定をペーストしました。","normal");
	upState("free");
}

// ★：UNDO・REDO処理
function undoRedo(mode){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:undoRedo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	var memo = stockData["L"+stockNo].action;
	var initFrag = false;
	
	if(mode=="undo"){
		stockNo = stockNo - 1;
		if(stockNo==0 && stockData["L0"].action=="起動時の状態"){
			initFrag = true;
		}
		if(stockNo<0){
			stockNo=0;
			upState("free");
			return;
		}
	}
	
	if(mode=="redo"){
		stockNo = stockNo + 1;
		if(stockNo>=Object.keys(stockData).length){
			stockNo=Object.keys(stockData).length-1;
			upState("free");
			return;
		}
		memo = stockData["L"+stockNo].action;
	}
	
	framePriani = stockData["L"+stockNo].frame;
	loadDataPriani = {};
	loadDataPriani.id = stockData["L"+stockNo].id;
	loadDataPriani.dir = stockData["L"+stockNo].dir;
	loadDataPriani.fps = stockData["L"+stockNo].fps;
	loadDataPriani.cvWidth = stockData["L"+stockNo].cvWidth;
	loadDataPriani.cvHeight = stockData["L"+stockNo].cvHeight;
	loadDataPriani.src = [];
	loadDataPriani.fileName = [];
	loadDataPriani.x = [];
	loadDataPriani.y = [];
	loadDataPriani.aX = [];
	loadDataPriani.aY = [];
	loadDataPriani.w = [];
	loadDataPriani.h = [];
	loadDataPriani.timeline = {};
	loadDataPriani.timeline.point = [];
	loadDataPriani.timeline.pp = [];
	loadDataPriani.timeline.r = [];
	loadDataPriani.timeline.sX = [];
	loadDataPriani.timeline.sY = [];
	loadDataPriani.timeline.tlX = [];
	loadDataPriani.timeline.tlY = [];
	loadDataPriani.timeline.al = [];
	loadDataPriani.timeline.page = [];
	for(var i=0; i<stockData["L"+stockNo].src.length; i++){
		loadDataPriani.src[i] = stockData["L"+stockNo].src[i];
		loadDataPriani.fileName[i] = stockData["L"+stockNo].fileName[i];
		loadDataPriani.x[i] = stockData["L"+stockNo].x[i];
		loadDataPriani.y[i] = stockData["L"+stockNo].y[i];
		loadDataPriani.aX[i] = stockData["L"+stockNo].aX[i];
		loadDataPriani.aY[i] = stockData["L"+stockNo].aY[i];
		loadDataPriani.w[i] = stockData["L"+stockNo].w[i];
		loadDataPriani.h[i] = stockData["L"+stockNo].h[i];
		loadDataPriani.timeline.pp[i] = [];
		loadDataPriani.timeline.r[i] = [];
		loadDataPriani.timeline.sX[i] = [];
		loadDataPriani.timeline.sY[i] = [];
		loadDataPriani.timeline.tlX[i] = [];
		loadDataPriani.timeline.tlY[i] = [];
		loadDataPriani.timeline.al[i] = [];
		loadDataPriani.timeline.page[i] = [];
		for(var j=0; j<stockData["L"+stockNo].timeline.point.length; j++){
			loadDataPriani.timeline.point[j] = stockData["L"+stockNo].timeline.point[j];
			loadDataPriani.timeline.pp[i][j] = stockData["L"+stockNo].timeline.pp[i][j];
			loadDataPriani.timeline.r[i][j] = stockData["L"+stockNo].timeline.r[i][j];
			loadDataPriani.timeline.sX[i][j] = stockData["L"+stockNo].timeline.sX[i][j];
			loadDataPriani.timeline.sY[i][j] = stockData["L"+stockNo].timeline.sY[i][j];
			loadDataPriani.timeline.tlX[i][j] = stockData["L"+stockNo].timeline.tlX[i][j];
			loadDataPriani.timeline.tlY[i][j] = stockData["L"+stockNo].timeline.tlY[i][j];
			loadDataPriani.timeline.al[i][j] = stockData["L"+stockNo].timeline.al[i][j];
			loadDataPriani.timeline.page[i][j] = stockData["L"+stockNo].timeline.page[i][j];
		}
	}
	
	if(initFrag){
		loadDataPriani.timeline.point = [0,0,0,0,0];
	}
	
	// パーツ画像ウィンドウとタイムラインウィンドウの表示更新
	partImgList();
	timelineList();
	
	// 静止画描写
	drawCanvasMaker(framePriani);
	
	// ログ表示・処理状況更新
	logPriani(mode+"しました。："+memo,"normal");
	upState("free");
}

// ☆：UNDO・REDO用にデータをコピーする（stockData）
function dataStock(memo){
	stockNo++;
	var nowLength = Object.keys(stockData).length
	for(var i=stockNo; i<=nowLength; i++){
		delete stockData["L"+i];
	}
	dataCopy("L"+stockNo);
	stockData["L"+stockNo].action = memo;
	stockData["L"+stockNo].frame = framePriani;
}

// ☆：アラート用ウィンドウを表示
function alertPop(message){
	var alertMessage = document.getElementById("alertMessage");
	alertMessage.innerHTML = message;
	alertWindow.style.left = (innerWidth-alertWindow.clientWidth)/2+"px";
	alertWindow.style.visibility = "visible";
}

// ☆：パーツ画像を選択する
function partSelect(partNo){
	
	if(partNo==-1){
		for(var i=0; i<loadDataPriani.src.length; i++){
			partSelectNo[i] = 0;
		}
		partImgList();
		timelineList();
		return;
	}
	
	if(partNo==-2){
		for(var i=0; i<loadDataPriani.src.length; i++){
			partSelectNo[i] = 1;
		}
		partImgList();
		timelineList();
		return;
	}
	
	if(partSelectNo[partNo] == 1){
		partSelectNo[partNo] = 0;
	}else{
		partSelectNo[partNo] = 1;
	}
	
	// パーツ画像ウィンドウとタイムラインウィンドウの表示更新
	partImgList();
	timelineList();
	
}

// ☆：キャンバスをドラッグ開始
function canvasDragStart(e){
	// アニメーション再生中であればキャンセル（ログ表示・リターン）
	if(aniNow == "on"){
		logPriani("＜E:canvasDragStart1＞現在アニメーションを再生中のためドラッグが使用できません。","error");
		return;
	}
	cvStartX = cvDragEvent.x;
	cvStartY = cvDragEvent.y;
	startX = [];
	startY = [];
	partSelectTF = 0;
	for(var i=0; i<loadDataPriani.src.length; i++){
		startX[i] = loadDataPriani.timeline.tlX[i][framePriani];
		startY[i] = loadDataPriani.timeline.tlY[i][framePriani];
		partSelectTF+=partSelectNo[i];
	}
	
}

// ☆：キャンバスをドラッグ中
function canvasDragMove(e){
	// アニメーション再生中であればキャンセル（リターン）
	if(aniNow == "on"){
		return;
	}
	
	// パーツ画像が選択されているか否かで処理を分岐（partSelectTFが0なら画像の選択なし、1以上なら画像の選択あり）
	if(partSelectTF>0){
		for(var i=0; i<loadDataPriani.src.length; i++){
		// 選択中のパーツの数値を変更する
			if(partSelectNo[i]==1){
				loadDataPriani.timeline.tlX[i][framePriani] = startX[i]+(cvStartX-cvDragEvent.x)*-1;
				loadDataPriani.timeline.tlY[i][framePriani] = startY[i]+(cvStartY-cvDragEvent.y)*-1;
			}
		}
	}else{
		for(var i=0; i<loadDataPriani.src.length; i++){
			loadDataPriani.timeline.tlX[i][framePriani] = startX[i]+(cvStartX-cvDragEvent.x)*-1;
			loadDataPriani.timeline.tlY[i][framePriani] = startY[i]+(cvStartY-cvDragEvent.y)*-1;
		}
	}
}

// ☆：◎キャンバスをドラッグ終了
function canvasDragEnd(e){
	// アニメーション再生中であればキャンセル（リターン）
	if(aniNow == "on"){
		return;
	}
	console.log("ドラッグ終了");
	
	// パーツ画像が選択されているか否かで処理を分岐（partSelectTFが0なら画像の選択なし、1以上なら画像の選択あり）
	if(partSelectTF>0){
		for(var i=0; i<loadDataPriani.src.length; i++){
		// 選択中のパーツの数値を変更する
			if(partSelectNo[i]==1){
				loadDataPriani.timeline.tlX[i][framePriani] = startX[i]+(cvStartX-cvDragEvent.x)*-1;
				loadDataPriani.timeline.tlY[i][framePriani] = startY[i]+(cvStartY-cvDragEvent.y)*-1;
				loadDataPriani.timeline.pp[i][framePriani] = 1;
				loadDataPriani.timeline.point[framePriani] = 1;
			}
		}
	}else{
		for(var i=0; i<loadDataPriani.src.length; i++){
			loadDataPriani.timeline.tlX[i][framePriani] = startX[i]+(cvStartX-cvDragEvent.x)*-1;
			loadDataPriani.timeline.tlY[i][framePriani] = startY[i]+(cvStartY-cvDragEvent.y)*-1;
			loadDataPriani.timeline.pp[i][framePriani] = 1;
			loadDataPriani.timeline.point[framePriani] = 1;
		}
	}

	// タイマー解除して静止画描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示更新
	timelineList();
	partImgList();
	
	// UNDO・REDO用にデータをストック
	dataStock("パーツ画像のドラッグ");
	
	// ログ表示
	logPriani("パーツ画像をドラッグしました。","normal");
}

// ☆：プレビューウィンドウの変形ボタン操作開始
function transButtonStart(e,mode,number){
	// アニメーション再生中であればキャンセル（ログ表示・リターン）
	if(aniNow == "on"){
		logPriani("＜E:transButtonStart1＞現在アニメーションを再生中のため変形ボタンが使用できません。","error");
		return;
	}
	
	buttonType = e.buttons;
	
	if(buttonType!=1){
		return;
	}
	
	partSelectTF = 0;
	for(var i=0; i<loadDataPriani.src.length; i++){
		partSelectTF += partSelectNo[i];
	}
	
	// タイマーbuttonTimerをセット
	if(partSelectTF > 0){
		buttonTimer = setInterval(function(){
			for(var i=0; i<loadDataPriani.src.length; i++){
				if(partSelectNo[i]==1){
					if(mode=="s"){
						loadDataPriani.timeline.sX[i][framePriani] += number;
						loadDataPriani.timeline.sY[i][framePriani] += number;
					}else{
						loadDataPriani.timeline[mode][i][framePriani] += number;
						if(loadDataPriani.timeline.al[i][framePriani]>1){loadDataPriani.timeline.al[i][framePriani]=1}
						if(loadDataPriani.timeline.al[i][framePriani]<0){loadDataPriani.timeline.al[i][framePriani]=0}
					}
					loadDataPriani.timeline.pp[i][framePriani] = 1;
					loadDataPriani.timeline.point[framePriani] = 1;
				}
			}
		},1000/8);
	}else{
		buttonTimer = setInterval(function(){
			for(var i=0; i<loadDataPriani.src.length; i++){
				if(mode=="s"){
					loadDataPriani.timeline.sX[i][framePriani] += number;
					loadDataPriani.timeline.sY[i][framePriani] += number;
				}else{
					loadDataPriani.timeline[mode][i][framePriani] += number;
					if(loadDataPriani.timeline.al[i][framePriani]>1){loadDataPriani.timeline.al[i][framePriani]=1}
					if(loadDataPriani.timeline.al[i][framePriani]<0){loadDataPriani.timeline.al[i][framePriani]=0}
				}
				loadDataPriani.timeline.pp[i][framePriani] = 1;
				loadDataPriani.timeline.point[framePriani] = 1;
			}
		},1000/8);
	}
	
}

// ☆：◎プレビューウィンドウの変形ボタン操作終了
function transButtonEnd(){
	// アニメーション再生中であればキャンセル（リターン）
	if(aniNow == "on"){
		return;
	}
	
	// タイマーbuttonTimer解除
	clearInterval(buttonTimer);
	
	// タイマー解除して静止画描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示更新
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の変形");
	
	// ログ表示
	logPriani("パーツ画像を変形しました。","normal");
	
}

// ☆：ストックデータの削除
function stockRefresh(){
	var dataList = Object.keys(stockData);
	
	for(var i=0; i<dataList.length; i++){
		delete stockData[dataList[i]];
	}
	
	stockNo = 0;
	dataCopy("L0");
	stockData["L0"].action = "データリフレッシュ";
	stockData["L0"].frame = framePriani;
}

// ☆：ヘルプウィンドウ表示
function helpView(mode){
	// help.jsのhelpWrite関数を使用して各ウィンドウ用のヘルプ内容のHTMLを生成する
	helpWrite(mode);
	
	//var helpMessage=document.getElementById("helpMessage");
	//helpMessage.innerHTML = helpHtml;
	//helpWindow.scrollTop = 0;
	//helpWindow.style.top = (innerHeight/10)+scrollY+"px";
	//helpWindow.style.left = (innerWidth-helpWindow.clientWidth)/2+"px";
	//helpWindow.style.visibility = "visible";
	//zindexReset();
	//helpWindow.style.zIndex = "20";
}

// ☆：オプションウィンドウの内容を適用する【フォームインプット】
function makerConfigInput(){
	// フォームの定義
	var configForm = document.getElementsByName("configForm");
	
	// データ書き出し時に自動でクリップボードにコピーするか否か
	if(document.configForm.radioDataExportTime.value == "on"){
		makerConfig.autocopy = true;
	}else{
		makerConfig.autocopy = false;
	}
	
	// ローカルストレージが使えればローカルストレージに保存する
	try{
		localStorage.setItem("PRIANI_CONFIG",JSON.stringify(makerConfig));
	}catch(e){}
	
	configWindow.style.visibility = "hidden";
}

// ★：◎簡易アニメーション補間する
function smoothingSimple(frameNo,partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:smoothingSimple1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が１枚もない時はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>簡易アニメーション補間を実行することができません。");
		upState("free");
		return;
	}
	
	// アニメーション補間する範囲を変数に格納する
	smoothingFrame = [];
	smoothingPart = [];
	
	if(selectFrame.length==0 && selectPart.length==0){
		smoothingFrame[0] = frameNo;
		smoothingPart[0] = partNo;
		if(smoothingPart[0] == -1){
			for(var i=0; i<loadDataPriani.src.length; i++){
				smoothingPart.push(i);
			}
			smoothingPart.shift();
		}
	}else{
		for(var i=0; i<selectFrame.length; i++){
			smoothingFrame[i] = selectFrame[i];
		}
		for(var j=0; j<selectPart.length; j++){
			smoothingPart[j] = selectPart[j];
		}
		if(smoothingPart[0]==-1){
			smoothingPart.shift();
		}
	}
	
	// 変形前のフレーム
	startF = smoothingFrame[0]-1;
	if(startF < 0){
		startF = 0;
	}
	
	// 変形後のフレーム
	endF = smoothingFrame[smoothingFrame.length-1]+1;
	if(endF >= loadDataPriani.timeline.point.length){
		endF = loadDataPriani.timeline.point.length-1;
	}
	
	var okState = ["r","sX","sY","tlX","tlY","al","page"];
	
	for(var i=0; i<smoothingFrame.length; i++){
		loadDataPriani.timeline.point[smoothingFrame[i]] = 1;
		for(var j=0; j<smoothingPart.length; j++){
			for(var k=0; k<okState.length; k++){
				// chvは変形後から変形前の数値を引いた値
				var chv = loadDataPriani.timeline[okState[k]][smoothingPart[j]][endF]-loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF];
				
				loadDataPriani.timeline.pp[smoothingPart[j]][smoothingFrame[i]] = 1;
				
					var x = smoothingFrame.length+1;
					var a = (1/(x*x))*-1;
					if(a>=0){a=a*-1}
					var b = Math.sqrt(-4*a);
					var y = (a * (i+1) * (i+1)) + (b * (i+1));
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				
				
			}
		}
	}
	
	if(smoothingFrame.length!=0 || smoothingPart.length!=0){
		smoothingFrame = [];
		smoothingPart = [];
		timelineList();
	}
	
	// タイムラインウィンドウ・パーツ画像ウィンドウの表示更新
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("簡易アニメーション補間");
	
	// ログ表示・処理状況更新
	logPriani("簡易アニメーション補間しました。","normal");
	upState("free");
}

// ☆：アニメーション補間ウィンドウの表示
function smoothingWindow(frameNo,partNo){
	
	// アニメーション補間する範囲を変数に格納する
	smoothingFrame = [];
	smoothingPart = [];
	
	if(selectFrame.length==0 && selectPart.length==0){
		smoothingFrame[0] = frameNo;
		smoothingPart[0] = partNo;
		if(smoothingPart[0] == -1){
			for(var i=0; i<loadDataPriani.src.length; i++){
				smoothingPart.push(i);
			}
			smoothingPart.shift();
		}
	}else{
		for(var i=0; i<selectFrame.length; i++){
			smoothingFrame[i] = selectFrame[i];
		}
		for(var j=0; j<selectPart.length; j++){
			smoothingPart[j] = selectPart[j];
		}
		if(smoothingPart[0]==-1){
			smoothingPart.shift();
		}
	}
	
	// 変形前のフレーム
	startF = smoothingFrame[0]-1;
	if(startF < 0){
		startF = 0;
	}
	
	// 変形後のフレーム
	endF = smoothingFrame[smoothingFrame.length-1]+1;
	if(endF >= loadDataPriani.timeline.point.length){
		endF = loadDataPriani.timeline.point.length-1;
	}
	
	var menucode = "<form name='smoothingForm'><b>アニメーション補間範囲</b><br>フレームNo："+smoothingFrame[0]+"～"+smoothingFrame[smoothingFrame.length-1]+"<br>パーツNo　："+smoothingPart[0]+"～"+smoothingPart[smoothingPart.length-1]+"<hr><b>アニメーション補間タイプ</b><br><label><input type='radio' name='smoothingType' value='normal' checked>等速</label>　<label><input type='radio' name='smoothingType' value='kasoku'>加速（遅→速）</label>　<label><input type='radio' name='smoothingType' value='gensoku'>減速（速→遅）</label><br><label><input type='radio' name='smoothingType' value='overkasoku'>オーバー加速（遅→速）</label><br><label><input type='radio' name='smoothingType' value='overgensoku'>オーバー減速（速→遅）</label><hr><b>参照フレーム</b><br>変形前フレーム：<input type='number' name='startFrame' style='width:50px'><br>変形後フレーム：<input type='number' name='endFrame' style='width:50px'><hr><b>アニメーション補間対象項目</b><br><label><input type='checkbox' name='smoothingState' value='sX' checked>拡縮X</label> <label><input type='checkbox' name='smoothingState' value='sY' checked>拡縮Y</label> <label><input type='checkbox' name='smoothingState' value='tlX' checked>移動距離X</label> <label><input type='checkbox' name='smoothingState' value='tlY' checked>移動距離Y</label><br><label><input type='checkbox' name='smoothingState' value='r' checked>回転角度</label> <label><input type='checkbox' name='smoothingState' value='al' checked>不透明度</label> <label><input type='checkbox' name='smoothingState' value='page' checked>表示ページ</label><br>　<br><input type='button' class='button1' value='アニメーション補間実行' onclick='smoothingGo();'>　<input type='button' class='button2' value='キャンセル' onclick='timelineEditWindowHidden();'></form>";
	var timelineEditDiv = document.getElementById("timelineEditDiv");
	var timelineEditTitle = document.getElementById("timelineEditTitle");
	timelineEditTitle.innerHTML = "アニメーション補間";
	timelineEditDiv.innerHTML = menucode;
	
	var smoothingForm = document.getElementsByName("smoothingForm");
	document.smoothingForm.startFrame.value = startF;
	document.smoothingForm.endFrame.value = endF;
	
	timelineEditWindow.style.top = 50 + scrollY + "px";
	timelineEditWindow.style.left = (innerWidth-timelineEditWindow.clientWidth)/2 + "px";
	timelineEditWindow.style.visibility = "visible";
	zindexReset();
	timelineEditWindow.style.zIndex = "20";
}

// ★：◎アニメーション補間実行【フォームインプット】
function smoothingGo(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:smoothingGo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が１枚もない時はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>アニメーション補間を実行することができません。");
		upState("free");
		return;
	}
	
	// アニメーション補間対象項目の把握
	var smoothingForm = document.getElementsByName("smoothingForm");
	okState = [];
	
	for(var i=0; i<7; i++){
		if(document.smoothingForm.smoothingState[i].checked==true){
			okState.push(document.smoothingForm.smoothingState[i].value);
		}
	}
	
	// アニメーション補間対象項目が無い場合はキャンセル（ログ表示・処理状況更新・リターン）
	if(okState.length==0){
		logPriani("＜E:smoothingGo2＞アニメーション補間対象項目が設定されていないのでアニメーション補間できません。","error");
		upState("free");
		return;
	}
	
	// フォームの未入力チェック（ログ表示・処理状況更新・リターン）
	if(document.smoothingForm.startFrame.value=="" || document.smoothingForm.endFrame.value==""){
		logPriani("＜E:smoothingGo3＞フォームが入力されていないのでアニメーション補間できません。","error");
		upState("free");
		return;
	}
	
	// フォームの内容をパースイントして変数に（パースイントしないと数値扱いじゃない時がある）
	var smoothingFrameStart = smoothingFrame[0];
	var smoothingFrameEnd = smoothingFrame[smoothingFrame.length-1];
	var smoothingPartStart = smoothingPart[0];
	var smoothingPartEnd = smoothingPart[smoothingPart.length-1];
	var startFrame = parseInt(document.smoothingForm.startFrame.value);
	var endFrame = parseInt(document.smoothingForm.endFrame.value);
	
	// 問題が無いかチェック
	// 参照フレームのチェック
	if(startFrame<0 || startFrame>=loadDataPriani.timeline.point.length){
		logPriani("＜E:smoothingGo4＞参照フレームの設定に問題がありアニメーション補間できません。","error");
		upState("free");
		return;
	}
	if(endFrame<0 || endFrame>=loadDataPriani.timeline.point.length){
		logPriani("＜E:smoothingGo5＞参照フレームの設定に問題がありアニメーション補間できません。","error");
		upState("free");
		return;
	}
	
	// 問題なければアニメーション補間を実行
	
	// アニメーション補間モードの把握
	var mode = document.smoothingForm.smoothingType.value;
	
	startF = startFrame;
	endF = endFrame;
	
	//アニメーション補間の計算＆代入
	for(var i=0; i<smoothingFrame.length; i++){
		loadDataPriani.timeline.point[smoothingFrame[i]] = 1;
		for(var j=0; j<smoothingPart.length; j++){
			for(var k=0; k<okState.length; k++){
				// chvは変形後から変形前の数値を引いた値
				var chv = loadDataPriani.timeline[okState[k]][smoothingPart[j]][endF]-loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF];
				
				loadDataPriani.timeline.pp[smoothingPart[j]][smoothingFrame[i]] = 1;
				
				// 等速モードの場合
				if(mode == "normal"){
					var a = 1/(smoothingFrame.length+1);
					var y = a * (i+1);
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				}
				
				// 加速モードの場合
				if(mode == "kasoku"){
					var x = smoothingFrame.length+1;
					var a = 1/(x*x);
					var y = a * (i+1) * (i+1);
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				}
				
				// 減速モードの場合
				if(mode == "gensoku"){
					var x = smoothingFrame.length+1;
					var a = (1/(x*x))*-1;
					if(a>=0){a=a*-1}
					var b = Math.sqrt(-4*a);
					var y = (a * (i+1) * (i+1)) + (b * (i+1));
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				}
				
				// オーバー加速モードの場合
				if(mode == "overkasoku"){
					var x = smoothingFrame.length-1;
					var a = 1/(x*x);
					var y = a * (i+1) * (i+1);
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				}
				
				// オーバー減速モードの場合
				if(mode == "overgensoku"){
					var x = smoothingFrame.length-1;
					var a = (1/(x*x))*-1;
					if(a>=0){a=a*-1}
					var b = Math.sqrt(-4*a);
					var y = (a * (i+1) * (i+1)) + (b * (i+1));
					loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y);
					if(okState[k]=="page"){
						loadDataPriani.timeline[okState[k]][smoothingPart[j]][smoothingFrame[i]] = Math.round(loadDataPriani.timeline[okState[k]][smoothingPart[j]][startF] + (chv*y));
					}
				}
			}
		}
	}
	
	// アニメーション補間実行後、アニメーション補間ウィンドウを閉じる
	timelineEditWindowHidden();
	
	// タイムラインウィンドウ・パーツ画像ウィンドウの表示更新
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("アニメーション補間");
	
	// ログ表示・処理状況更新
	if(mode == "normal"){
		logPriani("アニメーション補間（等速）しました。","normal");
	}else if(mode == "kasoku"){
		logPriani("アニメーション補間（加速）しました。","normal");
	}else if(mode == "gensoku"){
		logPriani("アニメーション補間（減速）しました。","normal");
	}else if(mode == "overkasoku"){
		logPriani("アニメーション補間（オーバー加速）しました。","normal");
	}else if(mode == "overgensoku"){
		logPriani("アニメーション補間（オーバー減速）しました。","normal");
	}
	
	upState("free");
	
}

// ☆：パーツ画像ウィンドウの設定画面をすべて開く・閉じる
function partAllDetails(mode){
	console.log(mode);
	// パーツ画像が1枚もない状態ではキャンセル（リターン）
	if(loadDataPriani.src.length<1){
		return;
	}
	
	// 設定画面の開閉を操作する
	try{
		for(var i=0; i<loadDataPriani.src.length; i++){
			var partSET = document.getElementById("partSET"+i);
			partSET.open = mode;
			detailsOpen[i] = mode;
		}
		
	}catch(e){
		
	}
}

// ★：◎パーツ画像の基本設定の変更を適用【フォームインプット】
function partImgSet2(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgSet21＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// オブジェクト定義
	var partFILENAME = document.getElementById("partFILENAME"+partNo);
	var partX = document.getElementById("partX"+partNo);
	var partY = document.getElementById("partY"+partNo);
	var partW = document.getElementById("partW"+partNo);
	var partH = document.getElementById("partH"+partNo);
	
	// 不正入力じゃないかチェック
	// 不正入力であれば、アラート表示・ログ表示・処理状況更新・リターン
	
	// チェック：すべて【未入力】
	if(partX.value=="" || partY.value=="" || partW.value=="" || partH.value=="" || partFILENAME.value==""){
		alertPop("エラー番号＜E:partImgSet22＞<br>入力されていない項目があります。");
		logPriani("＜E:partImgSet22＞入力されていない項目があります。","error");
		upState("free");
		return;
	}
	
	// チェック：XYWH【数値のみ】
	var px = parseFloat(partX.value);
	var py = parseFloat(partY.value);
	var pw = parseFloat(partW.value);
	var ph = parseFloat(partH.value);
	if(isNaN(px)==true || isNaN(py)==true || isNaN(pw)==true || isNaN(ph)==true){
		alertPop("エラー番号＜E:partImgSet23＞<br>入力内容が正しくない項目があります。");
		logPriani("＜E:partImgSet23＞入力内容が正しくない項目があります。","error");
		upState("free");
		return;
	}
	
	// チェック：WH【1以上の数値】
	if(pw<1 || ph<1){
		alertPop("エラー番号＜E:partImgSet24＞<br>サイズは1以上の数値を入力してください。");
		logPriani("＜E:partImgSet24＞サイズは1以上の数値を入力してください。","error");
		upState("free");
		return;
	}
	
	// チェックを通過したらloadDataPrianiに格納
	loadDataPriani.fileName[partNo] = partFILENAME.value;
	loadDataPriani.x[partNo] = parseFloat(partX.value);
	loadDataPriani.y[partNo] = parseFloat(partY.value);
	loadDataPriani.w[partNo] = parseFloat(partW.value);
	loadDataPriani.h[partNo] = parseFloat(partH.value);
	
	// タイマーを解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示をリセット
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の基本設定の変更");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像の基本設定を適用しました。："+loadDataPriani.fileName[partNo],"normal");
	upState("free");
}

// ☆：パーツ画像の差し替えウィンドウを表示
function partSrcChange(partNo){
	var partSrcChangeBefore = document.getElementById("partSrcChangeBefore");
	partSrcChangeBefore.value = partNo + "【"+loadDataPriani.fileName[partNo]+"】";
	partSrcChangeBeforeNo = partNo;
	
	partSrcChangeWindow.style.top = 50 + scrollY + "px";
	partSrcChangeWindow.style.left = (innerWidth-partSrcChangeWindow.clientWidth)/2 + "px";
	partSrcChangeWindow.style.visibility = "visible";
	zindexReset();
	partSrcChangeWindow.style.zIndex = "21";
}

// ★：◎パーツ画像の差し替えを実行
function partSrcChangeGo(){
	// 処理状況判定・処理状況更新・ログ表示
	if(nowState != "free"){
		logPriani("＜E:partSrcChangeGo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	logPriani("画像ファイル読み込み開始。","normal");
	
	// ファイルフォームからファイルを取得する
	partSrcChangefileInput = document.getElementById("partSrcChangefileInput");
	var file = partSrcChangefileInput.files[0];
	
	// キャンセル処理：ファイルが無ければキャンセル
	if(!file){
		logPriani("＜E:partSrcChangeGo2＞ファイルが選択されていません。","error");
		upState("free");
		return;
	}
	
	// キャンセル処理：ファイルがPNGやJPEG以外ならキャンセル
	if(file.type!="image/png" && file.type!="image/jpeg"){
		alertPop("エラー番号＜E:partSrcChangeGo3＞<br>未対応のファイル形式です。<br>（対応ファイル：PNGまたはJPEG）");
		logPriani("＜E:partSrcChangeGo3＞未対応のファイル形式です。（対応ファイル：PNGまたはJPEG）："+file.name,"error");
		upState("free");
		return;
	}
	
	// キャンセル処理：ファイルが3MB以上ならキャンセル
	if(file.size>3200000){
		alertPop("エラー番号＜E:partSrcChangeGo4＞<br>ファイルサイズが大きすぎます。<br>（最大3MBくらいまで）");
		logPriani("＜E:partSrcChangeGo4＞ファイルサイズが大きすぎます。（最大3MBくらいまで）："+file.name,"error");
		upState("free");
		return;
	}
	
	// ファイルリーダー定義
	var fileReader = new FileReader();
	
	// データURLとして読み終わった後の処理方法
	fileReader.onload = function(e){
		// ロードしたファイルを格納する番号を決める
		var fileNo = partSrcChangeBeforeNo;
		
		// 新しいimageオブジェクトを作ってロードファイルを代入
		var image = new Image();
		image.src = fileReader.result;
		
		// 新しく読み込んだパーツ画像はパーツ画像設定画面を開けておく
		detailsOpen[fileNo] = true;
		
		// loadDataPrianiに各種情報を代入していく
		loadDataPriani.src[fileNo] = image.src;
		loadDataPriani.fileName[fileNo] = file.name;
		loadDataPriani.w[fileNo] = loadDataPriani.cvWidth;
		loadDataPriani.h[fileNo] = loadDataPriani.cvHeight;
		loadDataPriani.x[fileNo] = loadDataPriani.cvWidth/2;
		loadDataPriani.y[fileNo] = loadDataPriani.cvHeight/2;
		
		image.onload = function(){
			
			loadDataPriani.w[fileNo] = image.width;
			loadDataPriani.h[fileNo] = image.height;
			
			// タイマーを解除して静止画を描写する
			aniNow = "off";
			clearInterval(timerPriani);
			drawCanvasMaker(framePriani);
		
			// パーツ画像ウィンドウの表示更新
			partImgList();
			
			// タイムラインウィンドウの表示更新
			timelineList();
			
			// UNDO・REDO用のデータをストック
			dataStock("パーツ画像の差し替え");
		
			// ログ表示・処理状況更新
			logPriani("パーツ画像の差し替え完了："+file.name,"normal");
			upState("free");
			partSrcChangeWindow.style.visibility = "hidden";
		}
		
	};
	
	// データURLとして読み込む
	fileReader.readAsDataURL(file);
}

// ★：◎パーツ画像ウィンドウからタイムライン設定の変更を適用（選択されている画像全て）【フォームインプット】
function partImgSet3(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgSet31＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// オブジェクト定義
	var partSX = document.getElementById("partSX"+partNo);
	var partSY = document.getElementById("partSY"+partNo);
	var partTLX = document.getElementById("partTLX"+partNo);
	var partTLY = document.getElementById("partTLY"+partNo);
	var partR = document.getElementById("partR"+partNo);
	var partAL = document.getElementById("partAL"+partNo);
	var partPAGE = document.getElementById("partPAGE"+partNo);
	
	// チェック：全て【未入力、数値のみ】
	if(partSX.value=="" || partSY.value=="" || partTLX.value=="" || partTLY.value=="" || partR.value=="" || partAL.value=="" || partPAGE.value==""){
		alertPop("エラー番号＜E:partImgSet32＞<br>入力されていない項目があります。");
		logPriani("＜E:partImgSet32＞入力されていない項目があります。","error");
		upState("free");
		return;
	}
	var sx = parseFloat(partSX.value);
	var sy = parseFloat(partSY.value);
	var tlx = parseFloat(partTLX.value);
	var tly = parseFloat(partTLY.value);
	var r = parseFloat(partR.value);
	var al = parseFloat(partAL.value);
	var page = parseInt(partPAGE.value);
	if(isNaN(sx)==true || isNaN(sy)==true || isNaN(tlx)==true || isNaN(tly)==true || isNaN(r)==true || isNaN(al)==true || isNaN(page)==true){
		alertPop("エラー番号＜E:partImgSet33＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:partImgSet33＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	
	// チェック：不透明度【0以上1以下】
	if(al>1 || al<0){
		alertPop("エラー番号＜E:partImgSet34＞<br>不透明度は0以上1以下の数値で入力してください。<br>※0で完全に透明、1で完全に不透明です。");
		logPriani("＜E:partImgSet34＞不透明度は0以上1以下の数値で入力してください。","error");
		upState("free");
		return;
	}
	
	// チェック：ページ【0以上】
	if(page<0){
		alertPop("エラー番号＜E:partImgSet35＞<br>表示ページは0以上の数値で入力してください。");
		logPriani("＜E:partImgSet35＞表示ページは0以上の数値で入力してください。","error");
		upState("free");
		return;
	}
	
	partSelectTF = 0;
	
	for(var i=0; i<loadDataPriani.src.length; i++){
		if(partSelectNo[i]==true){
			loadDataPriani.timeline.r[i][framePriani] = parseFloat(partR.value);
			loadDataPriani.timeline.sX[i][framePriani] = parseFloat(partSX.value);
			loadDataPriani.timeline.sY[i][framePriani] = parseFloat(partSY.value);
			loadDataPriani.timeline.tlX[i][framePriani] = parseInt(partTLX.value);
			loadDataPriani.timeline.tlY[i][framePriani] = parseInt(partTLY.value);
			loadDataPriani.timeline.al[i][framePriani] = parseFloat(partAL.value);
			loadDataPriani.timeline.page[i][framePriani] = parseInt(partPAGE.value);
			if(loadDataPriani.timeline.point[framePriani]!=2 && loadDataPriani.timeline.point[framePriani]!=3){loadDataPriani.timeline.point[framePriani] = 1;}
			loadDataPriani.timeline.pp[i][framePriani] = 1;
			partSelectTF++;
		}
	}
	
	// もし画像が選択されていなければ、該当パーツのみ適用
	if(partSelectTF<1){
		loadDataPriani.timeline.r[partNo][framePriani] = parseFloat(partR.value);
		loadDataPriani.timeline.sX[partNo][framePriani] = parseFloat(partSX.value);
		loadDataPriani.timeline.sY[partNo][framePriani] = parseFloat(partSY.value);
		loadDataPriani.timeline.tlX[partNo][framePriani] = parseInt(partTLX.value);
		loadDataPriani.timeline.tlY[partNo][framePriani] = parseInt(partTLY.value);
		loadDataPriani.timeline.al[partNo][framePriani] = parseFloat(partAL.value);
		loadDataPriani.timeline.page[partNo][framePriani] = parseInt(partPAGE.value);
		if(loadDataPriani.timeline.point[framePriani]!=2 && loadDataPriani.timeline.point[framePriani]!=3){loadDataPriani.timeline.point[framePriani] = 1;}
		loadDataPriani.timeline.pp[partNo][framePriani] = 1;
	}
	
	// タイマーを解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示をリセット
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像のタイムライン設定の変更");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像のタイムライン設定を適用しました。","normal");
	upState("free");
}

// ★：◎パーツ画像のタイムライン設定を左右反転させる【フォームインプット】
function partRightLeft(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partRightLeft1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	var partTLX = document.getElementById("partTLX"+partNo);
	var partR = document.getElementById("partR"+partNo);
	
	// 入力チェック
	if(partTLX.value=="" || partR.value==""){
		alertPop("エラー番号＜E:partRightLeft2＞<br>入力されていない項目があります。");
		logPriani("＜E:partRightLeft2＞入力されていない項目があります。","error");
		upState("free");
		return;
	}
	var tlx = partTLX.value;
	var r = partR.value;
	if(isNaN(tlx)==true || isNaN(r)==true){
		alertPop("エラー番号＜E:partRightLeft3＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:partRightLeft3＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	
	partTLX.value = partTLX.value*(-1);
	partR.value = partR.value*(-1);
	
	loadDataPriani.timeline.tlX[partNo][framePriani] = parseInt(partTLX.value);
	loadDataPriani.timeline.r[partNo][framePriani] = parseFloat(partR.value);
	
	// タイマーを解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示をリセット
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像のタイムライン設定の左右反転");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像のタイムライン設定を左右反転しました。："+loadDataPriani.fileName[partNo],"normal");
	upState("free");
}

// ☆：ウィンドウを整列させる
function windowOrderGo(mode){
	alertConfirmWindow.style.visibility = "hidden";
	
	zindexReset();
	
	var s = canvasScaleSelect.value;
	if(s<1){s=1;}
	var cvww = (loadDataPriani.cvWidth * s) + 40;
	var cvwh = (loadDataPriani.cvHeight * s) + 180;
	if(cvww<540){cvww = 540;}
	if(cvwh<250){cvwh = 250;}
	
	var space=document.getElementById("canvasSpace");
	var h = loadDataPriani.cvHeight*canvasScaleSelect.value-loadDataPriani.cvHeight;
	if(h<0){h=0}
	space.style.height = h + "px";
		
	canvasWindow.style.width = cvww + "px";
	canvasWindow.style.height = cvwh + "px";
	
	canvasWindow.style.left = "5px";
	canvasWindow.style.top = "80px";
	
	if(mode=="canvasOnly"){return;}
	
	partWindow.style.left = canvasWindow.clientWidth + 30 +"px";
	partWindow.style.top = "80px";
	
	timelineWindow.style.left = "5px";
	timelineWindow.style.top = canvasWindow.clientHeight + 105 + "px";
	
	if(logSetButton.value=="下に固定"){
		logWindow.style.left = "5px";
		logWindow.style.top = canvasWindow.clientHeight + 105 + timelineWindow.clientHeight + 25 + "px";
	}
	
	helpWindow.style.visibility = "hidden";
	alertWindow.style.visibility = "hidden";
	partSrcChangeWindow.style.visibility = "hidden";
	timelineMenuWindow.style.visibility = "hidden";
	timelineEditWindow.style.visibility = "hidden";
	basicWindow.style.visibility = "hidden";
	dataWindow.style.visibility = "hidden";
	exportJSONWindow.style.visibility = "hidden";
	configWindow.style.visibility = "hidden";

}

// ☆：タイムライン設定の編集ウィンドウの表示
function timelineSettingWindow(frameNo,partNo){
	
	// タイムライン設定を編集する範囲を示す配列
	settingFrame = [];
	settingPart = [];
	
	// settingFrameとsettingPartにコピーする範囲を定義する
	if(selectFrame.length==0 && selectPart.length==0){
		// 範囲選択ではない場合
		settingFrame[0] = frameNo;
		settingPart[0] = partNo;
		if(settingPart[0] == -1){
			for(var i=0; i<loadDataPriani.src.length; i++){
				settingPart.push(i);
			}
			settingPart.shift();
		}
	}else{
		// 範囲選択の場合
		for(var i=0; i<selectFrame.length; i++){
			settingFrame[i] = selectFrame[i];
		}
		for(var j=0; j<selectPart.length; j++){
			settingPart[j] = selectPart[j];
		}
		if(settingPart[0]==-1){
			settingPart.shift();
		}
	}
	
	// HTMLコード
	var menucode = "<form name='timelineSettingForm'><b>編集範囲</b><br>フレームNo："+settingFrame[0]+"～"+settingFrame[settingFrame.length-1]+"<br>パーツNo　："+settingPart[0]+"～"+settingPart[settingPart.length-1]+"<hr><b>タイムライン設定</b><br>拡縮　　　：X:<input type='text' name='sX' size='4'> / Y:<input type='text' name='sY' size='4'><br>移動　　　：X:<input type='text' name='tlX' size='4'> / Y:<input type='text' name='tlY' size='4'><br>回転　　　：<input type='text' name='r' size='4'><br>不透明度　：<input type='text' name='al' size='4'><br>表示ページ：<input type='text' name='page' size='4'><p style='text-align: center;'><input type='button' class='button1' value='代入する' onclick='timelineSettingGo(1);'>　<input type='button' class='button1' value='加算する' onclick='timelineSettingGo(2);'></p><p style='text-align: center;'><input type='button' class='button2' value='キャンセル' onclick='timelineEditWindowHidden();'></p></form>";
	var timelineEditDiv = document.getElementById("timelineEditDiv");
	var timelineEditTitle = document.getElementById("timelineEditTitle");
	timelineEditTitle.innerHTML = "タイムライン設定の編集";
	timelineEditDiv.innerHTML = menucode;
	
	// タイムライン設定の編集ウィンドウの表示
	timelineEditWindow.style.top = 50 + scrollY + "px";
	timelineEditWindow.style.left = (innerWidth-timelineEditWindow.clientWidth)/2 + "px";
	timelineEditWindow.style.visibility = "visible";
	zindexReset();
	timelineEditWindow.style.zIndex = "20";
}

// ★：◎タイムライン設定の編集ウィンドウから設定変更を実行【フォームインプット】
function timelineSettingGo(mode){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:timelineSettingGo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// パーツ画像が１枚もない時はキャンセル（アラート表示・処理状況更新・リターン）
	if(loadDataPriani.src.length<1){
		alertPop("ごめんなさい。<br>パーツ画像が1枚もない状態ですと、<br>タイムライン設定の編集を実行することができません。");
		upState("free");
		return;
	}	
	
	// フォーム入力チェック
	var sx = parseFloat(document.timelineSettingForm.sX.value);
	var sy = parseFloat(document.timelineSettingForm.sY.value);
	var tlx = parseFloat(document.timelineSettingForm.tlX.value);
	var tly = parseFloat(document.timelineSettingForm.tlY.value);
	var r = parseFloat(document.timelineSettingForm.r.value);
	var al = parseFloat(document.timelineSettingForm.al.value);
	var page = parseInt(document.timelineSettingForm.page.value);
	if(isNaN(sx)==true && document.timelineSettingForm.sX.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo2＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo2＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(sy)==true && document.timelineSettingForm.sY.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo3＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo3＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(tlx)==true && document.timelineSettingForm.tlX.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo4＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo4＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(tly)==true && document.timelineSettingForm.tlY.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo5＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo5＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(r)==true && document.timelineSettingForm.r.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo6＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo6＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(al)==true && document.timelineSettingForm.al.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo7＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo7＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	if(isNaN(page)==true && document.timelineSettingForm.page.value!=""){
		alertPop("エラー番号＜E:timelineSettingGo8＞<br>タイムライン設定は数値で入力してください。");
		logPriani("＜E:timelineSettingGo8＞タイムライン設定は数値で入力してください。","error");
		upState("free");
		return;
	}
	
	
	// 代入の場合
	if(mode==1){
		for(var i=0; i<settingFrame.length; i++){
			if(loadDataPriani.timeline.point[settingFrame[i]]!=2 && loadDataPriani.timeline.point[settingFrame[i]]!=3){loadDataPriani.timeline.point[settingFrame[i]] = 1;}
			for(var j=0; j<settingPart.length; j++){
				loadDataPriani.timeline.pp[settingPart[j]][settingFrame[i]] = 1;
				if(document.timelineSettingForm.sX.value!=""){
					loadDataPriani.timeline.sX[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.sX.value);
				}
				if(document.timelineSettingForm.sY.value!=""){
					loadDataPriani.timeline.sY[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.sY.value);
				}
				if(document.timelineSettingForm.tlX.value!=""){
					loadDataPriani.timeline.tlX[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.tlX.value);
				}
				if(document.timelineSettingForm.tlY.value!=""){
					loadDataPriani.timeline.tlY[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.tlY.value);
				}
				if(document.timelineSettingForm.r.value!=""){
					loadDataPriani.timeline.r[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.r.value);
				}
				if(document.timelineSettingForm.al.value!=""){
					loadDataPriani.timeline.al[settingPart[j]][settingFrame[i]] = parseFloat(document.timelineSettingForm.al.value);
				}
				if(document.timelineSettingForm.page.value!=""){
					loadDataPriani.timeline.page[settingPart[j]][settingFrame[i]] = parseInt(document.timelineSettingForm.page.value);
				}
			}
		}
	}
	
	// 加算の場合
	if(mode==2){
		for(var i=0; i<settingFrame.length; i++){
			if(loadDataPriani.timeline.point[settingFrame[i]]!=2 && loadDataPriani.timeline.point[settingFrame[i]]!=3){loadDataPriani.timeline.point[settingFrame[i]] = 1;}
			for(var j=0; j<settingPart.length; j++){
				loadDataPriani.timeline.pp[settingPart[j]][settingFrame[i]] = 1;
				if(document.timelineSettingForm.sX.value!=""){
					loadDataPriani.timeline.sX[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.sX.value);
				}
				if(document.timelineSettingForm.sY.value!=""){
					loadDataPriani.timeline.sY[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.sY.value);
				}
				if(document.timelineSettingForm.tlX.value!=""){
					loadDataPriani.timeline.tlX[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.tlX.value);
				}
				if(document.timelineSettingForm.tlY.value!=""){
					loadDataPriani.timeline.tlY[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.tlY.value);
				}
				if(document.timelineSettingForm.r.value!=""){
					loadDataPriani.timeline.r[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.r.value);
				}
				if(document.timelineSettingForm.al.value!=""){
					loadDataPriani.timeline.al[settingPart[j]][settingFrame[i]] += parseFloat(document.timelineSettingForm.al.value);
				}
				if(document.timelineSettingForm.page.value!=""){
					loadDataPriani.timeline.page[settingPart[j]][settingFrame[i]] += parseInt(document.timelineSettingForm.page.value);
				}
			}
		}
	}
	
	// タイムライン編集ウィンドウを消してsettingFrameやsettingPartを消す
	timelineEditWindowHidden();
	
	// タイムラインウィンドウ・パーツ画像ウィンドウの表示更新
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("タイムライン設定の編集");
	
	// ログ表示・処理状況更新
	logPriani("タイムライン設定の変更を適用しました。","normal");
	upState("free");
}

// ☆：タイムライン編集ウィンドウを隠す
function timelineEditWindowHidden(){
	timelineEditWindow.style.visibility = "hidden";
	if(settingFrame.length!=0 || settingPart.length!=0){
		settingFrame = [];
		settingPart = [];
		timelineList();
	}
	if(smoothingFrame.length!=0 || smoothingPart.length!=0){
		smoothingFrame = [];
		smoothingPart = [];
		timelineList();
	}
}

// ☆：JSONファイルを結合する
function bondJSON(){
	try{
		var outputJSON = "";
		var outputType = "";
		
		if(editJSONTypeSelect.value == "ティラノスクリプト"){
			outputType = 'TYRANO.kag.stat.f.PRIANI.dataPriani[\"';
		}else{
			outputType = 'dataPriani[\"';
		}
		
		for(var key in renData){
			var editJSONid = document.getElementById("editJSONid_"+key);
			var editJSONdir = document.getElementById("editJSONdir_"+key);
			
			var outKey = editJSONid.value;
			var outDir = editJSONdir.value;
			
			var newidtag = '"id":"'+outKey+'"';
			var newdirtag = '"dir":"'+outDir+'"';
			
			renData[key] = renData[key].replace(/\"id\"\:\"\w+\"/,newidtag);
			renData[key] = renData[key].replace(/\"dir\"\:\"\w+\"/,newdirtag);
			
			outputJSON += outputType + outKey + '\"]=' + renData[key] + "\n\n";
		}
		
		editJSONExportText.value = outputJSON;
		
	}catch(e){
		logPriani("＜E:bondJSON1＞JSONファイル結合時にエラーが発生しました。","error");
		return;
	}
}

// ★：編集するためにJSONファイルを読み込む
function readFileJSON(){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:readFileJSON1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	
	var fileNum = editJSONFileInput.files.length;
	var loadNum = 0;
	var listHTML = "";
	var filelist = "<strong>読み込んだファイル</strong>（"+fileNum+"件）<br>";
	var jsonData = [];
	
	if(!editJSONFileInput.files[0]){
		logPriani("＜E:readFileJSON2＞ファイルが選択されていません。","error");
		upState("free");
		return;
	}
	
	for(var i=0; i<fileNum; i++){
		var file = editJSONFileInput.files[i];
		
		filelist += file.name + "<br>";
		
		var fileReader = new FileReader();
		
		fileReader.onload = function(event){
			var checkEnd = checkJSON(this.result);
			if(checkEnd=="だめ"){
				alertPop("エラー番号＜E:readFileJSON3＞<br>読み込めないファイルが含まれています。");
				logPriani("＜E:readFileJSON3＞読み込めないファイルが含まれています。","error");
				upState("free");
				return;
			}
			
			jsonData[loadNum] = this.result;
			loadNum++;
			
			// 全部読み込み終わったら
			if(loadNum>=fileNum){
				alldata = jsonData.join("");
				
				alldata = alldata.replace(/\s+/g,"");
				
				kdataID = [];
				renData = {};
				renDataDir = {};
				
				kdataID=alldata.match(/dataPriani\[\"\w+\"\]/g);
				
				for(var i=0; i<kdataID.length; i++){
					kdataID[i] = kdataID[i].replace(/dataPriani\[\"/,"");
					kdataID[i] = kdataID[i].replace(/\"\]/,"");
					
					alldata = alldata.replace(/TYRANO\.kag\.stat\.f\.PRIANI\./g,'');
					alldata = alldata.replace(/dataPriani\[\"\w+\"\]=/g,"★");
					
					var bundata = alldata.split("★");
					
					if(bundata[0]==""){
						bundata.shift();
					}
					
					renData[kdataID[i]] = bundata[i];
					
					renDataDir[kdataID[i]] = renData[kdataID[i]].match(/\"dir\"\:\"[\w|\/|\.]+\"/);
					renDataDir[kdataID[i]] = renDataDir[kdataID[i]][0].replace(/\"dir\"\:\"/,"");
					renDataDir[kdataID[i]] = renDataDir[kdataID[i]].replace(/\"/,"");
				}
				
				listHTML = "<strong>読み込んだデータ</strong>（"+Object.keys(renData).length+"件）<br>";
				
				for(var key in renData){
					var partjsonlist = renData[key].match(/\"src\"\:\[[\w|\"|\.|\,]+\]/);
					partjsonlist = partjsonlist[0].replace(/\"src\"\:/,"");
					var viewjsonbutton = 'editViewJSON("'+key+'");'
					
					listHTML += "ぷりアニデータID：<input id='editJSONid_"+key+"' type='text' size='12' value='"+key+"'><br>フォルダ：<input id='editJSONdir_"+key+"' type='text' size='12' value='"+renDataDir[key]+"'><br>パーツ画像："+partjsonlist+"<br><input type='button' value='表示' onclick='"+ viewjsonbutton +"'><hr>";
				}
				
				listHTML += filelist;
				
				editJSONList.innerHTML = listHTML;
				upState("free");
			}
			
		}
		
		fileReader.readAsText(file);
		
	}
	
	
}

// ☆：編集用のJSONファイルをチェックする
function checkJSON(data){
	var kekka = "審議中";
	
	try{
		data = data.replace(/\s+/g,"");
		var henkandata = data;
		henkandata = henkandata.replace(/TYRANO\.kag\.stat\.f\.PRIANI\./g,'');
		henkandata = henkandata.replace(/dataPriani\[\"\w+\"\]=/g,"★");
		var kakudeta = henkandata.split("★");
		if(kakudeta[0]==""){
			kakudeta.shift();
		}
		
		for(var i=0; i<kakudeta.length; i++){
			try{
				var ddd = JSON.parse(kakudeta[i]);
			}catch(e){
				kekka = "だめ";
			}
		}
		
	}catch(e){
		kekka = "だめ";
	}
	
	return kekka;
}

// ☆：読み込んだJSONの一部のみ表示する
function editViewJSON(key){
	var outputJSON = "";
	
	var outputJSON = "";
	var outputType = "";
		
	if(editJSONTypeSelect.value == "ティラノスクリプト"){
		outputType = 'TYRANO.kag.stat.f.PRIANI.dataPriani[\"';
	}else{
		outputType = 'dataPriani[\"';
	}

	var editJSONid = document.getElementById("editJSONid_"+key);
	var editJSONdir = document.getElementById("editJSONdir_"+key);
			
	var outKey = editJSONid.value;
	var outDir = editJSONdir.value;
			
	var newidtag = '"id":"'+outKey+'"';
	var newdirtag = '"dir":"'+outDir+'"';
	
	renData[key] = renData[key].replace(/\"id\"\:\"\w+\"/,newidtag);
	renData[key] = renData[key].replace(/\"dir\"\:\"\w+\"/,newdirtag);
			
	outputJSON += outputType + outKey + '\"]=' + renData[key] + "\n\n";
	
	editJSONExportText.value = outputJSON;
}

// ★：◎パーツ画像の基本設定の表示位置の変更を適用（選択されている画像全て）【フォームインプット】
function partImgSet4(partNo){
	// 処理状況判定・処理状況更新
	if(nowState != "free"){
		logPriani("＜E:partImgSet41＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	// オブジェクト定義
	var partX = document.getElementById("partX"+partNo);
	var partY = document.getElementById("partY"+partNo);
	
	// 不正入力じゃないかチェック
	// 不正入力であれば、アラート表示・ログ表示・処理状況更新・リターン
	
	// チェック：すべて【未入力】
	if(partX.value=="" || partY.value==""){
		alertPop("エラー番号＜E:partImgSet42＞<br>入力されていない項目があります。");
		logPriani("＜E:partImgSet42＞入力されていない項目があります。","error");
		upState("free");
		return;
	}
	
	// チェック：XYWH【数値のみ】
	var px = parseFloat(partX.value);
	var py = parseFloat(partY.value);
	if(isNaN(px)==true || isNaN(py)==true){
		alertPop("エラー番号＜E:partImgSet43＞<br>入力内容が正しくない項目があります。");
		logPriani("＜E:partImgSet43＞入力内容が正しくない項目があります。","error");
		upState("free");
		return;
	}
	
	partSelectTF = 0;
	
	for(var i=0; i<loadDataPriani.src.length; i++){
		if(partSelectNo[i] == true){
			loadDataPriani.x[i] = parseFloat(partX.value);
			loadDataPriani.y[i] = parseFloat(partY.value);
			partSelectTF++;
		}
	}
	
	if(partSelectTF<1){
		loadDataPriani.x[partNo] = parseFloat(partX.value);
		loadDataPriani.y[partNo] = parseFloat(partY.value);
	}
	
	
	// タイマーを解除して静止画を描写
	aniNow = "off";
	clearInterval(timerPriani);
	drawCanvasMaker(framePriani);
	
	// タイムラインウィンドウとパーツ画像ウィンドウの表示をリセット
	timelineList();
	partImgList();
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の基本設定の変更");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像の基本設定を適用しました。","normal");
	upState("free");
}

// ★：◎JSONデータの読み込み
function dataInport2(){
	// 処理状況判定・処理状況更新・ログ表示
	if(nowState != "free"){
		logPriani("＜E:dataInport21＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	logPriani("JSONデータをぷりアニデータとして読み込み開始。","normal");
	
	if(!inportJSONFileInput.files[0]){
		logPriani("＜E:dataInport22＞ファイルが選択されていません。","error");
		upState("free");
		return;
	}
	
	var file = inportJSONFileInput.files[0];
	var fileReader = new FileReader();
	jsonDataIn = "";
	fileReader.onload = function(event){
		var checkEnd = checkJSON(fileReader.result);
		if(checkEnd=="だめ"){
			alertPop("エラー番号＜E:dataInport23＞<br>読み込めないファイルです。");
			logPriani("＜E:dataInport23＞読み込めないファイルです。","error");
			upState("free");
			return;
		}
		jsonDataIn = fileReader.result;
		
		jsonDataIn = jsonDataIn.replace(/\s+/g,"");
		jsonDataIn = jsonDataIn.replace(/TYRANO\.kag\.stat\.f\.PRIANI\./g,'');
		jsonDataIn = jsonDataIn.replace(/dataPriani\[\"\w+\"\]=/g,"★");
		
		var bundata = jsonDataIn.split("★");
		if(bundata[0]==""){
			bundata.shift();
		}
		
		jsonDataIn = bundata[0];
		
		try{
			loadDataPriani = JSON.parse(jsonDataIn);
			for(var i=0; i<loadDataPriani.src.length; i++){
				loadDataPriani.src[i] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAG3RFWHRTb2Z0d2FyZQBDZWxzeXMgU3R1ZGlvIFRvb2zBp+F8AAAADUlEQVQI12P8//8/AwAJAQL/J9PY0AAAAABJRU5ErkJggg==";
			}
		}catch(e){
			alertPop("エラー番号＜E:dataInport24＞<br>読み込めないファイルです。");
			logPriani("＜E:dataInport24＞読み込めないファイルです。","error");
			upState("free");
			return;
		}
		
		
		
		// タイマーを解除して静止画を描写する
		aniNow = "off";
		clearInterval(timerPriani);
		for (var i=0; i<loadDataPriani.src.length; i++){
			var image = new Image();
			image.src = loadDataPriani.src[i];
			drawCanvasMaker(0);
		}
	
		// ぷりアニデータ読み込み時は、パーツ画像設定画面を全て閉じておく
		for(var j=0; j<loadDataPriani.src.length; j++){
			detailsOpen[j] = false;
		}
	
		// パーツ画像ウィンドウとタイムラインウィンドウの表示をリセット
		partImgList();
		timelineList();
	
		// 「ぷりアニデータの読み込み/書き出しウィンドウ」を非表示にしておく
		inportJSONWindow.style.visibility = "hidden";
	
		// ウィンドウの整列
		windowOrderGo();
	
		fpsText.value = loadDataPriani.fps;
	
		// UNDO・REDO用のデータをストック
		dataStock("JSONデータをぷりアニデータとして読み込み");
	
		// ログ表示・処理状況更新
		logPriani("JSONデータをぷりアニデータとして読み込み完了。","normal");
		upState("free");
		
		
	};
	
	fileReader.readAsText(file);
	
}

// ☆：パーツ画像の回転軸を設定する
function axisEdit(partNo){
	axisNo = partNo;
	axisX = loadDataPriani.aX[partNo];
	axisY = loadDataPriani.aY[partNo];
	
	axisCanvas = document.getElementById("axisCanvas");
	axisCanvas.width = loadDataPriani.w[axisNo];
	axisCanvas.height = loadDataPriani.h[axisNo];
	
	axisCon = axisCanvas.getContext("2d");
	
	aXText = document.getElementById("aXText");
	aYText = document.getElementById("aYText");
	aXText.value = axisX;
	aYText.value = axisY;
	
	axisCanvasDraw();
	
	axisCanvas.onclick = function(e){
		axisX = e.offsetX;
		axisY = e.offsetY;
		aXText.value = axisX;
		aYText.value = axisY;
		axisCanvasDraw();
	}
	
	axisEditWindow.style.top = 50+scrollY+"px";
	axisEditWindow.style.left = "110px";
	axisEditWindow.style.visibility = "visible";
	zindexReset();
	axisEditWindow.style.zIndex = "20";
}

// ☆：パーツ画像の回転軸を画像の中心に設定する
function axisEditCenter(){
	axisX = loadDataPriani.w[axisNo]/2;
	axisY = loadDataPriani.h[axisNo]/2;
	aXText.value = axisX;
	aYText.value = axisY;
	axisCanvasDraw();
}

// ☆：パーツ画像の回転軸をテキストフォームのものに変更する
function axisEditChange(){
	var testX = parseInt(aXText.value);
	var testY = parseInt(aYText.value);
	
	if(testX<0){
		testX = 0;
	}
	if(testY<0){
		testY = 0;
	}
	if(testX > loadDataPriani.w[axisNo]){
		testX = loadDataPriani.w[axisNo];
	}
	if(testY > loadDataPriani.h[axisNo]){
		testY = loadDataPriani.h[axisNo];
	}
	
	axisX = testX;
	axisY = testY;
	aXText.value = axisX;
	aYText.value = axisY;
	axisCanvasDraw();
}

// ☆：パーツ画像の回転軸設定用のキャンバスを描写
function axisCanvasDraw(){
	axisCon.clearRect(0,0,loadDataPriani.w[axisNo],loadDataPriani.h[axisNo]);
	
	var pic = new Image();
	pic.src = loadDataPriani.src[axisNo];
	pic.onload = function(){
		axisCon.save();
		axisCon.drawImage(pic,0,0);
		axisCon.restore();
	}
	
	var pointer = new Image();
	pointer.src = "img/axis.png";
	pointer.onload = function(){
		axisCon.save();
		axisCon.drawImage(pointer,axisX-10,axisY-10);
		axisCon.restore();
	}
}

// ★：◎パーツ画像の回転軸の変更を適用する
function axisEditGo(){
	// 処理状況判定・処理状況更新・ログ表示
	if(nowState != "free"){
		logPriani("＜E:axisEditGo1＞現在、他の処理をしています。","error");
		return;
	}
	upState("busy");
	
	axisEditChange();
	
	loadDataPriani.aX[axisNo] = axisX;
	loadDataPriani.aY[axisNo] = axisY;
	
	axisEditWindow.style.visibility = "hidden";
	
	// UNDO・REDO用のデータをストック
	dataStock("パーツ画像の回転軸の変更を適用");
	
	// ログ表示・処理状況更新
	logPriani("パーツ画像の回転軸の変更を適用。","normal");
	upState("free");
}

// ☆：◎タイムラインの●の色を変える
function timelineMaruChange(fno){
	loadDataPriani.timeline.point[fno] += 1;
	if(loadDataPriani.timeline.point[fno] >= 4){
		loadDataPriani.timeline.point[fno] = 1;
	}
	timelineList();
	
	// UNDO・REDO用のデータをストック
	dataStock("タイムラインの丸の色変更");
	
	// ログ表示
	logPriani("タイムラインの丸の色を変更しました。","normal");
}

// ☆：スプライト画像を書き出す
function spriteExport(){
	var spriteWidthText	= document.getElementById("spriteWidthText");
	var spriteWidth		= Math.floor(spriteWidthText.value);
	
	if(spriteWidth >= 1 && spriteWidth <= 50 && loadDataPriani.timeline.point.length >= 1){
		spriteExportCanvas	= document.getElementById("spriteExportCanvas");
		spriteExportCanvas.width	= loadDataPriani.cvWidth * spriteWidth;
		spriteExportCanvas.height	= loadDataPriani.cvHeight * (Math.ceil(loadDataPriani.timeline.point.length/spriteWidth));
		spriteCtx			= spriteExportCanvas.getContext("2d");
		
		// 読み込み用の配列と数値用の変数を定義
		imgPriani = [];
		loadImgPriani = 0;
		
		//　画像を読み込む
		for(var i=0; i<loadDataPriani.src.length; i++){
			imgPriani[i] = new Image;
			imgPriani[i].src = loadDataPriani.src[i];
			imgPriani[i].onload = function(){
				// 読み込みが終わった画像枚数を数えていく
				loadImgPriani++;
			}
		}
		
		// タイマーを解除
		aniNow = "off";
		clearInterval(timerPriani);
		
		timerPriani = setInterval(function(){
			spriteCtx.clearRect(0, 0, spriteExportCanvas.width, spriteExportCanvas.height);
			
			// キャンバスに描写する
			for(j=0; j<loadDataPriani.timeline.point.length; j++){
				for(i=0; i<imgPriani.length; i++){
					
					// 変形前の状態をセーブしておく
					spriteCtx.save();
					
					var spriteX	= (j%spriteWidth) * loadDataPriani.cvWidth;
					var spriteY	= Math.floor(j/spriteWidth) * loadDataPriani.cvHeight;
					
					// 角度と位置の計算
					var r = loadDataPriani.timeline.r[i][j]*Math.PI/180;
					var x = loadDataPriani.x[i]-(loadDataPriani.w[i]/2) + spriteX;
					var y = loadDataPriani.y[i]-(loadDataPriani.h[i]/2) + spriteY;
					
					// タイムテーブルに沿って変形を開始
					// まずは移動と不透明度適応
					spriteCtx.translate(loadDataPriani.timeline.tlX[i][j],loadDataPriani.timeline.tlY[i][j]);
					spriteCtx.globalAlpha = loadDataPriani.timeline.al[i][j];
					
					// 基準点を画像の回転軸に移動してから回転
					spriteCtx.translate(x+loadDataPriani.aX[i],y+loadDataPriani.aY[i]);
					spriteCtx.rotate(r);
					spriteCtx.translate(-(x+loadDataPriani.aX[i]),-(y+loadDataPriani.aY[i]));
					
					// 基準点を画像の中心点に移動してから拡縮
					spriteCtx.translate(spriteX+loadDataPriani.x[i],spriteY+loadDataPriani.y[i]);
					spriteCtx.scale(loadDataPriani.timeline.sX[i][j],loadDataPriani.timeline.sY[i][j]);
					spriteCtx.translate(-(spriteX+loadDataPriani.x[i]),-(spriteY+loadDataPriani.y[i]));
					
					// 描画する
					spriteCtx.drawImage(imgPriani[i],loadDataPriani.w[i]*loadDataPriani.timeline.page[i][j],0,loadDataPriani.w[i],loadDataPriani.h[i],x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
					
					// 変形前の状態をロードしておく
					spriteCtx.restore();
				}
			}
		}, 1000/8);
		
		/*
		for(i=0; i<imgPriani.length; i++){
			
			// 変形前の状態をセーブしておく
			ctxPriani.save();
			
			// 角度と位置の計算
			var r = loadDataPriani.timeline.r[i][frrr]*Math.PI/180;
			var x = loadDataPriani.x[i]-(loadDataPriani.w[i]/2);
			var y = loadDataPriani.y[i]-(loadDataPriani.h[i]/2);
			
			// タイムテーブルに沿って変形を開始
			// まずは移動と不透明度適応
			ctxPriani.translate(loadDataPriani.timeline.tlX[i][frrr],loadDataPriani.timeline.tlY[i][frrr]);
			ctxPriani.globalAlpha = loadDataPriani.timeline.al[i][frrr];
			
			// 基準点を画像の回転軸に移動してから回転
			ctxPriani.translate(x+loadDataPriani.aX[i],y+loadDataPriani.aY[i]);
			ctxPriani.rotate(r);
			ctxPriani.translate(-(x+loadDataPriani.aX[i]),-(y+loadDataPriani.aY[i]));
			
			// 基準点を画像の中心点に移動してから拡縮
			ctxPriani.translate(loadDataPriani.x[i],loadDataPriani.y[i]);
			ctxPriani.scale(loadDataPriani.timeline.sX[i][frrr],loadDataPriani.timeline.sY[i][frrr]);
			ctxPriani.translate(-loadDataPriani.x[i],-loadDataPriani.y[i]);
			
			// 描画する
			ctxPriani.drawImage(imgPriani[i],loadDataPriani.w[i]*loadDataPriani.timeline.page[i][frrr],0,loadDataPriani.w[i],loadDataPriani.h[i],x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			
			// 選択中のパーツは縁取りする
			if(partSelectNo[i]==1){
				ctxPriani.strokeStyle = "sandybrown";
				ctxPriani.strokeRect(x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			}
			
			// 変形前の状態をロードしておく
			ctxPriani.restore();
		}
		*/
		
	}else{
		// フォームの数値が正しくないか、タイムラインにフレームが存在しないと実行不可
		alertPop("入力内容が正しくないか、<br>タイムラインにフレームが存在しません。");
	}
}