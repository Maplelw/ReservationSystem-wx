//const host ="http://yapi.demo.qunar.com/mock/35294";
const host = "http://localhost:8080/CampusDevice_war_exploded"
const datas = {
// 用户
    //获取用户信息
    getUserInfo: host + "/user/getUserInfo",
    // 注册
    register: host + "/user/register",
    // 获取验证码
    getSecurityCode: host +　"/user/getSecurityCode",
    // 获取热门设备表
    hot: host + "/user/hot",
    // 获取具体设备信息
    deviceDetail: host + "/user/deviceDetail",
    // 预约
    reserve: host +　"/user/reserve",
    // 查看已预约设备
    booked: host + "/user/reservation",
    // 查看已借设备
    borrowed: host + "/user/borrowed",
    // 查看消息
    getMessage: host + "/user/getMessage",
    // 取消预约
    cancelReservation: host + "/user/cancelReservation",
    // 获取信用记录
    getCredit: host + "/user/getCredit",

// 管理员
    // 
    reservationDetail: host + "/admin/reservationDetail",
    // 拒绝租借
    rejectReservation: host + "/admin/rejectReservation",
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
    // 录入设备
    inputDevice: host + "/admin/inputDevice",
    batchInputDevice: host + "/admin/batchInputDevice"
}
module.exports = datas;