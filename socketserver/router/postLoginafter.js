var fs = require('fs');

module.exports = function(req, res){
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "email": req.body.email,
        "title": req.body.title
    }
    let uArray = [];
    fs.readFile('./userdata.json', 'utf8', function(err, data){
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj);
        let i = uArray.findIndex(x=>x.username==userobj.username);
        if (i == -1){
            uArray.push(userobj);
        }
        res.send(uArray);
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./userdata.json', uArrayjson, 'utf-8', function(err, data){
            if (err) throw err;
        });
    });
};