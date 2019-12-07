let deviceDetail = require('../../../../../global/global.js').deviceDetail;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: 'detail',//详细信息或修改
        device: {},
        code: "",
        d_no: "",
        imgs: [],//本地图片地址数组
        picPaths: [],//网络路径
    },

    //修改设备信息
    editDevice: function() {
        console.log("修改设备")
        this.setData({
            choice: 'edit'
        })
    },

    //确定修改信息
    confirm: function() {
        console.log("确定修改信息")
        this.setData({
            choice: 'detail'
        })
    },

    // 上传图片
    //添加上传图片
    uploadImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    // 得到需要上传的图片
    chooseWxImage: function (type) {
        var that = this;
        var imgsPaths = that.data.imgs;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                console.log(res.tempFilePaths[0]);
                that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
            }
        })
    },
    //上传服务器
    upImgs: function (imgurl, index) {
        var that = this;
        wx.uploadFile({
            url: 'http://49.235.73.29:8083/CampusDevice/admin/upload',
            filePath: imgurl,
            name: 'file',
            method: 'POST',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                d_no: '1905399S'
            },
            success: function (res) {
                console.log(res.data) //接口返回网络路径
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            d_no: options.d_no
        })
        var that = this;
        console.log("上一页面传来的编号")
        console.log(this.data.d_no)
        wx.request({
            url: deviceDetail,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                d_no: that.data.d_no
            },
            success(res) {
                console.log(res.data)
                that.setData({
                    device: 　res.data.device
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})