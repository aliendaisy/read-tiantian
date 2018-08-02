var express = require('express');
var router = express.Router();
var userDB = require('../dao/user.json');
var fs = require('fs');



function getUser(username) {
  var result = null;
  for(var i=0;i<userDB.users.length;i++){
    var user=userDB.users[i];
    if(user.username==username){
      result=user;
      break;
    }
  }
  return result;
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});
router.post('/submit',function (req,res) {
    var name = req.body.username;
    var pwd=req.body.password;
  var user=getUser(name);
  // var users=userDB.users;
  if(user){
    if(pwd==user.password){
      res.end('success')
    }else{
      res.send('登录失败，密码不对')
    }
  }else{
    res.send('登录失败 账户不对')
  }
})
//注册
router.get('/register', function(req, res) {
  res.redirect('register.html')
});

router.post('/register', function(req, res) {
  var name = req.body.username;
  var pwd=req.body.password;
  var user=getUser(name);
  if(user){
    // res.writeHead(404,'ok',{
    //   'content-type':'text/html;charset=utf8'
    // });
    res.send("has this user 注册失败")
  }else{
    var userObj={
      username:name,
      password:pwd
    }
    saveUser(userObj,function (err) {
      if(err){
        res.send('register error注册失败'+err)
      }else {
        res.send('register success 注册成功')
      }
    });

  }
});
function saveUser(obj,callback) {
  userDB.users.push(obj);
  var path='../dao/user.json';
  var json= JSON.stringify(userDB)
  fs.writeFile(path,json,function (err) {
    if(err){
      console.log("失败了");
      callback(err)
    }else{
      console.log("成功")
      callback(null)
    }
  })


}









module.exports = router;
