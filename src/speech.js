const textarea = document.getElementsByClassName("BrailleInput");
const speechBtn = document.getElementById("speechBtn");
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
   var speechRecognitionList = new SpeechGrammarList();
   var grammar = '#JSGF V1.0; grammar colors; public <color> = imprimer | ;'
   speechRecognitionList.addFromString(grammar, 1);
   recognition.grammars = speechRecognitionList;
}
recognition.continuous = false;
recognition.lang = 'fr';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

speechBtn.addEventListener('click',function() {
   textarea.classList.remove("valid");
   recognition.start();
   console.log('Ecoute');
});

recognition.onresult = function(event) {
   if(event.results[0][0].transcript == "imprimer"){
      textarea.classList.add('valid');
   }
   console.log(event.results[0][0].transcript);
}
recognition.onspeechend = function(){
   recognition.stop();
   console.log("Plus d'écoute");
}

recognition.onnomatch = function(event) {
   stopRecord();
   console.log("Non reconnu");
}
recognition.onerror = function(event) {
   stopRecord();
   console.log(event.error);
}

function stopRecord() {
   recognition.stop();
   textarea.classList.remove('listening');
}