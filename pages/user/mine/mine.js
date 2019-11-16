Page({

  /**
   * 页面的初始数据
   *
   */
  data: {
    iconUrl: "",
    userName: "",
    length: "",
    navigator: [
        {
            img: "/img/global/nv_index_off.png",
            name: "首页"
        },
        {
            img: "/img/global/nv_mine_on.png",
            name: "我的"
        }
    ]
  },
    //当航变化
    navigate: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            wx.redirectTo({
                url: '/pages/user/index/index',
            })
        }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function(res){
        that.setData({iconUrl:res.userInfo.avatarUrl});
        that.setData({userName:res.userInfo.nickName});
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