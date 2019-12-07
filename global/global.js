//const host ="http://yapi.demo.qunar.com/mock/35294";
//const host = "http://localhost:8080/CampusDevice_war_exploded"
const host = "http://49.235.73.29:8083/CampusDevice"
const datas = {
// 登录
    login: host + "/login",
    // 获取验证码
    verifyCode: host + 　"/verifyCode",
// 用户
    //获取用户信息
    getUserInfo: host + "/user/getUserInfo",
    // 注册
    register: host + "/user/register",
    
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
    // 预约
    reserve: host +　"/user/reserve",
    // 查看已预约设备
    finishedReservation: host + "/user/finishedReservation",
    // 查看已预约设备
    unfinishedReservation: host + "/user/unfinishedReservation",
    // 同意修改时间
    agreeEditReservation: host + "/user/agreeEditReservation",
    // 查看已借设备 未完成
    unfinishedBorrow: host + "/user/unfinishedBorrow",
    // 查看已借设备  已完成
    finishedBorrow: host + "/user/finishedBorrow",
    // 提交评价
    comment: host + "/user/comment",
    // 查看消息
    getMessage: host + "/user/getMessage",
    // 取消预约
    cancelReservation: host + "/user/cancelReservation",
    // 获取信用记录
    getCredit: host + "/user/getCredit",
    // 生成二维码
    showQRCode: host + 　"/user/showQRCode",

// 管理员
    // 查看预约信息
    reservationDetail: host + "/admin/reservationDetail",
    // 编辑预约
    editReservation: host + "/admin/editReservation",
    // 拒绝租借
    refuseReservation: host + "/admin/rejectReservation",
    // 确认租借
    confirmReservation: host + "/admin/confirmReservation",
    // 查看被预约的设备
    handleReservation: host + "/admin/handleReservation",
    // 确认归还
    confirmReturn: host + "/admin/confirmReturn",
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
    batchInputDevice: host + "/admin/batchInputDevice"
}
module.exports = datas;