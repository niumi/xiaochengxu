//app.js
App({
  onLaunch: function () {
    // 背景音乐对象创建出来
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    this.globalData.backgroundAudioManager = backgroundAudioManager;
  },
  globalData: {
    backgroundAudioManager:"",
    musicname:'',
    songlist:[],
    index:0
  }
})