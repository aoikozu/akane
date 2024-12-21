fetch('/api/status')
    .then(response => response.json())
    .then(data => {
        const statusDiv = document.getElementById('status-info');
        statusDiv.innerHTML = `
            <p>Bot Status: ${data.online ? '🟢 Online' : '🔴 Offline'}</p>
            <p>Total Servers: ${data.serverCount}</p>
            <p>Total Users: ${data.memberCount}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching bot status:', error);
    });
