Flood Information Website - News API Integration Guide

To implement real-time news updates from the internet, follow these steps:

1. Sign up for a News API service:
   - Visit https://newsapi.org/ and create a free account
   - Get your API key from the dashboard

2. Replace the mock fetchNewsUpdates() function in script.js with real API integration:

// Real implementation using NewsAPI
function fetchNewsUpdates() {
    const updatesContainer = document.getElementById('dynamic-updates');
    const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
    const QUERY = 'flood+sri+lanka'; // Search query
    
    // Show loading message
    updatesContainer.innerHTML = '<div class="loading">Loading latest updates...</div>';
    
    // Fetch news from NewsAPI
    fetch(`https://newsapi.org/v2/everything?q=${QUERY}&sortBy=publishedAt&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Clear loading message
            updatesContainer.innerHTML = '';
            
            // Check if we have articles
            if (data.articles && data.articles.length > 0) {
                // Process and display articles (limit to 6 most recent)
                data.articles.slice(0, 6).forEach(article => {
                    const updateElement = document.createElement('div');
                    updateElement.className = 'update-item';
                    
                    // Format publication date
                    const pubDate = new Date(article.publishedAt);
                    const timeDiff = Math.floor((new Date() - pubDate) / (1000 * 60)); // Minutes ago
                    
                    let timeString;
                    if (timeDiff < 60) {
                        timeString = `${timeDiff} minute${timeDiff !== 1 ? 's' : ''} ago`;
                    } else if (timeDiff < 1440) {
                        const hours = Math.floor(timeDiff / 60);
                        timeString = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
                    } else {
                        const days = Math.floor(timeDiff / 1440);
                        timeString = `${days} day${days !== 1 ? 's' : ''} ago`;
                    }
                    
                    updateElement.innerHTML = `
                        <span class="update-time">${timeString}</span>
                        <p>${article.title}</p>
                    `;
                    updatesContainer.appendChild(updateElement);
                });
            } else {
                updatesContainer.innerHTML = '<div class="error-message">No recent updates available.</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            updatesContainer.innerHTML = '<div class="error-message">Failed to load updates. Please try again later.</div>';
        });
}

3. Update the window load event to call the real function:

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    loadLiveStreams();
    fetchNewsUpdates(); // Load real news updates when page loads
    
    // Optionally, refresh news every 5 minutes
    setInterval(fetchNewsUpdates, 300000);
});

Alternative APIs you could use:
1. Guardian API - https://open-platform.theguardian.com/
2. BBC News API - Requires application
3. Google News API - https://news.google.com/

For Sri Lankan specific news sources, you might need to:
1. Use RSS feeds from local news websites
2. Scrape data from news portals (ensure compliance with terms of service)
3. Partner with local news organizations for direct API access

Security considerations:
- Never expose your API key in client-side code
- Use a backend proxy or serverless function to protect your API key
- Implement rate limiting to prevent abuse

Example using a backend proxy approach:

function fetchNewsUpdates() {
    const updatesContainer = document.getElementById('dynamic-updates');
    
    // Show loading message
    updatesContainer.innerHTML = '<div class="loading">Loading latest updates...</div>';
    
    // Fetch from your own backend endpoint
    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            // Process data as shown in the NewsAPI example above
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            updatesContainer.innerHTML = '<div class="error-message">Failed to load updates. Please try again later.</div>';
        });
}