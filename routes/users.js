var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.post('/insert', function (req, res, next) {
  try {
    var fp = path.join(__dirname, '../data/rawData.json');
    let data = fs.readFileSync(fp, 'utf-8');
    const findMaxId = (data) => {
      let maxId = 0;
      data.forEach(d=>{
        if(d.id>maxId){
          maxId = d.id;
        }
      }); 
      return maxId+1;
    }
    if(data){
      data = JSON.parse(data);
      const id = findMaxId(data);
      data = [...data,{
        id,
        ...req.body
      }]
      fs.writeFileSync(fp,JSON.stringify(data));
    }else{
      data = [{
        id:1,
        ...req.body
      }];
      fs.writeFileSync(fp,JSON.stringify(data));
    }
    res.send({ msg: 'Record inserted successfully...' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/update',(req,res)=>{
  try {
    var fp = path.join(__dirname, '../data/rawData.json');
    let data = fs.readFileSync(fp, 'utf-8');
    data = JSON.parse(data);
    const {id} = req.body;
    data = data.map(d=>{
      if(d.id == id){
        return req.body;
      }else{
        return d;
      }
    });
    fs.writeFileSync(fp,JSON.stringify(data));
    res.send({msg:'Record updated successfully...'});

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/remove/:id',(req,res)=>{
  try {
    var fp = path.join(__dirname, '../data/rawData.json');
    let data = fs.readFileSync(fp, 'utf-8');
    data = JSON.parse(data);
    const {id} = req.params;
    data = data.filter(d=>d.id!=id);
    console.log('delete-->',data);
    fs.writeFileSync(fp,JSON.stringify(data));
    res.send({msg:'Record deleted successfully...'});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/signin',(req,res)=>{
  try {
    var fp = path.join(__dirname, '../data/user.json');
    let data = fs.readFileSync(fp,'utf-8');
    if(data)
      data = JSON.parse(data);
    fs.writeFileSync(fp,JSON.stringify([...data,req.body]));
    res.send({msg:'User created successfully...'});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login',(req,res)=>{
  try {
    var fp = path.join(__dirname, '../data/user.json');
    let data = fs.readFileSync(fp,'utf-8');
    if(data)
        data = JSON.parse(data);
    const {username,password} = req.body;
    const user = data.find(u=>u.username==username && u.password==password);
    if(user){
      req.session.username = user.username;
      res.send({msg:'Login successful...'});
    }else{
      res.status(400).send({msg:'Invalid username or password...'});
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
