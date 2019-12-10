let register = require('../../../global/global.js').register
let verifyCode = require('../../../global/global.js').verifyCode
var interval = null //倒计时函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: "", //临时code，用户后端获取微信唯一标识openid
        type: "student", //账户类型 true:学生 false:老师 
        u_phone: "", //手机号码输入框得到的信息
        verifyCode: "", //验证码
        correctPhone: "", //保存正确的手机号码 确保验证码和手机号对应
        time: "获取验证码", //验证码按钮的文字
        errorMsg: "", // 输出错误信息
        currentTime: 61, //倒计时
        
    },

    // 获取验证码
    // 倒计时
    getCode: function(options) {
        var that = this;
        var currentTime = that.data.currentTime
        interval = setInterval(function() {
            currentTime--;
            that.setData({
                time: currentTime + '秒'
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    time: '重新发送',
                    currentTime: 61,
                    disabled: false
                })
            }
        }, 1000)
    },
    getVerificationCode() {
        if (this.checkPhone(this.data.u_phone)) { //手机号没问题
            this.getCode();
            var that = this
            that.setData({
                disabled: true
            })
            console.log(" 输入的电话：" + this.data.u_phone);
            var that = this;
            wx.request({
                url: verifyCode,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    phone: that.data.u_phone
                },
                success(res) {
                    console.log(res.data)
                    that.setData({
                        verifyCode: res.data.verifyCode,
                        correctPhone: that.data.u_phone
                    })
                }
            })
        } 
        else {
            this.setData({
                errorMsg: "请输入可用手机号"
            })
        }
    },

    // 校验
    // 校验手机号
    checkPhone(phone) {
        var flag = true;
        if (phone.length != 11 || phone.length == 0) {
            flag = false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                if (phone[i] >= '0' && phone[i] <= '9') {
                    contine;
                } else {
                    flag = false;
                    break;
                }
            }
        }
        return flag
    },

    // 提交
    formSubmit: function(e) {
        var that = this;
        // 校验不能为空
        if (e.detail.value.u_name == "") {
            this.setData({
                errorMsg: "姓名不能为空"
            })
        } 
        else if (e.detail.value.u_no == "") {
            this.setData({
                errorMsg: "学工号不能为空"
            })
        } 
        else if (e.detail.value.u_phone == "") {
            this.setData({
                errorMsg: "电话不能为空"
            })
        } 
        else if (e.detail.value.u_email == "") {
            this.setData({
                errorMsg: "邮箱不能为空"
            })
        } 
        else if (e.detail.value.securityCode == "") {
            this.setData({
                errorMsg: "验证码不能为空"
            })
        }
        else if (e.detail.value.u_major_class == "") {
            this.setData({
                errorMsg: "专业班级不能为空"
            })
        } 
        else if (e.detail.value.u_mentor_name == "") {
            this.setData({
                errorMsg: "导师姓名不能为空"
            })
        } 
        else if (e.detail.value.u_mentor_phone == "") {
            this.setData({
                errorMsg: "导师手机不能为空"
            })
        }
        else {
            // 校验验证码
            console.log("正确验证码：" + this.data.verifyCode);
            console.log("输入验证码：" + e.detail.value.securityCode);
            console.log("正确手机号：" + this.data.correctPhone);
            console.log("输入手机号：" + e.detail.value.u_phone);
            if (e.detail.value.securityCode == this.data.verifyCode && e.detail.value.u_phone == this.data.correctPhone) { //校验成功
                wx.login({
                    success(res) {
                        that.setData({
                            code: res.code
                        });
                        if (e.detail.value.u_type === "student") { // 学生
                            wx.request({
                                url: register,
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    code: that.data.code,
                                    u_no: e.detail.value.u_no,
                                    u_name: e.detail.value.u_name,
                                    u_email: e.detail.value.u_email,
                                    u_phone: e.detail.value.u_phone,
                                    u_type: e.detail.value.u_type,
                                    u_class_major: e.detail.value.u_major_class,
                                    u_mentor_name: e.detail.value.u_mentor_name,
                                    u_mentor_phone: e.detail.value.u_mentor_phone
                                },
                                success: function (res) {
                                    console.log(res.data)
                                    console.log("注册为学生")
                                }
                            })
                        } else { // 老师
                            console.log("注册为老师")
                            wx.request({
                                url: register,
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    code: that.data.code,
                                    u_no: e.detail.value.u_no,
                                    u_name: e.detail.value.u_name,
                                    u_email: e.detail.value.u_email,
                                    u_phone: e.detail.value.u_phone,
                                    u_type: e.detail.value.u_type,
                                },
                                success: function (res) {
                                    console.log(res.data)
                                }
                            })
                        }

                    },
                    fali(res) {
                        console.log("获取code失败")
                    }
                })
            } 
            else { //验证码不正确
                this.setData({
                    errorMsg: "验证码错误"
                })
            }
        }
    },

    // 根据学生/老师选项修改type
    radioChange: function(e) {
        if (e.detail.value == 'student') {
            this.setData({
                type: 'student'
            })
            console.log(this.data.type)
        } else {
            this.setData({
                type: 'teacher'
            })
            console.log(this.data.type)
        }

    },
    // 获取手机号码
    phoneInput: function(e) {
        this.data.u_phone = e.detail.value;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})