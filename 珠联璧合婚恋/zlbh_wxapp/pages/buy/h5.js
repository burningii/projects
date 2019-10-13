Page({
    data: {
        logged: 0
    },
    onLoad: function(t) {
        t.url && (this.data.web_src = decodeURIComponent(t.url), console.log(this.data.web_src), this.setData({
            logged: 1,
            web_src: this.data.web_src
        }))
    },
    onShow: function() {}
});