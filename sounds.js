class SoundEngine {
    constructor() {
        this.sounds = {
            pop: {
                url: "Cartoon-pop.mp3",
                buffer:""
            }
        };
        this.soundContext = new AudioContext();

        for (var key in this.sounds) {
            this.loadSound(key);
        }
        
    }
    loadSound(name) {
        var sound = this.sounds[name];
        var url = sound.url;
        var buffer = sound.buffer;
        var request = new XMLHttpRequest();
        
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = () => this.onSoundLoaded(this.soundContext, request, sound);

        // var reader = new FileReader();

        request.send();
    }

    onSoundLoaded(soundContext, request, sound){
        soundContext.decodeAudioData(request.response, function (newBuffer) {
            sound.buffer = newBuffer;
        });
    }
        
    playSound = function (name, options) {
        
        var sound = this.sounds[name];
        var soundVolume = sound.volume || 1;
        var buffer = sound.buffer;
        if (buffer) {
            var source = this.soundContext.createBufferSource();
            source.buffer = buffer;
            var volume = this.soundContext.createGain();
            if (options) {
                if (options.volume) {
                    volume.gain.value = soundVolume * options.volume;
                }
            }
            else {
                volume.gain.value = soundVolume;
            }
            volume.connect(this.soundContext.destination);
            source.connect(volume);
            source.start(0);
        }
        
    }
}

