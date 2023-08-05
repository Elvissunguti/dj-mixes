import { createContext } from "react";


const MixContext = createContext({
    currentMix: null,
    setCurrentMix: (currentMix) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
});

export default MixContext;