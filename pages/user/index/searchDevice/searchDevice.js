let hot = require('../../../../global/global.js').hot;
let all = require('../../../../global/global.js').all;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: "hot",  // 上侧导航
        page: 1, // 页数
        flag: 0, // 已经加载到最后一个设备
        input: "搜索内容", //搜索框内容
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
    getHotDetails: function(e) {
        var t = e.currentTarget.dataset.index;
        var d_no = this.data.hotDevice[t].d_no;
        wx.navigateTo({
            url: '/pages/user/index/searchDevice/device/device' + '?d_no=' + d_no,
        })
    },
    getAllDetails: function (e) {
        var t = e.currentTarget.dataset.index;
        var d_no = this.data.allDevice[t].d_no;
        wx.navigateTo({
            url: '/pages/user/index/searchDevice/device/device' + '?d_no=' + d_no,
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
    // 提交搜索
    search: function (e) {
        wx.navigateTo({
            url: 'search/search',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: hot,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data)
                if(res.data.flag === 1) {
                    that.setData({
                        hotDevice: res.data.device
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            },
            fail: function(res) {console.log("请求失败")},
        })
        wx.request({
            url: all,
            method: 'POST',
            data: { 
                page: that.data.page
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if(res.data.flag === 1) {
                    that.setData({
                        allDevice: res.data.device,
                        page: that.data.page + 1,
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            },
            fail: function (res) { console.log("请求失败") },
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
        var that = this;
        if(that.data.choice === "all") {
            if(that.data.flag === 1) {
                wx.showToast({
                    title: '已经到最后一个设备',
                    icon: "loading",
                    duration: 500
                })
            }
            else {
                console.log(that.data.page)
                wx.request({
                    url: all,
                    data: {
                        page: that.data.page
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        console.log(res.data)
                        var oldDevice = that.data.allDevice
                        var newDevice
                        if (res.data.flag === 0) {
                            that.setData({
                                flag: 1
                            })
                            wx.showToast({
                                title: '已经到最后一个设备',
                                icon: "loading",
                                duration: 500
                            })
                        }
                        else {
                            newDevice = oldDevice.concat(res.data.device)
                            console.log(newDevice)
                            that.setData({
                                allDevice: newDevice,
                                page: that.data.page + 1
                            })
                        } 
                    },
                    fail: function (res) { console.log("请求失败") },
                })
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})