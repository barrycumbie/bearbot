// E) JS Data - Objects with properties
document.addEventListener('DOMContentLoaded', function() {
    // Array of place objects with properties
    const placesData = [
        {
            name: 'Tampa',
            state: 'Florida',
            type: 'Urban',
            description: 'Vibrant Gulf Coast city with beaches and culture',
            image: 'https://via.placeholder.com/300x200?text=Tampa'
        },
        {
            name: 'New Hampshire',
            state: 'New Hampshire',
            type: 'Rural',
            description: 'Beautiful New England state with mountains',
            image: 'https://via.placeholder.com/300x200?text=New+Hampshire'
        },
        {
            name: 'Huntsville',
            state: 'Alabama',
            type: 'Tech Hub',
            description: 'Rocket City - home to NASA facilities',
            image: 'https://via.placeholder.com/300x200?text=Huntsville'
        },
        {
            name: 'Auburn',
            state: 'Alabama',
            type: 'College Town',
            description: 'University town with strong school spirit',
            image: 'https://via.placeholder.com/300x200?text=Auburn'
        },
        {
            name: 'Redmond',
            state: 'Washington',
            type: 'Tech Hub',
            description: 'Pacific Northwest tech center',
            image: 'https://via.placeholder.com/300x200?text=Redmond'
        },
        {
            name: 'Hattiesburg',
            state: 'Mississippi',
            type: 'Small City',
            description: 'Southern charm and university presence',
            image: 'https://via.placeholder.com/300x200?text=Hattiesburg'
        },
        {
            name: 'Florence',
            state: 'Alabama',
            type: 'Historic',
            description: 'Historic city in northern Alabama',
            image: 'https://via.placeholder.com/300x200?text=Florence'
        }
    ];
    
    // Get the container
    const container = document.getElementById('js-data-cards');
    
    // Create cards for each place object
    placesData.forEach(function(place) {
        // Create card element
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-6 mb-4';
        
        cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${place.image}" class="card-img-top" alt="${place.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${place.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${place.state}</h6>
                    <p class="card-text">${place.description}</p>
                    <span class="badge bg-info">${place.type}</span>
                    <div class="mt-3">
                        <a href="#" class="btn btn-primary btn-sm me-2">Learn More</a>
                        <a href="#" class="btn btn-outline-secondary btn-sm">Visit</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add to container
        container.appendChild(cardDiv);
    });
});