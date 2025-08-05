<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watch Live Match - Asia Cup 2025</title>
    <link rel="stylesheet" href="style.css">
    </head>
<body class="watch-page-body">

    <header>
        <div class="logo">Asia Cup 2025</div>
    </header>

    <main class="watch-container">
        <h1 id="match-title">Match Title</h1>
        
        <div id="video-player-container">
            </div>

        <div class="ad-container">
            </div>

        <div class="ad-container ad-bottom">
            </div>

        <p class="disclaimer">
            Disclaimer: The l// watch.js file

document.addEventListener('DOMContentLoaded', () => {
    // URL se streaming link nikalne ke liye
    const urlParams = new URLSearchParams(window.location.search);
    const streamLink = urlParams.get('link');

    const videoContainer = document.getElementById('video-player-container');
    const matchTitle = document.getElementById('match-title');

    if (streamLink) {
        // Stream link ko decode karein
        const decodedLink = decodeURIComponent(streamLink);

        // Check karein ki link M3U8 hai ya koi aur URL
        if (decodedLink.endsWith('.m3u8')) {
            // Agar M3U8 link hai toh video.js ya hls.js player ka istemal karein
            // Yah ek basic HTML5 video player hai, M3U8 ke liye yeh kaam nahi karega, 
            // iske liye alag library lagani padegi.
            // Example:
            videoContainer.innerHTML = `
                <video id="my-video" class="video-js" controls preload="auto" width="100%" height="auto" data-setup='{}'>
                    <source src="${decodedLink}" type="application/x-mpegURL">
                </video>
            `;
            // NOTE: Iske liye aapko video.js ya hls.js library include karni padegi.
            // Aap unki CDN link <head> tag me daal sakte hain.

        } else if (decodedLink.startsWith('http')) {
            // Agar normal embed link hai, toh iframe ka istemal karein
            videoContainer.innerHTML = `
                <iframe 
                    src="${decodedLink}" 
                    width="100%" 
                    height="500" 
                    frameborder="0" 
                    allowfullscreen
                    allow="encrypted-media">
                </iframe>
            `;
        } else {
            // Agar link invalid hai toh error message dikhayein
            videoContainer.innerHTML = `<p class="error-message">Invalid streaming link.</p>`;
        }
    } else {
        matchTitle.innerText = 'No match selected';
        videoContainer.innerHTML = `<p class="error-message">Please go back and select a match to watch.</p>`;
    }
});ive stream is provided by a third-party source. We do not own any rights to the content.
        </p>
    </main>

    <footer>
        <p>&copy; 2025 Asia Cup Streaming. All rights reserved.</p>
    </footer>

    <script src="watch.js"></script>
</body>
</html>