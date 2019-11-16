//const host ="http://yapi.demo.qunar.com/mock/35294";
const host = "http://localhost:8080/CampusDevice_war_exploded"
const datas = {
    getUserInfo: host + "/user/getUserInfo",
    register: host + "/user/register",
    getSecurityCode: host +　"/user/getSecurityCode",
    hot: host + "/user/hot",
    details: host + "/user/details",
    reserve: host +　"/user/reserve",
    reservationDetail: host + "/admin/reservationDetail",
    rejectReservation: host + "/admin/rejectReservation",
    confirmReservation: host + "/admin/confirmReservation",
    handleReservation: host + "/admin/handleReservation",
    confirmReturn: host + "/admin/confirmReturn",
    overDue: host + "/admin/overDue",
    remindOverDue: host + "/admin/remindOverDue",
}
module.exports = datas;