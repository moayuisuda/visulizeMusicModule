import * as pixi from '../../../init'
import Tone from 'tone'
import * as PIXI from 'pixi.js'
import {
    Instrument
} from '../../Instrument'

class MoaSynth extends Instrument {
    theme: string;
    options: any;

    constructor() {
        super();
        this.modName = 'moasynth';
        this.theme = localStorage.getItem('moasynth_theme') || 'default';

        this.init();
    }

    init() {
        // 背景主题初始化
        let backGround = new PIXI.Graphics();

        // 会自动修修剪为有意义的可见部分，moveTo不影响宽高
        backGround.beginFill(0x000000, 0.2);
        backGround.lineStyle(10, 0x010204);
        backGround.drawRect(0, 0, 200, 100);
        backGround.hitArea = backGround.getBounds();
        backGround.x = 5;
        backGround.y = 5;

        this.container.addChild(backGround);

        let title = new PIXI.Text('◥◣Synth');
        title.x = 100 - title.width / 2;
        title.y = 40;
        this.container.addChild(title);

        super.initBar();
        this.soundNode = this.createInstrument();
        pixi.app.stage.addChild(this.container);
    }

    createInstrument() {
        var synth = new Tone.PolySynth(4, Tone.Synth);

        return synth;
    }

}

export default MoaSynth