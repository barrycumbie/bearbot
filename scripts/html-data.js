// D) HTML Data - Simple array with DOM manipulation
document.addEventListener('DOMContentLoaded', function() {
    // Simple array of places
    const places = ['Tampa', 'New Hampshire', 'Huntsville', 'Auburn', 'Tampa', 'Redmond', 'Auburn', 'Hattiesburg', 'Florence'];
    
    // Get the container
    const container = document.getElementById('html-data-cards');
    
    // Create cards for each place
    places.forEach(function(place) {
        // Create card HTML
        const cardHTML = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${place}</h5>
                        <p class="card-text">A place I've lived - loaded from JavaScript array!</p>
                        <a href="#" class="btn btn-sm btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add to container
        container.innerHTML += cardHTML;
    });
});