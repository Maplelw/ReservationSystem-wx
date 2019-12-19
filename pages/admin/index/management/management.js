let getUserAndNormalAdmin = require('../../../../global/global.js').getUserAndNormalAdmin
let setUserAsAdmin = require('../../../../global/global.js').setUserAsAdmin
let deleteAdmin = require('../../../../global/global.js').deleteAdmin
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: "admin",//头部选项
        userColor: "#bbbbbb",//头部颜色
        adminColor: "#89AFD4",//头部颜色
        userList: [],
        adminList: [{
            a_name: ""
        }]
    },
    //顶部状态改变    
    //改变页面显示为 ing
    toUser: function () {
        this.setData({
            choice: "user",
            userColor: "#89AFD4",
            adminColor: "#bbbbbb"
        })
        this.refresh()
    },
    //改变页面显示为 done
    toAdmin: function () {
        this.setData({
            choice: "admin",
            userColor: "#bbbbbb",
            adminColor: "#89AFD4"
        })
        this.refresh()
    },
    //添加删除管理员
    // 添加管理员 
    addAdmin: function (e) {
        var that = this
        var index = e.currentTarget.dataset.index;
        var u_no = that.data.userList[index].u_no
        console.log("设置的用户no：" + u_no)
        console.log(that.data.userList)
        wx.showModal({
            title: '提示',
            content: '确认添加为管理员',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: setUserAsAdmin,
                        data: {
                            u_no: u_no,
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success(res) {
                            console.log(res.data)
                            if (res.data.flag === 1) {
                                that.refresh()
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
                else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //删除管理员
    deleteAdmin(e) {
        var index = e.currentTarget.dataset.index;
        console.log("下标为：" + index)
        var a_no = this.data.adminList[index].a_no
        console.log("设置的用户no：" + u_no)
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认添加为管理员',
            success: (res) => {
                if (res.confirm) {
                    wx.login({
                        success(res) {
                            wx.request({
                                url: deleteAdmin,
                                data: {
                                    a_no: a_no,
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success(res) {
                                    console.log(res.data)
                                    if (res.data.flag == 1) {
                                        that.refresh()
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
                }
                else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 重新加载页面
    refresh() {
        var that = this;
        wx.request({
            url: getUserAndNormalAdmin,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res.data)
                if (res.data.flag === 1) {
                    that.setData({
                        userList: res.data.userList,
                        adminList: res.data.adminList,
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            },
            fail() {
                console.log("请求失败")
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.refresh()
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