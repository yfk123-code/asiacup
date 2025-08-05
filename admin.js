// admin.js file

// Naya Google Apps Script Web app URL yahan daalein
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx5c6dhvkPmBpILcGjvHn8R-BO_Qh1QYRSpnH2Q8T8BTAU08KBAJYzknrl3FMeTzxTYPg/exec';

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
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowData)
        });

        const data = await response.text();

        if (data === "Success") {
            messageDiv.style.color = 'green';
            messageDiv.innerText = 'Match added successfully!';
            form.reset();
        } else {
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Failed to add match. Please try again.';
        }

    } catch (error) {
        console.error("Error adding match:", error);
        messageDiv.style.color = 'red';
        messageDiv.innerText = 'An error occurred. Please try again.';
    }
});


