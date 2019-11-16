let reservationDetail = require('../../../../global/global.js').reservationDetail;
let confirmReturn = require('../../../../global/global.js').confirmReturn;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: [{
            u_name: "至臻",
            u_type: "老师",
            r_reservation_date: "2019/10/01",
            r_borrow_date: "2019/10/02",
            r_return_date: "2019/10/04",
            u_credit_grade: 80
        }, {
            u_name: "卡莎",
            u_type: "学生",
            r_reservation_date: "2019/10/01",
            r_borrow_date: "2019/10/02",
            r_return_date: "2019/10/04",
            u_credit_grade: 100
        }]
    },

    //确认归还按钮
    confirm: function (e) {
        wx.showModal({
            title: '提示',
            content: '确认归还',
            success: (res) => {
                if (res.confirm) {
                    this.data.info.splice(e.currentTarget.dataset.index, 1)
                    this.setData({
                        info: this.data.info
                    })
                    wx.request({
                        url: confirmReturn,
                        data: {
                            d_no: "001",
                            u_no: "201726010312"
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
        var that = this
        wx.request({
            url: reservationDetail,
            data: {
                d_no: "001"
            },
            success: function (res) {
                that.setData({
                    info: res.data.info
                })
            },
            fail: function (res) {
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