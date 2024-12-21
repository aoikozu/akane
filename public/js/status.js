fetch('/api/status')
    .then(response => response.json())
    .then(data => {
        const statusDiv = document.getElementById('status-info');
        statusDiv.innerHTML = `
            <p>Bot is ${data.online ? 'Online' : 'Offline'}</p>
            <p>Server Count: ${data.serverCount}</p>
            <p>Member Count: ${data.memberCount}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching bot status:', error);
    });
