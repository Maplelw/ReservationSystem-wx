let deviceDetail = require('../../../../global/global.js').deviceDetail;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: 'detail',//详细信息或评论
        detailColor: "#000000",//设置选中颜色
        commentColor: "#bbbbbb",
        device: {},
        code: "",
        d_no: "",
    },

    //预约设备
    reserve: function() {
        wx.navigateTo({
            url: '/pages/user/index/device/reserveDevice/reserveDevice' + '?d_no=' + this.data.d_no,
        })
    },
    //跟踪设备
    follow: function() {
        var that = this;
        wx.login({
            success(res) {
                wx.request({
                    url: reserve,
                    data: {
                        d_no: that.data.device.d_no,
                        code: res.code
                    },
                    success(res) {
                        console.log(res.data)
                    }
                })
            }
        })
    },
    //改变页面显示为 详细信息
    toDetail: function () {
        this.setData({
            choice: "detail",
            detailColor: "#000000",
            commentColor: "#bbbbbb"
        })
    },
    //改变页面显示为 评论
    toComment: function () {
        this.setData({
            choice: "all",
            detailColor: "#bbbbbb",
            commentColor: "#000000"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            d_no: options.d_no
        })
        console.log(this.data.d_no);
        var that = this;
        wx.request({
            url: deviceDetail,
            data: {
                d_no: that.data.d_no
            },
            success(res) {
                console.log(res.data)
                that.setData({
                    device: 　res.data.device
                })
            }
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