let deviceDetail = require('../../../../../global/global.js').deviceDetail;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: 'detail',//详细信息或修改
        device: {},
        code: "",
        d_no: "",
    },

    //修改设备信息
    editDevice: function() {
        console.log("修改设备")
        this.setData({
            choice: 'edit'
        })
    },

    //确定修改信息
    confirm: function() {
        console.log("确定修改信息")
        this.setData({
            choice: 'detail'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            d_no: options.d_no
        })
        console.log("上一页面传来的编号")
        console.log(this.data.d_no)
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