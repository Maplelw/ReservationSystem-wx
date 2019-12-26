let login = require('../../global/global.js').login;
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        console.log(1)
        var that = this
        wx.login({
            success(res) {
                wx.request({
                    url: login,
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        code: res.code,
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                            if (res.data.identity === 0) {//用户
                                wx.redirectTo({
                                    url: '/pages/user/index/index',
                                })
                            }
                            else if (res.data.identity === 1) {// 管理员
                                wx.redirectTo({
                                    url: '/pages/admin/index/index?' + "superAdmin=" + res.data.superAdmin,
                                })

                            }
                            else { // 不存在
                                console.log(res.data.academyList)
                                var academyList = JSON.stringify(res.data.academyList)
                                wx.redirectTo({
                                    url: '/pages/user/register/register',
                                })
                                
                            }
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    }
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