document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('imageGrid');
    const refreshBtn = document.getElementById('refreshBtn');
    const addBtn = document.getElementById('addBtn');
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or use dark theme by default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-theme');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
    
    // Initial load
    loadImages(6);
    
    // Refresh all images
    refreshBtn.addEventListener('click', function() {
        imageGrid.innerHTML = '';
        loadImages(6);
    });
    
    // Add more images
    addBtn.addEventListener('click', function() {
        loadImages(3);
    });
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    function loadImages(count) {
        for (let i = 0; i < count; i++) {
            const imageId = Math.floor(Math.random() * 1000);
            const width = 300;
            const height = 200;
            
            // Create image card
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';
            
            // Create image element
            const img = document.createElement('img');
            img.src = `https://picsum.photos/id/${imageId}/${width}/${height}`;
            img.alt = `Random image ${imageId}`;
            img.loading = 'lazy';
            
            // Create image info
            const imageInfo = document.createElement('div');
            imageInfo.className = 'image-info';
            const imageIdText = document.createElement('p');
            imageIdText.className = 'image-id';
            imageIdText.textContent = `Image ID: ${imageId}`;
            
            // Handle image loading errors
            img.onerror = function() {
                // If image fails to load, try another random image
                const newImageId = Math.floor(Math.random() * 1000);
                img.src = `https://picsum.photos/id/${newImageId}/${width}/${height}`;
                imageIdText.textContent = `Image ID: ${newImageId}`;
            };
            
            // Assemble the card
            imageInfo.appendChild(imageIdText);
            imageCard.appendChild(img);
            imageCard.appendChild(imageInfo);
            
            // Add to grid
            imageGrid.appendChild(imageCard);
        }
    }
});