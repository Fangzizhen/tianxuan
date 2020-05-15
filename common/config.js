let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://ttianxuan.local/'
}else{
    // 生产环境
    // url_config = 'http://ttianxuan.local/'
}

export default url_config