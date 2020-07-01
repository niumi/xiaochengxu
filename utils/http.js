function http(type,count,offset,fn){
  wx.showLoading({
    title: '数据拼命加载中...',
  })
  wx.request({
    url: 'http://iwenwiki.com/api/music/list.php?type='+type+'&count='+count+'&offset='+offset,
    success: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '数据加载成功',
      })
      // console.log(res);
      var obj = {}
      // 名称
      obj.name = res.data.billboard.name;
      // type
      obj.type = res.data.billboard.billboard_type;
      obj.pics = [];
      if(res.data.song_list){
        for (var i = 0; i < res.data.song_list.length; i++) {
          obj.pics.push(res.data.song_list[i].pic_big)
        }
      }
      // 保存歌曲信息
      obj.songinfo = [];
      if (res.data.song_list) {
        for(var j=0;j<res.data.song_list.length;j++){
          var songobj ={}
          songobj.title = res.data.song_list[j].title
          songobj.author = res.data.song_list[j].author
          songobj.song_id = res.data.song_list[j].song_id
          songobj.pic_big = res.data.song_list[j].pic_big
          obj.songinfo.push(songobj)
        }
      }
      // 保存简介和图片
      obj.comment = res.data.billboard.comment;
      obj.pic = res.data.billboard.pic_s192;
      // 回调函数
      fn(obj)
    }
  });
}
// 导出
module.exports=http;