let tweetIndex = 0;
let preloadedImages = [];
const totalTweets = 23;

const tweets = [];

// Generate list of tweet numbers
for (let i = 1; i <= totalTweets; i++) {
  tweets.push(i);
}

// Function to shuffle the tweet numbers
function shuffleTweets() {
  for (let i = tweets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tweets[i], tweets[j]] = [tweets[j], tweets[i]];
  }
}

// Preload all images
function preloadImages(imageArray, callback) {
  let loadedCount = 0;

  imageArray.forEach((imageSrc) => {
    const image = new Image();
    image.src = `images/tweet${imageSrc}.png`;
    image.onload = () => {
      loadedCount++;
      if (loadedCount === imageArray.length) {
        callback();
      }
    };

    preloadedImages.push(image);
  });
}

// Function to add a new tweet at the top of the container
function addTweet() {
  const tweetContainer = document.getElementById('tweetContainer');

  const tweetImage = preloadedImages[tweets[tweetIndex] - 1];
  tweetImage.className = 'tweetImage';
  tweetContainer.prepend(tweetImage);

  tweetIndex++;
  if (tweetIndex >= totalTweets) {
    // Shuffle the tweet numbers for the next session
    shuffleTweets();
    tweetIndex = 0;
  }

  setTimeout(addTweet, 7000);
}

// Preload images and start adding tweets
preloadImages(tweets, function () {
  shuffleTweets(); // Shuffle the tweet numbers initially
  addTweet();
});
