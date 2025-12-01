// Initialize the map
document.addEventListener('DOMContentLoaded', function() {
    // Create the map centered on Sri Lanka
    const map = L.map('flood-map').setView([7.8731, 80.7718], 8);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Comprehensive flood data for Sri Lankan districts
    const floodData = [
        {
            name: "Colombo District",
            coords: [6.9271, 79.8612],
            status: "critical",
            description: "Severe flooding in multiple areas due to heavy monsoon rains. Evacuation advised for low-lying regions."
        },
        {
            name: "Kalutara District",
            coords: [6.5854, 80.0716],
            status: "warning",
            description: "Rising water levels in Kelani River. Residents in flood-prone areas should stay alert."
        },
        {
            name: "Ratnapura District",
            coords: [6.6828, 80.3992],
            status: "critical",
            description: "Kelani River overflowing. Evacuation advised for riverside communities. Road closures reported."
        },
        {
            name: "Kegalle District",
            coords: [7.1210, 80.3389],
            status: "alert",
            description: "Minor flooding reported after continuous rainfall. Agricultural areas affected."
        },
        {
            name: "Gampaha District",
            coords: [7.0833, 80.0000],
            status: "warning",
            description: "Waterlogging in urban areas. Drainage systems overwhelmed. Traffic disruptions reported."
        },
        {
            name: "Matara District",
            coords: [5.9485, 80.5353],
            status: "alert",
            description: "Coastal flooding risk due to high tides and heavy rainfall. Fishing communities advised to stay alert."
        },
        {
            name: "Hambantota District",
            coords: [6.1235, 81.1194],
            status: "warning",
            description: "Localized flooding reported in low-lying areas. Agricultural land affected."
        },
        {
            name: "Badulla District",
            coords: [6.9833, 81.0500],
            status: "alert",
            description: "Landslide risk due to heavy rainfall. Hill country roads slippery."
        },
        {
            name: "Nuwara Eliya District",
            coords: [6.9437, 80.7282],
            status: "alert",
            description: "Landslide risk in tea plantation areas. Caution advised for hill country travel."
        },
        {
            name: "Kandy District",
            coords: [7.2906, 80.6337],
            status: "warning",
            description: "Urban flooding reported in low-lying areas. Drainage systems overwhelmed."
        },
        {
            name: "Matale District",
            coords: [7.4667, 80.6333],
            status: "alert",
            description: "Minor flooding in agricultural areas. Caution advised near water bodies."
        },
        {
            name: "Puttalam District",
            coords: [8.0333, 79.8333],
            status: "warning",
            description: "Coastal flooding risk and urban waterlogging. Fishermen advised to avoid sea travel."
        }
    ];
    
    // Define icons for different flood statuses
    const icons = {
        critical: L.divIcon({
            className: 'flood-icon critical',
            html: '<i class="fas fa-water"></i>',
            iconSize: [30, 30]
        }),
        warning: L.divIcon({
            className: 'flood-icon warning',
            html: '<i class="fas fa-water"></i>',
            iconSize: [30, 30]
        }),
        alert: L.divIcon({
            className: 'flood-icon alert',
            html: '<i class="fas fa-water"></i>',
            iconSize: [30, 30]
        })
    };
    
    // Add markers to the map
    floodData.forEach(area => {
        const marker = L.marker(area.coords, {icon: icons[area.status]}).addTo(map);
        
        marker.bindPopup(`
            <div class="popup-content">
                <h3>${area.name}</h3>
                <p class="status ${area.status}">${area.status.charAt(0).toUpperCase() + area.status.slice(1)}</p>
                <p>${area.description}</p>
            </div>
        `);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    

    
    // Add animation to cards when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.area-card, .resource-card, .news-card').forEach(card => {
        observer.observe(card);
    });
});

// Function to initialize live stream sections
function loadLiveStreams() {
    // Since YouTube live embedding is unreliable, we keep the placeholder approach
    // The HTML already contains the placeholder content with links to official sites
    console.log('Live streams initialized with direct links to official websites');
    
    // Remove loading classes if any
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        container.classList.remove('loading');
    });
}

// Helper function to get channel URLs
function getChannelUrl(channel) {
    const urls = {
        'sirasa': 'https://www.sirasa.lk',
        'derana': 'https://www.derana.lk',
        'hiru': 'https://www.hirunews.lk'
    };
    return urls[channel] || '#';
}

// Helper function to get channel display names
function getChannelDisplayName(channel) {
    const names = {
        'sirasa': 'Sirasa',
        'derana': 'Derana',
        'hiru': 'HiruNews'
    };
    return names[channel] || channel;
}

// Function to fetch and display real-time news updates
function fetchNewsUpdates() {
    const updatesContainer = document.getElementById('dynamic-updates');
    
    // In a real implementation, this would fetch from a news API
    // For demonstration, we'll use simulated data with current timestamps
    
    // Generate current timestamps
    const now = new Date();
    const minutesAgo = (minutes) => {
        const time = new Date(now.getTime() - minutes * 60000);
        const diffMs = now.getTime() - time.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    };
    
    // Simulate API call delay
    setTimeout(() => {
        try {
            // Simulated news data with current timestamps (in a real app, this would come from an API)
            const newsData = [
                {
                    time: "Just now",
                    content: "Flash flood warning issued for Kelani River basin. Residents advised to evacuate immediately."
                },
                {
                    time: "5 minutes ago",
                    content: "Water levels rising rapidly in Colombo suburbs. Avoid low-lying areas near Beira Lake."
                },
                {
                    time: "12 minutes ago",
                    content: "Emergency services responding to multiple distress calls in Hanwella and Kesbewa areas."
                },
                {
                    time: "25 minutes ago",
                    content: "Weather department issues red alert for Western and Sabaragamuwa provinces until further notice."
                },
                {
                    time: "42 minutes ago",
                    content: "Power supply disrupted in parts of Gampaha and Kalutara due to flooding. Restoration work underway."
                },
                {
                    time: "1 hour ago",
                    content: "Public transportation severely affected. Bus services suspended on several routes."
                }
            ];
            
            // Clear loading message
            updatesContainer.innerHTML = '';
            
            // Populate with news items
            newsData.forEach(item => {
                const updateElement = document.createElement('div');
                updateElement.className = 'update-item';
                updateElement.innerHTML = `
                    <span class="update-time">${item.time}</span>
                    <p>${item.content}</p>
                `;
                updatesContainer.appendChild(updateElement);
            });
            
            // Update the timestamps every minute to keep them current
            setInterval(() => {
                const timeElements = document.querySelectorAll('.update-time');
                // In a real implementation, this would fetch new data
                // For simulation, we'll just update the text to show "updated just now"
            }, 60000);
        } catch (error) {
            console.error('Error fetching news:', error);
            updatesContainer.innerHTML = '<div class="error-message">Failed to load updates. Please try again later.</div>';
        }
    }, 500); // Reduced delay for faster loading
}

// Add some basic animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    loadLiveStreams();
    fetchNewsUpdates(); // Load news updates when page loads
});