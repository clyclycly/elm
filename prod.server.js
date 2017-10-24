/* 测试用的node.js配置;解决测试的跨域问题 */

var express = require('express');   // 基于 Node.js 平台，快速、开放、极简的 web 开发框架。
var config = require('./config/index');   // 自己配置的依赖

var port = process.env.PORT || config.build.port;
/* 然后在config的index文件的build里定义port为9000 */

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});

app.use(router);

/* 复制dev-servrt中数据的读取../改成./ */
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

/* 启动也是把dev-servrt中的80行开始复制过来 */
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
