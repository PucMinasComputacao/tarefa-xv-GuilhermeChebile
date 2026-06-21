const USUARIOS_PADRAO = [
  {
    id: 1,
    nome: "Administrador",
    login: "admin",
    senha: "123",
    email: "admin@email.com"
  },
  {
    id: 2,
    nome: "Usuario",
    login: "user",
    senha: "123",
    email: "user@email.com"
  }
];

let usuariosSistema = [...USUARIOS_PADRAO];

function getHomeUrl() {
  return window.location.pathname.includes("/modulos/login/")
    ? "../../index.html"
    : "./index.html";
}

function getLoginUrl() {
  return window.location.pathname.includes("/modulos/login/")
    ? "./index.html"
    : "./modulos/login/index.html";
}

async function initLoginApp() {
  try {
    const resposta = await fetch("/usuarios");

    if (resposta.ok) {
      usuariosSistema = await resposta.json();
    }
  } catch (erro) {
    usuariosSistema = [...USUARIOS_PADRAO];
  }

  configurarFormularioLogin();
}

function loginUser(login, senha) {
  const usuario = usuariosSistema.find(item =>
    item.login === login && item.senha === senha
  );

  if (!usuario) {
    return false;
  }

  sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuario));
  return true;
}

function logoutUser() {
  sessionStorage.removeItem("usuarioCorrente");
  window.location.href = getLoginUrl();
}

function configurarFormularioLogin() {
  const formulario = document.getElementById("form-login");
  const mensagem = document.getElementById("mensagem-login");

  if (!formulario) return;

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (loginUser(login, senha)) {
      window.location.href = getHomeUrl();
      return;
    }

    mensagem.textContent = "Login ou senha invalidos.";
  });
}

document.addEventListener("DOMContentLoaded", initLoginApp);
