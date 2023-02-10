export default function reconnaissance(){
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    var recognition = new SpeechRecognition();

    const textarea = document.getElementsByClassName("BrailleInput")[0];
    const speechBtn = document.getElementById("speechBtn");

    if (SpeechGrammarList) {
        var speechRecognitionList = new SpeechGrammarList();
        var grammar = '#JSGF V1.0; grammar colors; public <color> = imprimer | impression | imprime;'
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
    }
    recognition.continuous = false;
    recognition.lang = 'fr';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    speechBtn.onclick = function(){
        recognition.start();
        console.log('Première écoute...');
        textarea.classList.remove('valid');
        textarea.classList.add('listening');
    }

    recognition.onresult = function(event) {
        var resultat = event.results[0][0].transcript;
        var ordreImpression = resultat.includes("imprimer") || resultat.includes("impression") || resultat.includes("imprime") || resultat.includes("imprimé");
        if(ordreImpression){
            textarea.classList.remove('listening');
            textarea.classList.add('valid');
        }
        console.log('Resultat : ' + resultat);
        console.log(event.results[0]);
    }

    recognition.onspeechend = function(){
        recognition.stop();
        textarea.classList.remove('listening');
        console.log("Plus d'écoute");
    }

    recognition.onnomatch = function(event) {
        recognition.stop();
        textarea.classList.remove('listening');
        console.log("Non reconnu");
    }

    recognition.onerror = function(event) {
        recognition.stop();
        textarea.classList.remove('listening');
        console.log("Erreur : "+event.error);
    }
}
