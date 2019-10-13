function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t
}
function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e
    }
}(),
    a = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(require("../component")),
    i = function() {
        function t() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e(this, t), Object.assign(this, {
                options: n
            }), this.init()
        }
        return n(t, [{
            key: "init",
            value: function() {
                this._data = {}, this.page = getCurrentPages()[getCurrentPages().length - 1], this.setData = this.page.setData.bind(this.page), this.mergeOptions(this.options), this._data.value || this.options.value && (this._data.value = this.options.value), this.initialized = !1, this.animating = !1, this.opened = !1, this.isH = "horizontal" === this.options.direction
            }
        }, {
            key: "setDefaults",
            value: function() {
                return {
                    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                    firstDay: 1,
                    weekendDays: [0, 6],
                    multiple: !1,
                    dateFormat: "yyyy-mm-dd",
                    direction: "horizontal",
                    minDate: null,
                    maxDate: null,
                    touchMove: !0,
                    animate: !0,
                    closeOnSelect: !0,
                    weekHeader: !0,
                    toolbar: !0,
                    inline: !1,
                    value: [],
                    onMonthAdd: function() {},
                    onChange: function() {},
                    onOpen: function() {},
                    onClose: function() {},
                    onDayClick: function() {},
                    onMonthYearChangeStart: function() {},
                    onMonthYearChangeEnd: function() {},
                    onRender: function() {},
                    onMonthsTranslate: function() {}
                }
            }
        }, {
            key: "mergeOptions",
            value: function(t) {
                var e = this.setDefaults();
                for (var n in e) e.hasOwnProperty(n) && (this.options[n] = void 0 !== t[n] ? t[n] : e[n], "function" == typeof this.options[n] && (this.options[n] = this.options[n].bind(this)))
            }
        }, {
            key: "formatDate",
            value: function(t) {
                t = new Date(t);
                var e = this.options,
                    n = t.getFullYear(),
                    a = t.getMonth(),
                    i = a + 1,
                    o = t.getDate(),
                    s = t.getDay();
                return e.dateFormat.replace(/yyyy/g, n).replace(/yy/g, (n + "").substring(2)).replace(/mm/g, i < 10 ? "0" + i : i).replace(/m/g, i).replace(/MM/g, e.monthNames[a]).replace(/M/g, e.monthNamesShort[a]).replace(/dd/g, o < 10 ? "0" + o : o).replace(/d/g, o).replace(/DD/g, e.dayNames[s]).replace(/D/g, e.dayNamesShort[s])
            }
        }, {
            key: "daysInMonth",
            value: function(t) {
                var e = new Date(t);
                return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
            }
        }, {
            key: "monthHTML",
            value: function(t, e) {
                var n = (t = new Date(t)).getFullYear(),
                    a = t.getMonth(),
                    i = (t.getDate(), {
                        year: n,
                        month: a,
                        items: []
                    });
                "next" === e && (t = 11 === a ? new Date(n + 1, 0) : new Date(n, a + 1, 1)), "prev" === e && (t = 0 === a ? new Date(n - 1, 11) : new Date(n, a - 1, 1)), "next" !== e && "prev" !== e || (a = t.getMonth(), n = t.getFullYear());
                var o = this.daysInMonth(new Date(t.getFullYear(), t.getMonth()).getTime() - 864e6),
                    s = this.daysInMonth(t),
                    h = new Date(t.getFullYear(), t.getMonth()).getDay();
                0 === h && (h = 7);
                var r = void 0,
                    u = [],
                    l = this.options.firstDay - 1 + 0,
                    d = (new Date).setHours(0, 0, 0, 0),
                    c = this.options.minDate ? new Date(this.options.minDate).getTime() : null,
                    p = this.options.maxDate ? new Date(this.options.maxDate).getTime() : null;
                if (this._data.value && this._data.value.length) for (var f = 0; f < this._data.value.length; f++) u.push(new Date(this._data.value[f]).setHours(0, 0, 0, 0));
                for (var v = 1; v <= 6; v++) {
                    for (var m = [], y = 1; y <= 7; y++) {
                        var g = y,
                            M = ++l - h,
                            D = {};
                        M < 0 ? (M = o + M + 1, D.prev = !0, r = new Date(a - 1 < 0 ? n - 1 : n, a - 1 < 0 ? 11 : a - 1, M).getTime()) : (M += 1) > s ? (M -= s, D.next = !0, r = new Date(a + 1 > 11 ? n + 1 : n, a + 1 > 11 ? 0 : a + 1, M).getTime()) : r = new Date(n, a, M).getTime(), r === d && (D.today = !0), u.indexOf(r) >= 0 && (D.selected = !0), this.options.weekendDays.indexOf(g - 1) >= 0 && (D.weekend = !0), (c && r < c || p && r > p) && (D.disabled = !0);
                        var T = (r = new Date(r)).getFullYear(),
                            w = r.getMonth();
                        m.push({
                            type: D,
                            year: T,
                            month: w,
                            day: M,
                            date: T + "-" + w + "-" + M
                        })
                    }
                    i.year = n, i.month = a, i.items.push(m)
                }
                return i
            }
        }, {
            key: "getNextDateTime",
            value: function(t, e) {
                var n = parseInt(e),
                    a = parseInt(t);
                return new Date(a, n).getTime()
            }
        }, {
            key: "getPrevDateTime",
            value: function(t, e) {
                var n = parseInt(e),
                    a = parseInt(t);
                return new Date(a, n + 1, -1).getTime()
            }
        }, {
            key: "updateMonths",
            value: function(t, e) {
                if (!e) return !1;
                if ("next" === t) {
                    var n = this._data.months[this._data.months.length - 1],
                        a = this.getNextDateTime(n.year, n.month),
                        i = this.monthHTML(a, "next");
                    this._data.months.splice(0, 1), this._data.months.push(i)
                }
                if ("prev" === t) {
                    var o = this._data.months[0],
                        s = this.getPrevDateTime(o.year, o.month),
                        h = this.monthHTML(s, "prev");
                    this._data.months.splice(this._data.months.length - 1, 1), this._data.months.unshift(h)
                }
            }
        }, {
            key: "updateCurrentMonthYear",
            value: function() {
                this._data.currentMonth = parseInt(this._data.months[1].month), this._data.currentYear = parseInt(this._data.months[1].year), this._data.currentMonthName = this.options.monthNames[this._data.currentMonth]
            }
        }, {
            key: "nextMonth",
            value: function(t) {
                var e = this,
                    n = this._data.months[this._data.months.length - 1],
                    a = this.getNextDateTime(n.year, n.month),
                    i = !this.animating;
                if (this.options.maxDate && a > new Date(this.options.maxDate).getTime()) return this.resetMonthsTranslate();
                this.animating = !0, this.onMonthChangeStart("next"), this.setMonthsTranslate("next"), i && (this.options.animate ? setTimeout(function() {
                    return e.onMonthChangeEnd("next")
                }, 300) : this.onMonthChangeEnd("next"))
            }
        }, {
            key: "prevMonth",
            value: function(t) {
                var e = this,
                    n = this._data.months[0],
                    a = this.getPrevDateTime(n.year, n.month),
                    i = !this.animating;
                if (this.options.minDate && a < new Date(this.options.minDate).getTime()) return this.resetMonthsTranslate();
                this.animating = !0, this.onMonthChangeStart("prev"), this.setMonthsTranslate("prev"), i && (this.options.animate ? setTimeout(function() {
                    return e.onMonthChangeEnd("prev")
                }, 300) : this.onMonthChangeEnd("prev"))
            }
        }, {
            key: "setYearMonth",
            value: function(t, e) {
                var n = this,
                    a = null,
                    i = this._data.currentYear,
                    o = this._data.currentMonth;
                if (void 0 === t && (t = i), void 0 === e && (e = o), a = t < i ? new Date(t, e + 1, -1).getTime() : new Date(t, e).getTime(), this.options.maxDate && a > new Date(this.options.maxDate).getTime()) return !1;
                if (this.options.minDate && a < new Date(this.options.minDate).getTime()) return !1;
                var s = a > new Date(i, o).getTime() ? "next" : "prev",
                    h = new Date(t, e),
                    r = this.monthHTML(h, "prev"),
                    u = this.monthHTML(h),
                    l = this.monthHTML(h, "next"),
                    d = !this.animating;
                this._data.months = [r, u, l], this.animating = !0, this.onMonthChangeStart(s), this.setMonthsTranslate(s), d && (this.options.animate ? setTimeout(function() {
                    return n.onMonthChangeEnd(s, !1)
                }, 300) : this.onMonthChangeEnd(s, !1))
            }
        }, {
            key: "nextYear",
            value: function() {
                this.setYearMonth(this._data.currentYear + 1)
            }
        }, {
            key: "prevYear",
            value: function() {
                this.setYearMonth(this._data.currentYear - 1)
            }
        }, {
            key: "onMonthChangeStart",
            value: function(t) {
                "function" == typeof this.options.onMonthYearChangeStart && this.options.onMonthYearChangeStart(this, this._data.currentYear, this._data.currentMonth)
            }
        }, {
            key: "onMonthChangeEnd",
            value: function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                this.animating = !1, this.updateMonths(t, e), this.updateCurrentMonthYear(), this.resetMonthsTranslate(), this.render(), "function" == typeof this.options.onMonthAdd && this.options.onMonthAdd(this, "next" === t ? this._data.months[this._data.months.length - 1] : this._data.months[0]), "function" == typeof this.options.onMonthYearChangeEnd && this.options.onMonthYearChangeEnd(this, this._data.currentYear, this._data.currentMonth)
            }
        }, {
            key: "setMonthsTranslate",
            value: function(t) {
                var e = "next" === t ? "-" : "",
                    n = this.isH ? "transform: translate3d(" + e + "100%, 0px, 0px)" : "transform: translate3d(0px, " + e + "100%, 0px)",
                    a = this.options.animate ? n + "; transition: all 300ms;" : n + "; transition: none;";
                "function" == typeof this.options.onMonthsTranslate && this.options.onMonthsTranslate(a)
            }
        }, {
            key: "resetMonthsTranslate",
            value: function() {
                "function" == typeof this.options.onMonthsTranslate && this.options.onMonthsTranslate("transform: translate3d(0px, 0px, 0px); transition: none;")
            }
        }, {
            key: "addValue",
            value: function(t) {
                if (this.options.multiple) {
                    this._data.value || (this._data.value = []);
                    for (var e = -1, n = 0; n < this._data.value.length; n++) new Date(t).setHours(0, 0, 0, 0) === new Date(this._data.value[n]).setHours(0, 0, 0, 0) && (e = n); - 1 === e ? this._data.value.push(t) : this._data.value.splice(e, 1), this.updateValue()
                } else this._data.value = [t], this.updateValue()
            }
        }, {
            key: "setValue",
            value: function(t) {
                this._data.value = t, this.updateValue()
            }
        }, {
            key: "resetSelected",
            value: function() {
                this._data.months.forEach(function(t, e) {
                    t.items.forEach(function(t, e) {
                        t.forEach(function(t, e) {
                            t.type.selected = !1
                        })
                    })
                })
            }
        }, {
            key: "updateValue",
            value: function() {
                var t = this;
                this.resetSelected();
                for (var e = 0; e < this._data.value.length; e++)! function(e) {
                    var n = new Date(t._data.value[e]),
                        a = n.getFullYear(),
                        i = n.getMonth(),
                        o = n.getDate(),
                        s = [];
                    t._data.months.forEach(function(t, e) {
                        t.year === a && t.month === i && (s = t.items)
                    }), s.forEach(function(t, e) {
                        t.forEach(function(t, e) {
                            t.year === a && t.month === i && t.day === o && (t.type.selected = !0)
                        })
                    })
                }(e);
                "function" == typeof this.options.onChange && this.options.onChange(this, this._data.value, this._data.value.map(function(e, n) {
                    return t.formatDate(e)
                })), this.render()
            }
        }, {
            key: "setWeekHeader",
            value: function() {
                if (this._data.weeks = [], this.options.weekHeader) for (var t = 0; t < 7; t++) {
                    var e = t + this.options.firstDay > 6 ? t - 7 + this.options.firstDay : t + this.options.firstDay,
                        n = this.options.dayNamesShort[e],
                        a = this.options.weekendDays.indexOf(e) >= 0;
                    this._data.weeks.push({
                        weekend: a,
                        dayName: n
                    })
                }
            }
        }, {
            key: "setMonthsHTML",
            value: function() {
                var t = this._data.value && this._data.value.length ? this._data.value[0] : (new Date).setHours(0, 0, 0, 0),
                    e = this.monthHTML(t, "prev"),
                    n = this.monthHTML(t),
                    a = this.monthHTML(t, "next");
                this._data.months = [e, n, a]
            }
        }, {
            key: "initCalendarEvents",
            value: function() {
                var t = this,
                    e = void 0,
                    n = void 0,
                    a = void 0,
                    i = void 0,
                    o = void 0,
                    s = void 0,
                    h = function(t) {
                        var e = t.touches[0];
                        return {
                            x: e.pageX,
                            y: e.pageY
                        }
                    };
                return {
                    handleTouchStart: function(a) {
                        if (!t.options.touchMove) return !1;
                        e = !0, n = h(a), i = o = s = 0
                    },
                    handleTouchMove: function(e) {
                        if (!t.options.touchMove) return !1;
                        if (!n || t.animating) return !1;
                        a = h(e), i = Math.floor(a.x - n.x), o = Math.floor(a.y - n.y), s = t.isH ? i : o;
                        var r = "transform: translate3d(" + (t.isH ? s : 0) + "px, " + (t.isH ? 0 : s) + "px, 0); transition: none;";
                        "function" == typeof t.options.onMonthsTranslate && t.options.onMonthsTranslate(r)
                    },
                    handleTouchEnd: function(n) {
                        return !!t.options.touchMove && (e = !1, Math.abs(s) < 30 ? t.resetMonthsTranslate() : (s <= -30 && t.nextMonth(), void(s >= 30 && t.prevMonth())))
                    },
                    handleDayClick: function(e) {
                        var n = e.currentTarget.dataset,
                            a = n.year,
                            i = n.month,
                            o = n.day,
                            s = n.type;
                        return !(s.selected && !t.options.multiple) && !s.disabled && (s.next && t.nextMonth(), s.prev && t.prevMonth(), "function" == typeof t.options.onDayClick && t.options.onDayClick(t, a, i, o), t.addValue(new Date(a, i, o).getTime()), void(t.options.closeOnSelect && t.close()))
                    }
                }
            }
        }, {
            key: "layout",
            value: function() {
                this.setWeekHeader(), this.setMonthsHTML(), this.setValue(this._data.value), this.updateCurrentMonthYear(), this.render()
            }
        }, {
            key: "render",
            value: function() {
                "function" == typeof this.options.onRender && this.options.onRender(this._data)
            }
        }, {
            key: "open",
            value: function() {
                var t = this;
                this.opened || this.layout(), this.opened = !0, this.initialized = !0, "function" == typeof this.options.onMonthAdd && this._data.months.forEach(function(e) {
                    return t.options.onMonthAdd(t, e)
                }), "function" == typeof this.options.onOpen && this.options.onOpen(this)
            }
        }, {
            key: "close",
            value: function() {
                if (!this.opened || this.options.inline) return !1;
                this.opened = !1, "function" == typeof this.options.onClose && this.options.onClose(this)
            }
        }]), t
    }();
exports.
default = {
    setDefaults: function() {
        return {
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            firstDay: 1,
            weekendDays: [0, 6],
            multiple: !1,
            dateFormat: "yyyy-mm-dd",
            direction: "horizontal",
            minDate: null,
            maxDate: null,
            touchMove: !0,
            animate: !0,
            closeOnSelect: !0,
            weekHeader: !0,
            toolbar: !0,
            inline: !1,
            value: [],
            onMonthAdd: function() {},
            onChange: function() {},
            onOpen: function() {},
            onClose: function() {},
            onDayClick: function() {},
            onMonthYearChangeStart: function() {},
            onMonthYearChangeEnd: function() {}
        }
    },
    init: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = Object.assign({
            animateCss: void 0,
            visible: !1
        }, this.setDefaults(), n),
            s = new a.
        default ({
            scope: "$wux.calendar." + e,
            data: o,
            methods: {
                init: function() {
                    var a = this,
                        s = Object.assign({}, n);
                    s.onOpen = function(t) {
                        a.show(), "function" == typeof o.onOpen && o.onOpen(t)
                    }, s.onClose = function(t) {
                        a.hide(), "function" == typeof o.onClose && o.onClose(t)
                    }, s.onMonthsTranslate = function(n) {
                        a.page.setData(t({}, "$wux.calendar." + e + ".style", n))
                    }, s.onRender = function(n) {
                        for (var i in n) a.page.setData(t({}, "$wux.calendar." + e + "." + i, n[i]))
                    };
                    var h = this.calendar = new i(s);
                    this.nextMonth = h.nextMonth.bind(h), this.prevMonth = h.prevMonth.bind(h), this.nextYear = h.nextYear.bind(h), this.prevYear = h.prevYear.bind(h), this.initCalendarEvents = h.initCalendarEvents.bind(h)(), this.handleTouchStart = this.initCalendarEvents.handleTouchStart, this.handleTouchMove = this.initCalendarEvents.handleTouchMove, this.handleTouchEnd = this.initCalendarEvents.handleTouchEnd, this.handleDayClick = this.initCalendarEvents.handleDayClick, h.open()
                },
                nextMonth: function(t) {
                    return this.nextMonth(t)
                },
                prevMonth: function(t) {
                    return this.prevMonth(t)
                },
                nextYear: function(t) {
                    return this.nextYear(t)
                },
                prevYear: function(t) {
                    return this.prevYear(t)
                },
                handleTouchStart: function(t) {
                    return this.handleTouchStart(t)
                },
                handleTouchMove: function(t) {
                    return this.handleTouchMove(t)
                },
                handleTouchEnd: function(t) {
                    return this.handleTouchEnd(t)
                },
                handleDayClick: function(t) {
                    return this.handleDayClick(t)
                },
                show: function() {
                    var t = o.inline ? ["weui-animate-fade-in"] : ["weui-animate-slide-up", "weui-animate-fade-in"];
                    this.setVisible(t)
                },
                hide: function() {
                    var t = o.inline ? ["weui-animate-fade-out"] : ["weui-animate-slide-down", "weui-animate-fade-out"];
                    this.setHidden(t)
                }
            }
        });
        return s.init(), s
    }
};