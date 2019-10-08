/*
	ぷりおアニメーカー ver.0.02
	製作者：かりこ
	サイト：https://jellyjelly.site/
	
	★Priani.jsはアニメを描画するスクリプトです。
	
	【コーディングルール】
	関数や変数：キャメルケース（dataPriani）
	クラス：パスカルケース（PrianiData）
	
	基本的に「内容」＋「Priani」
	例）「data」＋「Priani」→　dataPriani
*/

dataPriani = {};

// 初期設定とロードのための関数
function loadPriani(fl) {
	
	if(fl!=="makerDataInport"){
	//通常の呼び出しの場合
		
		//指定された名前のJSONファイルをロード
		loadDataPriani = dataPriani[fl];

		// キャンバス取得
		cvPriani = document.getElementById("cvPriani");
		// キャンバスのサイズ設定
		cvPriani.width = loadDataPriani.cvWidth;
		cvPriani.height = loadDataPriani.cvHeight;
		// コンテキスト取得
		ctxPriani = cvPriani.getContext("2d");
	
		//画像読み込み用の配列変数
		imgPriani = [];
		//読み込んだ画像の数
		loadImgPriani = 0;
	
		//画像を読み込む
		for(var i=0; i<loadDataPriani.src.length; i++){
			imgPriani[i] = new Image;
			imgPriani[i].src = loadDataPriani.dir + "/" + loadDataPriani.src[i];
			imgPriani[i].onload = function(){
				loadImgPriani++;
			}
		}
	
	}else{
	//メーカーからの呼び出しの場合
		imgPriani = [];
		loadImgPriani = 0;
		//画像を読み込む
		for(var j=0; j<loadDataPriani.src.length; j++){
			imgPriani[j] = new Image;
			imgPriani[j].src = loadDataPriani.src[j];
			imgPriani[j].onload = function(){
				loadImgPriani++;
			}
		}
	}
	
	// フレーム数をリセットして、定期ロード（描写）をセット
	framePriani = 0;
	timerPriani = setInterval("drawPriani()",1000/loadDataPriani.fps);
	
}

// 定期ロード＆描写のための関数
function drawPriani() {
	// 画像のロードが終わっていたら描画開始
	if(loadImgPriani >= imgPriani.length){
		
		// タイムテーブルの分だけ繰り返す
		framePriani++;
		if(repeatSet==true){
			if(framePriani>=loadDataPriani.timeline.point.length){framePriani=0;}
		}else{
			if(framePriani>=loadDataPriani.timeline.point.length){stopPriani();}
		}
		
		// キャンバスをクリア
		ctxPriani.clearRect(0,0,loadDataPriani.cvWidth,loadDataPriani.cvHeight);
		
		// それぞれのレイヤーを描画する
		for(i=0; i<imgPriani.length; i++){
			
			// 変形前の状態をセーブしておく
			ctxPriani.save();
			
			// 角度と位置の計算
			var r = loadDataPriani.timeline.r[i][framePriani]*Math.PI/180;
			var x = loadDataPriani.x[i]-(loadDataPriani.w[i]/2);
			var y = loadDataPriani.y[i]-(loadDataPriani.h[i]/2);
			
			// タイムテーブルに沿って変形を開始
			// まずは移動と不透明度適応
			ctxPriani.translate(loadDataPriani.timeline.tlX[i][framePriani],loadDataPriani.timeline.tlY[i][framePriani]);
			ctxPriani.globalAlpha = loadDataPriani.timeline.al[i][framePriani];
			
			// 基準点を画像の回転軸に移動してから回転
			ctxPriani.translate(x+loadDataPriani.aX[i],y+loadDataPriani.aY[i]);
			ctxPriani.rotate(r);
			ctxPriani.translate(-(x+loadDataPriani.aX[i]),-(y+loadDataPriani.aY[i]));
			
			// 基準点を画像の中心点に移動してから拡縮
			ctxPriani.translate(loadDataPriani.x[i],loadDataPriani.y[i]);
			ctxPriani.scale(loadDataPriani.timeline.sX[i][framePriani],loadDataPriani.timeline.sY[i][framePriani]);
			ctxPriani.translate(-loadDataPriani.x[i],-loadDataPriani.y[i]);
			
			// 描画する
			ctxPriani.drawImage(imgPriani[i],loadDataPriani.w[i]*loadDataPriani.timeline.page[i][framePriani],0,loadDataPriani.w[i],loadDataPriani.h[i],x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			
			// 選択中のパーツは縁取りする
			if(partSelectNo[i]==1){
				ctxPriani.strokeStyle = "sandybrown";
				ctxPriani.strokeRect(x,y,loadDataPriani.w[i],loadDataPriani.h[i]);
			}
			
			// 変形前の状態をロードしておく
			ctxPriani.restore();
		}
		
		// メーカー用データ出力
		try{
			frameText.value = framePriani;
			timelineList();
			partImgFormUpState();
		}catch(e){}
		
		
		
	}
}

//アニメーションを変更する関数
function changePriani(fl,same){
	if(same==true){
		//★パーツ画像が同じ場合の処理
		clearInterval(timerPriani);
		loadDataPriani = dataPriani[fl];
		//　フレームをリセットしてタイマーを再セットする
		framePriani = 0;
		timerPriani = setInterval("drawPriani()",1000/loadDataPriani.fps);
		
	}else{
		//★パーツ画像が違う場合の処理
		clearInterval(timerPriani);
		loadDataPriani = dataPriani[fl];
		
		//　パーツ画像を読み込む
		imgPriani = [];
		loadImgPriani = 0;
		for(var i=0; i<loadDataPriani.src.length; i++){
			imgPriani[i] = new Image;		
			imgPriani[i].src = loadDataPriani.dir + "/" + loadDataPriani.src[i];	
			imgPriani[i].onload = function(){
				loadImgPriani++;
			}
		}
		
		//　フレームをリセットしてタイマーを再セットする
		framePriani = 0;
		timerPriani = setInterval("drawPriani()",1000/loadDataPriani.fps);
	}
}

//アニメーションストップ
function stopPriani(){
	aniNow = "off";
	clearInterval(timerPriani);
	if(framePriani>=loadDataPriani.timeline.point.length){framePriani=loadDataPriani.timeline.point.length-1;}
}

