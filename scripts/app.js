// app.js - main app logic for bearbot
// Attribution: CIS 376, barrycumbie

let contentData = [];
let filteredData = [];
let currentView = 'grid';
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function () {
  loadContentData();
  setupEventListeners();
  checkLoginStatus();
  console.log('bearbot app initialized');
});

// Load content data from JSON
async function loadContentData() {
  try {
    const response = await fetch('./scripts/content-data.json');
    contentData = await response.json();
    filteredData = [...contentData];
    
    // Render content if on appropriate pages
    if (document.getElementById('content-cards')) {
      renderContentCards(filteredData);
    }
    console.log('Loaded', contentData.length, 'content items');
  } catch (error) {
    console.error('Failed to load content data:', error);
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Main search functionality
  const searchInput = document.getElementById('main-search');
  const searchForm = document.getElementById('main-search-form');
  
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSearch();
    });
  }

  // Filter functionality
  const filterBtn = document.getElementById('filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', showFilterOptions);
  }

  // View toggle functionality
  const viewToggleBtn = document.getElementById('view-toggle-btn');
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', toggleView);
  }

  // Content page search
  const contentSearchInput = document.getElementById('search-input');
  if (contentSearchInput) {
    contentSearchInput.addEventListener('input', handleContentSearch);
  }

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

// Search functionality
function handleSearch() {
  const searchInput = document.getElementById('main-search') || document.getElementById('search-input');
  if (!searchInput) return;
  
  const query = searchInput.value.toLowerCase().trim();
  
  if (query === '') {
    filteredData = [...contentData];
  } else {
    filteredData = contentData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.content.toLowerCase().includes(query)
    );
  }
  
  applyCurrentFilter();
  renderContentCards(filteredData);
  console.log('Search results:', filteredData.length, 'items found for:', query);
}

// Content page specific search
function handleContentSearch() {
  handleSearch();
}

// Filter functionality
function showFilterOptions() {
  const categories = [...new Set(contentData.map(item => item.category))];
  const difficulties = [...new Set(contentData.map(item => item.difficulty))];
  
  // Create a simple modal-like filter interface
  let filterOptions = 'Filter by:\n\n';
  filterOptions += 'Categories: ' + categories.join(', ') + '\n';
  filterOptions += 'Difficulties: ' + difficulties.join(', ') + '\n\n';
  filterOptions += 'Enter category or difficulty to filter by (or "all" for no filter):';
  
  const userChoice = prompt(filterOptions, currentFilter);
  
  if (userChoice !== null) {
    const choice = userChoice.toLowerCase().trim();
    
    if (choice === 'all') {
      currentFilter = 'all';
    } else if (categories.map(c => c.toLowerCase()).includes(choice) || 
               difficulties.map(d => d.toLowerCase()).includes(choice)) {
      currentFilter = choice;
    } else {
      alert('Invalid filter option. Please choose from available categories or difficulties.');
      return;
    }
    
    // Apply filter to current search results
    applyCurrentFilter();
    renderContentCards(filteredData);
    console.log('Filter applied:', currentFilter);
  }
}

// Apply current filter
function applyCurrentFilter() {
  if (currentFilter === 'all') {
    return; // No additional filtering needed
  }
  
  filteredData = filteredData.filter(item => 
    item.category.toLowerCase() === currentFilter.toLowerCase() || 
    item.difficulty.toLowerCase() === currentFilter.toLowerCase()
  );
}

// Toggle between grid and list view
function toggleView() {
  currentView = currentView === 'grid' ? 'list' : 'grid';
  
  const viewIcon = document.getElementById('view-icon');
  const viewBtn = document.getElementById('view-toggle-btn');
  
  if (currentView === 'list') {
    viewIcon.className = 'bi bi-list';
    viewBtn.querySelector('.d-none').textContent = 'List';
  } else {
    viewIcon.className = 'bi bi-grid';
    viewBtn.querySelector('.d-none').textContent = 'Grid';
  }
  
  renderContentCards(filteredData);
  console.log('View changed to:', currentView);
}

// Render content cards
function renderContentCards(cards) {
  const container = document.getElementById('content-cards');
  if (!container) return;
  
  container.innerHTML = '';
  
  cards.forEach(card => {
    const col = document.createElement('div');
    
    if (currentView === 'grid') {
      col.className = 'col-md-4 mb-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${card.image}" class="card-img-top" alt="${card.title}" style="height:180px;object-fit:cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.description}</p>
            <div class="mt-auto">
              <span class="badge bg-primary mb-2">${card.category}</span>
              <span class="badge bg-secondary mb-2">${card.difficulty}</span>
              <p class="card-text"><small class="text-muted">Tags: ${card.tags.join(', ')}</small></p>
              <a href="${card.link}" class="btn btn-outline-primary btn-sm">Learn More</a>
            </div>
          </div>
        </div>
      `;
    } else {
      col.className = 'col-12 mb-3';
      col.innerHTML = `
        <div class="card">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${card.image}" class="img-fluid rounded-start h-100" alt="${card.title}" style="object-fit:cover;">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
                <span class="badge bg-primary me-2">${card.category}</span>
                <span class="badge bg-secondary me-2">${card.difficulty}</span>
                <p class="card-text mt-2"><small class="text-muted">Tags: ${card.tags.join(', ')}</small></p>
                <a href="${card.link}" class="btn btn-outline-primary btn-sm">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    container.appendChild(col);
  });
  
  // Update results count
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) {
    resultsCount.textContent = `${cards.length} results`;
  }
}

// Check login status and update UI
function checkLoginStatus() {
  const user = sessionStorage.getItem('currentUser');
  const loginIcon = document.querySelector('a[href="pages/login.html"]');
  
  if (user && loginIcon) {
    loginIcon.innerHTML = '<i class="bi bi-person-check-fill icon-large text-success"></i>';
    loginIcon.title = `Logged in as ${user}`;
  }
}

// Handle logout
function handleLogout() {
  sessionStorage.clear();
  window.location.href = '../index.html';
  console.log('User logged out');
}
