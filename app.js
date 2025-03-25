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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        console.log("Sending data:", formData); // Debugging log

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Server Response:", data); // Log server response

            if (data.success) {
                alert("Message sent successfully!");
                document.getElementById("contact-form").reset(); // Clear form after submission
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message.");
        }
    });
});
