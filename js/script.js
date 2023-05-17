
function animacao() {

    var loginForm2 = document.getElementById('loginForm2');
    var loading = document.getElementById('loading');
    var resultado = document.getElementById('resultado1');
    var continuar = document.getElementById('continuar');

    loginForm2.style.display = 'none'; // Oculta o formulário
    loading.style.display = 'block'; // Exibe a animação de carregamento


    setTimeout(function() {
      continuar.style.display="block"
      resultado.style.display="block";
      loading.style.display = 'none'; // Oculta a animação de carregamento
    }, 2000); // Delay de 2 segundos (2000 milissegundos)
  };