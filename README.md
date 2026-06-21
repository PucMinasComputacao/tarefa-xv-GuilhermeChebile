Trabalho Prático - Semana 15

Personalização do site com Integração de Login de Usuário Nesta atividade, vamos integrar ao projeto o módulo de login, cujo código já é fornecido com o repositório compartilhado para a atividade. A partir dessa integração, vamos implementar uma funcionalidade adicional de personalização para marcação e exibição de itens favoritos.

A seguir, apresentamos mais detalhes sobre o módulo de login, seu funcionamento e como você pode integrar novas funcionalidades no seu projeto.

Módulo de Login O módulo de login de usuário, fornecido no repositório da atividade, inclui funcionalidades como o formulário de registro de usuários e o processo de validação de login e senha.

Para utilizar o módulo de login, basta incluir o script de login na sua home-page (index.html), colocando a seguinte tag dentro do elemento HEAD:

<script src="./assets/js/login.js"><script> Os dados de usuários são carregados a partir do JSON Server quando o script de login inicializa, usando fetch('/usuarios') dentro da função initLoginApp() localizada no arquivo login.js. Inicialmente o banco de dados é configurado com dois usuários: Login: admin | Senha: 123 Login: user | Senha: 123 A dinâmica de funcionamento do módulo de login é a seguinte: Ao carregar a Home-page, o script verifica se o usuário já efetuou login. Em caso negativo, o navegador é direcionado para o formulário de validação de login e senha (/modulos/login/index.html). Quando o usuário informa login e senha, a função loginUser(login, senha) procura o usuário nos dados e valida a senha. Se a senha estiver correta, o script monta o objeto usuarioCorrente, salva no sessionStorage e direciona o Navegador para a Home-Page (index.html). O objeto usuarioCorrente tem os seguintes atributos: id, nome, login, senha e email. Uma vez carregada a home-page com o usuário validado, pode-se personalizar a apresentação para exibir os dados do usuário logado via dados mantidos no objeto usuarioCorrente. Para fazer logoff, a função logoutUser() apaga os dados do objeto usuarioCorrente no sessionStorage, redirecionando o Navegador para o formulário de validação de login e senha. 💡 Você pode alterar a dinâmica básica utilizando as funções disponíveis e documentadas no arquivo login.js.
 

## Informações Gerais

- Nome: Guilherme Luiz Santos Chebile
- Matricula: 908179

## Prints do trabalho


![Home com usuario logado](public/imgs/ola_usuario.png)

![Servico favoritado](public/imgs/favoritar.png)

![Pagina meus favoritos](public/imgs/favoritados.png)

## Atividade Pratica - Login + Personalizacao

Esta entrega integra login de usuario e favoritos por usuario ao site Unidade Marketing.

### Login de teste

- Login: admin | Senha: 123
- Login: user | Senha: 123

### Funcionalidades implementadas

- Area de login na home com link "Entrar" quando nao ha usuario logado.
- Exibicao de "Ola, nome | Sair" quando o usuario esta logado.
- Tela de login em `public/codigs/modulos/login/index.html`.
- Persistencia do usuario logado em `sessionStorage` usando `usuarioCorrente`.
- Botao de favoritar nos cards de servicos da home.
- Bloqueio de favoritos para visitantes sem login, com redirecionamento para a tela de login.
- Persistencia dos favoritos no `localStorage` com chave por usuario, no formato `favoritos_<idDoUsuario>`.
- Pagina `public/codigs/favoritos.html` listando apenas os servicos favoritados do usuario logado.

### Prints obrigatorios

- Home mostrando usuario logado: adicionar print aqui apos testar no navegador.
- Card com servico favoritado: adicionar print aqui apos testar no navegador.
- Pagina "Meus Favoritos" com itens salvos: adicionar print aqui apos testar no navegador.



