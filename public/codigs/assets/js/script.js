const servicos = [
  {
    id: 1,
    nome: "Aumento de Clientes Atraves do Google",
    descricao: "Servico para atrair clientes usando o Google Meu Negocio.",
    conteudo: "Ideal para empresas que querem aparecer nas buscas do Google e no Google Maps, aumentando chamadas, visitas e contatos.",
    imagem: "../imgs/imagem-gmn-.png",
    beneficios: [
      "Melhora a presenca no Google",
      "Aumenta contatos de clientes",
      "Ajuda sua empresa a ser encontrada no Maps"
    ],
    qtd_clientes: 20
  },
  {
    id: 2,
    nome: "Trafego Pago Google Ads",
    descricao: "Anuncios pagos para aparecer em destaque no Google.",
    conteudo: "Com o Google Ads, sua empresa pode aparecer para pessoas que ja estao procurando pelo seu produto ou servico.",
    imagem: "../imgs/imagem-trafegopago-ads.png",
    beneficios: [
      "Resultados mais rapidos",
      "Anuncios para publico interessado",
      "Maior chance de conversao"
    ],
    qtd_clientes: 10
  },
  {
    id: 3,
    nome: "Clientes Atraves do Instagram",
    descricao: "Gestao profissional para perfil comercial no Instagram.",
    conteudo: "Servico focado em melhorar a imagem do perfil, criar conteudo estrategico e atrair mais clientes pela rede social.",
    imagem: "../imgs/imagem-socialmedia.png",
    beneficios: [
      "Perfil mais profissional",
      "Conteudos estrategicos",
      "Mais engajamento com clientes"
    ],
    qtd_clientes: 5
  },
  {
    id: 4,
    nome: "Trafego Pago Meta Ads",
    descricao: "Anuncios pagos no Instagram e Facebook.",
    conteudo: "Com o Meta Ads, sua empresa pode alcancar pessoas certas no Instagram e Facebook por meio de campanhas patrocinadas.",
    imagem: "../imgs/imagem-trafegopago-meta.png",
    beneficios: [
      "Alcance segmentado",
      "Mais visitas ao perfil",
      "Mais mensagens de possiveis clientes"
    ],
    qtd_clientes: 7
  },
  {
    id: 5,
    nome: "Criacao de Sites",
    descricao: "Desenvolvimento de site profissional para negocios.",
    conteudo: "Um site profissional ajuda sua empresa a transmitir confianca, apresentar servicos e receber contatos de clientes.",
    imagem: "../imgs/imagem-criacao-sites.png",
    beneficios: [
      "Mais credibilidade",
      "Presenca profissional na web",
      "Canal direto para apresentar servicos"
    ],
    qtd_clientes: 17
  }
];

function obterUsuario() {
  const usuario = sessionStorage.getItem("usuarioCorrente");
  return usuario ? JSON.parse(usuario) : null;
}

function atualizarAreaLogin() {
  const areaLogin = document.getElementById("area-login");

  if (!areaLogin) return;

  const usuario = obterUsuario();

  if (usuario) {
    areaLogin.innerHTML = `
      Ola, ${usuario.nome}
      |
      <a href="#" id="logout-link">Sair</a>
    `;

    document.getElementById("logout-link").addEventListener("click", function (event) {
      event.preventDefault();
      logoutUser();
    });

    return;
  }

  areaLogin.innerHTML = `
    <a href="./modulos/login/index.html">Entrar</a>
  `;
}

function obterFavoritos() {
  const usuario = obterUsuario();

  if (!usuario) return [];

  return JSON.parse(localStorage.getItem(`favoritos_${usuario.id}`)) || [];
}

function salvarFavoritos(favoritos) {
  const usuario = obterUsuario();

  if (!usuario) return;

  localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(favoritos));
}

function alternarFavorito(idServico) {
  const usuario = obterUsuario();

  if (!usuario) {
    alert("Faca login para favoritar.");
    window.location.href = "./modulos/login/index.html";
    return;
  }

  let favoritos = obterFavoritos();

  if (favoritos.includes(idServico)) {
    favoritos = favoritos.filter(id => id !== idServico);
  } else {
    favoritos.push(idServico);
  }

  salvarFavoritos(favoritos);
  atualizarBotoesFavoritos();
}

function atualizarBotoesFavoritos() {
  const favoritos = obterFavoritos();

  document.querySelectorAll(".btn-favorito").forEach(botao => {
    const id = Number(botao.dataset.id);

    if (favoritos.includes(id)) {
      botao.innerHTML = "&#9733; Favoritado";
      botao.classList.add("favoritado");
      return;
    }

    botao.innerHTML = "&#9734; Favoritar";
    botao.classList.remove("favoritado");
  });
}

function configurarBotoesFavoritos() {
  document.querySelectorAll(".btn-favorito").forEach(botao => {
    botao.addEventListener("click", () => {
      alternarFavorito(Number(botao.dataset.id));
    });
  });

  atualizarBotoesFavoritos();
}

function carregarDetalhesServico() {
  const container = document.getElementById("detalhes-servico");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const servico = servicos.find(item => item.id === id);

  if (!servico) {
    container.innerHTML = `
      <section class="mensagem-favoritos">
        <h2>Servico nao encontrado</h2>
        <a href="index.html">
          <button class="botao-servicos">Voltar para servicos</button>
        </a>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="detalhe-hero">
      <div class="detalhe-texto">
        <span class="detalhe-tag">Servico de Marketing Digital</span>
        <h1>${servico.nome}</h1>
        <p>${servico.descricao}</p>
        <a href="index.html">
          <button class="botao-voltar">Voltar para servicos</button>
        </a>
      </div>

      <div class="detalhe-imagem">
        <img src="${servico.imagem}" alt="${servico.nome}">
      </div>
    </section>

    <section class="detalhe-conteudo">
      <h2>Sobre esse servico</h2>
      <p>${servico.conteudo}</p>

      <h2>Como esse trabalho ajuda o seu negocio?</h2>
      <p>
        Esse servico e indicado para empresas que querem atrair mais clientes,
        melhorar sua presenca digital e transformar visualizacoes em contatos reais.
        A estrategia e pensada para aumentar a autoridade da marca e gerar mais
        oportunidades de venda.
      </p>

      <h2>Principais beneficios</h2>
      <div class="lista-beneficios">
        ${servico.beneficios.map(beneficio => `
          <div class="beneficio-item">
            <h3>&#10004;</h3>
            <p>${beneficio}</p>
          </div>
        `).join("")}
      </div>

      <h2>Etapas do servico</h2>
      <div class="etapas">
        <div>
          <h3>1. Analise</h3>
          <p>Entendemos o negocio, o publico-alvo e os principais objetivos da empresa.</p>
        </div>

        <div>
          <h3>2. Planejamento</h3>
          <p>Criamos uma estrategia personalizada de acordo com o tipo de servico escolhido.</p>
        </div>

        <div>
          <h3>3. Execucao</h3>
          <p>Colocamos as acoes em pratica, seja no Google, Instagram, anuncios ou site.</p>
        </div>

        <div>
          <h3>4. Acompanhamento</h3>
          <p>Avaliamos os resultados e fazemos melhorias para aumentar o desempenho.</p>
        </div>
      </div>

      <section class="chamada-final">
        <h2>Quer crescer com estrategia?</h2>
        <p>
          A Unidade Marketing ajuda empresas a se posicionarem melhor no digital,
          atraindo mais clientes e fortalecendo sua presenca online.
        </p>
        <button class="botao-voltar">Agendar uma reuniao</button>
      </section>
    </section>
  `;
}

function carregarGraficoClientes() {
  const canvasGrafico = document.getElementById("graficoClientes");

  if (!canvasGrafico || typeof Chart === "undefined") return;

  const nomesServicos = servicos.map(servico => servico.nome);
  const quantidadeClientes = servicos.map(servico => servico.qtd_clientes);

  new Chart(canvasGrafico, {
    type: "pie",
    data: {
      labels: nomesServicos,
      datasets: [{
        data: quantidadeClientes,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
          "#4BC0C0"
        ],
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Distribuicao de Clientes por Servico",
          color: "white",
          font: {
            size: 22
          }
        },
        legend: {
          position: "top",
          labels: {
            color: "white",
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const valor = context.raw;
              const porcentagem = ((valor / total) * 100).toFixed(1);
              return `${valor} clientes (${porcentagem}%)`;
            }
          }
        }
      }
    }
  });
}

function carregarFavoritosPagina() {
  const container = document.getElementById("lista-favoritos");

  if (!container) return;

  const usuario = obterUsuario();

  if (!usuario) {
    container.innerHTML = `
      <section class="mensagem-favoritos">
        <h2>Entre para ver seus favoritos</h2>
        <p>Os favoritos sao salvos separadamente para cada usuario.</p>
        <a href="./modulos/login/index.html">
          <button class="botao-servicos">Entrar</button>
        </a>
      </section>
    `;

    return;
  }

  const favoritos = obterFavoritos();
  const servicosFavoritos = servicos.filter(servico =>
    favoritos.includes(servico.id)
  );

  if (servicosFavoritos.length === 0) {
    container.innerHTML = `
      <section class="mensagem-favoritos">
        <h2>Nenhum favorito salvo</h2>
        <p>Volte para a home e marque os servicos que voce deseja acompanhar.</p>
        <a href="index.html">
          <button class="botao-servicos">Ver servicos</button>
        </a>
      </section>
    `;

    return;
  }

  container.innerHTML = servicosFavoritos.map(servico => `
    <div class="gmn">
      <h1>${servico.nome}</h1>
      <p>${servico.descricao}</p>
      <img src="${servico.imagem}" alt="${servico.nome}">

      <a href="site-pagina2.html?id=${servico.id}">
        <button class="botao-servicos">
          Saiba Mais
        </button>
      </a>

      <button class="btn-favorito favoritado" data-id="${servico.id}">
        &#9733; Remover dos favoritos
      </button>
    </div>
  `).join("");

  document.querySelectorAll("#lista-favoritos .btn-favorito").forEach(botao => {
    botao.addEventListener("click", () => {
      alternarFavorito(Number(botao.dataset.id));
      carregarFavoritosPagina();
    });
  });
}

atualizarAreaLogin();
configurarBotoesFavoritos();
carregarDetalhesServico();
carregarGraficoClientes();
carregarFavoritosPagina();
