module.exports = function(application){
    application.post('/chat', function(req, res){ /* Rota que recebe a action chat via post (presente na view index) */
        application.app.controllers.chat.iniciaChat(application, req, res); /* Executa a função contida na propriedade iniciaChat do módulo chat do controller */
    });
    application.get('/chat', function(req, res){
        application.app.controllers.chat.iniciaChat(application, req, res);
    });
}