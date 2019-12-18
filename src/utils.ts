import * as PIXI from 'pixi.js'


function getColorTexture(color: number, ifCircle?: boolean): PIXI.Texture {
    
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

        if(ifCircle) 
        {   
            canvas.width = 10;
            canvas.height = 10;
            ctx.beginPath();
            ctx.fillStyle = colorStr;
            ctx.strokeStyle = colorStr;
            ctx.arc(5, 5, 5, 0, 2 * Math.PI, false);
        }
        else ctx.rect(0, 0, 1, 1);
        ctx.stroke();
        ctx.fill();


        return PIXI.Texture.from(canvas);;
    } else {
        throw 'can not get 2d context';
    }


}

export {
    getColorTexture
}