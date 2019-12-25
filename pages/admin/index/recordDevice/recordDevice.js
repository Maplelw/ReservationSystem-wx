let addDevice = require('../../../../global/global.js').addDevice
Page({

    /**
     * 页面的初始数据
     */
    data: {
        d_storeDate: "请填写入库日期"
    },
    // 获取入库时间改变
    changeDate(e) {
        this.setData({
            d_storeDate: e.detail.value
        })
    },
    // 校验
    // 校验设备No
    checkNo(no) {
        var re = /^\w*$/
        if(re.test(no)) 
            return true
        else
            return false
    },

    // 提交设备
    submit(e) {
        var that = this
        var datas = e.detail.value
        if (datas.d_no == '' || datas.d_name == '' || datas.d_model == '' || datas.d_state == '' || datas.d_saveSite == '' || datas.d_storeDate == '' || datas.d_factoryNo == '') {
            wx.showToast({
                title: '全部信息不能为空',
                icon: "none"
            })
        }
        else if(!that.checkNo(datas.d_no)) {
            wx.showToast({
                title: '设备编号必须是英文字母或数字，不能含有特殊字符、中文',
                icon: "none"
            })
        }
        else {
            wx.showLoading({
                title: '提交中',
                mask: true
            })
            wx.login({
                success(res) {
                    wx.request({
                        url: addDevice,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: res.code,
                            d_factoryNo: e.detail.value.d_factoryNo,
                            d_model: e.detail.value.d_model,
                            d_name: e.detail.value.d_name,
                            d_no: e.detail.value.d_no,
                            d_saveSite: e.detail.value.d_saveSite,
                            d_state: e.detail.value.d_state,
                            d_storeDate: e.detail.value.d_storeDate
                        },
                        success: function (res) {
                            wx.hideLoading()
                            console.log(res.data)
                            if (res.data.flag === 1) {
                                wx.showToast({
                                    title: '添加成功',
                                    duration: 2000
                                })
                                wx.navigateBack({})
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
    },
    uploadImg: function () {
        wx.chooseImage({
            count: 9,
            sizeType: [],
            sourceType: [],
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
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