let getUserInfo = require('../../../../global/global.js').getUserInfo;
let editUserInfo = require('../../../../global/global.js').editUserInfo;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        topic: "", //修改弹窗的标题
        isWindowShow: false, //弹窗是否显示
        inputValue: "", //修改框的内容
    },
    // 弹窗
    // 关闭弹窗
    hideWindow: function() {
        this.setData({
            isWindowShow: false
        })
    },
    // 打开弹窗
    changeName: function() {
        this.setData({
            topic: "修改姓名",
            isWindowShow: true,
            inputValue: this.data.user.u_name
        })
    },
    changePhone: function() {
        this.setData({
            topic: "修改手机",
            isWindowShow: true,
            inputValue: this.data.user.u_phone
        })
    },
    changeEmail: function() {
        this.setData({
            topic: "修改邮箱",
            isWindowShow: true,
            inputValue: this.data.user.u_email
        })
    },
    changeMentorName: function() {
        this.setData({
            topic: "修改导师姓名",
            isWindowShow: true,
            inputValue: this.data.user.u_mentorName
        })
    },
    changeMentorPhone: function() {
        this.setData({
            topic: "修改导师电话",
            isWindowShow: true,
            inputValue: this.data.user.u_mentorPhone
        })
    },
    // 获取修改框的内容
    getChange(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    // 提交修改内容
    submitChange() {
        var that = this
        console.log(this.data.inputValue)
        if(that.data.inputValue == '') {
            wx.showToast({
                title: '输入不能为空',
                icon: "none"
            })
        }
        else {
            if (this.data.topic === "修改姓名") {
                console.log("修改姓名:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editUserInfo,
                            data: {
                                u_no: that.data.user.u_no,
                                u_name: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag == 1) {
                                    that.refresh() //重新加载
                                    that.setData({
                                        isWindowShow: false
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
            } else if (this.data.topic === "修改手机") {
                console.log("修改手机:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editUserInfo,
                            data: {
                                u_no: that.data.user.u_no,
                                u_phone: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 1) {
                                    that.refresh() //重新加载
                                    that.setData({
                                        isWindowShow: false
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
            } else if (this.data.topic === "修改邮箱") {
                console.log("修改邮箱:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editUserInfo,
                            data: {
                                u_no: that.data.user.u_no,
                                u_email: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 1) {
                                    that.refresh() //重新加载
                                    that.setData({
                                        isWindowShow: false
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
            } else if (this.data.topic === "修改导师姓名") {
                console.log("修改导师姓名:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editUserInfo,
                            data: {
                                u_no: that.data.user.u_no,
                                u_mentorName: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag == 1) {
                                    that.refresh() //重新加载
                                    that.setData({
                                        isWindowShow: false
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
            } else if (this.data.topic === "修改导师电话") {
                console.log("修改导师电话:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editUserInfo,
                            data: {
                                u_no: that.data.user.u_no,
                                u_mentorPhone: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag == 1) {
                                    that.refresh() //重新加载
                                    that.setData({
                                        isWindowShow: false
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
            }
        }
    },
    //重新加载
    refresh() { 
        var that = this
        wx.login({
            success: function (res) {
                wx.request({
                    url: getUserInfo,
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res.data)
                        if(res.data.flag == 1) {
                            that.setData({
                                user: res.data.user
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
            fail: function (res) {
                console.log("login失败")
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.login({
            success: function(res) {
                wx.request({
                    url: getUserInfo,
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log(res.data)
                        if(res.data.flag == 1) {
                            that.setData({
                                user: res.data.user
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }   
                    },
                    fail: function(res) {
                        console.log("请求失败")
                    },
                })
            },
            fail: function(res) {
                console.log("login失败")
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
    onShow: function() {},

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