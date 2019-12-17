let getMessage = require('../../../../global/global.js').getMessage;
let getUnReadMessage = require('../../../../global/global.js').getUnReadMessage;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 页数
        flag: 0, // 是否最后一页
        messages: [],
        unReadNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 获取所有消息
        wx.login({
            success: function (res) {
                wx.request({
                    url: getUnReadMessage,
                    data: {
                        code: res.code,
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if(res.data.errMsg == "当前无未读消息") {
                            
                        }
                        else {
                            console.log(1)
                            var list = res.data.messageList
                            that.setData({
                                unReadNum: list.length
                            })
                        }
                        wx.login({
                            success: function (res) {
                                wx.request({
                                    url: getMessage,
                                    data: {
                                        code: res.code,
                                        page: that.data.page
                                    },
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success(res) {
                                        console.log(res.data)
                                        that.setData({
                                            messages: res.data.messages,
                                            page: that.data.page + 1
                                        })
                                    },
                                    fail() {
                                        console.log("请求失败")
                                    }
                                })
                            },
                            fail: function (res) {
                                console.log("login失败")
                            }
                        })
                    },
                    fail() {
                        console.log("请求失败")
                    }
                })
            },
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
    var that = this
    console.log(that.data.flag)
    if (that.data.flag === 1) { // 到最后一页了
        wx.showToast({
            title: '已经到最后一个设备',
            icon: "loading",
            duration: 500
        })
    } else {
        wx.login({
            success(res) {
                wx.request({
                    url: getMessage,
                    data: {
                        page: that.data.page,
                        code: res.code
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        console.log(that.data.messages)
                        console.log("page:" + that.data.page)
                        if (res.data.flag === 0) {
                            that.setData({
                                flag: 1
                            })
                            wx.showToast({
                                title: '已经到最后一个设备',
                                icon: "loading",
                                duration: 500
                            })
                        } else {
                            that.setData({
                                messages: that.data.messages.concat(res.data.messages),
                                page: that.data.page + 1
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
                })
            }
        })
    }
},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})