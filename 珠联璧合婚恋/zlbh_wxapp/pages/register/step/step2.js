function a(a) {
    return a && a.__esModule ? a : {
        default: a
    }
}
a(require("../../../helpers/WxValidate"));
for (var t = a(require("../../../json/cate.js")), e = getApp(), n = (require("../../../utils/WxNotificationCenter.js"), [{
    value: 0,
    name: "不限"
}]), o = [{
    value: 0,
    name: "不限" 
}], i = 18; i <= 99; i++) n.push({
    value: i,
    name: i
}); 
for (var c = 19; c <= 99; c++) o.push({
    value: c,
    name: c
});
for (var r = n.map(function(a) {
    return a.name
}), u = o.map(function(a) {
    return a.name
}), l = [{
    value: 0,
    name: "不限"
}], h = [{
    value: 0,
    name: "不限"
}], d = 150; d <= 210; d++) l.push({
    value: d,
    name: d
});
for (var s = 151; s <= 210; s++) h.push({
    value: s,
    name: s
});
var f = l.map(function(a) {
    return a.name
}),
    g = h.map(function(a) {
        return a.name
    });

const app = getApp()
import http from '../../util/request.js';  

Page({
    data: {
        noteMaxLen: 200,
        currentNoteLen: 0,
        cate: {},
        form: {
            objectAgeString: "",
            objectHeightString: "",
            objectSalaryActionIndex: "",
            objectWorkCityString: ""
        }
    },
    onLoad: function() {
      var a = this;
      http.get('user', { uid: wx.getStorageSync("user").id }).then(data => {
        a.setData({ user: data });
        if (data.mbind == 0) {
          a.setData({ msglogin: 1, auth1: 1 });
        }
        a.setData({ avatar: data.avatar, "form": data });
        a.setData({ 'form.objectMarriageString': data.marriageString });
        a.setData({ 'form.objectChildrenString': data.childrenString });
        a.setData({ 'form.objectWantChildrenString': data.wantChildrenString });  
      });
      http.get('config').then(data => {
        a.setData({ citys: data.citys });
      });
      this.$wuxPickerCity = e.Wux().$wuxPickerCity, this.$wuxToast = e.Wux().$wuxToast;
      a.getCate();
     
    },
    onShow: function() {
        //this.renderForm()
    },
    bindPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value
        })
    },
    onAgeRange: function() {
        var a = this;
        this.$wuxPicker.init("ageRange", {
            title: "请选择年龄范围",
            cols: [{
                textAlign: "center",
                values: r
            }, {
                textAlign: "center",
                values: u
            }],
            value: a.data.form.ageRangeKey,
            onChange: function(t) {
                var e = [];
                if (r.forEach(function(a, n) {
                    a === t.value[0] && (e[0] = n)
                }), u.forEach(function(a, n) {
                    a === t.value[1] && (e[1] = n)
                }), "不限" != t.value[0]) {
                    for (var n = ["不限"], o = parseInt(t.value[0] + 1); o <= 99; o++) n.push(o);
                    a.data.startAgeString != t.value[0] && t.value[0] >= t.value[1] ? (t.value[1] = n[2], e[1] = 2) : n.forEach(function(a, n) {
                        a == t.value[1] && (t.value[1] = a, e[1] = n)
                    }), u = n
                } else {
                    for (var i = ["不限"], c = 19; c <= 99; c++) i.push(c);
                    i.forEach(function(a, n) {
                        a == t.value[1] && (t.value[1] = a, e[1] = n)
                    }), u = i
                }
                this.options.data.cols[1].values = u;
                var l = "不限";
                l = "不限" == t.value[0] && "不限" == t.value[1] ? "不限" : "不限" == t.value[1] ? t.value[0] + "岁以上" : "不限" == t.value[0] && "不限" != t.value[1] ? t.value[1] + "岁以下" : t.value.join("-") + "岁", this.setData({
                    startAgeString: t.value[0],
                    "$wux.picker.ageRange.cols": this.options.data.cols,
                    "$wux.picker.ageRange.value": e || 0,
                    "form.objectAge1": t.value[0],
                    "form.objectAge2": t.value[1],
                    "form.objectAgeString": l
                })
            }
        })
    },
    onHeightRange: function() {
        var a = this;
        this.$wuxPicker.init("heightRange", {
            title: "请选择身高范围",
            cols: [{
                textAlign: "center",
                values: f
            }, {
                textAlign: "center",
                values: g
            }],
            value: a.data.form.heightRangeKey,
            onChange: function(t) {
                var e = [];
                if (f.forEach(function(a, n) {
                    a === t.value[0] && (e[0] = n)
                }), g.forEach(function(a, n) {
                    a === t.value[1] && (e[1] = n)
                }), "不限" != t.value[0]) {
                    for (var n = ["不限"], o = parseInt(t.value[0] + 1); o <= 210; o++) n.push(o);
                    a.data.minHeightString != t.value[0] && t.value[0] >= t.value[1] ? (t.value[1] = n[2], e[1] = 2) : n.forEach(function(a, n) {
                        a == t.value[1] && (t.value[1] = a, e[1] = n)
                    }), g = n
                } else {
                    for (var i = ["不限"], c = 151; c <= 210; c++) i.push(c);
                    i.forEach(function(a, n) {
                        a == t.value[1] && (t.value[1] = a, e[1] = n)
                    }), g = i
                }
                this.options.data.cols[1].values = g;
                var r = "不限";
                r = "不限" == t.value[0] && "不限" == t.value[1] ? "不限" : "不限" == t.value[1] ? t.value[0] + "cm以上" : "不限" == t.value[0] && "不限" != t.value[1] ? t.value[1] + "cm以下" : t.value.join("-") + "cm", this.setData({
                    minHeightString: t.value[0],
                    "$wux.picker.heightRange.cols": this.options.data.cols,
                    "$wux.picker.heightRange.value": e || 0,
                    "form.objectHeight1": t.value[0],
                    "form.objectHeight2": t.value[1],
                    "form.objectHeightString": r
                })
            }
        })
    },
    getCate: function() {
        for (var a = this.data.cate, e = [{
            value: 0,
            name: "请选择"
        }], n = [{
            value: 0,
            name: "请选择"
        }], o = 130; o <= 210; o++) e.push({
            value: o,
            name: o + "cm"
        });
        for (o = 30; o <= 130; o++) 30 == o && n.push({
            value: o,
            name: o + "以下kg"
        }), n.push({
            value: o,
            name: o + "kg"
        }), 130 == o && n.push({
            value: o,
            name: o + "以上kg"
        });
        2 == 0 ? t.
        default.bodyData = t.
        default.body1Data : t.
        default.bodyData = t.
        default.body2Data, a = {
            constellationData: t.
            default.constellationData,
            constellationArr: t.
            default.constellationData.map(function(a) {
                return a.name
            }),
            constellationActionIndex: 0,
            weightData: n,
            weightArr: n.map(function(a) {
                return a.name
            }),
            weightActionIndex: 0,
            objectSalaryData: t.
            default.objectSalaryData,
            objectSalaryArr: t.
            default.objectSalaryData.map(function(a) {
                return a.name
            }),
            objectSalaryActionIndex: 0,
            objectEduData: t.
            default.objectEduData,
            objectEduArr: t.
            default.objectEduData.map(function(a) {
                return a.name
            }),
            objectEduActionIndex: 0,
            objectMarriageData: t.
            default.objectMarriageData,
            objectMarriageArr: t.
            default.objectMarriageData.map(function(a) {
                return a.name
            }),
            objectMarriageActionIndex: 0,
            objectChildrenData: t.
            default.objectChildrenData,
            objectChildrenArr: t.
            default.objectChildrenData.map(function(a) {
                return a.name
            }),
            objectChildrenActionIndex: 0,
            bodyData: t.
            default.bodyData,
            bodyArr: t.
            default.bodyData.map(function(a) {
                return a.name
            }),
            bodyActionIndex: 0,
            objectWantchildrenData: t.
            default.objectWantchildrenData,
            objectWantchildrenArr: t.
            default.objectWantchildrenData.map(function(a) {
                return a.name
            }),
            objectWantchildrenActionIndex: 0,
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
            hasPhotoData: t.
            default.hasPhotoData,
            hasPhotoArr: t.
            default.hasPhotoData.map(function(a) {
                return a.name
            }),
            hasPhotoActionIndex: 0
        }, this.setData({
            cate: a
        })
    },
    onWorkCity: function() {
        var a = this;
        this.$wuxPickerCity.init("city", {
            title: "请选择工作地点",
            value: a.data.form.objectWorkCity.split(","),
            onChange: function(a) {
                console.log(a), this.setData({
                    "form.objectWorkCityString": a.text,
                    "form.objectWorkCity": a.value.join(",")
                })
            }
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
    onDrinking: function(a) {
        this.setData({
            "cate.drinkingActionIndex": a.detail.value,
            "form.objectIsDrinkingString": this.data.cate.drinkingData[a.detail.value].name,
            "form.objectIsDrinking": this.data.cate.drinkingData[a.detail.value].value
        })
    },
    onOccupation: function (t) {
      this.setData({
        "cate.occupationActionIndex": t.detail.value,
        "form.occupationString": this.data.cate.occupationData[t.detail.value].name,
        "form.occupation": this.data.cate.occupationData[t.detail.value].value
      })
    },
    onSmoking: function(a) {
        this.setData({
            "cate.smokingActionIndex": a.detail.value,
            "form.objectIsSmokingString": this.data.cate.smokingData[a.detail.value].name,
            "form.objectIsSmoking": this.data.cate.smokingData[a.detail.value].value
        })
    },
    onWeight: function(a) {
        this.setData({
            "cate.weightActionIndex": a.detail.value,
            "form.weight": this.data.cate.weightData[a.detail.value].value
        })
    },
    onSalary: function(a) {
        this.setData({
            "cate.objectSalaryActionIndex": a.detail.value,
            "form.objectSalaryString": this.data.cate.objectSalaryData[a.detail.value].name,
            "form.objectSalary": this.data.cate.objectSalaryData[a.detail.value].value
        })
    },
    onEdu: function(a) {
        this.setData({
            "cate.objectEduActionIndex": a.detail.value,
            "form.objectEducationString": this.data.cate.objectEduData[a.detail.value].name,
            "form.objectEducation": this.data.cate.objectEduData[a.detail.value].value
        })
    },
    onMarriage: function(a) {
        this.setData({
            "cate.objectMarriageActionIndex": a.detail.value,
            "form.objectMarriageString": this.data.cate.objectMarriageArr[a.detail.value],
            "form.objectMarriage": this.data.cate.objectMarriageData[a.detail.value].value
        })
    },
    onChildren: function(a) {
        this.setData({
            "cate.objectChildrenActionIndex": a.detail.value,
            "form.objectChildrenString": this.data.cate.objectChildrenArr[a.detail.value],
            "form.objectChildren": this.data.cate.objectChildrenData[a.detail.value].value
        })
    },
    onWantchildren: function(a) {
        this.setData({
            "cate.objectWantchildrenActionIndex": a.detail.value,
            "form.objectWantChildrenString": this.data.cate.objectWantchildrenArr[a.detail.value],
            "form.objectWantChildren": this.data.cate.objectWantchildrenData[a.detail.value].value
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
        2 == this.userinfo.gender ? t.
        default.bodyData = t.
        default.body1Data : t.
        default.bodyData = t.
        default.body2Data, this.setData({
            "cate.bodyActionIndex": a.detail.value,
            "form.objectBodyString": this.data.cate.bodyData[a.detail.value].name,
            "form.objectBody": this.data.cate.bodyData[a.detail.value].value
        })
    },
    onHasPhoto: function(a) {
        this.setData({
            "cate.hasPhotoActionIndex": a.detail.value,
            "form.objectHasPhotoString": this.data.cate.hasPhotoData[a.detail.value].name,
            "form.objectHasPhoto": this.data.cate.hasPhotoData[a.detail.value].value
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
                if (e.ageRange = [e.objectAge1, e.objectAge2], e.ageRangeData = e.objectAgeString, e.ageRangeKey = [], r.forEach(function(a, t) {
                    a == e.ageRange[0] && (e.ageRangeKey[0] = t)
                }), 0 != e.ageRange[0]) {
                    for (var o = ["不限"], i = parseInt(e.ageRange[0] + 1); i <= 99; i++) o.push(i);
                    u = o
                }
                if (e.ageRangeKey[1] = 0, u.forEach(function(a, t) {
                    a == e.ageRange[1] && (e.ageRangeKey[1] = t)
                }), e.heightRange = [e.objectHeight1, e.objectHeight2], e.heightRangeData = e.objectHeightString, e.heightRangeKey = [], f.forEach(function(a, t) {
                    a == e.heightRange[0] && (e.heightRangeKey[0] = t)
                }), 0 != e.heightRange[0]) {
                    for (var c = ["不限"], l = parseInt(e.heightRange[0] + 1); l <= 210; l++) c.push(l);
                    g = c
                }
                e.heightRangeKey[1] = 0, g.forEach(function(a, t) {
                    a == e.heightRange[1] && (e.heightRangeKey[1] = t)
                }), n.objectSalaryData.forEach(function(a, t) {
                    a.value === e.objectSalary && (n.objectSalaryActionIndex = t)
                }), n.objectEduData.forEach(function(a, t) {
                    a.value === e.objectEducation && (n.objectEduActionIndex = t)
                }), n.objectMarriageData.forEach(function(a, t) {
                    a.value === e.objectMarriage && (n.objectMarriageActionIndex = t)
                }), n.objectChildrenData.forEach(function(a, t) {
                    a.value === e.objectChildren && (n.objectChildrenActionIndex = t)
                }), n.objectWantchildrenData.forEach(function(a, t) {
                    a.value == e.objectWantChildren && (n.objectWantchildrenActionIndex = t)
                }), n.bodyData.forEach(function(a, t) {
                    a.value == e.objectBody && (n.bodyActionIndex = t)
                }), n.smokingData.forEach(function(a, t) {
                    a.value == e.objectIsSmoking && (n.smokingActionIndex = t)
                }), n.drinkingData.forEach(function(a, t) {
                    a.value == e.objectIsDrinking && (n.drinkingActionIndex = t)
                }), n.hasPhotoData.forEach(function(a, t) {
                    a.value == e.objectHasPhoto && (n.hasPhotoActionIndex = t)
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
    submitForm: function(t) {
      var a = this;
      var e = Object.assign(this.data.form, t.detail.value);
      console.log(e);
      //return false;
      e.formId = t.detail.formId;
      if ("" == e.objectIsSmokingString) {
        a.showToastErr("请选择是否吸烟");
        return false;
      }
      if ("" == e.objectIsDrinkingString) {
        a.showToastErr("请选择是否喝酒");
        return false;
      }
      http.post('saveuser2', e).then(data => {
        a.showToastSuc("保存成功");
       setTimeout(function(){
         wx.navigateTo({
           url: './step3',
         })
       },2500);
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