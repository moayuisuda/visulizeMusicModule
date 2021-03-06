import Keyboard from './Components/Keyboard'
import Master from './Components/Master'
import Sampler from './Components/Instrument/Sampler'
import MoaSynth from './Components/Instrument/MoaSynth'
import Module from './Components/Module'
import MoaReverb from  './Components/Effect/MoaReverb'
import { loaders } from 'pixi.js'

function initStage() {
    let sampler = new Sampler();
    sampler.container.position.set(400, 300);

    let master = new Master();
    master.container.position.set(1000, 300);

    let moaSynth = new MoaSynth();
    moaSynth.container.position.set(100, 300);

    let keyboard = new Keyboard();
    keyboard.container.position.set(100, 100);

    let reverb = new MoaReverb();
    reverb.container.position.set(700, 350);

    let loading = document.querySelector('.loading') as HTMLDivElement;
    loading.innerHTML = 'Loading audio resources...'
    loading.style.opacity = '0.8';

    sampler.readyHook = () => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);

        Module.manualConnect(keyboard, moaSynth);
        Module.manualConnect(moaSynth, reverb);
        Module.manualConnect(reverb, master);
    }

}

export {
    initStage
}