var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const { checkAuth } = require('../logic/middleware');


/* GET home page. */
router.get('/', checkAuth,function(req, res, next) {
  if(req.session.views){
    req.session.views++;
  }else{
    req.session.views=1;
  }
  res.render('count',{count:req.session.views,username:req.session.username});
});

router.get('/view',checkAuth,(req,res)=>{
  var fp = path.join(__dirname, '../data/rawData.json');
  let data = fs.readFileSync(fp, 'utf-8');
  data = JSON.parse(data);
  console.log(data);
  res.render('view',{data});
});

router.get('/edit/:id',checkAuth,(req,res)=>{
  var fp = path.join(__dirname, '../data/rawData.json');
  let data = fs.readFileSync(fp, 'utf-8');
  const {id} = req.params;
  const item = JSON.parse(data).find(item => item.id === parseInt(id));
  res.render('edit',item);
});

router.get('/signin',(req,res)=>{
  res.render('signIn');
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
