import * as PIXI from 'pixi.js'
import Tween from '@tweenjs/tween.js'

let App = PIXI.Application;
let Loader = PIXI.Loader;
let textures = PIXI.utils.TextureCache;
let linkList = Object.create(null);
let app: PIXI.Application;
let loader: PIXI.Loader;

function initGlobal(domStr: string) {

    Object.defineProperty(linkList, 'input', {
        set(val) {
            if (!val) {
                this._input.inputTip.texture = this._input.unlinkTexture;
                this._input = val;
            } else {
                this._input = val;
                this._input.inputTip.texture = this._input.onLinkTexture;
            }
        },

        get() {
            return this._input;
        }
    })

    Object.defineProperty(linkList, 'output', {
        set(val) {
            if (!val) {
                this._output.outputTip.texture = this._output.unlinkTexture;
                this._output = val;
            } else {
                this._output = val;
                this._output.outputTip.texture = this._output.onLinkTexture;
            }
        },

        get() {
            return this._output;
        }
    })


    app = new App({
        /**
         * 这里的width和height是视口的宽高，container的宽高是自动由在里面元素的
         * 边沿范围来计算的，container内的元素可以超出container
         */
        resizeTo: document.querySelector(domStr) as HTMLElement,
        antialias: true,
        resolution: 1,
        transparent: true
    });

    app.stage.sortableChildren = true;

    loader = new Loader();

    document.querySelector(domStr).appendChild(app.view);

    let resize = function () {
        app.resize();
    }

    window.addEventListener('resize', resize);
}

function refreshLinkList() {
    linkList.input = undefined;
    linkList.output = undefined;
}

function cleanLinkList() {
    for(let i in linkList) {
        linkList[i] = undefined;
    }
}

export {
    initGlobal,
    textures,
    app,
    loader,
    linkList,
    cleanLinkList,
    refreshLinkList,
    Tween
}