//const host = "http://localhost:8080/CampusDevice"
//const host = "http://49.235.73.29:8083/CampusDevice"
const host = "https://www.tozsy.com/CampusDevice"
const datas = {
// 登录
    login: host + "/login",
// 用户
    //获取用户信息
    getUserInfo: host + "/user/getUserInfo",
    // 修改个人信息
    editUserInfo: host + "/user/editUserInfo",
    // 注册
    register: host + "/user/register",
    // 获取院系信息
    getAcademy: host + "/user/getAcademy",
    // 获取验证码
    verifyCode: host +　"/verifyCode",
    // 获取热门设备表
    hot: host + "/user/hot",
    // 获取所有设备表
    all: host + "/user/all",
    // 搜索设备
    searchDevice: host + "/user/searchDevice",
    // 获取具体设备信息
    deviceDetail: host + "/user/deviceDetail",
    // 获取设备评论
    deviceComment: host + "/user/deviceComment",
    // 跟踪设备
    track: host + "/user/track",
    // 取消跟踪设备
    cancelTrack: host + "/user/cancelTrack",
    // 预约
    reserve: host +　"/user/reserve",
    // 同意修改 agreeEditReservation
    agreeEditReservation: host + 　"/user/agreeEditReservation",
    // 查看已预约设备
    finishedReservation: host + "/user/finishedReservation",
    unfinishedReservation: host + "/user/unfinishedReservation",
    // 查看已借设备
    finishedBorrow: host + "/user/finishedBorrow",
    unfinishedBorrow: host + "/user/unfinishedBorrow",
    // 评价
    comment : host + "/user/comment",
    // 查看消息
    getMessage: host + "/user/getMessage",
    // 查看未读消息
    getUnReadMessage: host + "/user/getUnReadMessage",
    // 反馈
    feedbackToAdmin: host + "/user/feedbackToAdmin",
    // 取消预约
    cancelReservation: host + "/user/cancelReservation",
    // 获取信用记录
    getCredit: host + "/user/getCredit",
    // 获取信用规则
    getCreditRule: host + "/user/getCreditRule",
    // 生成二维码
    showQRCode: host + "/user/showQRCode",

// 管理员
    //具体预约信息
    reservationDetail: host + "/admin/reservationDetail",
    // 拒绝租借
    refuseReservation: host + "/admin/rejectReservation",
    // 确认租借
    confirmReservation: host + "/admin/confirmReservation",
    // 查看被预约的设备
    handleReservation: host + "/admin/handleReservation",
    // 修改借用时间
    editReservation: host + "/admin/editReservation",
    // 确认归还
    confirmReturn: host + "/admin/confirmReturn",
    // 查看反馈内容
    getFeedbackContent: host + "/admin/getFeedbackContent", 
    // 查看反馈内容
    respondToFeedback: host + "/admin/respondToFeedback", 
    // 查看逾期未归的记录
    overDue: host + "/admin/overDue",
    // 提醒逾期未还的借用人
    remindOverDue: host + "/admin/remindOverDue",
    // 管理员个人资料
    getAdminInfo: host + "/admin/getAdminInfo",
    // 获取借用的信息
    handleBorrow: host + 　"/admin/handleBorrow",
    // 录入设备
    inputDevice: host + "/admin/inputDevice",
    batchInputDevice: host + "/admin/batchInputDevice",
    // 搜索设备
    adminSearchDevice: host + "/admin/searchDevice",
    // 修改设备
    editDevice: host + "/admin/editDevice",
    // 修改设备
    adminAll: host + "/admin/all",
    // 删除设备
    deleteDevice: host + "/admin/deleteDevice", 
    // 添加设备
    addDevice: host + "/admin/addDevice",
    // 上传图片
    uploadImg: host + "/admin/upload",
    // 获取用户和管理员
    getUserAndNormalAdmin: host + "/admin/getUserAndNormalAdmin",
    // 设置为管理员
    setUserAsAdmin: host + "/admin/setUserAsAdmin",
    // 移除管理员
    deleteAdmin: host + "/admin/deleteAdmin",
}
module.exports = datas;