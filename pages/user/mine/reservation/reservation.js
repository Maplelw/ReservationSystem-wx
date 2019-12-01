let reservation = require('../../../../global/global.js').reservation;
let cancelReservation = require('../../../../global/global.js').cancelReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: "ing",
        ingColor: "#89AFD4",
        doneColor: "#bbbbbb",
        deviceIng: [{
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: 1,
                r_no: 0
            },
            {
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: -1,
                r_no: 0
            }
        ],
        deviceDone: [{
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: 1,
                r_no: 0
            },
            {
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: -1,
                r_no: 0
            }
        ]
    },
    //改变页面显示为 热门
    toIng: function() {
        this.setData({
            choice: "ing",
            ingColor: "#89AFD4",
            doneColor: "#bbbbbb"
        })
    },
    //改变页面显示为 所有
    toDone: function() {
        this.setData({
            choice: "done",
            ingColor: "#bbbbbb",
            doneColor: "#89AFD4"
        })
    },
    // 取消预约
    cancel: function(e) {
        console.log(e.currentTarget.dataset.index)
        var r_no = this.data.deviceIng[e.currentTarget.dataset.index].r_no
        console.log("被选择的预约编号")
        console.log(r_no)
        wx.showModal({
            title: '提示',
            content: '是否取消预约',
            success: (res) => {
                if (res.confirm) {
                    wx.login({
                        success: function(res) {
                            wx.request({
                                url: cancelReservation,
                                data: {
                                    r_no: r_no //预约编号
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function(res) {
                                    console.log(res.data)
                                    
                                },
                                fail: function(res) {
                                    consol.log("请求失败")
                                },
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //查看反馈
    feedback: function(e) {
        console.log(e.currentTarget.dataset.index)
        var r_no = this.data.deviceIng[e.currentTarget.dataset.index].r_no
        console.log("被选择的预约编号")
        console.log(r_no)
        wx.login({
            success: function(res) {
                wx.request({
                    url: feedback,
                    data: {
                        r_no: r_no //预约编号
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        console.log(res.data)
                    },
                    fail: function(res) {
                        consol.log("请求失败")
                    },
                })
            }
        })
    },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
        var that = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: reservation,
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log(res.data)
                        var device = res.data.device
                        var deviceIng = new Array();
                        var deviceDone = new Array();
                        for(var i=0;i<device.length;i++) {
                            if(device[i].state === 0) {
                                deviceIng.push(device[i])
                            }
                            else {
                                deviceDone.push(device[i])
                            }
                        }
                        that.setData({
                            deviceIng: deviceIng,
                            deviceDone: deviceDone
                        })
                    },
                    fail: function(res) {
                        consolo.log("请求失败")
                    },
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})