// pages/musicList/musicList.js
// 引入http.js
var http = require('../../utils/http.js');
var getMusic = require('../../utils/getMusic.js');
// 获取app.js实例对象
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    songinfo:[],
    pic:'',
    comment:'',
    name:'',
    num:0,
    flag:false,
    musicname:'',
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  playmusic:function(event){
    var that = this;
    console.log(event)
    if(app.globalData.songlist.length>0){
      app.globalData.index = event.currentTarget.dataset.mindex
    }
    getMusic(event.currentTarget.dataset.mid,function(res){
      that.setData({
        musicname: res.musicname,
        flag: res.flag
      })
    })
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/play.php?mid='+event.currentTarget.dataset.mid,
    //   success:function(res){
    //     console.log(res)
    //     // 把歌曲名字保存到全局globalData上
    //     app.globalData.musicname = res.data.songinfo.title;
    //     // 设置标题
    //     that.setData({
    //       musicname: res.data.songinfo.title
    //     })
    //       app.globalData.backgroundAudioManager.title=res.data.songinfo.title;
    //     app.globalData.backgroundAudioManager.src = res.data.bitrate.file_link;
    //     app.globalData.backgroundAudioManager.onCanplay(function(){
    //       app.globalData.backgroundAudioManager.play()
    //       // 改变播放暂停的图标
    //       that.setData({
    //         flag:true
    //       })
    //     })
        
    //   }
    // })
  },
  controlPlay:function(){
    // 如果是播放状态，要暂停；如果是暂停状态，要播放
    if (app.globalData.backgroundAudioManager.paused){
      console.log("当前是暂停状态")
      app.globalData.backgroundAudioManager.play();
      this.setData({
        flag:true
      })
    }else{
      console.log("当前是播放状态")
      app.globalData.backgroundAudioManager.pause();
      this.setData({
        flag: false
      })
    }
  },
  playAll:function(){
    var that = this;
    // 歌曲列表、下标保存到globalData上
    app.globalData.songlist=this.data.songinfo;
    app.globalData.index = this.data.index;
    getMusic(app.globalData.songlist[app.globalData.index].song_id,function(res){
      console.log(res)
      that.setData({
        musicname:res.musicname,
        flag:res.flag
      })
    })
  },
  onLoad: function (options) {
    // 监听音乐是否自然播放完成
    app.globalData.backgroundAudioManager.onEnded(function(){
      console.log("播放完成")
      app.globalData.index++;
      if(app.globalData.songlist.length>app.globalData.index){
        getMusic(app.globalData.songlist[app.globalData.index].song_id,function(res){
          that.setData({
            musicname: res.musicname,
            flag: res.flag
          })
        })
      }else{
        app.globalData.musicname='';
        that.setData({
          musicname:'',
          flag:false
        })
      }
      // wx.request({
      //   url: 'http://iwenwiki.com/api/music/play.php?mid=' + app.globalData.songlist[app.globalData.index].song_id,
      //   success: function (res) {
      //     console.log(res)
      //     // 把歌曲名字保存到全局globalData上
      //     app.globalData.musicname = res.data.songinfo.title;
      //     // 设置标题
      //     that.setData({
      //       musicname: res.data.songinfo.title
      //     })
      //     app.globalData.backgroundAudioManager.title = res.data.songinfo.title;
      //     app.globalData.backgroundAudioManager.src = res.data.bitrate.file_link;
      //     app.globalData.backgroundAudioManager.onCanplay(function () {
      //       app.globalData.backgroundAudioManager.play()
      //       // 改变播放暂停的图标
      //       that.setData({
      //         flag: true
      //       })
      //     })
      //   }
      // })
    })
    // 判断当前音乐播放状态
    if(app.globalData.backgroundAudioManager.paused||app.globalData.backgroundAudioManager.paused===undefined){
      this.setData({
        flag:false
      })
    }else{
      this.setData({
        flag:true
      })
    }

    var that = this;
    this.setData({
      type:options.mtype,
      musicname:app.globalData.musicname // 从全局globalData上获取歌曲名称
    })
    http(this.data.type,15,0,function(res){
      console.log(res)
      that.setData({
        songinfo:res.songinfo,
        name:res.name,
        pic:res.pic,
        comment:res.comment
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    // 下拉清空数据
    this.setData({
      songinfo:[],
      num:0
    })
    // 请求新数据
    http(this.data.type,15,0,function(res){
      // 保存起来，自动更新页面
      that.setData({
        songinfo:res.songinfo
      })
      app.globalData.songlist=res.songinfo
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    // console.log('到底了')
    this.data.num++
    // 请求新数据
    http(this.data.type,15,15*this.data.num,function(res){
      // console.log(res)
      // 把新数据和老数据拼接到一起
      app.globalData.songlist = that.data.songinfo.concat(res.songinfo)
      that.setData({
        songinfo:app.globalData.songlist
      })
    })
  }

})