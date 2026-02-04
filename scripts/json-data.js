// F) JSON Data - Fetch from external JSON file
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch data from JSON file
        const response = await fetch('../assets/lived-places.json');
        const data = await response.json();
        
        // Get the container
        const container = document.getElementById('json-data-cards');
        
        // Create cards for each place from JSON
        data.places.forEach(function(place) {
            // Create card element
            const cardDiv = document.createElement('div');
            cardDiv.className = 'col-md-4 mb-4';
            
            cardDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${place.image}" class="card-img-top" alt="${place.name}" style="height: 180px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${place.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${place.state}, ${place.country}</h6>
                        <p class="card-text">${place.description}</p>
                        <div class="mb-3">
                            ${place.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">Years: ${place.yearsLived}</small>
                            <div>
                                <a href="${place.website}" class="btn btn-primary btn-sm me-1" target="_blank">Visit</a>
                                <button class="btn btn-outline-info btn-sm" onclick="showMoreInfo('${place.name}')">
                                    <i class="bi bi-info-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add to container
            container.appendChild(cardDiv);
        });
        
    } catch (error) {
        console.error('Error loading JSON data:', error);
        document.getElementById('json-data-cards').innerHTML = 
            '<div class="col-12"><div class="alert alert-danger">Error loading place data</div></div>';
    }
});

// Function to show more information (example interaction)
function showMoreInfo(placeName) {
    alert(`More information about ${placeName} would be displayed here!`);
}