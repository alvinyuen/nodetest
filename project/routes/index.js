/**
 * Created by alvin on 14/8/2016.
 */

/*
GET homepage
 */

exports.index = function(req, res){

    res.render('index', {title:'Express'});
}