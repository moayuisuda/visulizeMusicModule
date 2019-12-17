import Keyboard from './Components/Keyboard'
import Master from './Components/Master'
import Sampler from './Components/Instrument/Sampler'
import MoaSynth from './Components/Instrument/MoaSynth'
import Module from './Components/Module'

function initStage() {

    let sampler = new Sampler();
    sampler.container.position.set(700, 500);

    let master = new Master();
    master.container.position.set(1200, 400);

    let moaSynth = new MoaSynth();
    moaSynth.container.position.set(100, 300);

    let keyboard = new Keyboard();
    keyboard.container.position.set(100, 100);

    sampler.readyHook = () => {
        Module.manualConnect(keyboard, moaSynth);
        Module.manualConnect(moaSynth, master);
    }

}

export {
    initStage
}