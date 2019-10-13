function t(t) {
    return t && t.__esModule ? t : {
        default: t
    }
}
const app = getApp();
var o = getApp();
import http from '../../util/request.js';
function e() {
    var t = {
        region: "" + o.
        default.qiniu,
        uptokenURL: o.
        default.basePath + "/qiniu.html?siteid=" + o.
        default.siteid,
        domain: "" + o.
        default.qnimgUrl,
        shouldUseQiniuFileName: !1
    };
    i.
    default.init(t)
}
var a = t(require("../../../utils/recorder.js")),
    i = t(require("../../../utils/qiniuUploader")),
    o = t(require("../../../etc/config")),
    s = getApp(),
    r = require("../../../utils/WxNotificationCenter.js"),
    n = void 0,
    l = void 0,
    c = void 0,
    d = void 0,
    u = void 0,
    p = wx.createInnerAudioContext();


const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({
    data: {
        record: {
            times: "00",
            status: "start",
            bottext: "点击开始录制语音介绍",
            recordFile: null
        },
        playType: "播放",
        playTimes: "00",
        voice_times:0,
        no:0,
        voiceStatus:0,
    },
    onLoad: function() {
        this.$wuxToast = s.Wux().$wuxToast;
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          this.setData({ user: data, avatar: data.avatar });
        });
        http.get('config').then(data => {
          this.setData({ config: data });
        });
    },
    voicetouchend: function (t) {
      var e = this;
      var a = this;
      recorderManager.stop();
      recorderManager.onStop((res) => {
        var path = res.tempFilePath;
        var o = (res.duration / 1e3).toFixed(1);
        a.setData({
          voiceStatus: 1,
          duration: o,
          audioUrl: path
        });
      })
    },
    recording: function() {
        var a = this;
        a.setData({no:1});
        const options = {
          duration: 10000,//指定录音的时长，单位 ms
          sampleRate: 16000,//采样率
          numberOfChannels: 1,//录音通道数
          encodeBitRate: 96000,//编码码率
          format: 'mp3',//音频格式，有效值 aac/mp3
          frameSize: 50,//指定帧大小，单位 KB
        }
        //开始录音
        recorderManager.start(options);
        recorderManager.onStart(() => {
          console.log('recorder start')
        });
        //错误回调
        recorderManager.onError((res) => {
          console.log(res);
        })
        /*
        "start" == t.data.record.status ? (c = 0, d = setInterval(function() {
            c++, t.data.record.times = c < 10 ? "0" + c : c, t.setData({
                "record.times": t.data.record.times
            }), c >= 60 && (clearInterval(d), t.recordStop())
        }, 1e3), t.setData({
            "record.status": "stop",
            "record.bottext": "录音时长为2秒~60秒哦！"
        }), a.
        default.start(function(t) {
            console.log(t.tempFilePath), wx.saveFile({
                tempFilePath: t.tempFilePath,
                success: function(t) {
                    u = t.savedFilePath
                }
            })
        })) : "stop" == t.data.record.status && (clearInterval(d), c <= 2 ? this.recordEmpty() : this.recordStop())
        */
    },
    audioPlay: function() {
      var e = this;
      innerAudioContext.autoplay = true
      innerAudioContext.src = e.data.audioUrl,
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },
    recordStop: function() {
        a.
        default.stop(), this.setData({
            "record.status": "end",
            "record.times": "00"
        })
    },
    recordReset: function() {
        this.setData({
            no: 0,
            voiceStatus: 0,
            
        })
    },
    recordEmpty: function() {
        this.setData({
            "record.status": "empty",
            "record.times": "00"
        })
    },
    recordSave: function() {
        var t = this;
        var s = wx.getStorageSync("user").id || 13;
        wx.uploadFile({
          url: app.globalData.mp3,
          filePath: t.data.audioUrl,
          name: "fileupload",
          formData: {
            user: s + "|" + t.data.duration,
          },
          success: function (res) {
            console.log(JSON.parse(res.data).data.path);
            console.log(s);
            console.log(t.data.duration);
            http.post('editmp3', { uid: s, path: JSON.parse(res.data).data.path, duration: t.data.duration, }).then(data => {
              wx.showToast({
                icon: 'none',
                title: '设置成功',
                duration: 2000,
              });
              setTimeout(function(){
                wx.navigateTo({
                  url: '../index',
                })
              },2000);
              return false;

            });
          }
        });
    },
    uploadDIY: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e(), i.
        default.upload(t, function(t) {
            a(t.imageURL)
        })
    },
    showToastSuc: function(t, e) {
        this.$wuxToast.show({
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "" + t,
            success: function() {
                return e
            }
        })
    },
    showToastErr: function(t) {
        this.$wuxToast.show({
            type: "forbidden",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    showToastCancel: function(t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    getSavedFileList: function() {
        wx.getSavedFileList({
            success: function(t) {
                console.log(t.fileList)
            }
        })
    },
    removeSavedFile: function() {
        u && wx.getSavedFileList({
            success: function(t) {
                t.fileList.length > 0 && wx.removeSavedFile({
                    filePath: t.fileList[0].filePath,
                    complete: function(t) {
                        console.log(t)
                    }
                })
            }
        })
    },
    onUnload: function() {
        clearInterval(d), this.recordStop(), this.removeSavedFile(), this.getSavedFileList()
    },
    onHide: function() {
        clearInterval(d), this.recordStop(), this.removeSavedFile(), this.getSavedFileList()
    }
});