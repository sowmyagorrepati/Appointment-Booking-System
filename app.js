document.addEventListener("DOMContentLoaded", function () {
    const optionButtons = document.querySelectorAll(".option");
    const serviceBoxes = document.querySelectorAll(".service-box");

    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons
            optionButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            // Show or hide service boxes based on category selection
            serviceBoxes.forEach(box => {
                if (selectedCategory === "all" || box.getAttribute("data-category") === selectedCategory) {
                    box.style.display = "flex"; // Make it visible
                } else {
                    box.style.display = "none"; // Hide it
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".service-box").forEach(box => {
        box.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            const serviceName = this.querySelector("p").textContent;
            window.location.href = `service.html?category=${category}&service=${encodeURIComponent(serviceName)}`;
        });
    });
});