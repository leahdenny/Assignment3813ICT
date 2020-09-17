var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;
    var p = req.body.pwd;
    c = u + p;
    console.log(c);
    fs.readFile('./userdata.json', 'ut8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        let i = userArray.findIndex(user => ((user.username == u) && (user.pwd == p)));
        if (i == -1){
            res.send({ "ok": false });
        } else {
            fs.readFile('./extendeduserdata.json', 'utf8', function(err, data){
                if (err) throw err;
                let extendedUserArray = JSON.parse(data);
                let i = extendedUserArray.findIndex(user => ((user.username == u)));
                userData["ok"] = true;
                console.log(userData);
                res.send(userData);
            })
        }
    });
};