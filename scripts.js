let tweetIndex = 0;
let preloadedImages = [];

// Total number of tweets
const totalTweets = 17;

// Generate list of tweet images
const tweets = [];
for (let i = 1; i <= totalTweets; i++) {
    tweets.push(`images/tweet${i}.png`);
}

// Function to preload all images
function preloadImages(imageArray, callback) {
    let i, j, loaded = 0;
    const images = [];
    for (i = 0, j = imageArray.length; i < j; i++) {
        images[i] = new Image();
        images[i].src = imageArray[i];
        images[i].onload = function() {
            if (++loaded === imageArray.length) {
                callback(images);
            }
        };
    }
}

// Function to add a new tweet at the top of the container
function addTweet() {
    const tweetContainer = document.getElementById('tweetContainer');
    
    // Create a new img element for the tweet
    const tweetImage = preloadedImages[tweetIndex];
    tweetImage.className = 'tweetImage';
    tweetImage.style.transform = 'translateY(-100%)'; // Set initial position above the container
    
    // Add the new tweet at the top of the container
    tweetContainer.prepend(tweetImage);
    
    // Scroll smoothly to the new tweet
    tweetContainer.scrollTop = 0;
    
    // Apply sliding animation to the tweet
    setTimeout(() => {
        tweetImage.style.transform = 'translateY(0%)';
    }, 100);
    
    // Load the next tweet if there are more
    tweetIndex++;
    if(tweetIndex < preloadedImages.length) {
        setTimeout(addTweet, 7000);
    }
}

// Preload all images and then start adding tweets
preloadImages(tweets, function(images) {
    preloadedImages = images;
    // Add the first tweet right away
    addTweet();
});
