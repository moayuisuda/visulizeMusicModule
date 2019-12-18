import * as pixi from '../../init'
import {
    codeMap,
    singleKeyInstance
} from './keyPresets'
import * as PIXI from 'pixi.js'
import * as utils from '../../utils'
import color from '../../variable'
import Module from '../Module'

// If you want to let it make a sound, connect it to a 'instrument'.

class Keyboard extends Module {
    theme: string
    loading: boolean
    allKeys: singleKeyInstance[]
    instrument: Tone.Instrument

    constructor() {
        super();
        this.modName = 'keyboard';
        this.modType = 'keyboard';
        this.theme = localStorage.getItem('keyboard_theme') || 'default';

        this.loading = false;
        this.allKeys = [];

        // This is a special soundNode, it's 'connect' and 'disconnect' are rewrited.
        this.soundNode = {
            connect: (e: any) => {
                this.instrument = e;
            },
            disconnect: () => {
                this.instrument = undefined;
            }
        }
        this.instrument = undefined;

        this.init();
    }

    init() {
        // 背景主题初始化
        let backGround = new PIXI.Sprite();
        backGround.width = 890;
        backGround.height = 150;

        if (this.theme != 'default') {
            backGround.texture = pixi.textures['http://localhost:3000/file/theme/keyboard' + this.theme + '/backGround.jpg'];
        } else {
            backGround.texture = utils.getColorTexture(color.lightPink_color);
        }

        this.container.addChild(backGround);

        // 按键主题初始化
        let width = 10;

        for (let i = 0; i < codeMap.length; ++i) {
            let singleKey: singleKeyInstance = {
                active: false,
                type: codeMap[i].type,
                key: codeMap[i].key,
                code: codeMap[i].code,
                note: codeMap[i].note,
                container: new PIXI.Container()
            }

            Object.assign(singleKey.container, {
                x: width,
                y: 10,
                height: 120,
                width: (codeMap[i].type == 'white') ? 50 : 30,
            })
            let backGround = new PIXI.Graphics();
            backGround.beginFill(codeMap[i].type == 'white' ? color.main_color : color.main2_color);
            backGround.drawRect(0, 0, (codeMap[i].type == 'white') ? 50 : 30, 120);
            singleKey.container.addChild(backGround);


            var style = {
                fontFamily: 'Arial',
                fontSize: '12px',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: 0xffffff,
                stroke: '#4a1850',
                // strokeThickness: 3,
            };
            let keyName = new PIXI.Text(singleKey.key, style);
            keyName.x = 5, keyName.y = 5;
            singleKey.container.addChild(keyName);


            if (codeMap[i].type == 'white') {
                width += 60;
            } else {
                width += 40;
            }

            this.allKeys.push(singleKey);
            this.container.addChild(singleKey.container);
        }

        super.initBar();
        pixi.app.stage.addChild(this.container);

        // this.vol = new Tone.Volume(this.volume.value);
        // this.changeInstrument(this.instrument);

        addEventListener('keydown', (e) => {
            let code = e.keyCode;
            for (let i of this.allKeys) {
                if (i.code == code && i.active == false) {
                    this.press(i);
                }
            }
        })

        addEventListener('keyup', (e) => {
            let code = e.keyCode;
            for (let i of this.allKeys) {
                if (i.code == code) {
                    this.release(i);
                }
            }
        })
    }

    press(i: singleKeyInstance) {
        i.active = true;
        if (this.instrument)( < any > this.instrument).triggerAttack(i.note);
        console.log('press', i.note);
        let filter = new PIXI.filters.AlphaFilter();
        filter.alpha = 0.3
        i.container.filters = [filter];
        i.container.y += 5;
    }

    release(i: singleKeyInstance) {
        i.active = false;
        if (this.instrument)( < any > this.instrument).triggerRelease(i.note);
        console.log('release', i.note);
        i.container.filters.splice(0, 1);
        i.container.y -= 5;
    }
}

export default Keyboard