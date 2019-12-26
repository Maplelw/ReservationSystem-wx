let reservationDetail = require('../../../../../global/global.js').reservationDetail;
let rejectReservation = require('../../../../../global/global.js').rejectReservation;
let confirmReservation = require('../../../../../global/global.js').confirmReservation;
let editReservation = require('../../../../../global/global.js').editReservation; 
var getDate = require('../../../../../utils/util.js').formatDate;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false, // 是否弹出修改事件框
        new_startDate: "",// 修改后借用时间
        new_returnDate: "",// 修改归还时间
        curDate: "",
        nextDate: "",
        d_no:"",//上个页面的参数
        d_name: "",//上个页面的参数
        d_photo: "",//上个页面的参数
        feedback: "",
        reservation: []
    },
//弹窗
    // 弹窗：管理员修改借用时间
    changeDate: function(e) {
        var index = e.currentTarget.dataset.index
        var that = this
        this.setData({
            isShow: true,
            new_startDate: that.data.reservation[index].r_startDate,
            new_returnDate: that.data.reservation[index].r_returnDate,
        })
    },
    // 弹窗：取消
    hideWindow: function (e) {
        this.setData({
            isShow: false
        })
    },
    // 修改开始时间
    startChange: function (e) {
        console.log(e.detail.value);
        this.setData({
            new_startDate: e.detail.value
        })
    },
    // 修改归还时间
    returnChange: function (e) {
        console.log(e.detail.value);
        this.setData({
            new_returnDate: e.detail.value
        })
    },
    //弹窗： 获取反馈信息
    getFeedback (e) {
        this.setData({
            feedback: e.detail.value
        })
    },
    
    // 提交修改
    submitChange: function (e) {
        var index = e.currentTarget.dataset.index
        var that = this;
        console.log("开始时间："  + that.data.new_startDate)
        console.log("结束时间：" + that.data.new_returnDate)
        var curDate = getDate(new Date) 
        console.log(curDate)
        if (that.data.new_startDate < curDate) {
            wx.showToast({
                title: '借用时间必须从当前日期开始',
                icon: "none"
            })
        }
        else if (that.data.new_startDate >= that.data.new_returnDate ) {
            wx.showToast({
                title: '归还时间必须在借用时间之后,且借用时间必须大于一天',
                icon: "none"
            })
        }
        else if(that.data.feedback == '') {
            wx.showToast({
                title: '请填写修改原因',
                icon: "none"
            })
        }
        else {
            wx.showLoading({
                title: '提交中',
                mask: true
            })
            wx.login({
                success(res) {
                    wx.request({
                        url: editReservation,
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            r_no: that.data.reservation[index].r_no,
                            startDate: that.data.new_startDate,
                            returnDate: that.data.new_returnDate,
                            feedBack: that.data.feedback,
                        },
                        success(res) {
                            if (res.data.flag == 1) {
                                console.log(res.data)
                                wx.hideLoading()
                                // 关闭弹窗
                                that.setData({
                                    isShow: false
                                })
                                that.data.reservation.splice(e.currentTarget.dataset.index, 1)
                                that.setData({
                                    reservation: that.data.reservation
                                })
                            }
                            else {
                                wx.showToast({
                                    title: res.data.errMsg[0],
                                    icon: "none"
                                })
                            }
                        }
                    })
                }
            })
        } 
    },

    //拒绝租借按钮
    reject: function (e) {
        var r_no = this.data.reservation[e.currentTarget.dataset.index].r_no
        wx.navigateTo({
            url: '/pages/admin/index/checkReservation/chooseReservation/refuseFeedback/refuseFeedback' + "?r_no=" + r_no,
        })
    },
    //确认租借按钮
    confirm: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确认租借？',
            success: (res) => {
                if (res.confirm) {
                    //通过具体点击按钮获取每个申请人的编号
                    wx.request({
                        url: confirmReservation,
                        data: {
                            //发送预约编号
                            r_no: that.data.reservation[e.currentTarget.dataset.index].r_no
                        },
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                            console.log(res.data)
                            if(res.data.flag == 1) {
                                that.data.reservation.splice(e.currentTarget.dataset.index, 1)
                                that.setData({
                                    reservation: that.data.reservation
                                })
                            }
                            else {
                                wx.showToast({
                                    title: res.data.errMsg[0],
                                    icon: "none",
                                })
                                that.onShow()
                            }
                        },
                        fail: function (res) {
                            console.log("请求失败")
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log( "上一页面发送的设备编号:" + options.d_no)
        console.log("上一页面发送的设备名称:" + options.d_name)
        console.log("上一页面发送的图片路径:" + options.d_photo)
        // 获取今天
        var t = new Date()
        var curDate = getDate(t);
        var nextDate = getDate(new Date(t.getTime() + 24 * 60 * 60 * 1000));
        console.log("今天" + curDate)
        console.log("后一天" + nextDate)
        this.setData({
            d_no: options.d_no,
            d_name : options.d_name,
            d_photo: options.d_photo,
            curDate: curDate,
            nextDate: nextDate
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this
        wx.request({
            url: reservationDetail,
            data: {
                d_no: that.data.d_no
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                console.log(res.data)
                if(res.data.flag == 1) {
                    console.log("获取具体设备的申请信息\n")
                    console.log(res.data)
                    that.setData({
                        reservation: res.data.reservation,
                    })
                } 
                else {
                    that.setData({
                        reservation: null
                    })
                }
            },
            fail: function (res) {
                console.log("请求失败")
            },
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})