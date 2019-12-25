let deviceDetail = require('../../../../../global/global.js').deviceDetail;
let editDevice = require('../../../../../global/global.js').editDevice; 
let deleteDevice = require('../../../../../global/global.js').deleteDevice; 
let uploadImg = require('../../../../../global/global.js').uploadImg;
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
        topic: "", //修改框的标题
        isWindowShow: false, //是否显示弹窗
        inputValue: "", //输入框的内容
    },
// 弹窗
    // 关闭 
    hideWindow: function() {
        this.setData({
            isWindowShow: false
        })
    },
    // 获取修改设备内容
    getChange(e) {
        this.setData({
            inputValue: e.detail.value
        })    
    },
    // 获取状态单选框内容
    getRadio(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    // 打开弹窗
    changeName: function() {
        this.setData({
            topic: "修改设备名称",
            isWindowShow: true,
            inputValue: this.data.device.d_name
        })
    },
    changeModel: function () {
        this.setData({
            topic: "修改设备型号",
            isWindowShow: true,
            inputValue: this.data.device.d_model
        })

    },
    changeSaveSite: function () {
        this.setData({
            topic: "修改设备存放地点",
            isWindowShow: true,
            inputValue: this.data.device.d_saveSite
        })

    },
    changeAdmin: function () {
        this.setData({
            topic: "修改保管人员姓名",
            isWindowShow: true,
            inputValue: this.data.device.a_name
        })

    },
    changeAdminPhone: function () {
        this.setData({
            topic: "修改保管人员电话",
            isWindowShow: true,
            inputValue: this.data.device.a_phone
        })

    },
    changeState: function () {
        this.setData({
            topic: "修改设备状态",
            isWindowShow: true,
            inputValue: this.data.device.d_state
        })

    },
// 提交修改 
    submitChange: function() {
        var that = this
        var changeEntity
        // 判断需要修改的内容是什么
        if(that.data.inputValue == '') {
            wx.showToast({
                title: '输入信息不能为空',
                icon: "none"
            })
        }
        else {
            if (this.data.topic === "修改设备名称") {
                console.log("修改设备名称:" + this.data.inputValue)
                changeEntity = "d_name"
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editDevice,
                            data: {
                                d_no: that.data.d_no,
                                d_name: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 1) {
                                    that.refresh()
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
            else if (this.data.topic === "修改设备型号") {
                console.log("修改设备型号:" + this.data.inputValue)
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editDevice,
                            data: {
                                d_no: that.data.d_no,
                                d_model: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 1) {
                                    that.refresh()
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
            else if (this.data.topic === "修改设备状态") {
                console.log("修改设备状态:" + this.data.inputValue)
                changeEntity = "d_state"
                wx.login({
                    success: function (res) {
                        wx.request({
                            url: editDevice,
                            data: {
                                d_no: that.data.d_no,
                                d_state: that.data.inputValue
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 1) {
                                    that.refresh()
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
            url: uploadImg,
            filePath: imgurl,
            name: 'file',
            method: 'POST',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                d_no: that.data.d_no
            },
            success: function (res) {
                console.log(res.data) //接口返回网络路径
                var tData = JSON.parse(res.data)
                if(tData.flag === 1) {
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
    },
// 重新加载内容    
    refresh() {
        var that = this
        wx.login({
            success(res) {
                wx.request({
                    url: deviceDetail,
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        d_no: that.data.d_no,
                        code: res.code
                    },
                    success(res) {
                        console.log(res.data)
                        if(res.data.flag === 1) {
                            that.setData({
                                device: res.data.device
                            })
                            console.log(res.data.device)
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
//删除设备
    deleteDevice() {
        var that = this
        wx.showModal({
            title: '提示',
            content: '确定删除该设备',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.login({
                        success(res) {
                            wx.request({
                                url: deleteDevice,
                                method: 'POST',
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    d_no: that.data.d_no,
                                },
                                success(res) {
                                    console.log(res.data)
                                    if (res.data.flag === 1) {
                                        wx.showToast({
                                            title: '删除成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                        wx.reLaunch({
                                            url: '../changeDevice'
                                        })
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
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
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
        wx.login({
            success(res) {
                wx.request({
                    url: deviceDetail,
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        d_no: that.data.d_no,
                        code: res.code
                    },
                    success(res) {
                        if(res.data.flag === 1) {
                            console.log(res.data)
                            that.setData({
                                device: res.data.device
                            })
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