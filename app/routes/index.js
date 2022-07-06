module.exports = function(application){
    application.get('/', function(req, res){
        console.log("Renderizando index")
        res.render("index");
    });
}