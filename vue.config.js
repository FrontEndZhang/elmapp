const appData = require("./mock/data.json")

module.exports = {
    chainWebpack: config => {
        // 设置别名
        config.resolve.alias
            // 语法： .set(别名,路径)
            .set('assets', '@/assets')
            .set('components', '@/components')
            .set('common', '@/common')
            .set('network', '@/network')
            .set('views', '@/views')
    },
    devServer: {
        port: 8080,
        // 设置前缀
        before(app) {
            const seller = appData.seller;
            const goods = appData.goods;
            const ratings = appData.ratings;
            
            app.get("/api/all", (req, res) => {
                res.json(appData);
            });
            app.get('/api/seller', (req, res) => {
                res.json({
                    errno: 0,
                    data: seller
                });
            });
            app.get('/api/goods', (req, res) => {
                res.json({
                    errno: 0,
                    data: goods
                });
            });
            app.get('/api/ratings', (req, res) => {
                res.json({
                    errno: 0,
                    data: ratings
                });
            });
        },
        proxy: {
            '/api': {
              target: 'http://192.168.0.106:8080/api',  //目标接口域名
              ws : true,
              pathRewrite: {
                '^/api': '/'   //重写接口
              },
              changeOrigin: true,  //是否跨域
            },
      
          },
    },
    
  
}