// pages/homepage/user_details/apply_order/apply_order.js
var getDate = require('../../../../../../utils/util.js').formatDate;
let reserve = require('../../../../../../global/global.js').reserve;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startDate: "",
        returnDate: "",
        currentDate: "",
        d_no: "11",
    },

    //确定预约按钮
    reserve: function(e) {
        var that = this;
        wx.login({
            success(res) {
                wx.request({
                    url: reserve,
                    method: 'POST',
                    header: {
                            "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        d_no: that.data.d_no,
                        code: res.code,
                        startDate: that.data.startDate,
                        returnDate: that.data.returnDate
                    },
                    success(res) {
                        console.log(res.data)
                        if(res.data.flag === 0) {
                            wx.showToast({
                                title: '您已预约该设备',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        else {
                            wx.reLaunch({
                                url: '/pages/user/index/index',
                            })
                            wx.showToast({
                                title: '预约成功',
                                duration: 2000
                            })
                        }
                        
                    }
                })
            }
        })
    },

    //切换借用开始时间
    startChange: function(e) {
        console.log(e.detail.value);
        this.setData({
            startDate: e.detail.value
        })
    },

    //切换归还时间
    returnChange: function (e) {
        console.log(e.detail.value);
        this.setData({
            returnDate: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var date = getDate(new Date());
        this.setData({
            currentDate: date,
            startDate: date,
            returnDate: date,
            d_no: options.d_no
        })
        console.log('上个页面传来的设备编号' +  this.data.d_no)
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