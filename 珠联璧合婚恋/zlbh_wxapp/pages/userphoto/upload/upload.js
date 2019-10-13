function o(o) {
    return o && o.__esModule ? o : {
        default: o
    }
}
function e() {
    var o = {
        region: "" + a.
        default.qiniu,
        uptokenURL: a.
        default.basePath + "/qiniu.html?siteid=" + a.
        default.siteid,
        domain: "" + a.
        default.qnimgUrl,
        shouldUseQiniuFileName: !1
    };
    n.
    default.init(o)
}
    var n = o(require("../../../utils/qiniuUploader")),
    a = o(require("../../../etc/config")),
    i = getApp(),
    r = require("../../../utils/WxNotificationCenter.js"),
    c = wx.getSystemInfoSync(),
    u = c.windowWidth,
    s = c.windowHeight - 50,
    l = !1;
Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: u,
            height: s,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (u - 300) / 2,
                y: (s - 300) / 2,
                width: 300,
                height: 300
            }
        }
    },
    touchStart: function(o) {
        this.wecropper.touchStart(o)
    },
    touchMove: function(o) {
        this.wecropper.touchMove(o)
    },
    touchEnd: function(o) {
        this.wecropper.touchEnd(o)
    },
    getCropperImage: function() {
        var o = this;
        l || (l = !0, wx.showToast({
            title: "上传中",
            icon: "loading",
            duration: 2e4
        }), this.wecropper.getCropperImage(function(e) {
            e ? o.uploadDIY(e, function(e) {
                "" == e && null == e || i.HttpResource("member/saveavatar.html").saveAsync({
                    files: e
                }).then(function(e) {
                    wx.hideToast(), l = !1, o.avatarurl = e.data.url, wx.navigateBack()
                })
            }) : (wx.hideToast(), l = !1, console.log("获取图片失败，请稍后重试"))
        }))
    },
    uploadDIY: function(o) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e(), n.
        default.upload(o, function(o) {
            t(o.imageURL)
        })
    },
    uploadTap: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                var t = e.tempFilePaths[0];
                o.wecropper.pushOrign(t)
            }
        })
    },
    onLoad: function(o) {
        var e = this.data.cropperOpt;
        o.src && (console.log(o.src), e.src = o.src, new t.
        default (e).on("ready", function(o) {
            console.log("wecropper is ready for work!")
        }).on("beforeImageLoad", function(o) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", o), wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            })
        }).on("imageLoad", function(o) {
            console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast()
        }).on("beforeDraw", function(o, e) {
            console.log("before canvas draw,i can do something"), console.log("current canvas context:", o)
        }).updateCanvas())
    },
    onUnload: function() {
        r.postNotificationName("UserNotification", {
            avatar: this.avatarurl
        })
    }
});