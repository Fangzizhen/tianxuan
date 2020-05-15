// const commonUrl = "http://ttianxuan.local/"; //公共路径 
const commonUrl = "/api/"; //公共路径 

// post请求封装
function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		var plugins_params = ''
		var token = ''
		uni.request({
			url: commonUrl + "index.php?s=/api/" + url + plugins_params + "&application=app&application_client_type=weixin" +
				"&token=" +
				token +
				"&ajax=ajax",
			data: postData,
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded",
			},
			success: function(res) {
				//返回什么就相应的做调整
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					// 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
					//接口后面的then执行
					// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
					//不会被阻断在那里执行不下去！
					resolve(res.data.msg);
				}
			},
			error: function(e) {
				reject("网络出错");
			}
		});
	});
	return promise;
}

// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: "GET",
			dataType: "json",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				reject("网络出错");
			}
		});
	});
	return promise;
}


module.exports = {
	post: postRequest,
	get: getRequest
};
