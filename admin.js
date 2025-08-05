// admin.js file

// Apni Google Sheet ID aur API Key yahan daalein
const SHEET_ID = '1yHnRbzv0vnmG5tygUyEHGeu0vMwMRKxU4i-lOmPH7is'; 
const API_KEY = 'AIzaSyCFMZy6DlVHS0oybbTyk8dSCM0tBvmz-FU'; 

const form = document.getElementById('match-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const match_status = document.getElementById('match_status').value;
    const team_1 = document.getElementById('team_1').value;
    const team_2 = document.getElementById('team_2').value;
    const match_date = document.getElementById('match_date').value;
    const match_time = document.getElementById('match_time').value;
    const streaming_link = document.getElementById('streaming_link').value;
    const ads_code = document.getElementById('ads_code').value;

    const rowData = [
        match_status,
        team_1,
        team_2,
        match_date,
        match_time,
        streaming_link,
        ads_code
    ];

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                values: [rowData]
            })
        });

        const data = await response.json();
        
        if (data.updates) {
            messageDiv.style.color = 'green';
            messageDiv.innerText = 'Match added successfully!';
            form.reset();
        } else {
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Failed to add match. Please check your API key.';
        }

    } catch (error) {
        console.error("Error adding match:", error);
        messageDiv.style.color = 'red';
        messageDiv.innerText = 'An error occurred. Please try again.';
    }
});