var currentStep = 1;
var progressBar = document.getElementById('progressBar');
var formContainers = document.getElementsByClassName('form-container');

function showStep(step) {
    for (var i = 0; i < formContainers.length; i++) {
        if (i === step - 1) {
            formContainers[i].style.display = 'block';
        } else {
            formContainers[i].style.display = 'none';
        }
    }

    progressBar.style.width = (step - 1) * 33.4 + '%';
}

function nextStep() {
    currentStep++;

    if (currentStep <= formContainers.length) {
        showStep(currentStep);
    }
}

function prevStep() {
    currentStep--;

    if (currentStep >= 1) {
        showStep(currentStep);
    }
}
var inputNomeSolicitante = document.getElementById('nomeSolicitante');
var inputProblemaRelatado = document.getElementById('problemaRelatado');
var selectTipoRelato = document.getElementById('tipoRelato');



document.getElementById('nextStep1').addEventListener('click', function () {
    nextStep();
});

document.getElementById('prevStep2').addEventListener('click', function () {
    prevStep();
});

document.getElementById('nextStep2').addEventListener('click', function () {
    if (inputNomeSolicitante.value.trim() === '') {
        event.preventDefault(); // Impede o envio do formulário
        alert('Por favor, preencha o campo Nome do Solicitante.');
    }else{
        nextStep();

    }
});

document.getElementById('prevStep3').addEventListener('click', function () {
    prevStep();
});

document.getElementById('nextStep3').addEventListener('click', function () {
    if (selectTipoRelato.value === 'outros' && inputProblemaRelatado.value.trim() === '') {
        event.preventDefault(); // Impede o envio do formulário
        alert('Por favor, preencha o campo Problema Relatado.');
    }else{
        nextStep();
    }
});


document.getElementById('prevStep4').addEventListener('click', function () {
    prevStep();
});


showStep(currentStep);
