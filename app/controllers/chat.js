module.exports.iniciaChat = function(application, req, res){
        /* Body-parser é um middleware. Portanto, trabalha dentro do nosso request e response. Recuperando a informação passada via formulário com o body-parser */
        var dadosForm = req.body;
        console.log(dadosForm)
        /* body-parser popula propriedade body do request. Ele cria uma chave à partir da propriedade name (name="apelido") do formulário (class="form-control" na view index) */
        /* Ex: Ao abrir a página inicial do site e inserir o nome "Jorge", console.log(dadosForm) >> {apelido: Jorge} */

        req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
        req.assert('apelido', 'Nome ou apelido deve conter entre 3 à 15 caracteres').len(3,15);

        var erros = req.validationErrors();
        
        console.log("1.", erros, typeof erros)
        /* console.log(erros, typeof erros)
        Tentando inserir "Oi" como nome
        0: {param: 'apelido', msg: 'Nome ou apelido deve conter entre 3 à 15 caracteres', value: 'Oi'} ---> As propriedades do json não foramnomeadas por mim (param, msg e value). São padrão do express-validator
        arg0: (1) [{…}] ---> uma array de objetos onde cada erro que ocorrer (Nome vazio ou nome pequeno) vai ser um objeto dentro da array*/

        if(erros){
                const resp = {validacao: erros}
                console.log("2.", resp, typeof resp)
                /* Objecto cuja única propriedade é validacao. O valor da propriedade é erros. Como visto acima, erros é uma array com objetos. */

                res.render("index", resp)
                /* res.render("index", {validacao: erros})
                console.log(validacao) >> 'validacao' is not defined
                Isso porque o console.log consegue mostrar variáveis, mas não parametros de função */

                return;
        }

        application.get('io').emit(
                'msgParaCliente',
                {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'}
        );

        res.render("chat", {dadosForm : dadosForm});
}