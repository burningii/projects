

// 简单封装 跳转 方法
function index() {
  console.log('to index');
  wx.switchTab({
    url: '/mandou_love/pages/index/index',
  });
}


export default {index}

