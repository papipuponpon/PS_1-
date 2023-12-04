
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {
    hanakoFlag = false;
    hanakoDel = false;

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
        // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jiro', 'assets/jiro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
        this.player = this.physics.add.image(D_WIDTH/2, D_HEIGHT/2, 'taro');
        this.player2 = this.physics.add.image(D_WIDTH/3, D_HEIGHT/3, 'jiro');
        this.player.angle = 0
        this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        this.player_direction = 1;
        this.text2 = this.add.text(600, 400, 'MyWorld').setFontSize(20).setColor('#ff0');
        this.keys = {};
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.helloText = this.add.text(100, 50, '');
        this.heyText = this.add.text(100, 50, '');
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.timeCounter = 0;
        this.leftTime = 3;
    }
    
  // 毎フレーム実行される繰り返し処理
    update(time,delta) {
        //演習1-3
        // if (this.player.y >= D_HEIGHT - 100) this.player_direction = -1;
        // if (this.player.y <= 100) this.player_direction = 1;
        // if (this.player.x >= D_WIDTH - 100) this.player_direction = -1;
        // if (this.player.x <= 100) this.player_direction = 1;
        
        // if (this.player_direction == 1) {
        //     this.player.y += 5;// 横方向へ移動を設定
        //     this.player.x += 5;// 横方向へ移動を設定
        // } else {
        //     this.player.x -= 5;// 横方向へ移動を設定
        //     this.player.y -= 5;// 横方向へ移動を設定
        // }



        // //演習1-4
        // // 回転角度を更新
        // this.player.angle += 5;
        // // 回転角度を設定
        // this.player.setAngle( this.player.angle );
        // this.player.setVelocityX(100);
        // this.player.setVelocityY(100);



        //演習1-5
        // let cursors = this.input.keyboard.createCursorKeys();
        // if (cursors.left.isDown) {
        //     this.player.x -= 50;
        //     this.player2.x += 50;
        // } else if (cursors.right.isDown) {
        //     this.player.x += 50;
        //     this.player2.x -= 50;
        // }

        //演習1-6
        if(this.keys.keyA.isDown){
            this.helloText.setText('Hello!');
        }else if(this.keys.keyS.isDown){
            this.heyText.setText('Hey!');
        }else if(this.keys.keyD.isDown){
            this.helloText.setText('');
            this.heyText.setText('');
        }

        //演習1-7
        if(this.keys.keyW.isDown){
            let randx = Phaser.Math.Between(100, 400);
             this.hanako = this.add.image(randx, 100, 'hanako');
         }

        //演習1-8,演習1-9
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-200);
        }else if (cursors.right.isDown) {
            console.log('right');
            this.player.setVelocityX(200);
        }else if (cursors.up.isDown) {
            this.player.setVelocityY(-200);
        }else if (cursors.down.isDown) {
            this.player.setVelocityY(200);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }

        this.timeCounter += delta;
        if(this.timeCounter > 1000) {
            this.timeCounter = 0;
            this.leftTime --;
        }
        if(this.leftTime <= 0){
            if(this.hanakoDel){
                this.hanako.destroy();
            } else {
                if(this.hanakoFlag){
                    this.hanako.destroy();
                }
                let randx = Phaser.Math.Between(200, 400);
                let randy = Phaser.Math.Between(100, 200);
                // this.hanako = this.physics.add.image(randx, randy, 'hanako');
                let hanakoGroup = this.physics.add.group();
                this.hanako = hanakoGroup.create(randx, randy, 'hanako');
                this.hanakoFlag = true;
                this.leftTime = 3;
            }
        }
        // 当たり判定
        this.physics.add.overlap(this.player, this.hanako, collision_detection, null, this);
        function collision_detection() {
            this.hanakoDel = true;
            this.add.text(100, 150, '痛い！',);
        }
    }
            
}