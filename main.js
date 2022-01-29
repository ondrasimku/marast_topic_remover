if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
    afterDOMLoaded();
}

function afterDOMLoaded(){
    hide();
}

function hide() {
    const observer = new MutationObserver((mutations, obs) => {
        var buttonsForm = document.querySelector("div.exercise-question div.form-buttons");
        var nextBtn = document.getElementById("btn-next");
        var prevBtn = document.getElementById("btn-prev");
        var targetSpan = document.getElementById("question-properties");
        if (buttonsForm && nextBtn && prevBtn && targetSpan) {
            nextBtn.addEventListener("click", hide);
            prevBtn.addEventListener("click", hide);

            var oldDisplay = targetSpan.style.display;
            targetSpan.style.display = "none";
            var oldInnerHtml = buttonsForm.innerHTML;
            buttonsForm.innerHTML = `<a class="btn btn-primary btn-sm toggle-answer-button" role="button" 
            id="toggle-topic" 
                title="Zobrazí či skryje téma">
                Zobrazit téma
                </a>`;
            buttonsForm.innerHTML += oldInnerHtml;
            var topicButton = document.getElementById("toggle-topic");
            topicButton.addEventListener("click", function() {
                if(targetSpan.style.display === "none")
                    targetSpan.style.display = oldDisplay;
                else 
                    targetSpan.style.display = "none";
            });
              
            obs.disconnect();
            return;
        }
      });

      observer.observe(document, {
        childList: true,
        subtree: true
      });
 }