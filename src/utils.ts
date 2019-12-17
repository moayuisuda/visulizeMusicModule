import * as PIXI from 'pixi.js'


function getColorTexture(color: number): PIXI.Texture {
    
    let colorStr = color.toString(16);
    
    colorStr = '#' + colorStr;
    let canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    let ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = colorStr;
        ctx.strokeStyle = colorStr;
        ctx.rect(0, 0, 1, 1);
        ctx.stroke();

        return PIXI.Texture.from(canvas);;
    } else {
        throw 'can not get 2d context';
    }


}

export {
    getColorTexture
}