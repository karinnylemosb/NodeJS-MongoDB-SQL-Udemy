import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email } = req.body; //Pegando o corpo da requição que foi feita (e-mail digitado);
    let user = await User.findOne({ email }); //Buscando se já existe um usuário
    if (!user) {
      user = await User.create({ email });
    }
    return res.json(user);
  }
}

export default new SessionController();

/*
MÉTODOS: index, show, update, store, destroy.
index: listagem de sessoes
store: criar uma sessão
show: Quando queremos criar uma UNICA sessão
update: Quando queremos alterar aluma coisa
destroy: QUando queremos deletar algo - deletar...

Declarando que uma função é assincrona estamos dizendo que em alguma fase, essa fase pode ser mais demorada (no caso aqu i foi criar o usuário no banco de dados). Você bota o await onde ela demora mais. 

*/
