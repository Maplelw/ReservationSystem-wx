let hot = require('../../../global/global.js').hot;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: "hot",
        hotColor: "#000000",
        allColor: "#bbbbbb",
        hotDevice: [],
        allDevice: [],
        navigator: [
            {
                img: "/img/global/nv_index_on.png",
                name: "首页"
            },
            {
                img: "/img/global/nv_mine_off.png",
                name: "我的"
            }
        ]
    },

    //获取热门设备中的具体信息
    getDetails: function(e) {
        var t = e.currentTarget.dataset.index;
        var d_no = this.data.hotDevice[t].d_no;
        wx.navigateTo({
            url: '/pages/user/index/device/device' + '?d_no=' + d_no,
        })
    },

    //改变页面显示为 热门
    toHot: function() {
        this.setData({
            choice:"hot",
            hotColor: "#000000",
            allColor: "#bbbbbb"
        })
    },
    //改变页面显示为 所有
    toAll: function () {
        this.setData({
            choice: "all",
            hotColor: "#bbbbbb",
            allColor: "#000000"
        })
    },

    //导航变化
    navigate: function(e) {
        var index = e.currentTarget.dataset.index;
        if(index == 1) {
            wx.redirectTo({
                url: '/pages/user/mine/mine',
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: hot,
            method: 'GET',
            success: function(res) {
                console.log(res.data)
                that.setData({
                    hotDevice: res.data.device
                })
            },
            fail: function(res) {console.log("请求失败")},
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