// Sample coach data (in a real app, this would come from a database)
const allCoaches = [
    {
        id: 1,
        name: "Alex Johnson",
        game: "League of Legends",
        rank: "Challenger",
        price: "$25/session",
        rating: "★★★★★",
        bio: "Former pro player with 5 years coaching experience. Specialized in jungle and macro play.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 5
    },
    {
        id: 2,
        name: "Sarah Miller",
        game: "Valorant",
        rank: "Radiant",
        price: "$30/session",
        rating: "★★★★☆",
        bio: "Focuses on aim training and game sense. Helped 50+ students reach Immortal.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 4.5
    },
    {
        id: 3,
        name: "Mike Chen",
        game: "Dota 2",
        rank: "Immortal",
        price: "$20/session",
        rating: "★★★★★",
        bio: "Mid lane specialist with deep understanding of matchups and power spikes.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 5
    },
    {
        id: 4,
        name: "David Wilson",
        game: "CS:GO",
        rank: "Global Elite",
        price: "$22/session",
        rating: "★★★★☆",
        bio: "Focuses on team play, utility usage, and clutch situations.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 4.5
    },
    {
        id: 5,
        name: "Emma Rodriguez",
        game: "League of Legends",
        rank: "Grandmaster",
        price: "$18/session",
        rating: "★★★★☆",
        bio: "ADC specialist with focus on positioning and team fighting.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 4
    },
    {
        id: 6,
        name: "James Kim",
        game: "Valorant",
        rank: "Immortal",
        price: "$28/session",
        rating: "★★★★★",
        bio: "Former professional Valorant player with tournament experience.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        ratingValue: 5
    },
    // Add more coaches as needed
];

// Pagination variables
let currentPage = 1;
const coachesPerPage = 6;
let filteredCoaches = [...allCoaches];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the coaches page
    displayCoaches();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('coachSearch');
    searchInput.addEventListener('input', filterCoaches);
    
    // Filter functionality
    const gameFilter = document.getElementById('gameFilter');
    gameFilter.addEventListener('change', filterCoaches);
    
    // Sort functionality
    const sortFilter = document.getElementById('sortFilter');
    sortFilter.addEventListener('change', filterCoaches);
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', goToPreviousPage);
    document.getElementById('nextPage').addEventListener('click', goToNextPage);
}

function filterCoaches() {
    const searchTerm = document.getElementById('coachSearch').value.toLowerCase();
    const gameFilterValue = document.getElementById('gameFilter').value;
    const sortValue = document.getElementById('sortFilter').value;
    
    // Filter coaches based on search and game filter
    filteredCoaches = allCoaches.filter(coach => {
        const matchesSearch = coach.name.toLowerCase().includes(searchTerm) || 
                             coach.game.toLowerCase().includes(searchTerm) ||
                             coach.bio.toLowerCase().includes(searchTerm);
        const matchesGame = gameFilterValue === '' || coach.game === gameFilterValue;
        
        return matchesSearch && matchesGame;
    });
    
    // Sort coaches based on selected option
    switch(sortValue) {
        case 'rating':
            filteredCoaches.sort((a, b) => b.ratingValue - a.ratingValue);
            break;
        case 'price-low':
            filteredCoaches.sort((a, b) => {
                const priceA = parseInt(a.price.replace('$', '').replace('/session', ''));
                const priceB = parseInt(b.price.replace('$', '').replace('/session', ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            filteredCoaches.sort((a, b) => {
                const priceA = parseInt(a.price.replace('$', '').replace('/session', ''));
                const priceB = parseInt(b.price.replace('$', '').replace('/session', ''));
                return priceB - priceA;
            });
            break;
        case 'name':
            filteredCoaches.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Reset to first page and display filtered results
    currentPage = 1;
    displayCoaches();
}

function displayCoaches() {
    const coachesGrid = document.getElementById('coachesGrid');
    const paginationElement = document.getElementById('pagination');
    const pageInfoElement = document.getElementById('pageInfo');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredCoaches.length / coachesPerPage);
    const startIndex = (currentPage - 1) * coachesPerPage;
    const endIndex = Math.min(startIndex + coachesPerPage, filteredCoaches.length);
    const currentCoaches = filteredCoaches.slice(startIndex, endIndex);
    
    // Clear previous results
    coachesGrid.innerHTML = '';
    
    // Display current coaches
    if (currentCoaches.length === 0) {
        coachesGrid.innerHTML = '<div class="no-results"><p>No coaches found matching your criteria.</p></div>';
    } else {
        currentCoaches.forEach(coach => {
            const coachCard = document.createElement('div');
            coachCard.className = 'coach-card';
            
            coachCard.innerHTML = `
                <div class="coach-image">
                    <img src="${coach.image}" alt="${coach.name}">
                </div>
                <div class="coach-info">
                    <h3>${coach.name}</h3>
                    <div class="coach-game">${coach.game}</div>
                    <span class="coach-rank">${coach.rank}</span>
                    <div class="coach-price">${coach.price}</div>
                    <div class="coach-rating">${coach.rating}</div>
                    <p class="coach-bio">${coach.bio}</p>
                    <button class="btn primary">Book Session</button>
                </div>
            `;
            
            coachesGrid.appendChild(coachCard);
        });
    }
    
    // Update pagination controls
    pageInfoElement.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    
    // Show/hide pagination based on number of pages
    paginationElement.style.display = totalPages <= 1 ? 'none' : 'flex';
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayCoaches();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredCoaches.length / coachesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayCoaches();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add this CSS for no results message
const noResultsCSS = `
.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    color: #666;
}

.no-results p {
    font-size: 1.2rem;
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = noResultsCSS;
document.head.appendChild(style);