// data.js - session data management for bearbot app
// Attribution: CIS 376, barrycumbie

document.addEventListener('DOMContentLoaded', function () {
  console.log('Data page initialized');
  renderSession();
  setupEventListeners();
});

function setupEventListeners() {
  // Clear session button
  document.getElementById('clear-session').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all session data?')) {
      sessionStorage.clear();
      renderSession();
      console.log('Session storage cleared');
    }
  });

  // Refresh button
  document.getElementById('refresh-data').addEventListener('click', function() {
    renderSession();
    console.log('Session data refreshed');
  });

  // Add test data
  document.getElementById('add-data').addEventListener('click', function() {
    const key = document.getElementById('test-key').value.trim();
    const value = document.getElementById('test-value').value.trim();
    
    if (key && value) {
      sessionStorage.setItem(key, value);
      renderSession();
      document.getElementById('test-key').value = '';
      document.getElementById('test-value').value = '';
      console.log('Added data:', key, '=', value);
    } else {
      alert('Please enter both key and value');
    }
  });

  // Download JSON
  document.getElementById('download-json').addEventListener('click', function() {
    const data = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      data[key] = sessionStorage.getItem(key);
    }
    
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'session-data.json';
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('Session data downloaded');
  });

  // Enter key support for test data inputs
  ['test-key', 'test-value'].forEach(id => {
    document.getElementById(id).addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('add-data').click();
      }
    });
  });
}

function renderSession() {
  const data = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    data[key] = sessionStorage.getItem(key);
  }
  
  const dataElement = document.getElementById('session-data');
  const countElement = document.getElementById('data-count');
  
  if (Object.keys(data).length === 0) {
    dataElement.textContent = 'No session data found.';
    countElement.textContent = '0 items';
    countElement.className = 'badge bg-secondary';
  } else {
    dataElement.textContent = JSON.stringify(data, null, 2);
    const count = Object.keys(data).length;
    countElement.textContent = `${count} item${count !== 1 ? 's' : ''}`;
    countElement.className = 'badge bg-primary';
  }
  
  console.log('Session data rendered:', Object.keys(data).length, 'items');
}
