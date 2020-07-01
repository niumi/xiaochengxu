var app = getApp();
function getMusic(mid,fn){
  // 请求播放地址
  wx.request({
    url: 'http://iwenwiki.com/api/music/play.php?mid=' + mid,
    success: function (res) {
      console.log(res)
      // 把歌曲名字保存到全局globalData上
      app.globalData.musicname = res.data.songinfo.title;
      // 设置标题
      // that.setData({
      //   musicname: res.data.songinfo.title
      // })
      app.globalData.backgroundAudioManager.title = res.data.songinfo.title;
      app.globalData.backgroundAudioManager.src = res.data.bitrate.file_link;
      app.globalData.backgroundAudioManager.onCanplay(function () {
        app.globalData.backgroundAudioManager.play()
        // 改变播放暂停的图标
        // that.setData({
        //   flag: true
        // })
        fn({
          musicname: res.data.songinfo.title,
          flag: true
        })
      })
    }
  })
}

module.exports = getMusic;