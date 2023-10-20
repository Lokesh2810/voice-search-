const searchForm=document.querySelector('#search-form');
// searchForm.q.value="";
const speechRecognition = window.webkitSpeechRecognition;

if (speechRecognition){

    const recognition= new speechRecognition();
    // recognition.continuous=true;
    const micButton = searchForm.querySelector("button");

    const micIcon = micButton.firstElementChild;
    
    micButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (micIcon.classList.contains('fa-microphone')){
            
            recognition.start();
        }
        else {
            recognition.stop();
            
        }

        recognition.addEventListener("start", (e) => {
            // console.log("Start speech recognition");
            micIcon.classList.remove("fa-microphone");
            micIcon.classList.add("fa-microphone-slash");
            searchForm.q.value="";
        });

        recognition.addEventListener("end", (e) => {
            // console.log("Stop speech recognition");
            micIcon.classList.remove("fa-microphone-slash");
            micIcon.classList.add("fa-microphone");
            searchForm.q.value="";
        });

        recognition.addEventListener("result", (e) => {
            // console.log(e);
            const detectedText = e.results[e.resultIndex][0].transcript;
            // console.log(detectedText);
            searchForm.q.value=detectedText;
            searchForm.submit();
        });


    });
} else {
    const button = searchForm.querySelector("button");
    button.remove();
    console.log("Speech Recognition not supported");
}