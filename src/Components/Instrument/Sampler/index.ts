import * as pixi from '../../../init'
import Tone from 'tone'
import * as PIXI from 'pixi.js'
import * as utils from '../../../utils'
import {
    Instrument
} from '../../Instrument'
import color from '../../../variable'

class Sampler extends Instrument {
    theme: string
    instrumentName: string
    list: string[]
    ready: boolean

    constructor() {
        super();
        this.modName = 'sampler';
        this.ready = false;
        this.theme = localStorage.getItem('sampler_theme') || 'default';
        this.instrumentName = localStorage.getItem('sampler_instrumentName') || 'piano';
        this.list = ['piano', 'guitar'];
        this.init();
    }

    readyHook() {}

    init() {

        // 背景主题初始化
        let backGround = new PIXI.Sprite();
        backGround.width = 200;
        backGround.height = 100;

        if (this.theme != 'default') {
            // backGround.texture = pixi.textures['http://localhost:3000/file/theme/sampler' + this.theme + '/backGround.jpg'];
        } else {
            backGround.texture = utils.getColorTexture(color.main2_color);
        }

        this.container.addChild(backGround);

        super.initBar();
        this.soundNode = this.createInstrument();
        this.initList();

        pixi.app.stage.addChild(this.container);
    }

    initList() {

        var style = {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#F7EDCA',
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true, //是否允许换行
            wordWrapWidth: 440, //换行执行宽度
            align: 'center'
        };

        let title = new PIXI.Text('Sampler', style);
        title.x = 20
        this.container.addChild(title);

        let list:any[] = [];
        for (let i = 0; i < this.list.length; ++i) {
            let item: any = new PIXI.Text(this.list[i], {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: color.main_color
            });
            item.instrumentName = this.list[i];
            item.x = 35 + (i) * 70;
            item.y = 50;
            list.push(item);
            this.container.addChild(item);
            item.buttonMode = true;
            item.interactive = true;

            item.on('click', (e: any) => {
                // debugger
                console.log(e)
                for (let i of list) {
                    if (i.instrumentName == e.target.instrumentName) {
                        i.style = {
                            fontFamily: 'Arial',
                            fontSize: 24,
                            fill: 0xffffff
                        };
                        continue;
                    }

                    i.style = {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: color.main_color
                    }
                }
                this.instrumentName = item.instrumentName;
                this.createInstrument();
            })

            for (let i of list) {
                if (i.instrumentName == this.instrumentName) {
                    i.style = {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 0xffffff
                    };
                    break;
                }
            }
        }
    }

    createInstrument() {
        let synth = new Tone.Sampler({
                'A4': 'file/' + this.instrumentName + '/A4.wav',
                'C4': 'file/' + this.instrumentName + '/C4.wav',
                'D#4': 'file/' + this.instrumentName + '/DSharp4.wav',
                'F#4': 'file/' + this.instrumentName + '/FSharp4.wav',
            },
            () => {
                if (!this.ready) {
                    this.ready = true;
                    this.readyHook();
                }

                this.soundNode = synth;
                if (this.output) this.soundNode.connect(this.output.soundNode);
                if (this.input) this.input.soundNode.connect(this.soundNode);
            },
            'http://localhost:3000/'
        )
    };

}

export default Sampler