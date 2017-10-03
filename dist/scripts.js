let countdown = 0;
const timerDisplay = document.querySelector(".timer-display");
const startButton = document.querySelector("#start-button");
const select = document.querySelector("select");

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  showTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      ring();
      document.title = "You can take a break now.";
      clearInterval(countdown);
      return;
    }
    showTimeLeft(secondsLeft);
  }, 1000);

  startProgressCircle(select.value);
};

function showTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const timeLeft = `${minutes}:${remainingSeconds < 10 ? "0" : "" }${remainingSeconds}`;

  timerDisplay.textContent = timeLeft;

  document.title = timeLeft;
};

function ring() {
  const randomAudio = Math.floor(Math.random() * 6);
  const audio = new Audio(`sounds/${randomAudio}.mp3`);

  audio.play();
};

function startProgressCircle(duration) {
  const path = document.querySelector(".circle");
  path.classList.remove("circle");
  setTimeout(() => {
    path.classList.add("circle")}, 10);
  path.style.animationDuration = `${duration * 60}s`;
  path.style.animationPlayState = "running";
};

startButton.addEventListener("click", () => {
  timer(select.value * 60);
});
