import * as pixi from '../../init'
import * as PIXI from 'pixi.js'
import * as utils from '../../utils'
import color from '../../variable'

// Module is the root and super class for all modules, so you'd beeter change this class carefully.

class Module {
    container: PIXI.Container;
    line: PIXI.Graphics;
    linkedTexture: PIXI.Texture;
    onLinkTexture: PIXI.Texture;
    unlinkTexture: PIXI.Texture;
    inputTip: PIXI.Sprite;
    outputTip: PIXI.Sprite;
    isdrag: boolean;
    input: Module;
    output: Module;
    modType: string;
    modName: string;
    soundNode: any;
    moveHandle: PIXI.Container

    constructor() {

        this.container = new PIXI.Container();
        this.moveHandle = new PIXI.Container();
        this.line = new PIXI.Graphics();
        this.linkedTexture = utils.getColorTexture(color.success_color);
        this.onLinkTexture = utils.getColorTexture(color.focus_color);
        this.unlinkTexture = utils.getColorTexture(color.grey_color);

        this.inputTip = new PIXI.Sprite(this.unlinkTexture);
        this.outputTip = new PIXI.Sprite(this.unlinkTexture);
        this.ModuleInit();
    }

    ModuleInit() {
        Object.defineProperty(this, 'input', {
            set(val) {
                if (!val) {
                    this.inputTip.texture = this.unlinkTexture;
                    this._input = val;
                } else {
                    this._input = val;
                    this.inputTip.texture = this.linkedTexture;

                }
            },

            get() {
                return this._input;
            }
        })

        Object.defineProperty(this, 'output', {
            set(val) {

                if (!val) {
                    this.outputTip.texture = this.unlinkTexture;
                    this._output = val;
                } else {
                    this._output = val;
                    this.outputTip.texture = this.linkedTexture;
                }
            },

            get() {
                return this._output;
            }
        })

        this.makeDraggable(this.moveHandle);
    }

    makeDraggable(handle: PIXI.Container) {
        handle.interactive = true;

        let startX: number,
            startY: number;

        handle.on('mousedown', (e: any) => {
            console.log('click inner')
            this.isdrag = true;
            startX = e.data.global.x;
            startY = e.data.global.y;
            this.container.zIndex = pixi.app.stage.children[pixi.app.stage.children.length - 1].zIndex + 1;
            console.log(this.input, this.output, this.line);
        })

        handle.on('mouseup', () => {
            this.isdrag = false;
        })

        handle.on('mousemove', (e: any) => {
            if (this.isdrag) {
                this.container.x += e.data.global.x - startX;
                this.container.y += e.data.global.y - startY;
                startX = e.data.global.x;
                startY = e.data.global.y;
                if (this.input) {
                    this.drawLine('input');
                }

                if (this.output) {
                    this.drawLine('output');
                }
            }
        })
    }

    initBar() {

        let linkList = pixi.linkList;

        this.moveHandle.position.set(15, -15);

        let header = new PIXI.Text(this.modName, {
            fontSize: '10px'
        });
        header.x = 5;

        let moveHandleBackgoround = new PIXI.Graphics();
        moveHandleBackgoround.beginFill(0x000000, 0.2);
        moveHandleBackgoround.drawRect(0, 0, this.container.width - 30, 15);


        this.moveHandle.addChild(moveHandleBackgoround, header);


        this.container.addChild(this.moveHandle);

        this.moveHandle.hitArea = this.moveHandle.getLocalBounds();

        if (this.modType != 'master') {

            this.outputTip.width = 15;
            this.outputTip.height = 15;
            this.outputTip.y = -15;
            this.outputTip.x = this.container.width - 15;
            this.outputTip.interactive = true;

            this.outputTip.on('click', () => {
                if (this.output) {
                    this.disconnect('output');
                    return;
                }

                if (linkList.output) {
                    if (this.modName == linkList.output.modName) {
                        linkList.output = undefined;
                    } else {
                        linkList.output = undefined;
                        linkList.output = this;
                    }
                } else {
                    linkList.output = this;
                    if (linkList.input) this.connect('output');
                }
            })

            this.container.addChild(this.outputTip);
        }

        if (this.modType != 'keyboard') {

            this.inputTip.width = 15;
            this.inputTip.height = 15;
            this.inputTip.y = -15;
            this.inputTip.interactive = true;

            this.inputTip.on('click', () => {

                if (this.input) {
                    this.disconnect('input');
                    return;
                }

                if (linkList.input) {

                    if (this.modName == linkList.input.modName) {
                        linkList.input = undefined;
                    } else {
                        linkList.input = undefined;
                        linkList.input = this;
                    }
                } else {
                    linkList.input = this;
                    if (linkList.output) this.connect('input');
                }
            })

            this.container.addChild(this.inputTip);
        }
    }

    disconnect(type: string) {

        if (type == 'output') {

            this.soundNode.disconnect(this.output.soundNode);
            pixi.app.stage.removeChild(this.line);
            this.line = new PIXI.Graphics();
            this.output.input = undefined;
            this.output = undefined;
        }

        if (type == 'input') {

            this.input.soundNode.disconnect(this.soundNode);
            pixi.app.stage.removeChild(this.input.line);
            this.input.line = new PIXI.Graphics();
            this.input.output = undefined;
            this.input = undefined;
        }
    }

    drawLine(type: string) {

        if (type == 'input') {
            pixi.app.stage.removeChild(this.input.line);
            this.input.line = new PIXI.Graphics();
            let startPoint = this.input.container.toGlobal(this.input.outputTip.position);
            let endPoint = this.container.toGlobal(this.inputTip.position)
            this.input.line.position.set(startPoint.x + this.input.outputTip.width / 2, startPoint.y + this.input.outputTip.height / 2);

            this.input.line.lineStyle(5, color.line_color, 0.3)
                .moveTo(0, 0)
                .lineTo(endPoint.x - startPoint.x, endPoint.y - startPoint.y);

            pixi.app.stage.addChild(this.input.line);
        }

        if (type == 'output') {
            pixi.app.stage.removeChild(this.line);
            this.line = new PIXI.Graphics();
            let startPoint = this.container.toGlobal(this.outputTip.position);
            let endPoint = this.output.container.toGlobal(this.output.inputTip.position);
            // Move it to the beginning of the line
            this.line.position.set(startPoint.x + this.outputTip.width / 2, startPoint.y + this.outputTip.height / 2);

            // Draw the line (endPoint should be relative to myGraph's position)
            this.line.lineStyle(5, color.line_color, 0.3)
                .moveTo(0, 0)
                .lineTo(endPoint.x - startPoint.x, endPoint.y - startPoint.y);

            pixi.app.stage.addChild(this.line);
        }
    }

    static manualConnect(from: Module, to: Module) {
        let linkList = {
            input: to,
            output: from
        }

        Object.assign(pixi.linkList, linkList);

        from.connect('output');


    }

    connect(type: string) {

        let linkList = pixi.linkList;

        try {
            if (linkList.input.modName == linkList.output.modName) {
                alert('Do not connect ONE MODULE\'s input and output together');
                linkList[type] = undefined;
                return;
            }
            if (linkList.output.modType == 'keyboard' && linkList.input.modType != 'instrument') {
                alert('Keyboard must connect to a instrument Firstly');
                linkList[type] = undefined;
                return;
            }

            linkList.output.soundNode.connect(linkList.input.soundNode);
            if (type == 'output') {
                this.output = linkList.input;
                linkList.input.input = this;
            }

            if (type == 'input') {
                this.input = linkList.output;
                linkList.output.output = this;
            }

            this.drawLine(type);
            pixi.cleanLinkList();

        } catch (err) {
            alert(err);
            pixi.refreshLinkList();
        }
    }
}

export default Module