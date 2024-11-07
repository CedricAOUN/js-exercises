

document.addEventListener('DOMContentLoaded', () => {
  const timeDisplay = document.getElementById('timeDisplay');

  let userPrompt = Math.floor(parseInt(prompt('Combien de temp en secondes?')));

  if (isNaN(userPrompt)) userPrompt = 0;

  let interval;

  let hours = Math.floor(userPrompt / 3600);
  let minutes = Math.floor((userPrompt % 3600) / 60);
  let seconds = userPrompt % 60;    

  updateValues();

  if (userPrompt > 0) {
    startTimer();
  }

  function startTimer() {
    clearInterval(interval);

    interval = setInterval(() => {
      userPrompt--;
      updateValues();

      if (userPrompt <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
  
  function updateValues() {
    hours = Math.floor(userPrompt / 3600);
    minutes = Math.floor((userPrompt % 3600) / 60);
    seconds = userPrompt % 60;


    if (userPrompt != 0) timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    else timeDisplay.textContent = `DONE!`;
  }

});


