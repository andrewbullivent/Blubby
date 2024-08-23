class SoundEngine {
    constructor() {
        var se = this;
        se.sounds = {
            pop: {
                url: "Cartoon-pop.mp3",
                buffer:""
            }
        };
        var soundContext = new AudioContext();
        for (var key in se.sounds) {
            loadSound(key);
        }
        function loadSound(name) {
            var sound = se.sounds[name];
            var url = sound.url;
            var buffer = sound.buffer;
            var request = new XMLHttpRequest();
            debugger
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onload = function () {
                soundContext.decodeAudioData(request.response, function (newBuffer) {
                    sound.buffer = newBuffer;
                });
            };

            var reader = new FileReader();
            reader.
            request.send();
        }
        
    }
        
    playSound = function (name, options) {
        
        var sound = this.sounds[name];
        var soundVolume = sound.volume || 1;
        var buffer = sound.buffer;
        if (buffer) {
            var source = soundContext.createBufferSource();
            source.buffer = buffer;
            var volume = soundContext.createGain();
            if (options) {
                if (options.volume) {
                    volume.gain.value = soundVolume * options.volume;
                }
            }
            else {
                volume.gain.value = soundVolume;
            }
            volume.connect(soundContext.destination);
            source.connect(volume);
            source.start(0);
        }
        
    }
}

