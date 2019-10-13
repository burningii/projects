Page({
    data: {
        src: ""
    },
    onLoad: function(t) {
        this.setData({
            src: decodeURIComponent(t.src)
        });
    }
});