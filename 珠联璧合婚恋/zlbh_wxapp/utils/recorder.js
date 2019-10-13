var t = wx.getRecorderManager(),
    o = {
        duration: 6e4,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192e3,
        format: "mp3"
    };
module.exports = {
    start: function(e) {
        t.onStop(function(t) {
            e(t)
        }), t.start(o)
    },
    stop: function() {
        t.stop()
    },
    duration: function() {
        console.log(t)
    }
};