let reservationDetail = require('../../../../global/global.js').reservationDetail;
let confirmReturn = require('../../../../global/global.js').confirmReturn;
let handleBorrow = require('../../../../global/global.js').handleBorrow
Page({

    /**
     * 页面的初始数据
     */
    data: {
        input: "搜索内容",
        borrow: [],//所有归还设备列表
        showList:[], //显示的列表
    },
    // 扫一扫
    getScancode: function () {
        var that = this;
        // 允许从相机和相册扫码
        wx.scanCode({
            success: (res) => {
                console.log(res.result)
                var b_no = res.result
                wx.navigateTo({
                    url: 'returnFeedback/returnFeedback' + '?b_no=' + b_no,
                })
            }
        })
    },
    //确认归还按钮
    confirm: function (e) {
        var that = this
        var b_no = that.data.showList[e.currentTarget.dataset.index].b_no
        wx.navigateTo({
            url: 'returnFeedback/returnFeedback' + '?b_no=' + b_no,
        })
    },
    // 搜索内容改变
    input: function(e) {
        this.setData({
            input: e.detail.value
        })
    },
    // 搜索功能
    search: function(e) {
        console.log("提交内容:")
        console.log(e.detail.value)
        var input = e.detail.value
        var borrow = this.data.borrow
        var searchResult = new Array()
        for(var i=0;i<borrow.length;i++) {
            if (borrow[i].d_name.indexOf(input) != -1 || borrow[i].d_no.indexOf(input) != -1
|| borrow[i].u_no.indexOf(input) != -1 || borrow[i].u_name.indexOf(input) != -1 ) {
                searchResult.push(borrow[i])
            }
        }
        if (searchResult.length == 0) {
            wx.showToast({
                title: '没有搜索到该设备',
                icon: "none"
            })
        }
        this.setData({
            showList: searchResult
        })
    },
    // 显示所有设备
    showAll() {
        this.setData({
            showList: this.data.borrow
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        that.setData({
            showList: null
        })
        wx.login({
            success: function (res) {
                wx.request({
                    url: handleBorrow,
                    data: {
                        code: res.code
                    },
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        if(res.data.flag === 1) {
                            console.log(res.data)
                            that.setData({
                                borrow: res.data.device,
                                showList: res.data.device
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
            }
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