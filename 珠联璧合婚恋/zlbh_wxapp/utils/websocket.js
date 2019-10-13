var e = "wss://ws35.cn.ronghub.com";
module.exports = {
    connect: function(n, c) {
        wx.connectSocket({
            url: e + "?username=" + n.nickName
        }), wx.onSocketMessage(c)
    },
    send: function(e) {
        wx.sendSocketMessage({
            data: e
        })
    }
};