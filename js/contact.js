// Elemento HTML do input
const inputName = document.getElementById("name");

// Elemento HTML do email
const inputEmail = document.getElementById("email");

// Elemento HTML do assunto
const inputAssunto = document.getElementById("assunto");

// Elemento HTML da mensagem
const inputMessage = document.getElementById("message");

// Elemento HTML do botão
const botaoForm = document.getElementById("sendForm");

// Elemento HTML do alert do Bootstrap
const containerAlert = document.getElementById("containerAlert");

// Elemento HTML do corpo do alert com a mensagem
const bodyElement = document.getElementById("messageAlert");

// Armazena as mensagens de erro dos input
var errorInput = {};

// Armazena os parâmetros enviado por GET
var search = {};

/**
 * Verifica os parâmetros GET
 * E armazena na variável de parâmetros GET
 */
if (window.location.search) {
  /**
   * Decodifica url
   * Remove o carácter '?'
   * Retorna uma array separando os elementos pelo carácter '&'
   */
  let dadosUrl = decodeURI(window.location.search.replace("?", "")).split("&");

  /**
   * Verificar todos os parâmetros e armazenar na variável de parâmetros GET
   */
  dadosUrl.forEach((dados) => {
    let values = dados.split("=");
    search[values[0]] = values[1];
  });
}

/**
 *
 * @param {string} text Texto que será exibido no alert
 * @param {string} background Texto com a classe de background do alert
 * @param {object | null} option Configurações do alert
 */
function showAlert(text, background = "bg-success", option = null) {
  // Configurações do alert do bootstrap
  if (option) {
    option = {
      animation: true,
      autohide: true,
      delay: 5000,
    };
  }

  // Mudando background do alert
  containerAlert.classList.add(background);

  // Mudando texto do alert
  bodyElement.innerText = text;

  // Exibindo alert do Bootstrap
  let toastsElement = new bootstrap.Toast(containerAlert, option);
  toastsElement.show();
}

// Verificando se tem os campos na url
if (search.name && search.email && search.assunto && search.message) {
  // Enviando mensagem de sucesso
  showAlert("Mensagem enviada com sucesso");

  // Removendo parâmetros da url
  window.history.replaceState({}, document.title, "/" + "contato.html");
}

/**
 * Adicionar classe CSS de erro ao input
 *
 * @param {DOM} input
 */
function addClassError(input) {
  // Removendo classe de sucesso do input
  input.classList.remove("is-valid");

  // Adicionando classe de erro ao input
  input.classList.add("is-invalid");
}

/**
 * Adicionar classe CSS de sucesso ao input
 *
 * @param {DOM} input
 */
function addClassSuccess(input) {
  // Removendo classe de erro do input
  input.classList.remove("is-invalid");

  // Adicionando classe de sucesso ao input
  input.classList.add("is-valid");
}

/**
 * Adicionar erro na variável de erros
 *
 * @param {DOM} input Elemento html do input
 * @param {string} msgError Mensagem de erro
 */
function addError(input, msgError) {
  // Recuperar id do input
  let id = input.id;

  // Verificar se o input tem algum erro na variável de erros
  if (errorInput[id] == undefined) {
    // Adicionar o erro com o id do input e sua mensagem de erro
    errorInput[id] = [msgError];
  } else if (errorInput[id].indexOf(msgError) == -1) {
    // Se a mensagem de erro do input não existe

    // Adiciona nova mensagem de erro do input
    errorInput[id].push(msgError);
  }

  // Adicionar classe visual de erro ao input
  addClassError(input);
}

/**
 * Remover erro do input na variável de erros
 *
 * @param {DOM} input Elemento html do input
 * @param {string} msgError Mensagem de erro
 */
function addSuccess(input, msgError) {
  // Recuperar id do input
  let id = input.id;

  // Verificando se existe um erro com o input
  if (errorInput[id] == undefined) {
    // Removendo erro do input com o filter
    errorInput[id] = errorInput[id].filter((msg) => msg != msgError);

    // Se todos os erros do input foram removidos
    if (errorInput[id].length == 0) {
      // Adicione uma classe de sucesso ao input
      addClassSuccess(input);
    }
  }
}

/**
 * Adicionar mensagem visual de erro ao usuário
 *
 * @param {string} id Atributo id do input
 */
function addMessageError(id) {
  // Selecionando o elemento com a classe '.invalid-feedback' que é irmão do input
  let divFeedback = document.querySelector(`#${id} ~ .invalid-feedback`);

  // Adicionando o primeiro erro relacionado ao input
  divFeedback.innerHTML = errorInput[id][0];
}

/**
 * Adicionar mensagem de erro ao perde o foco do input
 *
 * @param {event} event Evento do input
 */
function onBlur(event) {
  // Recuperar id do input usando o event
  let id = event.target.id;

  // Verificar se existe alguma mensagem de erro do input
  if (errorInput[id] && errorInput[id][0]) {
    // Adicionar mensagem de erro ao input
    addMessageError(id);
  }
}

/**
 * Validação para mínimo de caracteres
 *
 * @param {DOM} input Elemento html do input
 * @param {number} min Número mínimo de caracteres permitidos
 * @param {string} msgError Mensagem de erro
 */
function minCaracteres(input, min, msgError) {
  // Quantidade de caracteres
  let count = input.value.trim().length;

  // Verificar quantidade de caracteres com o mínimo de caracteres permitidos
  if (count < min) {
    // Adicionar erro ao input
    addError(input, msgError);
  } else {
    // Remover erro do input
    addSuccess(input, msgError);
  }
}

function sendForm(event) {
  // Filtrando os erros vazios
  const erros = Object.keys(errorInput).filter(
    (key) => errorInput[key].length >= 1
  );

  // Verificar se existe algum erro após a filtragem
  if (erros.length > 0) {
    // Desativando eventos
    event.preventDefault();

    // Enviando Alert de erro
    showAlert("Verifique as informações e tente novamente", "bg-danger");
  }
}

// Adicionando evento ao perde o foco do input name
inputName.addEventListener("blur", onBlur);

// Adicionando evento ao mudar o input name verificando a quantidade de caráteres
inputName.addEventListener("input", (e) =>
  minCaracteres(e.target, 6, "Seu nome é muito pequeno")
);

// Adicionando evento ao perde o foco do input email
inputEmail.addEventListener("blur", onBlur);

// Adicionando evento ao mudar o input email verificando a quantidade de caráteres
inputEmail.addEventListener("input", (e) =>
  minCaracteres(e.target, 6, "Seu email é muito pequeno")
);

// Adicionando evento ao perde o foco do input assunto
inputAssunto.addEventListener("blur", onBlur);

// Adicionando evento ao mudar o input assunto verificando a quantidade de caráteres
inputAssunto.addEventListener("input", (e) =>
  minCaracteres(e.target, 6, "O assunto é muito pequeno")
);

// Adicionando evento ao perde o foco do input message
inputMessage.addEventListener("blur", onBlur);

// Adicionando evento ao mudar o input message verificando a quantidade de caráteres
inputMessage.addEventListener("input", (e) =>
  minCaracteres(e.target, 6, "A mensagem é muito pequena")
);

// Adicionando evento ao clicar do botão de enviar formulário
botaoForm.addEventListener("click", sendForm);
