const apiKey = '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'

const chatlog = document.getElementById('chatlog');
const chatinput = document.getElementById('chatinput');
const sendbutton = document.getElementById('sendbutton');


function toggleChat() {
  var chatbox = document.getElementById("chatbox");
  if (chatbox.style.display === "block") {
    chatbox.style.display = "none";
  } else {
    chatbox.style.display = "block";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  createInitialMessage();
});

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var serie = urlParams.get('serie');
var modelo = urlParams.get('modelo');
var empresa = urlParams.get('empresa');


function createInitialMessage() {
  const message = `Olá ${empresa}, selecione o problema da impressora ${modelo}:<br>
<a href="#" onclick="atualizarTexto('1')">1 - Atolamento de papel ;</a><br>
<a href="#" onclick="atualizarTexto('2')">2 - Solicitação de toner ;</a><br>
<a href="#" onclick="atualizarTexto('3')">3 - Impressão manchando ;</a><br>
<a href="#" onclick="atualizarTexto('4')">4 - Não imprime ;</a><br>
<a href="#" onclick="atualizarTexto('5')">5 - Outros...</a>`;

  const messageElement = document.createElement('div');
  messageElement.className = 'received';
  messageElement.innerHTML = message;
  chatlog.appendChild(messageElement);
  scrollChatLog();
}

function atualizarTexto(texto) {
  chatinput.value = texto;
}



function addSentMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.className = 'sent';
  messageElement.innerHTML = message;
  chatlog.appendChild(messageElement);
  scrollChatLog();
}

function addReceivedMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.className = 'received';
  messageElement.innerHTML = message;
  chatlog.appendChild(messageElement);
  scrollChatLog();
}

function scrollChatLog() {
  chatlog.scrollTop = chatlog.scrollHeight;
}
sendbutton.addEventListener('click', () => {
  const chatMessage = chatinput.value.toLowerCase();
  if (chatMessage.trim() !== '') {
    addSentMessage(chatMessage);
    if (chatMessage === "1") {
      setTimeout(() => {
        addReceivedMessage('Oi!');
        scrollChatLog();
      }, 1000);
    } else if (chatMessage === "2") {
      setTimeout(() => {
        addReceivedMessage('Flw!');
        scrollChatLog();
      }, 1000);
    }
    else if (chatMessage === "3") {
      setTimeout(() => {
        addReceivedMessage('Oi!');
        scrollChatLog();
      }, 1000);
    } else if (chatMessage === "4") {
      setTimeout(() => {
        addReceivedMessage('Flw!');
        scrollChatLog();
      }, 1000);
    }
    else if (chatMessage === "5") {
      setTimeout(() => {
        addReceivedMessage('Oi!');
        scrollChatLog();
      }, 1000);
    }else {
      var mayta = "mayta"
      fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: chatMessage,
          max_tokens: 2048,
          temperature: 0.5
        })
      })
      .then((response) => response.json())
      .then((response) => {
        const generatedText = response.choices[0]['text'];
        addReceivedMessage(generatedText);
        scrollChatLog();
      })
      .catch((e) => {
        console.log(`Error -> ${e}`)
        addReceivedMessage('Desculpe, ocorreu um erro.');
        scrollChatLog();
      });
    }
    chatinput.value = '';
  }
});


chatinput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendbutton.click();
  }
});
