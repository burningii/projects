function a(a) {
    return a && a.__esModule ? a : {
        default: a
    }
} 
a(require("../../../helpers/WxValidate"));
var t = a(require("../../../json/cate.js")),
    e = (a(require("../../../etc/config")), getApp()),
    n = require("../../../utils/WxNotificationCenter.js");
import http from '../../util/request.js';     
Page({
    data: { 
        noteMaxLen: 200,
        currentNoteLen: 0,
        cate: {},
        form: {},
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
      a.setData({t:t.t});
      if(t.t == 1){
        wx.setNavigationBarTitle({
          title: '择偶标准',
        })
      }else{
        wx.setNavigationBarTitle({
          title: '设置基本信息',
        })
      }
      this.getcity();
      http.get('config').then(data => {
        a.setData({ citys: data.citys, xinyang: data.xinyang});
        http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
          console.log('开始渲染用户信息123: ')
          console.log(data)
          a.setData({ user: data });
          a.setData({ avatar: data.avatar, "form": data });
          var def = t.default;
          a.setData({ cate: def });
          a.getCate();

        });
      });
     
    },
    onShow: function() {
      
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        })
    },
    getCate: function() {
        var t = this;
        var s = t.data.cat;
        s.xinyangArr = t.data.xinyang;
        for (var a = s, e = [{
            value: 0,
            name: "请选择"
        }], n = [{
            value: 0,
            name: "请选择"
        }], i = 130; i <= 210; i++) e.push({
            value: i,
            name: i + "cm"
        });
        for (i = 30; i <= 130; i++) 30 == i && n.push({
            value: i,
            name: i + "以下kg"
        }), n.push({
            value: i,
            name: i + "kg"
        }), 130 == i && n.push({
            value: i,
            name: i + "以上kg"
        });
        2 == this.data.user.gender ? t.
        default.bodyData = t.
        default.body2Data : t.
        default.bodyData = t.
        default.body1Data, a = {
            genderData: t.
            default.genderData,
            genderArr: t.
            default.genderData.map(function(a) {
                return a.name
            }),
            genderActionIndex: 0,
            constellationData: t.
            default.constellationData,
            constellationArr: t.
            default.constellationData.map(function(a) {
                return a.name
            }),
            constellationActionIndex: 0,
            heightData: e,
            heightArr: e.map(function(a) {
                return a.name
            }),
            heightActionIndex: 0,
            weightData: n,
            weightArr: n.map(function(a) {
                return a.name
            }),
            weightActionIndex: 0,
            salaryData: t.
            default.salaryData,
            salaryArr: t.
            default.salaryData.map(function(a) {
                return a.name
            }),
            salaryActionIndex: 0,
            eduData: t.
            default.eduData,
            eduArr: t.
            default.eduData.map(function(a) {
                return a.name
            }),
            eduActionIndex: 0,
            marriageData: t.
            default.marriageData,
            marriageArr: t.
            default.marriageData.map(function(a) {
                return a.name
            }),
            marriageActionIndex: 0,
            childrenData: t.
            default.childrenData,
            childrenArr: t.
            default.childrenData.map(function(a) {
                return a.name
            }),
            childrenActionIndex: 0,
            bodyData: t.
            default.bodyData,
            bodyArr: t.
            default.bodyData.map(function(a) {
                return a.name
            }),
            bodyActionIndex: 0,
            wantchildrenData: t.
            default.wantchildrenData,
            wantchildrenArr: t.
            default.wantchildrenData.map(function(a) {
                return a.name
            }),
            wantchildrenActionIndex: 0,
            occupationData: t.
            default.occupationData,
            occupationArr: t.
            default.occupationData.map(function(a) {
                return a.name
            }),
            occupationActionIndex: 0,
            vehicleData: t.
            default.vehicleData,
            vehicleArr: t.
            default.vehicleData.map(function(a) {
                return a.name
            }),
            vehicleActionIndex: 0,
            houseData: t.
            default.houseData,
            houseArr: t.
            default.houseData.map(function(a) {
                return a.name
            }),
            houseActionIndex: 0,
            drinkingData: t.
            default.drinkingData,
            drinkingArr: t.
            default.drinkingData.map(function(a) {
                return a.name
            }),
            drinkingActionIndex: 0,
            smokingData: t.
            default.smokingData,
            smokingArr: t.
            default.smokingData.map(function(a) {
                return a.name
            }),
            smokingActionIndex: 0,
            stockData: t.
            default.stockData,
            stockArr: t.
            default.stockData.map(function(a) {
                return a.name
            }),
            stockActionIndex: 0,
            marryData: t.
            default.marryData,
            marryArr: t.
            default.marryData.map(function(a) {
                return a.name
            }),
            marryActionIndex: 0,
            showinfoData: t.
            default.showinfoData,
            showinfoArr: t.
            default.showinfoData.map(function(a) {
                return a.name
            }),
            showinfoActionIndex: 0
          },this.setData({
            cate: a
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
    onWorkCity: function (t) {
      this.setData({
        "form.workCityString": this.data.citys[t.detail.value],
      })
    },
    onXin6yang:function(t){
      this.setData({
        "form.xinyang": this.data.xinyang[t.detail.value],
      })
    },
    onFromCity: function() {
        var a = this;
        this.$wuxPickerCity.init("city", {
            title: "请选择籍贯",
            value: a.data.form.hometown.split(","),
            onChange: function(a) {
                this.setData({
                    "form.hometownString": a.text,
                    "form.hometown": a.value.join(",")
                })
            }
        })
    },
    onBirth: function(a) {
        this.setData({
            "form.birth": a.detail.value
        })
    },
    onMarry: function(a) {
        this.setData({
            "cate.marryActionIndex": a.detail.value,
            "form.marryDateString": this.data.cate.marryData[a.detail.value].name,
            "form.marryDate": this.data.cate.marryData[a.detail.value].value
        })
    },
    onShowinfo: function(a) {
        this.setData({
            "cate.showinfoActionIndex": a.detail.value,
            "form.showinfoDataString": this.data.cate.showinfoData[a.detail.value].name,
            "form.showinfoData": this.data.cate.showinfoData[a.detail.value].value
        })
    },
    onStock: function(a) {
        this.setData({
            "cate.stockActionIndex": a.detail.value,
            "form.stockString": this.data.cate.stockData[a.detail.value].name,
            "form.stock": this.data.cate.stockData[a.detail.value].value
        })
    },
    onConstellation: function(a) {
        this.setData({
            "cate.constellationActionIndex": a.detail.value,
            "form.constellationString": this.data.cate.constellationData[a.detail.value].name,
            "form.constellation": this.data.cate.constellationData[a.detail.value].value
        })
    },
    onDrinking: function(a) {
        this.setData({
            "cate.drinkingActionIndex": a.detail.value,
            "form.objectIsDrinkingString": this.data.cate.drinkingData[a.detail.value].name,
            "form.drinking": this.data.cate.drinkingData[a.detail.value].value
        })
    },
    onSmoking: function(a) {
        this.setData({
            "cate.smokingActionIndex": a.detail.value,
            "form.objectIsSmokingString": this.data.cate.smokingData[a.detail.value].name,
            "form.smoking": this.data.cate.smokingData[a.detail.value].value
        })
    },
    onSex: function() {
        return e.WxService.showModal({
            title: "温馨提示",
            cancelText: "取消",
            confirmText: "知道了",
            content: "修改性别请联系客服微信，工作人员将会协助您修改"
        })
    },
    onBirthday: function() {
        return e.WxService.showModal({
            title: "温馨提示",
            cancelText: "取消",
            confirmText: "知道了",
            content: "修改生日请" + this.data.form.kf_text + "，工作人员将会协助您修改"
        })
    },
    onPhone: function() {
        return wx.showModal({
            title: "温馨提示",
            content: "请先保存好其它信息",
            cancelText: "去保存",
            confirmText: "已保存",
            success: function(a) {
                a.confirm ? wx.navigateTo({
                    url: "/pages/u/settings/editmobile"
                }) : a.cancel && console.log("用户点击取消")
            }
        })
    },
    onGender: function(a) {
        console.log(this.data.form.ischeck), 0 == !this.data.form.ischeck || this.setData({
            "cate.genderActionIndex": a.detail.value,
            "form.genderString": this.data.cate.genderData[a.detail.value].name,
            "form.gender": this.data.cate.genderData[a.detail.value].value
        })
    },
    onWeight: function(a) {
        this.setData({
            "cate.weightActionIndex": a.detail.value,
            "form.weight": this.data.cate.weightData[a.detail.value].value
        })
    },
    onHeight: function(a) {
        this.setData({
            "cate.heightActionIndex": a.detail.value,
            "form.height": this.data.cate.heightData[a.detail.value].value,
            "form.heightString": this.data.cate.heightData[a.detail.value].name
        })
    },
    onSalary: function(a) {
        this.setData({
            "cate.salaryActionIndex": a.detail.value,
            "form.salaryString": this.data.cate.salaryData[a.detail.value].name,
            "form.salary": this.data.cate.salaryData[a.detail.value].value
        })
    },
    onEdu: function(a) {
        this.setData({
            "cate.eduActionIndex": a.detail.value,
            "form.educationString": this.data.cate.eduData[a.detail.value].name,
            "form.education": this.data.cate.eduData[a.detail.value].value
        })
    },
    onMarriage: function(a) {
        this.setData({
            "cate.marriageActionIndex": a.detail.value,
            "form.marriageString": this.data.cate.marriageData[a.detail.value].name,
            "form.marriage": this.data.cate.marriageData[a.detail.value].value
        })
    },
    onChildren: function(a) {
        this.setData({
            "cate.childrenActionIndex": a.detail.value,
            "form.childrenString": this.data.cate.childrenData[a.detail.value].name,
            "form.children": this.data.cate.childrenData[a.detail.value].value
        })
    },
    onWantchildren: function(a) {
        this.setData({
            "cate.wantchildrenActionIndex": a.detail.value,
            "form.wantChildrenString": this.data.cate.wantchildrenData[a.detail.value].name,
            "form.wantChildren": this.data.cate.wantchildrenData[a.detail.value].value
        })
    },
    onOccupation: function(a) {
        this.setData({
            "cate.occupationActionIndex": a.detail.value,
            "form.occupationString": this.data.cate.occupationData[a.detail.value].name,
            "form.occupation": this.data.cate.occupationData[a.detail.value].value
        })
    },
    onVehicle: function(a) {
        this.setData({
            "cate.vehicleActionIndex": a.detail.value,
            "form.vehicleString": this.data.cate.vehicleData[a.detail.value].name,
            "form.vehicle": this.data.cate.vehicleData[a.detail.value].value
        })
    },
    onHouse: function(a) {
        this.setData({
            "cate.houseActionIndex": a.detail.value,
            "form.houseString": this.data.cate.houseData[a.detail.value].name,
            "form.house": this.data.cate.houseData[a.detail.value].value
        })
    },
    onBody: function(a) {
        this.setData({
            "cate.bodyActionIndex": a.detail.value,
            "form.bodyString": this.data.cate.bodyData[a.detail.value].name,
            "form.body": this.data.cate.bodyData[a.detail.value].value
        })
    },
    renderForm: function() {
        var a = this;
        this.info.getAsync({
            action: "do"
        }).then(function(t) {
            if (200 == t.code) {
                var e = a.userinfo = t.data.userinfo;
                a.getCate();
                var n = a.data.cate;
                n.genderData.forEach(function(a, t) {
                    a.value == e.gender && (n.genderActionIndex = t)
                }), n.heightData.forEach(function(a, t) {
                    a.value === e.height && (n.heightActionIndex = t)
                }), n.salaryData.forEach(function(a, t) {
                    a.value === e.salary && (n.salaryActionIndex = t)
                }), n.eduData.forEach(function(a, t) {
                    a.value === e.education && (n.eduActionIndex = t)
                }), n.marriageData.forEach(function(a, t) {
                    a.value === e.marriage && (n.marriageActionIndex = t)
                }), n.childrenData.forEach(function(a, t) {
                    a.value === e.children && (n.childrenActionIndex = t)
                }), n.wantchildrenData.forEach(function(a, t) {
                    a.value == e.wantChildren && (n.wantchildrenActionIndex = t)
                }), n.occupationData.forEach(function(a, t) {
                    a.value == e.occupation && (n.occupationActionIndex = t)
                }), n.vehicleData.forEach(function(a, t) {
                    a.value == e.vehicle && (n.vehicleActionIndex = t)
                }), n.houseData.forEach(function(a, t) {
                    a.value == e.house && (n.houseActionIndex = t)
                }), n.weightData.forEach(function(a, t) {
                    a.value == e.weight && (n.weightActionIndex = t)
                }), n.bodyData.forEach(function(a, t) {
                    a.value == e.body && (n.bodyActionIndex = t)
                }), n.smokingData.forEach(function(a, t) {
                    a.value == e.smoking && (n.smokingActionIndex = t)
                }), n.drinkingData.forEach(function(a, t) {
                    a.value == e.drinking && (n.drinkingActionIndex = t)
                }), n.constellationData.forEach(function(a, t) {
                    a.value == e.constellation && (n.constellationActionIndex = t)
                }), n.stockData.forEach(function(a, t) {
                    a.value == e.stock && (n.stockActionIndex = t)
                }), n.marryData.forEach(function(a, t) {
                    a.value == e.marryDate && (n.marryActionIndex = t)
                }), n.showinfoData.forEach(function(a, t) {
                    a.value == e.showinfoData && (n.showinfoActionIndex = t)
                }), a.setData({
                    form: e,
                    cate: n
                })
            }
        })
    },
    inputNickname: function(a) {
        this.setData({
            "form.nickname": a.detail.value
        })
    },
    getInfoState: function(a) {
        console.log("switch1 发生 change 事件，携带值为", a.detail.value)
    },
    submitForm: function(t) {
      var a = this;
      var e = Object.assign(this.data.form, t.detail.value);
      console.log(e);
        if(a.data.t == 1){
          /*
          if ("" == e.birth) {
            a.showToastErr("请选择出生年月");
            return false;
          }
          if ("" == e.heightString) {
            a.showToastErr("请选择身高");
            return false;
          }
          if (e.salaryString == "") {
            a.showToastErr("请选择月收入");
            return false;
          }
          if (e.educationString == "") {
            a.showToastErr("请选择学历");
            return false;
          }
          if (e.marriageString == "") {
            a.showToastErr("请选择婚姻状况");
            return false;
          }
          */
        }else{
          /*
          if (e.workCityString == "") {
            a.showToastErr("请选择工作地区");
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
          */
        }
       
        http.post('saveuser1', e).then(data => {
          a.showToastSuc("保存成功");
          setTimeout(function(){
            wx.redirectTo({
              url: '../edit/index',
            })
          },1500);
        });
    },
    showToastSuc: function (t) {
      wx.showToast({
        title: t,
        duration: 1500,
        icon: 'sucess'
      });
    },
    showToastErr: function (t) {
      wx.showToast({
        title: t,
        duration: 1500,
        icon: "none"
      });
    },
    showToastCancel: function(a) {
        this.$wuxToast.show({
            type: "cancel",
            timer: 1500,
            color: "#fff",
            text: "" + a
        })
    }
});