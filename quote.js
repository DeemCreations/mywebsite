// JS to load popup form
const modal = document.getElementById("quoteModal");
const btn = document.getElementById("openFormBtn");

btn.onclick = (e) => {
    e.preventDefault(); // prevent default anchor behavior
    fetch('quote-form.html')
        .then(response => response.text())
        .then(data => {
            modal.innerHTML = data;          // load form
            modal.style.display = "block";   // show modal

            // Close button inside loaded form
            const closeBtn = modal.querySelector(".close");
            closeBtn.onclick = () => modal.style.display = "none";

            // Click outside modal closes it
            window.onclick = (event) => {
                if(event.target === modal) modal.style.display = "none";
            }
        });
};


const form = document.getElementById("quoteForm");

form.addEventListener("submit", function(e){
    e.preventDefault(); // prevent page reload

    const formData = new FormData(form);

    fetch("mail.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data.trim() === "success"){
            alert("Your quote request has been sent!");
            form.reset();
            document.getElementById("quoteModal").style.display = "none";
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(error => console.error("Error:", error));
});