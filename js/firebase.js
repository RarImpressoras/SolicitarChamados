

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


function buscarNumeroSerie() {
  var id_serie = document.getElementById('inputNumeroSerie').value;

  // Referência para o nó 'contratos' no Firebase
  var ref = firebase.database().ref('contratos');

  // Realiza a busca com o CNPJ como filtro
  ref.orderByChild('id_Serie').equalTo(id_serie).once('value', function (snapshot) {
    var tbody = document.getElementById('resultado').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (snapshot.exists()) {
      var primeiraRazaoSocial = '';
      snapshot.forEach(function (childSnapshot) {
        var contrato = childSnapshot.val();
        if (primeiraRazaoSocial === '') {
          primeiraRazaoSocial = contrato.Nome_Fantasia;
          document.getElementById('razaoSocialTitulo').textContent = primeiraRazaoSocial;
        }

        // Adiciona uma nova linha na tabela com os dados do contrato
        var row = tbody.insertRow();
        var checkboxCell = row.insertCell(0);
        checkboxCell.innerHTML = '<input type="checkbox">';
        var descricaoCell = row.insertCell(1);
        descricaoCell.textContent = contrato.Descricao;
        var idSerieCell = row.insertCell(2);
        idSerieCell.textContent = contrato.id_Serie;
      });
    } else {
      document.getElementById('razaoSocialTitulo').textContent = 'Não Encontrada';
    }
  });
  animacao();
}


// Função para buscar o CNPJ no Firebase
function buscarCnpj() {
  var cnpj = document.getElementById('inputCnpj').value;

  // Referência para o nó 'contratos' no Firebase
  var ref = firebase.database().ref('contratos');

  // Realiza a busca com o CNPJ como filtro
  ref.orderByChild('CNPJ').equalTo(cnpj).once('value', function (snapshot) {
    var tbody = document.getElementById('resultado').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (snapshot.exists()) {
      var primeiraRazaoSocial = '';
      snapshot.forEach(function (childSnapshot) {
        var contrato = childSnapshot.val();
        if (primeiraRazaoSocial === '') {
          primeiraRazaoSocial = contrato.Nome_Fantasia;
          document.getElementById('razaoSocialTitulo').textContent = primeiraRazaoSocial;
        }

        // Adiciona uma nova linha na tabela com os dados do contrato
        var row = tbody.insertRow();
        var checkboxCell = row.insertCell(0);
        checkboxCell.innerHTML = '<input type="checkbox">';
        var descricaoCell = row.insertCell(1);
        descricaoCell.textContent = contrato.Descricao;
        var idSerieCell = row.insertCell(2);
        idSerieCell.textContent = contrato.id_Serie;
      });
    } else {
      document.getElementById('razaoSocialTitulo').textContent = 'Não encontrado';
    }
  });
  animacao();

}

// Função para obter os equipamentos selecionados e redirecionar para a nova página
function exibirSelecionados() {
  var tbody = document.getElementById('resultado').getElementsByTagName('tbody')[0];
  var checkboxes = tbody.getElementsByTagName('input');
  var equipamentosSelecionados = [];

  // Percorre os checkboxes para identificar os equipamentos selecionados
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var row = checkboxes[i].parentNode.parentNode;
      var descricao = row.cells[1].textContent;
      var idSerie = row.cells[2].textContent;
      equipamentosSelecionados.push({ descricao: descricao, idSerie: idSerie });
    }
  }

  // Redireciona para a nova página com as informações dos equipamentos selecionados
  if (equipamentosSelecionados.length > 0) {
    var equipamentosJson = JSON.stringify(equipamentosSelecionados);
    var nome = document.getElementById("razaoSocialTitulo").innerText;
    window.location.href = 'nova_pagina.html?razaoSocialTitulo=' + encodeURIComponent(nome) +
      '&equipamentos=' + encodeURIComponent(equipamentosJson);
  } else {
    alert('Nenhum equipamento selecionado.');
  }

}
