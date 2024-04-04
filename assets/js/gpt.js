// Load the audio file
const audioFile = '/music/Black_Shadows.mp3';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Fetch the audio file
fetch(audioFile)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    // Get the audio data and read the spectrum at a given timestamp
    function readSpectrum(timestamp) {
      // Calculate the sample index based on the timestamp
      const sampleRate = audioBuffer.sampleRate;
      const sampleIndex = Math.floor(sampleRate * timestamp);
      console.log(sampleRate);

      // Get the audio data for the given timestamp
      const channelData = audioBuffer.getChannelData(0); // Assuming mono audio
      const spectrumData = channelData.slice(sampleIndex, sampleIndex + 2048); // Adjust the slice length as needed

      // Process the spectrum data
      // You can access the spectrum values in the 'spectrumData' array
      console.log(channelData);
    }

    // Call the readSpectrum function with the desired timestamp
    const timestampInSeconds = 10; // Example timestamp in seconds
    readSpectrum(timestampInSeconds);
  })
  .catch(error => {
    console.error('Error loading audio file:', error);
  });
