// Load the MP3 file
const audioFile = '/music/Black_Shadows.mp3';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an audio element and source node
const audioElement = new Audio(audioFile);
const audioSource = audioContext.createMediaElementSource(audioElement);

// Analyser node to get audio data
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // Adjust the FFT size for resolution

// Connect the audio source to the analyser
audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

// Canvas setup
const canvas = document.getElementById('spectrum-canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Draw function to visualize the spectrum
function draw() {
  // Request animation frame for smooth rendering
  requestAnimationFrame(draw);

  // Get the audio data and draw the spectrum
  analyser.getByteFrequencyData(dataArray);

  // Clear the canvas for new frames
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  // Calculate the width of each bar in the spectrum
  const barWidth = canvasWidth / bufferLength;
  let x = 0;

  // Iterate through the data array and draw the bars
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * (canvasHeight / 255);

    // Set the bar color based on its height
    const r = barHeight + 25;
    const g = 250 - barHeight;
    const b = 50;

    // Draw the bar
    canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
    canvasContext.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    // Move to the next position
    x += barWidth + 1;
  }
}

// Function to start playing the audio and draw the spectrum
function startPlayback() {
  // Check if the audio is already playing
  if (audioElement.paused) {
    // Start playing the audio
    audioElement.play();

    // Draw the spectrum
    draw();
  }
}

// Add an event listener to start playback on button click
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', startPlayback);
