//基于jquery实现交互功能
$(function(){
	//声明服务端接口地址
	var base = 'http://music.softeem.top/';
	//声明一个数组用于存储读取到的服务端的歌曲
	var musics = [];
	//创建一个音频播放器对象
	var player = document.createElement('audio');
	
	//发送ajax请求，获取服务端数据
	$.getJSON(base+'list',function(data){
		//将获取的数据传递到全局变量
		musics = data;
		//将数据与界面绑定（渲染）
		render();
	})
	
	//数据绑定
	function render(){
		var html = '';
		//对数组循环遍历 0~length-1
		$.each(musics,function(i,m){
			html += '<div class="item" data-index="'+i+'">'
			html += '<div class="item-icon"><img src="img/icon.png"/></div>'
			html += '<div class="item-name">'+m.name+'</div>'
			html += '<div class="item-size">'+fmtSize(m.size)+'</div>'
			html += '</div>'
		})
		$('.list').html(html);
	}
	
	//将字节单位转换为MB  1024kb=1mb  1kb=1024字节
	function fmtSize(size){
		size = size/(1024*1024);
		//将number类型的值精确到小数点后1位
		size = size.toFixed(1);
		return size + 'MB';
	}
	
	//声明一个变量用于表示当前正在播放的歌曲项
	var currentIndex = 0;
	//为歌曲列表项绑定点击事件(事件委托)
	$('.list').on('click','.item',function(){
		//获取需要播放的歌曲索引
		currentIndex = $(this).data('index');
		//获取需要播放的歌曲对象
		var m = musics[currentIndex];
		//为播放器设置播放路径
		player.src = base + m.path;
		//开始播放
		player.play();
	})
	
})

