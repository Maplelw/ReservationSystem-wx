let reservationDetail = require('../../../../../global/global.js').reservationDetail;
let rejectReservation = require('../../../../../global/global.js').rejectReservation;
let confirmReservation = require('../../../../../global/global.js').confirmReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        d_no:"",
        reservation: [{
            u_name: "至臻",
            u_type: "老师",
            r_reservation_date: "2019/10/01",
            r_borrow_date: "2019/10/02",
            r_return_date: "2019/10/04",
            u_credit_grade: 80
        },{
            u_name: "卡莎",
            u_type: "学生",
            r_reservation_date: "2019/10/01",
            r_borrow_date: "2019/10/02",
            r_return_date: "2019/10/04",
            u_credit_grade: 100
        }]
    },

    //拒绝租借按钮
    reject: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '拒绝租借？',
            success: (res) => {
                if (res.confirm) {
                    //通过具体点击按钮获取每个申请人的编号
                    var u_no = that.data.reservation[e.currentTarget.dataset.index].m_Uno;
                    that.data.reservation.splice(e.currentTarget.dataset.index, 1)
                    that.setData({
                        reservation: this.data.reservation
                    })
                    wx.request({
                        url: rejectReservation,
                        data: {
                            d_no: that.data.d_no,
                            u_no: u_no
                        },
                        success: function (res) {
                            console.log(res.data)
                        },
                        fail: function (res) {
                            consolo.log("请求失败")
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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
                    var u_no = that.data.reservation[e.currentTarget.dataset.index].m_Uno;
                    that.data.reservation.splice(e.currentTarget.dataset.index, 1)
                    that.setData({
                        reservation: this.data.reservation
                    })
                    wx.request({
                        url: confirmReservation,
                        data: {
                            d_no: that.data.d_no,
                            u_no: u_no
                        },
                        success: function (res) {
                            console.log(res.data)
                        },
                        fail: function (res) {
                            consolo.log("请求失败")
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
        console.log( "上一页面发送的设备编号" + options.d_no)
        this.setData({
            d_no: options.d_no
        })
        var that = this
        wx.request({
            url: reservationDetail,
            data: {
                d_no: options.d_no
            },
            success: function(res) {
               console.log("获取具体设备的申请信息\n")
                console.log(res.data)
               that.setData({
                    reservation: res.data.reservation,
                })
            },
            fail: function(res) {
                consolo.log("请求失败")
            },
        
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