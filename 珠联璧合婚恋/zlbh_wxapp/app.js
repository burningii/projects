function e(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var t = e(require("components/wux")),
  r = e(require("helpers/HttpResource")),
  n = e(require("helpers/HttpService")),
  u = e(require("helpers/WxService")),
  i = e(require("helpers/Tools")),
  o = e(require("etc/config")),
  s = require("./utils/wechat.js");

App({
  util: require("we7/resource/js/util.js"),
  siteInfo: require("siteinfo.js"),
  globalData: {
    url: "",
    bgurl: "",
    filter: [],
    id: 0,
  },
  onLaunch: function () {
    wx.login({
      success: function (o) {
        wx.setStorageSync("code", o.code);
      }
    });
    this.globalData.url = this.siteInfo.siteroot.split("app")[0] + "attachment/";
    this.globalData.bgurl = this.siteInfo.siteroot.split("app")[0] + "addons/ss48_match/images";
    var siteInfo = this.siteInfo;
    this.globalData.mp3 = siteInfo.siteroot + '?i=' + siteInfo.uniacid + '&t=' + siteInfo.uniacid + '&v=' + siteInfo.version + '&from=wxapp&c=entry&a=wxapp&do=mp3&m=ss48_match';
  },
  onError: function (o) {
    console.log(o);
  },
  onShow: function () {
    
  },
  Wux: t.
    default,
  wechat: s,
  HttpResource: function (e, t, n, u) {
    return new r.
      default(e, t, n, u).init()
  },
  HttpService: new n.
    default,
  WxService: new u.
    default,
  Tools: new i.
    default
})