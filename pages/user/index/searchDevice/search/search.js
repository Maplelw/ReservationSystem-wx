let all = require('../../../../../global/global.js').all;
let searchDevice = require('../../../../../global/global.js').searchDevice;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        allFlag: 0, //判断是否到最后一个
        allPage: 1, //搜索页数
        searchFlag: 0, //判断是否到最后一个
        searchPage: 1, //搜索页数
        allDevice: [],//所有设备
        searchDevice: [],//搜索得到的设备集
        choice: "all",//显示搜索设备还是所有设备
        input: "", //搜索内容

    },
    // 搜索    
    // 搜索内容改变
    input: function (e) {
        this.setData({
            input: e.detail.value
        })
    },
    // 提交搜索
    search: function (e) {
        var that = this
        console.log("提交内容:" + e.detail.value)
        that.setData({
            searchPage: 1,
            searchDevice: null,
            choice: "search"
        })
        wx.login({
            success: function (res) {
                wx: wx.request({
                    url: searchDevice,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        keyword: that.data.input,
                        page: that.data.searchPage
                    },
                    success: function (res) {
                        console.log(res.data)
                        if (res.data.flag === 1) {
                            that.setData({
                                searchDevice: res.data.device,
                                searchPage: that.data.searchPage + 1,
                                choice: "search",
                            })
                        }
                        else {
                            that.setData({
                                searchDevice: null,  
                            })
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    }
                })
            }
        })
    },

    //获取设备的具体信息
    getDetails: function (e) {
        var t = e.currentTarget.dataset.index;
        var d_no
        if (this.data.choice === 'all')
            d_no = this.data.allDevice[t].d_no
        else
            d_no = this.data.searchDevice[t].d_no;
        console.log("编号：" + d_no)
        wx.navigateTo({
            url: '../device/device' + '?d_no=' + d_no,
        })
    },

    //显示所有设备
    showAll() {
        this.setData({
            choice: "all",
            searchDevice: null,
            searchPage: 1
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: all,
            method: 'POST',
            data: {
                page: that.data.allPage
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.flag === 1) {
                    that.setData({
                        allDevice: res.data.device,
                        allPage: that.data.allPage + 1,
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            },
            fail: function (res) {
                console.log("请求失败")
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
        var that = this
        if (that.data.choice === 'all') {
            if (that.data.allFlag === 1) {
                wx.showToast({
                    title: '已经到最后一个设备',
                    icon: "loading",
                    duration: 500
                })
            } else {
                console.log(that.data.allPage)
                wx.request({
                    url: all,
                    data: {
                        page: that.data.allPage
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
                                allFlag: 1
                            })
                            wx.showToast({
                                title: '已经到最后一个设备',
                                icon: "loading",
                                duration: 500
                            })
                        } else {
                            newDevice = oldDevice.concat(res.data.device)
                            console.log(newDevice)
                            that.setData({
                                allDevice: newDevice,
                                allPage: that.data.allPage + 1
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
                })
            }
        }
        else if (that.data.choice === 'search') {
            if (that.data.searchFlag === 1) {
                wx.showToast({
                    title: '已经到最后一个设备',
                    icon: "loading",
                    duration: 500
                })
            }
            else {
                console.log(that.data.searchPage)
                wx.request({
                    url: all,
                    data: {
                        keyword: that.data.input,
                        page: that.data.searchPage
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        console.log(res.data)
                        if (res.data.flag === 0) {
                            that.setData({
                                searchFlag: 1
                            })
                            wx.showToast({
                                title: '已经到最后一个设备',
                                icon: "loading",
                                duration: 500
                            })
                        } else {
                            that.setData({
                                searchDevice: that.data.searchDevice.concat(res.data.device),
                                searchPage: that.data.searchPage + 1
                            })
                            console.log(that.data.searchDevice)
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
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