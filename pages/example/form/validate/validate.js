import WxValidate from '../../../common/lib/WxValidate'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this  
    // 验证字段的规则
    const rules = {
      name: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      mobile: {
        required: true,
        tel: true,
      },
      email: {
        required: true,
        email: true,
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: 'please input user name',
      },
      mobile: {
        required: 'please input mobile number',
        tel: 'please input correct format',
      },
      email: {
        required: 'please input email',
        email: 'please input correct format',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit: function (e) {
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      console.log(error)
      this.setData(
        { popErrorMsg: error.msg }
      );
      this.ohShitfadeOut();
      /**wx.showToast({
        title: `${error.msg} `,
        image: '../../../../image/play.png',
        duration: 2000
      })**/
      return false
    }
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'https://www.daveland.com.cn/wechat/auth/mini/coupon/gen',
      method: 'POST',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var coupon = res.data.coupon
        console.log(coupon)
        wx.navigateTo({
          url: 'coupon?coupon=' + coupon,
        })
      }
    })
  },
  formReset: function () {
    this.setData(
      { date: '' }
    );  
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
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