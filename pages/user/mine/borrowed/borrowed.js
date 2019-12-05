// pages/mine/details/borrowed/borrowed.js
let borrowed = require('../../../../global/global.js').borrowed;
let showQRCode = require('../../../../global/global.js').showQRCode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,// 页数
        flag: 0,// 是否最后一页
        choice: "ing",
        ingColor: "#89AFD4",
        doneColor: "#bbbbbb",
        isQRcode: false,
        isComment: false,
        img: "",
        borrowed_item: [
            {
                d_name: "博冠马卡 200/2400",
                d_no: "EK100S",
                b_borrowDate: "2019-10-25",
                b_returnDate: "2019-10-25",
                d_saveSite: "物电院B301",
                b_state: 0,
                b_no: 2
            },
            {
                d_name: "博冠马卡 200/2400",
                d_no: "EK100S",
                b_borrowDate: "2019-10-25",
                b_returnDate: "2019-10-25",
                d_saveSite: "物电院B301",
                b_state: 1,
                b_no: 2
            },
            {
                d_name: "博冠马卡 200/2400",
                d_no: "EK100S",
                b_borrowDate: "2019-10-25",
                b_returnDate: "2019-10-25",
                d_savesite: "物电院B301",
                b_state: -1,
                b_no: 2
            }
        ]
    },
    // 获取归还二维码
    getQRcode: function(e) {
        var that = this
        var t = e.currentTarget.dataset.index;
        var b_no = this.data.borrowed_item[t].b_no;
        that.setData({
            isQRcode: true
        }),
        wx.login({
            success(res) {
                wx.request({
                    url: showQRCode,
                    data: {
                        b_no: b_no
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        that.setData({
                            img: res.data,
                            isTrue: true
                        })
                    }
                })
            }
        }) 
    },
    //关闭二维码
    hideCode: function () {
        this.setData({
            isQRcode: false
        })
    },

    // 跳转到评论界面 
    showComment: function(e) {
        var t = e.currentTarget.dataset.index
        var d_no = this.data.borrowed_item[t].d_no
        console.log("设备编号：" + d_no)
        wx.navigateTo({
            url: 'comment/comment' + '?d_no=' + d_no,
        })
    },
    //设备的具体信息
    getDeviceDetail: function (e) {
        var t = e.currentTarget.dataset.index
        var d_no = this.data.borrowed_item[t].d_no
        console.log("设备编号：" + d_no)
        wx.navigateTo({
            url: '/pages/user/index/searchDevice/device/device' + '?d_no=' + d_no,
        })
    },
    //改变页面显示为 ing
    toIng: function () {
        this.setData({
            choice: "ing",
            ingColor: "#89AFD4",
            doneColor: "#bbbbbb"
        })
    },
    //改变页面显示为 done
    toDone: function () {
        this.setData({
            choice: "done",
            ingColor: "#bbbbbb",
            doneColor: "#89AFD4"
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this;
    wx.login({
        success: function(res){
            wx.request({
                url: borrowed,
                data: {
                    code: res.code,
                    page: that.data.page
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                    console.log(res.data)
                    that.setData({
                        borrowed_item: res.data.borrowed_item
                    })
                },
                fail: function (res) {
                    console.log("请求失败")
                },

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
        var that = this;
        if (that.data.flag === 1) {
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
                    code: res.code,
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
                        console.log(res.data.borrowed_item)
                        that.setData({
                            borrowed_item: borrowed_item.concat(res.data.borrowed_item),
                            page: that.data.page + 1
                        })
                    }
                },
                fail: function (res) { console.log("请求失败") },
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})