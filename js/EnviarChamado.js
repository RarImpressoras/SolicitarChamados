function mostrarDivRelato() {
  var tipoRelato = document.getElementById("tipoRelato").value;
  var divRelato = document.getElementById("relato");

  if (tipoRelato === "outros") {
    divRelato.style.display = "block";
  } else {
    divRelato.style.display = "none";
  }
}
const firebaseConfig = {
  aapiKey: "AIzaSyCiafrD-bUZBMvGvZfqRKwA-GRLEtSLBPU",
  authDomain: "bancorar-82457.firebaseapp.com",
  databaseURL: "https://bancorar-82457-default-rtdb.firebaseio.com",
  projectId: "bancorar-82457",
  storageBucket: "bancorar-82457.appspot.com",
  messagingSenderId: "198160041951",
  appId: "1:198160041951:web:55289ecc1a9a544ca7666a",
  measurementId: "G-N2NBS51NTK",
}
firebase.initializeApp(firebaseConfig);

// Função para obter os parâmetros da URL e exibir as informações na tabela
function exibirInformacoes() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var equipamentosJson = urlParams.get('equipamentos');

  if (equipamentosJson) {
    var equipamentosSelecionados = JSON.parse(decodeURIComponent(equipamentosJson));

    var tbody = document.getElementById('resultado');

    for (var i = 0; i < equipamentosSelecionados.length; i++) {
      var row = document.createElement('tr');
      var descricaoCell = document.createElement('td');
      descricaoCell.textContent = equipamentosSelecionados[i].descricao;
      var idSerieCell = document.createElement('td');
      idSerieCell.textContent = equipamentosSelecionados[i].idSerie;
      row.appendChild(descricaoCell);
      row.appendChild(idSerieCell);
      tbody.appendChild(row);
    }
  } else {
    alert('Nenhum equipamento selecionado.');
  }
}      // Função para enviar a ordem de serviço para o Firebase
function enviarOrdem(event) {
  event.preventDefault();

  var urlParams = new URLSearchParams(window.location.search);
  var empresa = urlParams.get('razaoSocialTitulo');

  var dataHora = new Date().toLocaleString();


  var nomeSolicitante = document.getElementById('nomeSolicitante').value;
  var tipoRelato = document.getElementById('tipoRelato').value;
  var problemaRelatado = document.getElementById('problemaRelatado').value;
  var equipamentosSelecionados = [];

  // Obtém os dados dos equipamentos selecionados da tabela
  var rows = document.getElementById('resultado').getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    var descricao = rows[i].getElementsByTagName('td')[0].textContent;
    var idSerie = rows[i].getElementsByTagName('td')[1].textContent;
    equipamentosSelecionados.push({ descricao: descricao, idSerie: idSerie });
  }

  // Monta o objeto de ordem de serviço
  var ordemServico = {
    nomeSolicitante: nomeSolicitante,
    empresa: empresa,
    tipoRelato: tipoRelato,
    problemaRelatado: problemaRelatado,
    dataHora: dataHora,
    equipamentosSelecionados: equipamentosSelecionados
  };

  var mensagem = "Olá, solicitei um atendimento pelo site:%0A" +
    "Empresa: " + ordemServico.empresa + "%0A" +
    "Tipo de Relato: " + ordemServico.tipoRelato + "%0A" +
    "Problema Relatado: " + ordemServico.problemaRelatado;

  // Link do WhatsApp com a mensagem formatada e o número de telefone
  var linkWhatsapp = "https://wa.me/5511942162164?text=" + mensagem;

  // Abre o link do WhatsApp em uma nova janela


  // Obtém uma referência para o local onde deseja armazenar as ordens de serviço
var ordensRef = firebase.database().ref('ordem');

// Recupera todas as chaves existentes
ordensRef.once('value', function(snapshot) {
  var chavesExistentes = snapshot.val();
  var maiorChave = 0;

  if (chavesExistentes) {
    // Encontra a maior chave existente
    Object.keys(chavesExistentes).forEach(function(chave) {
      if (parseInt(chave) > maiorChave) {
        maiorChave = parseInt(chave);
      }
    });
  }

  // Gera a próxima chave numérica
  var novaChave = maiorChave + 1;

  // Cria uma nova entrada com a chave gerada
  var novaOrdemRef = ordensRef.child(novaChave);
  novaOrdemRef.set(ordemServico)
    .then(function() {
      var mensagem = "Já recebemos sua solicitação! Resolveremos o mais breve possível.";
      var elementoMsg = document.getElementById("msg");
      elementoMsg.textContent = mensagem;
      var elementoIdSolcitacao = document.getElementById("idSolicitacao");
      elementoIdSolcitacao.textContent = ("O numero da sua solicitação é: " + novaChave);
      console.log("Chave gerada:", novaChave);

    })
    .catch(function(error) {
      console.error('Erro ao enviar a ordem de serviço:', error);
    });
});


    botaoEnviarw.addEventListener('click', function(event) {
      
    var urlApiWhatsapp = "https://api.whatsapp.com/send?phone=5511942162164&text=" + mensagem;
    // Abre a URL do API do WhatsApp
    window.open(urlApiWhatsapp);
  });

  function whatsapp() {
  }


  // Limpa o formulário
  document.getElementById('formulario').reset();
}

// Chama a função para exibir as informações dos equipamentos selecionados
exibirInformacoes();

// Adiciona o evento de submit no formulário
document.getElementById('formulario').addEventListener('submit', enviarOrdem);
