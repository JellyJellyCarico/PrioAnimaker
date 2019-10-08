// ぷりアニプラグイン
// HTMLでぷりアニデータを再生するためのメインプログラムです。

dataPriani = {};		// ●HTMLのhead内で読み込んだ各JSONファイル(アニメデータ)を格納している連想配列
imgPriani = {};									// ●各アニメデータの各imgデータを格納する連想配列
loadImgPriani = {};								// ●各アニメデータのロードしたimgデータ数を格納する連想配列
cvPriani = {};									// ▲canvasを格納する連想配列
ctxPriani = {};									// ▲canvasのコンテキストを格納する連想配列
charaPriani = {};		// ★各キャラクター情報（表示するキャンバス、使用するアニメデータ、表示位置など）を格納する連雄配列
framePriani = {};		// ★各キャラクターの現在表示しているフレーム番号を格納する連想配列
charaListPriani = {}; 	// ★キャラクター名リスト連想配列

// グローバル変数定義
fpsPriani = 8;			// 全キャラクター共通のfps（1秒あたりの画面の描画回数）
fadePriani = [];				// フェードイン・アウト用の不透明度計算用
timerPriani = setInterval("stopPriani()",1000);	// 全キャラクター共通のタイマー

// キャラクターの作成＆表示
function loadPriani(fl,canvasName,charaName,charaX,charaY,fff,fadeinframe,refrain) {
	// fpsの指定があれば適用
	if(fff){fpsPriani=fff;}
	
	// フェードイン設定
	if(fadeinframe){
		var oplus = 1/(parseInt(fadeinframe)-1);
		for(var i=0; i<parseInt(fadeinframe); i++){
			fadePriani[i] = oplus*i;
			fadePriani.sort(koujun);
			function koujun(a,b){return b-a;}
		}
	}else{
		fadePriani = [];
	}
	
	// キャラクターリストに追加
	charaListPriani[charaName] = true;
	
	// charaPrianiにキャラクター基本情報を格納
	charaPriani[charaName] = {};
	charaPriani[charaName].fl = fl;
	charaPriani[charaName].cv = canvasName;
	charaPriani[charaName].x = charaX;
	charaPriani[charaName].y = charaY;
	charaPriani[charaName].moveFrame = 0;
	charaPriani[charaName].fadeFrame = parseInt(fadeinframe);
	charaPriani[charaName].fadeoutFrame = 0;
	charaPriani[charaName].opacity = [];
	for(var i=0; i<fadePriani.length; i++){
		charaPriani[charaName].opacity[i] = fadePriani[i];
	}
	
	// リピート設定
	if(refrain==false){
		refrain="false";
	}
	if(refrain){
		charaPriani[charaName].refrain = "true";
	}else{
		charaPriani[charaName].refrain = "true";
	}
	
	// charaPrianiにdataPrianiの該当アニメデータをコピー＆コピーする準備
	charaPriani[charaName].data = {};
	charaPriani[charaName].data.id = dataPriani[fl].id;
	charaPriani[charaName].data.dir = dataPriani[fl].dir;
	charaPriani[charaName].data.fps = dataPriani[fl].fps;
	charaPriani[charaName].data.cvWidth = dataPriani[fl].cvWidth;
	charaPriani[charaName].data.cvHeight = dataPriani[fl].cvHeight;
	charaPriani[charaName].data.src = [];
	charaPriani[charaName].data.fileName = [];
	charaPriani[charaName].data.x = [];
	charaPriani[charaName].data.y = [];
	charaPriani[charaName].data.aX = [];
	charaPriani[charaName].data.aY = [];
	charaPriani[charaName].data.w = [];
	charaPriani[charaName].data.h = [];
	charaPriani[charaName].data.timeline = {};
	charaPriani[charaName].data.timeline.point = [];
	charaPriani[charaName].data.timeline.pp = [];
	charaPriani[charaName].data.timeline.r = [];
	charaPriani[charaName].data.timeline.sX = [];
	charaPriani[charaName].data.timeline.sY = [];
	charaPriani[charaName].data.timeline.tlX = [];
	charaPriani[charaName].data.timeline.tlY = [];
	charaPriani[charaName].data.timeline.al = [];
	charaPriani[charaName].data.timeline.page = [];
	
	// charaPrianiにdataPrianiの該当アニメデータをコピー
	for(var sno=0; sno<dataPriani[fl].src.length; sno++){
		charaPriani[charaName].data.src[sno] = dataPriani[fl].src[sno];
		charaPriani[charaName].data.fileName[sno] = dataPriani[fl].fileName[sno];
		
		charaPriani[charaName].data.x[sno] = dataPriani[fl].x[sno];
		charaPriani[charaName].data.y[sno] = dataPriani[fl].y[sno];
		charaPriani[charaName].data.aX[sno] = dataPriani[fl].aX[sno];
		charaPriani[charaName].data.aY[sno] = dataPriani[fl].aY[sno];
		charaPriani[charaName].data.w[sno] = dataPriani[fl].w[sno];
		charaPriani[charaName].data.h[sno] = dataPriani[fl].h[sno];
		
		charaPriani[charaName].data.timeline.pp[sno] = [];
		charaPriani[charaName].data.timeline.r[sno] = [];
		charaPriani[charaName].data.timeline.sX[sno] = [];
		charaPriani[charaName].data.timeline.sY[sno] = [];
		charaPriani[charaName].data.timeline.tlX[sno] = [];
		charaPriani[charaName].data.timeline.tlY[sno] = [];
		charaPriani[charaName].data.timeline.al[sno] = [];
		charaPriani[charaName].data.timeline.page[sno] = [];
		
		for(var tno=0; tno<dataPriani[fl].timeline.point.length; tno++){
			charaPriani[charaName].data.timeline.point[tno] = dataPriani[fl].timeline.point[tno];
			charaPriani[charaName].data.timeline.pp[sno][tno] = dataPriani[fl].timeline.pp[sno][tno];
			charaPriani[charaName].data.timeline.r[sno][tno] = dataPriani[fl].timeline.r[sno][tno];
			charaPriani[charaName].data.timeline.sX[sno][tno] = dataPriani[fl].timeline.sX[sno][tno];
			charaPriani[charaName].data.timeline.sY[sno][tno] = dataPriani[fl].timeline.sY[sno][tno];
			charaPriani[charaName].data.timeline.tlX[sno][tno] = dataPriani[fl].timeline.tlX[sno][tno];
			charaPriani[charaName].data.timeline.tlY[sno][tno] = dataPriani[fl].timeline.tlY[sno][tno];
			charaPriani[charaName].data.timeline.al[sno][tno] = dataPriani[fl].timeline.al[sno][tno];
			charaPriani[charaName].data.timeline.page[sno][tno] = dataPriani[fl].timeline.page[sno][tno];
		}
	}
	
	// charaPrianiの表示位置にcharaXとcharaYを＋する
	for (var i=0; i<charaPriani[charaName].data.x.length; i++){
		charaPriani[charaName].data.x[i] += charaPriani[charaName].x;
		charaPriani[charaName].data.y[i] += charaPriani[charaName].y;
	}
	
	// 指定されたキャンバスを取得
	cvPriani[canvasName] = document.getElementById(canvasName);
	ctxPriani[canvasName] = cvPriani[canvasName].getContext("2d");
	
	// アニメデータで使用しているimgデータをロードするための準備
	imgPriani[fl] = [];
	loadImgPriani[fl] = 0;
	
	// imgPrianiにimgデータをロードしていく作業
	for(var i=0; i<charaPriani[charaName].data.src.length; i++){
		imgPriani[fl][i] = new Image;
		imgPriani[fl][i].src = "" + charaPriani[charaName].data.dir + "/" + charaPriani[charaName].data.src[i];
		imgPriani[fl][i].onload = function(){
			loadImgPriani[fl]++;
		}
	}

	// フレーム数とタイマーをリセットして、タイマーをセット
	framePriani[charaName] = -1;
	clearInterval(timerPriani);
	timerPriani = setInterval("drawPriani()",1000/fpsPriani);
	
}

// キャンバス描画のための関数
function drawPriani() {
	// キャンバスをクリア
	for(var ccc in cvPriani){
		ctxPriani[ccc].clearRect(0,0,cvPriani[ccc].width,cvPriani[ccc].height);
	}
	
	// 各キャラクターの描画処理
	for(var charaName in charaListPriani){
		var fl = charaPriani[charaName].fl;
		var cv = charaPriani[charaName].cv;
		var data = charaPriani[charaName].data;
		
		// キャラクターのmoveFrameが1以上であれば移動用の計算を実行
		if(charaPriani[charaName].moveFrame>0){
			// charaPriani直下のx,yは実際には表示されないが、キャラクターの移動量を記録する
			charaPriani[charaName].x += charaPriani[charaName].moveX;
			charaPriani[charaName].y += charaPriani[charaName].moveY;
			
			for(var i=0; i<data.x.length; i++){
				// dataの方のx,yが実際に表示される座標
				data.x[i] += charaPriani[charaName].moveX;
				data.y[i] += charaPriani[charaName].moveY;
			}
			
			charaPriani[charaName].moveFrame--;
		}
		
		// 画像のロードが終わっていたら描画開始
		if(loadImgPriani[fl] >= imgPriani[fl].length){
			
			// フレーム番号を＋
			framePriani[charaName]++;
			if(framePriani[charaName]>=data.timeline.point.length){
				framePriani[charaName]=0;
				if(charaPriani[charaName].data.timeline.point[0] == 99){
					framePriani[charaName]=1;
				}
				if(charaPriani[charaName].refrain!="true"){
					framePriani[charaName]=data.timeline.point.length-1;
				}
			}
		
			// それぞれのパーツ画像を描画する
			for(var i=0; i<imgPriani[fl].length; i++){
			
				// 変形前の状態をセーブしておく
				ctxPriani[cv].save();
			
				// 角度と位置の計算（ r : ラジアン角 /　x,y : 画像左上の位置 /　data.x,y : 画像中心点の位置 ）
				var r = data.timeline.r[i][framePriani[charaName]]*Math.PI/180;
				var x = data.x[i]-(data.w[i]/2);
				var y = data.y[i]-(data.h[i]/2);
			
				// タイムテーブルに沿って変形を開始
				// まずは移動
				ctxPriani[cv].translate(data.timeline.tlX[i][framePriani[charaName]],data.timeline.tlY[i][framePriani[charaName]]);
				
				// 不透明度
				if(charaPriani[charaName].fadeFrame>0){
					ctxPriani[cv].globalAlpha = 0;
					ctxPriani[cv].globalAlpha = charaPriani[charaName].opacity[charaPriani[charaName].fadeFrame];
				}else if(charaPriani[charaName].fadeoutFrame>0){
					ctxPriani[cv].globalAlpha = 1;
					ctxPriani[cv].globalAlpha = charaPriani[charaName].opacity[charaPriani[charaName].fadeoutFrame];
				}else{
					ctxPriani[cv].globalAlpha = data.timeline.al[i][framePriani[charaName]];
				}
			
				// 基準点を画像の中心点に移動してから回転
				ctxPriani[cv].translate(x+data.aX[i],y+data.aY[i]);
				ctxPriani[cv].rotate(r);
				ctxPriani[cv].translate(-(x+data.aX[i]),-(y+data.aY[i]));
			
				// 基準点を画像の中心点に移動してから拡縮
				ctxPriani[cv].translate(data.x[i],data.y[i]);
				ctxPriani[cv].scale(data.timeline.sX[i][framePriani[charaName]],data.timeline.sY[i][framePriani[charaName]]);
				ctxPriani[cv].translate(-data.x[i],-data.y[i]);
			
				// 描画する
				ctxPriani[cv].drawImage(imgPriani[fl][i],data.w[i]*data.timeline.page[i][framePriani[charaName]],0,data.w[i],data.h[i],x,y,data.w[i],data.h[i]);
				
				// 変形前の状態をロードしておく
				ctxPriani[cv].restore();
			}
			// フェードイン中か否か
			if(charaPriani[charaName].fadeFrame>0){
				charaPriani[charaName].fadeFrame--;
			}
			
			// フェードアウト中か否か、フェードアウトが終わったらキャラクター消去
			if(charaPriani[charaName].fadeoutFrame>0){
				charaPriani[charaName].fadeoutFrame--;
				if(charaPriani[charaName].fadeoutFrame<=0){
					delete charaPriani[charaName];
					delete framePriani[charaName];
					delete charaListPriani[charaName];
				}
			}
			
		
		}
	}
}

// キャラクターのアニメーションを変更する関数（stopPrianiをしていても再生が再開される）
function changePriani(fl,charaName,refrain,assist){
	if(!charaPriani[charaName]){return}
	// canvasName、charaX、charaYの入力を省略するだけの関数なので、普通にloadPrianiを使っても問題ない。
	var canvasName = charaPriani[charaName].cv;
	var charaX = charaPriani[charaName].x;
	var charaY = charaPriani[charaName].y;
	var fff = fpsPriani;
	var fadeinframe = false;
	var thisFrame = framePriani[charaName];
	
	if(refrain==true){
		refrain="true";
	}
	
	// 補正用追加フレームがあればリセット
	if(dataPriani[fl].timeline.point[0] == 99){
		dataPriani[fl].timeline.point.shift();
		dataPriani[fl].timeline.point[0] = 0;
		for(var i=0; i<dataPriani[fl].src.length; i++){
			dataPriani[fl].timeline.pp[i].shift();
			dataPriani[fl].timeline.r[i].shift();
			dataPriani[fl].timeline.sX[i].shift();
			dataPriani[fl].timeline.sY[i].shift();
			dataPriani[fl].timeline.tlX[i].shift();
			dataPriani[fl].timeline.tlY[i].shift();
			dataPriani[fl].timeline.al[i].shift();
			dataPriani[fl].timeline.page[i].shift();
		}
	}
	
	// モーション変更時のアニメーション補正
	if(assist == "true" || assist == true){
		var nowR = [];
		var nowSX = [];
		var nowSY = [];
		var nowTLX = [];
		var nowTLY = [];
		var nowAL = [];
		var nowPAGE = [];
		
		var nextR = [];
		var nextSX = [];
		var nextSY = [];
		var nextTLX = [];
		var nextTLY = [];
		var nextAL = [];
		var nextPAGE = [];
		
		// 前後のフレームデータ
		for(var i=0; i<dataPriani[fl].src.length; i++){
			nowR[i] = charaPriani[charaName].data.timeline.r[i][thisFrame];
			nowSX[i] = charaPriani[charaName].data.timeline.sX[i][thisFrame];
			nowSY[i] = charaPriani[charaName].data.timeline.sY[i][thisFrame];
			nowTLX[i] = charaPriani[charaName].data.timeline.tlX[i][thisFrame];
			nowTLY[i] = charaPriani[charaName].data.timeline.tlY[i][thisFrame];
			nowAL[i] = charaPriani[charaName].data.timeline.al[i][thisFrame];
			nowPAGE[i] = charaPriani[charaName].data.timeline.page[i][thisFrame];
			
			nextR[i] = dataPriani[fl].timeline.r[i][0];
			nextSX[i] = dataPriani[fl].timeline.sX[i][0];
			nextSY[i] = dataPriani[fl].timeline.sY[i][0];
			nextTLX[i] = dataPriani[fl].timeline.tlX[i][0];
			nextTLY[i] = dataPriani[fl].timeline.tlY[i][0];
			nextAL[i] = dataPriani[fl].timeline.al[i][0];
			nextPAGE[i] = dataPriani[fl].timeline.page[i][0];
		}
		
		// 補正フレームを追加する
		dataPriani[fl].timeline.point.unshift(99);
		for(var i=0; i<dataPriani[fl].src.length; i++){
			dataPriani[fl].timeline.pp[i].unshift(0);
			dataPriani[fl].timeline.r[i].unshift((nowR[i] + nextR[i])/2);
			dataPriani[fl].timeline.sX[i].unshift((nowSX[i] + nextSX[i])/2);
			dataPriani[fl].timeline.sY[i].unshift((nowSY[i] + nextSY[i])/2);
			dataPriani[fl].timeline.tlX[i].unshift((nowTLX[i] + nextTLX[i])/2);
			dataPriani[fl].timeline.tlY[i].unshift((nowTLY[i] + nextTLY[i])/2);
			dataPriani[fl].timeline.al[i].unshift((nowAL[i] + nextAL[i])/2);
			dataPriani[fl].timeline.page[i].unshift(Math.floor((nowPAGE[i] + nextPAGE[i])/2));
		}
		
		
	}
	
	loadPriani(fl,canvasName,charaName,charaX,charaY,fff,fadeinframe,refrain);
}

// アニメーションを停止
function stopPriani(){
	// タイマーを停止する
	clearInterval(timerPriani);
}

// アニメーションを再生再開
function restartPriani(){
	// タイマーを再セットする
	clearInterval(timerPriani);
	timerPriani = setInterval("drawPriani()",1000/fpsPriani);
}

// 指定したキャラクターを削除（stopPriani中は機能しない）
function deletePriani(charaName){
	// 指定したキャラクターが存在していれば削除する
	if(charaPriani[charaName]){
		delete charaPriani[charaName];
		delete framePriani[charaName];
		delete charaListPriani[charaName];
	}
}


// 指定したキャラクターをフェードアウト（stopPriani中は機能しない）
function fadeoutPriani(charaName,fadeoutframe){
	
	// フェードアウト設定
	if(fadeoutframe){
		var oplus = 1/(parseInt(fadeoutframe)-1);
		for(var i=0; i<parseInt(fadeoutframe); i++){
			fadePriani[i] = oplus*i;
		}
	}else{
		fadePriani = [];
	}
	
	try{
		charaPriani[charaName].fadeoutFrame = parseInt(fadeoutframe);
		charaPriani[charaName].opacity = [];
		for(var i=0; i<fadePriani.length; i++){
			charaPriani[charaName].opacity[i] = fadePriani[i];
		}
	}catch(e){
		
	}
	
}

// fpsを変更
function changeFps(fno){
	// stopPrianiをしていても再生が再開される（タイマーを再セットするため）
	fpsPriani = fno;
	clearInterval(timerPriani);
	timerPriani = setInterval("drawPriani()",1000/fpsPriani);
}

// 指定したキャラクターを移動させる
function movePriani(charaName,moveX,moveY,haveFrame){
	if(!charaPriani[charaName]){return}
	charaPriani[charaName].moveX = moveX/haveFrame;
	charaPriani[charaName].moveY = moveY/haveFrame;
	charaPriani[charaName].moveFrame = haveFrame;
}

// 指定したキャラクターの移動を停止する
function moveStopPriani(charaName){
	if(!charaPriani[charaName]){return}
	charaPriani[charaName].moveFrame = 0;
	charaPriani[charaName].moveX = 0;
	charaPriani[charaName].moveY = 0;
}
