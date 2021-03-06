var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var fs = require('fs')

var app = new (require('express'))()
var port = 3000
var bodyParser = require('body-parser');

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})


fs.writeFile("/web/test/test.txt", "File created", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

app.post('/', function (req, res) {
  fs.writeFile("/web/test/test.txt", req.method + ' ' + req.originalUrl + ' ' + JSON.parse(req.body).foo, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
  res.sendFile(__dirname + '/index.html')
});