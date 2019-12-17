import * as pixi from '../../init'
import * as PIXI from 'pixi.js'
import * as utils from '../../utils'
import color from '../../variable'
import Module from '../Module'
import Tone from 'tone'

// The sound will be output from this module FINALLY.

class Master extends Module {
    theme: string

    constructor() {
        // Master is just for output the sound, only 4 lines below are essentially needed:
        super();
        this.modName = 'master';
        this.modType = 'master';
        this.soundNode = Tone.Master;

        this.theme = localStorage.getItem('master_theme') || 'default';
        this.init();
    }

    init() {
        pixi.loader.add([
                // 'http://localhost:3000/file/theme/master' + this.theme + '/backGround.jpg',
            ])
            .load(() => {

                // init the theme(it's not essential, you can ignore the 'theme')
                let backGround = new PIXI.Sprite();
                backGround.width = 150;
                backGround.height = 150;

                if (this.theme != 'default') {
                    // backGround.texture = pixi.textures['http://localhost:3000/file/theme/master' + this.theme + '/backGround.jpg'];
                } else {
                    backGround.texture = utils.getColorTexture(color.focus_color);
                }

                this.container.addChild(backGround);

                let style = {
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fill: 0xffffff,
                    backGround: color.main2_color,
                    wordWrap: true, //是否允许换行
                    wordWrapWidth: 440 //换行执行宽度
                };

                let circle = new PIXI.Graphics();
                circle.lineStyle(0);
                circle.beginFill(color.lightPink_color);                
                circle.drawCircle(40, 40, 40);
                console.log('circle',circle.width)
                circle.x = backGround.width / 2 - circle.width / 2;
                circle.y = 40;
                this.container.addChild(circle);

                let richText = new PIXI.Text('MASTER', style);
                richText.x = backGround.width / 2 - richText.width / 2;
                richText.y = 10;
                this.container.addChild(richText);


                super.initBar();

                pixi.app.stage.addChild(this.container);
            })
            .on('progress', function (loader, resource) {
                console.log("loading: " + resource.name);
                console.log("progress: " + loader.progress + "%");
            })
    }
}

export default Master