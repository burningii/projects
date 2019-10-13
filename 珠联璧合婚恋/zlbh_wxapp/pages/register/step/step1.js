function t(t) {
    return t && t.__esModule ? t : {
        default: t
    } 
}
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, e = t(require("../../../helpers/WxValidate")),
    n = t(require("../../../json/cate.js")),
    i = t(require("../../../etc/config")), 
    o = getApp(),
    r = require("../../../utils/auth.js"),
    c = require("../../../utils/WxNotificationCenter.js");
const app = getApp()
import http from '../../util/request.js';    
Page({
    data: {
        userinfo: {
            nickName: ""
        },
        form: {
            nickName: "",
            birth: "",
            workCityString: ""
        },
        logged: 0,
        msglogin: 0,
        auth1:0,
        auth2: 0,
        mobile: {
            number: "",
            phone_verify_status: !1,
            phone_verify_expiry_time: 60,
            phone_verify_text: "获取验证码"
        },
        showModalStatus: [!1],
        isload:0,
        cate:null,
        citys:[],
        //地址帅选 start
        address1: "请选择",
        cityindex: 0,
        areaindex: 0,
        city: [],
        multiIndex: [0, 0],
        area: 0,
        //地址帅选 end
    },
    onLoad: function(t) { 
        var a = this;
        http.get('user',{uid:wx.getStorageSync("user").id}).then(data => {
          a.setData({user:data});
          if(data.mbind == 0){
            a.setData({ msglogin: 1, auth1:1});
          }
          a.setData({ avatar: data.avatar,"form":data});
        });
        http.get('config').then(data => {
          a.setData({ citys: data.citys, xinyang: data.xinyang});
        })  
        var def = n.default;
        a.setData({ cate: def});
        console.log('被渲染数据为: ')
        console.log(a.data.cate)
        console.log(n)
        a.getCate();
        this.getcity();
        this.$wuxPickerCity = o.Wux().$wuxPickerCity, this.$wuxToast = o.Wux().$wuxToast;
        console.log('userInfo: ')
        console.log(a.data.user)
    },
    onShow: function() {
       
    },
    renderForm: function() {
        var t = this;
        this.info.getAsync({
            action: "do"
        }).then(function(a) {
            if (200 == a.code) {
                var e = t.userinfo = a.data.userinfo;
                t.getCate();
                var n = t.data.cate;
                n.genderData.forEach(function(t, a) {
                    t.value == e.gender && (n.genderActionIndex = a)
                }), n.heightData.forEach(function(t, a) {
                    t.value === e.height && (n.heightActionIndex = a)
                }), n.salaryData.forEach(function(t, a) {
                    t.value === e.salary && (n.salaryActionIndex = a)
                }), n.eduData.forEach(function(t, a) {
                    t.value === e.education && (n.eduActionIndex = a)
                }), n.marriageData.forEach(function(t, a) {
                    t.value === e.marriage && (n.marriageActionIndex = a)
                }), n.childrenData.forEach(function(t, a) {
                    t.value === e.children && (n.childrenActionIndex = a)
                }), n.wantchildrenData.forEach(function(t, a) {
                    t.value == e.wantChildren && (n.wantchildrenActionIndex = a)
                }), n.occupationData.forEach(function(t, a) {
                    t.value == e.occupation && (n.occupationActionIndex = a)
                }), n.vehicleData.forEach(function(t, a) {
                    t.value == e.vehicle && (n.vehicleActionIndex = a)
                }), n.houseData.forEach(function(t, a) {
                    t.value == e.house && (n.houseActionIndex = a)
                }), n.weightData.forEach(function(t, a) {
                    t.value == e.weight && (n.weightActionIndex = a)
                }), n.bodyData.forEach(function(t, a) {
                    t.value == e.body && n.bodyActionIndex
                }), n.smokingData.forEach(function(t, a) {
                    t.value == e.smoking && (n.smokingActionIndex = a)
                }), n.drinkingData.forEach(function(t, a) {
                    t.value == e.drinking && (n.drinkingActionIndex = a)
                }), n.constellationData.forEach(function(t, a) {
                    t.value == e.constellation && (n.constellationActionIndex = a)
                }), n.stockData.forEach(function(t, a) {
                    t.value == e.stock && (n.stockActionIndex = a)
                }), n.marryData.forEach(function(t, a) {
                    t.value == e.marryDate && (n.marryActionIndex = a)
                }), n.showinfoData.forEach(function(t, a) {
                    t.value == e.showinfoData && (n.showinfoActionIndex = a)
                }), e.phone || (t.data.showModalStatus[0] = !0), t.setData({
                    form: e,
                    cate: n,
                    logged: 1,
                    showModalStatus: t.data.showModalStatus
                })
            }
        })
    },
    didNotification: function(t) {
        this.setData({
            "form.avatarUrl": t.avatar
        })
    },
    userAuthorization: function() {
        /*
        o.WxService.getStorageSync("loginSession") ? "object" == a(o.WxService.getStorageSync("loginSession")) ? (o.WxService.removeStorageSync("loginSession"), r.authorization()) : o.WxService.getStorageSync("us") ? wx.reLaunch({
            url: "/pages/index/index"
        }) : (wx.getStorageSync("userlocation") || r.wechatAreaData(), this.getUserInfo()) : o.WxService.navigateTo("/pages/decrypt/index")
        */

    },
    uploadAvatar: function() {
        var t = this;
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            let siteroot = app.siteInfo.siteroot;
            siteroot = siteroot.replace('app/index.php', 'web/index.php');
            let upurl = siteroot + '?i=' + app.siteInfo.uniacid + '&c=utility&a=file&do=upload&thumb=0';
            wx.uploadFile({
              url: upurl,
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {},
              header: {},
              success: function (res) {
                t.setData({ "form.avatar": JSON.parse(res.data).url });
                wx.hideToast();
              },
            })
          },
        })
    },
    chooseImage: function(t) {
        var a = ["album", "camera"];
        t && (a = [t]), wx.chooseImage({
            sizeType: ["original", "compressed"],
            sourceType: a,
            count: 1,
            success: function(t) {
                var a = t.tempFilePaths[0];
                wx.navigateTo({
                    url: "/pages/userphoto/upload/upload?src=" + a
                })
            }
        })
    },
    getNickname: function(t) {
        this.setData({
            "userInfo.nickName": t.detail.value
        })
    },
    getWechat: function(t) {
        this.setData({
            "userInfo.wechat": t.detail.value
        })
    },
    getQq: function(t) {
        this.setData({
            "userInfo.qq": t.detail.value
        })
    },
    getUserInfo: function() {
        /*
        var t = this,
            a = o.globalData.userInfo;
        a ? this.setData({
            "userInfo.nickName": a.nickName
        }) : o.getUserInfo().then(function(a) {
            t.setData({
                "userInfo.nickName": a.nickName
            })
        })
        */
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        })
    },
    //地址帅选 start
    bindMultiPickerColumnChange: function (t) {
      console.log("修改的列为", t.detail.column, "，值为", t.detail.value);
      var a = this, e = {
        city: a.data.city,
        multiIndex: a.data.multiIndex
      };
      e.multiIndex[t.detail.column] = t.detail.value;
      var i = a.data.city_id;
      switch (t.detail.column) {
        case 0:
          var n = a.data.city[0][t.detail.value].id;
          i != n && a.searchClassInfo(n), e.multiIndex[1] = 0;
      }
    },
    bindMultiPickerChange: function (t) {
      var a = this;
      if (t.detail.value[0] == 0) {
        a.setData({
          address1: '请选择'
        });
      } else {
        a.setData({
          "form.workCityString": a.data.city[0][t.detail.value[0]].name + ',' + a.data.city[1][t.detail.value[1]].name
        });
      }
    },
    searchClassInfo: function (t) {
      var a = this;
      http.get("getcity", { pid: t }).then(data => {
        a.setData({
          city: data
        });
      });
    },
    getcity: function () {
      var t = this;
      http.get("getcity", { pid: 0 }).then(data => {
        t.setData({
          city: data
        });
      });
    },
    //地址帅选 end
    getCate: function() {
        for (var t = this.data.cate, a = [{
            value: 0,
            name: "请选择"
        }], e = [{
            value: 0,
            name: "请选择"
        }], i = 150; i <= 210; i++) a.push({
            value: i,
            name: i + "cm"
        });
        for (i = 30; i <= 150; i++) 30 == i && e.push({
            value: i,
            name: i + "以下kg"
        }), e.push({
            value: i,
            name: i + "kg"
        }), 150 == i && e.push({
            value: i,
            name: i + "以上kg"
        });
        t = {
            genderData: n.
            default.genderData,
            genderArr: n.
            default.genderData.map(function(t) {
                return t.name
            }),
            genderActionIndex: 0,
            constellationData: n.
            default.constellationData,
            constellationArr: n.
            default.constellationData.map(function(t) {
                return t.name
            }),
            constellationActionIndex: 0,
            heightData: a,
            heightArr: a.map(function(t) {
                return t.name
            }),
            heightActionIndex: 0,
            weightData: e,
            weightArr: e.map(function(t) {
                return t.name
            }),
            weightActionIndex: 0,
            salaryData: n.
            default.salaryData,
            salaryArr: n.
            default.salaryData.map(function(t) {
                return t.name
            }),
            salaryActionIndex: 0,
            eduData: n.
            default.eduData,
            eduArr: n.
            default.eduData.map(function(t) {
                return t.name
            }),
            eduActionIndex: 0,
            marriageData: n.
            default.marriageData,
            marriageArr: n.
            default.marriageData.map(function(t) {
                return t.name
            }),
            marriageActionIndex: 0,
            childrenData: n.
            default.childrenData,
            childrenArr: n.
            default.childrenData.map(function(t) {
                return t.name
            }),
            childrenActionIndex: 0,
            bodyData: n.
            default.bodyData,
            bodyArr: n.
            default.bodyData.map(function(t) {
                return t.name
            }),
            bodyActionIndex: 0,
            wantchildrenData: n.
            default.wantchildrenData,
            wantchildrenArr: n.
            default.wantchildrenData.map(function(t) {
                return t.name
            }),
            wantchildrenActionIndex: 0,
            occupationData: n.
            default.occupationData,
            occupationArr: n.
            default.occupationData.map(function(t) {
                return t.name
            }),
            occupationActionIndex: 0,
            vehicleData: n.
            default.vehicleData,
            vehicleArr: n.
            default.vehicleData.map(function(t) {
                return t.name
            }),
            vehicleActionIndex: 0,
            houseData: n.
            default.houseData,
            houseArr: n.
            default.houseData.map(function(t) {
                return t.name
            }),
            houseActionIndex: 0,
            drinkingData: n.
            default.drinkingData,
            drinkingArr: n.
            default.drinkingData.map(function(t) {
                return t.name
            }),
            drinkingActionIndex: 0,
            smokingData: n.
            default.smokingData,
            smokingArr: n.
            default.smokingData.map(function(t) {
                return t.name
            }),
            smokingActionIndex: 0,
            stockData: n.
            default.stockData,
            stockArr: n.
            default.stockData.map(function(t) {
                return t.name
            }),
            stockActionIndex: 0,
            marryData: n.
            default.marryData,
            marryArr: n.
            default.marryData.map(function(t) {
                return t.name
            }),
            marryActionIndex: 0,
            showinfoData: n.
            default.showinfoData,
            showinfoArr: n.
            default.showinfoData.map(function(t) {
                return t.name
            }),
            showinfoActionIndex: 0
        }, this.setData({
            cate: t
        })
    },
    onWorkCity: function(t) {
      this.setData({
        "form.workCityString": this.data.citys[t.detail.value],
      })
    },
    onBirth: function(t) {
        this.setData({
            "form.birth": t.detail.value
        })
    },
    onMarry: function(t) {
        this.setData({
            "cate.marryActionIndex": t.detail.value,
            "form.marryDateString": this.data.cate.marryData[t.detail.value].name,
            "form.marryDate": this.data.cate.marryData[t.detail.value].value
        })
    },
    onShowinfo: function(t) {
        this.setData({
            "cate.showinfoActionIndex": t.detail.value,
            "form.showinfoDataString": this.data.cate.showinfoData[t.detail.value].name,
            "form.showinfoData": this.data.cate.showinfoData[t.detail.value].value
        })
    },
    onStock: function(t) {
        this.setData({
            "cate.stockActionIndex": t.detail.value,
            "form.stockString": this.data.cate.stockData[t.detail.value].name,
            "form.stock": this.data.cate.stockData[t.detail.value].value
        })
    },
    onConstellation: function(t) {
        this.setData({
            "cate.constellationActionIndex": t.detail.value,
            "form.constellationString": this.data.cate.constellationData[t.detail.value].name,
            "form.constellation": this.data.cate.constellationData[t.detail.value].value
        })
    },
    onDrinking: function(t) {
        this.setData({
            "cate.drinkingActionIndex": t.detail.value,
            "form.drinkingString": this.data.cate.drinkingData[t.detail.value].name,
            "form.drinking": this.data.cate.drinkingData[t.detail.value].value
        })
    },
    onSmoking: function(t) {
        this.setData({
            "cate.smokingActionIndex": t.detail.value,
            "form.smokingString": this.data.cate.smokingData[t.detail.value].name,
            "form.smoking": this.data.cate.smokingData[t.detail.value].value
        })
    },
    onPhone: function() {
        return wx.showModal({
            title: "温馨提示",
            content: "请先保存好其它信息",
            cancelText: "去保存",
            confirmText: "已保存",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/u/settings/editmobile"
                }) : t.cancel && console.log("用户点击取消")
            }
        })
    },
    onGender: function(t) {
        var a = this,
            e = t.currentTarget.dataset.id || 2;
        return o.WxService.showModal({
            title: "提示",
            content: "提交后性别不可更改哦~",
            cancelText: "再想想",
            confirmText: "确定"
        }).then(function(t) {
            1 == t.confirm && a.setData({
                "cate.genderActionIndex": e,
                "form.genderString": a.data.cate.genderData[e].name,
                "form.gender": a.data.cate.genderData[e].value
            })
        })
    },
    onWeight: function(t) {
        this.setData({
            "cate.weightActionIndex": t.detail.value,
            "form.weight": this.data.cate.weightData[t.detail.value].value
        })
    },
    onHeight: function(t) {
        this.setData({
            "cate.heightActionIndex": t.detail.value,
            "form.height": this.data.cate.heightData[t.detail.value].value,
            "form.heightString": this.data.cate.heightData[t.detail.value].name
        })
    },
    onSalary: function(t) {
        this.setData({
            "cate.salaryActionIndex": t.detail.value,
            "form.salaryString": this.data.cate.salaryData[t.detail.value].name,
            "form.salary": this.data.cate.salaryData[t.detail.value].value
        })
    },
    onEdu: function(t) {
        this.setData({
            "cate.eduActionIndex": t.detail.value,
            "form.educationString": this.data.cate.eduData[t.detail.value].name,
            "form.education": this.data.cate.eduData[t.detail.value].value
        })
    },
    onMarriage: function(t) {
        this.setData({
            "cate.marriageActionIndex": t.detail.value,
            "form.marriageString": this.data.cate.marriageData[t.detail.value].name,
            "form.marriage": this.data.cate.marriageData[t.detail.value].value
        })
    },
    onChildren: function(t) {
        this.setData({
            "cate.childrenActionIndex": t.detail.value,
            "form.childrenString": this.data.cate.childrenData[t.detail.value].name,
            "form.children": this.data.cate.childrenData[t.detail.value].value
        })
    },
    onWantchildren: function(t) {
        this.setData({
            "cate.wantchildrenActionIndex": t.detail.value,
            "form.wantChildrenString": this.data.cate.wantchildrenData[t.detail.value].name,
            "form.wantChildren": this.data.cate.wantchildrenData[t.detail.value].value
        })
    },
    onXin6yang: function (t) {
      this.setData({
        "form.xinyang": this.data.xinyang[t.detail.value],
      })
    },
    onOccupation: function(t) {
        this.setData({
            "cate.occupationActionIndex": t.detail.value,
            "form.occupationString": this.data.cate.occupationData[t.detail.value].name,
            "form.occupation": this.data.cate.occupationData[t.detail.value].value
        })
    },
    onVehicle: function(t) {
        this.setData({
            "cate.vehicleActionIndex": t.detail.value,
            "form.vehicleString": this.data.cate.vehicleData[t.detail.value].name,
            "form.vehicle": this.data.cate.vehicleData[t.detail.value].value
        })
    },
    onHouse: function(t) {
        this.setData({
            "cate.houseActionIndex": t.detail.value,
            "form.houseString": this.data.cate.houseData[t.detail.value].name,
            "form.house": this.data.cate.houseData[t.detail.value].value
        })
    },
    onBody: function(t) {
        this.setData({
            "cate.bodyActionIndex": t.detail.value,
            "form.bodyString": this.data.cate.bodyData[t.detail.value].name,
            "form.body": this.data.cate.bodyData[t.detail.value].value
        })
    },
    submitForm: function(t) {
        var a = this;
        var e = Object.assign(this.data.form, t.detail.value);
        console.log(e);
        e.formId = t.detail.formId;
        if("" == e.nickname){
          a.showToastErr("昵称不能为空");
          return false;
        }
        if ("" == e.gender) {
          a.showToastErr("请选择性别");
          return false;
        }
        if ("" == e.birth) {
          a.showToastErr("请选择出生年月");
          return false;
        }
        if ("" == e.heightString) {
          a.showToastErr("请选择身高"); 
          return false;
        }
        if (e.salaryString == ""){
          a.showToastErr("请选择月收入");
          return false;
        }
        if (e.educationString == "") {
          a.showToastErr("请选择学历");
          return false;
        }
        if (e.workCityString == "") {
          a.showToastErr("请选择工作地区");
          return false;
        }
        if (e.marriageString == "") {
          a.showToastErr("请选择婚姻状况");
          return false;
        }
        if (e.childrenString == "") {
          a.showToastErr("请选择有没有小孩");
          return false;
        }
        if (e.occupationString == "") {
          a.showToastErr("请选择职业");
          return false;
        }
        if (e.wantChildrenString == "") {
          a.showToastErr("请选择是否想要小孩");
          return false;
        } 
        if (e.vehicleString == "") {
          a.showToastErr("请选择买车情况");
          return false;
        }
        if (e.houseString == "") {
          a.showToastErr("请选择买房情况");
          return false;
        }
        if (e.wechat == "" &&  (e.qq == "")) {
          a.showToastErr("联系方式必须填写一项");
          return false;
        }
        http.post('saveuser1',e).then(data => {
          a.showToastSuc("保存成功");
          setTimeout(function () {
            wx.navigateTo({
              url: './step2',
            })
          }, 2500);
        });
    },
    showToastSuc: function(t) {
        wx.showToast({
          title: t,
          duration:1500,
          icon : 'sucess'
        });
    },
    showToastErr: function(t) {
      wx.showToast({
        title: t,
        duration: 1500,
        icon: "none"
      });
    },
    showToastCancel: function(t) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + t
        })
    },
    getPhoneReg: function(t) {
        var a = this;
        a.setData({ auth1: 0, auth2: 1});
    },
    getPhoneReg2: function (t) {
      var a = this;
      a.setData({ auth1: 1, auth2: 0 });
    },
    getPhoneNumber: function(e) {
       
        var t = this;
        wx.login({
          success: function (o) {
            var d = {
              code: o.code,
              vi: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              session_key: wx.getStorageSync("user").session_key,
              uid: wx.getStorageSync("user").id
            }
            http.post('userset', d).then(data => {
              t.setData({ mobile: data });
              wx.showToast({
                title: '授权成功',
                duration:2500,
                icon:"none",
              })
              t.setData({
                msglogin: 0
              })
            });  
          }
        })
    },
    submitForm_regquick: function(t) {
        var a = this,
            e = this,
            n = (this.data.id, t.detail.value);
        if (!this.WxValidate_regquick.checkForm(t)) {
            var i = this.WxValidate_regquick.errorList[0];
            return e.showToastErr(i.msg), !1
        }
        n.action = "reg", this.regquick.saveAsync(n).then(function(t) {
            200 == t.code ? a.showToastSuc("授权成功", setTimeout(function() {
                a.data.showModalStatus[0] = !1, a.setData({
                    showModalStatus: a.data.showModalStatus
                })
            }, 1e3)) : a.showToastCancel(t.data)
        })
    },
    bindMobile: function(t) {
        this.setData({
            "mobile.number": t.detail.value
        })
    },
    getChangeCode: function(t) {
        var a = this,
            e = this,
            n = this.data.mobile.number,
            i = /^(13|14|15|16|17|18|19)[0-9]{9}$/,
            o = {
                mobile: this.data.mobile.number
            };
        i.test(n) ? 0 == this.data.mobile.phone_verify_status && this.mobileVerify.saveAsync(o).then(function(t) {
            200 != t.code ? e.showToastErr(t.data) : a.getRecode()
        }) : e.showToastErr("请填写正确手机号")
    },
    getRecode: function() {
        var t = this,
            a = parseInt(t.data.mobile.phone_verify_expiry_time);
        t.setData({
            "mobile.phone_verify_status": !0
        }), a > 0 && t.setData({
            "mobile.phone_verify_text": a + "秒后重发"
        });
        var e = setInterval(function() {
            --a > 0 ? t.setData({
                "mobile.phone_verify_text": a + "秒后重发"
            }) : (t.setData({
                "mobile.phone_verify_status": !1,
                "mobile.phone_verify_text": "重新获取"
            }), clearInterval(e))
        }, 1e3)
    },
    onUnload: function() {
        c.removeNotification("UserNotification", this)
    }
});