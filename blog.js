let container = document.getElementById("blogContainer");

// Function to generate blog cards
function generatePosts(postsArray){
    let html = "";
    postsArray.forEach(post => {
        html += `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <a href="post.html?id=${post.id}">Read More</a>
        </div>`;
    });
    container.innerHTML = html;
}

// Initial load of all posts
generatePosts(blogPosts);

// Blog search functionality
document.getElementById("searchInput").addEventListener("keyup", function(){
    let value = this.value.toLowerCase();
    let filtered = blogPosts.filter(post => post.title.toLowerCase().includes(value));
    generatePosts(filtered);
});