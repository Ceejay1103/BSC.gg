// Sample coach data
const coaches = [
    {
        name: "Alex Johnson",
        game: "League of Legends",
        rank: "Challenger",
        price: "$25/session",
        rating: "★★★★★",
        bio: "Former pro player with 5 years coaching experience. Specialized in jungle and macro play.",
        image: ""
    },
    {
        name: "Sarah Miller",
        game: "Valorant",
        rank: "Radiant",
        price: "$30/session",
        rating: "★★★★☆",
        bio: "Focuses on aim training and game sense. Helped 50+ students reach Immortal.",
        image: ""
    },
    {
        name: "Mike Chen",
        game: "Dota 2",
        rank: "Immortal",
        price: "$20/session",
        rating: "★★★★★",
        bio: "Mid lane specialist with deep understanding of matchups and power spikes.",
        image: ""
    },
    {
        name: "David Wilson",
        game: "CS:GO",
        rank: "Global Elite",
        price: "$22/session",
        rating: "★★★★☆",
        bio: "Focuses on team play, utility usage, and clutch situations.",
        image: ""
    }
];

// Populate coaches grid
document.addEventListener('DOMContentLoaded', function() {
    const coachesGrid = document.querySelector('.coaches-grid');
    
    if (coachesGrid) {
        coaches.forEach(coach => {
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
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Simple form submission handling
    const buttons = document.querySelectorAll('.btn.primary:not(.login):not(.signup)');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This would redirect to a booking/payment page in the full version.');
        });
    });
});