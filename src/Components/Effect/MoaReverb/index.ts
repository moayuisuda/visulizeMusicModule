import * as pixi from '../../../init'
import Tone from 'tone'
import * as PIXI from 'pixi.js'
import {
    Effect
} from '../../Effect'
import * as utils from '../../../utils'

class MoaFilter extends Effect {
    theme: string;
    options: any;
    

    constructor() {
        super();
        this.modName = 'moafilter';

        this.init();
    }

    init() {
        // 背景主题初始化
        let changeContainer = new PIXI.Container();
        changeContainer.interactive = true;
        changeContainer.hitArea = new PIXI.Rectangle(0, 0, 200, 100);

        changeContainer.on('mousedown', (e: any) => {
            this.soundNode.dampening.value = 3000 * (changeContainer.toLocal(e.data.global).x / changeContainer.width);
            this.soundNode.roomSize.value = 0.7 * (changeContainer.toLocal(e.data.global).y / changeContainer.height);
            point.position.set(changeContainer.toLocal(e.data.global).x, changeContainer.toLocal(e.data.global).y);
        })

        let backGround = new PIXI.Graphics();
        backGround.beginFill(0x000000, 0.2);
        backGround.lineStyle(5, 0xc72e2e);
        backGround.drawRect(0, 0, 200, 100);
        backGround.hitArea = backGround.getBounds();
        changeContainer.x = 2.5;
        changeContainer.y = 7;

        changeContainer.addChild(backGround);
        this.container.addChild(changeContainer);

        let style = {
            fontStyle: 'italic',
            fill: 'rgba(255, 255, 255, 0.5)',
        }
        let title = new PIXI.Text('- MoaFilter -', style);
        title.x = changeContainer.width / 2 - title.width / 2;
        title.y = 40;
        changeContainer.addChild(title);

        super.initBar();

        let point = new PIXI.AnimatedSprite([utils.getColorTexture(0xc72e2e, true), utils.getColorTexture(0x838383, true)]);
        point.animationSpeed = 0.05;
        point.play();
        point.x = 20,
        point.y = 50;
        point.pivot.set(0.5, 0.5);
        changeContainer.addChild(point);

        this.soundNode = this.createInstrument();
        pixi.app.stage.addChild(this.container);
    }

    createInstrument() {
        var filter = new Tone.Freeverb({dampening: 300, roomSize: 0.35});

        return filter;
    }

}

export default MoaFilter