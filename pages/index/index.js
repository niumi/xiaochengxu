//index.js
//获取应用实例
const app = getApp()
// 引入http.js
var http = require('../../utils/http.js');

Page({
  data: {
    jingdian:{},
    rege:{},
    xinge:{},
    yaogun:{},
    jinqu:{}
  },
  
  onLoad: function () {
    var that = this;
    // 经典老歌榜 type=22
    http(22,1,0,function(res){
      that.setData({
        jingdian:res
      })
    })
    // 热歌榜 type =2
    http(2,1,0,function(res){
      that.setData({
        rege:res
      })
    })
    // 新歌榜 type=1 ，3条数据
    http(1,3,0,function(res){
      that.setData({
        xinge:res
      })
    })
    // 摇滚榜 type=11
    http(11,3,0,function(res){
      that.setData({
        yaogun:res
      })
    })
    // 金曲榜 type=24
    http(24,3,0,function(res){
      that.setData({
        jinqu:res
      })
    })
  },
  toList:function(event){
    // 页面跳转
    wx.navigateTo({
      url: '../musicList/musicList?mtype='+event.currentTarget.dataset.mtype,
    })
  }
})
