// Apni Google Sheet ID aur API Key yahan daalein
const SHEET_ID = '1yHnRbzv0vnmG5tygUyEHGeu0vMwMRKxU4i-lOmPH7is'; 
const API_KEY = 'AIzaSyCFMZy6DlVHS0oybbTyk8dSCM0tBvmz-FU';
const RANGE = 'Cricket Match Data!A2:G'; // Hum row 2 se shuru karenge taaki headers na aaye

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// Function jo Google Sheet se data fetch karega
async function fetchMatchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const matches = data.values;
        
        if (matches) {
            renderMatches(matches);
        } else {
            console.error("No data found.");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function jo HTML mein matches ko render karega
function renderMatches(matches) {
    const liveContainer = document.querySelector('#live-matches .match-list');
    const upcomingContainer = document.querySelector('#upcoming-matches .match-list');
    const completedContainer = document.querySelector('#completed-matches .match-list');

    // Container ko pehle khaali kar dein
    liveContainer.innerHTML = '';
    upcomingContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    matches.forEach(match => {
        // Match details ko array se nikaalein
        const [status, team1, team2, date, time, link, ads] = match;

        // Agar koi detail khaali hai to us match ko skip kar dein
        if (!status || !team1 || !team2) return;

        const matchCardHTML = `
            <div class="match-card">
                <div class="match-info">
                    <span class="team">${team1}</span> vs <span class="team">${team2}</span>
                    <p class="match-details">${date} | ${time}</p>
                </div>
                <a href="watch.html?link=${encodeURIComponent(link)}" class="watch-button">Watch</a>
            </div>
        `;

        if (status.toLowerCase() === 'live') {
            liveContainer.innerHTML += matchCardHTML;
        } else if (status.toLowerCase() === 'upcoming') {
            upcomingContainer.innerHTML += matchCardHTML;
        } else if (status.toLowerCase() === 'completed') {
            // Completed matches ke liye "Watch" button hata sakte hain
            const completedCardHTML = `
                <div class="match-card">
                    <div class="match-info">
                        <span class="team">${team1}</span> vs <span class="team">${team2}</span>
                        <p class="match-details">${date} | ${time}</p>
                    </div>
                    <span class="watch-button" style="background-color: #555;">Completed</span>
                </div>
            `;
            completedContainer.innerHTML += completedCardHTML;
        }
    });
}

// Page load hone par function ko call karein

document.addEventListener('DOMContentLoaded', fetchMatchData);
