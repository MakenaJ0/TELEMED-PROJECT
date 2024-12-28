// JavaScript to handle form submission
document.addEventListener("DOMContentLoaded", () => {
    // Get the patient form by its ID
    const patientForm = document.getElementById("patient-form");

    if (!patientForm) {
        console.error("Patient form not found!");
        return;
    }

    // Add event listener to the form
    patientForm.addEventListener("submit", async function (event) {
        console.log("Submit event triggered!");
        event.preventDefault(); // Prevent the form from appending data to the URL

        // Collect data from form
        const formData = {
            first_name: document.getElementById("first-name").value,
            last_name: document.getElementById("last-name").value,
            email_address: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirm_password: document.getElementById("confirm-password").value,
            phone_number: document.getElementById("phone").value,
            date_of_birth: document.getElementById("date-of-birth").value,
            gender: document.getElementById("gender").value,
            address: document.getElementById("address").value,
        };

        console.log("Form data: ", formData);

        try {
            // Send data to the backend
            const response = await fetch("/patients/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    });

    // Handling for Login
    document.addEventListener("DOMContentLoaded", () => {
        document
            .getElementById("login-form")
            .addEventListener("submit", async (event) => {
                event.preventDefault(); // Prevent default form submission

                const email_address =
                    document.getElementById("email-login").value;
                const password =
                    document.getElementById("password-login").value;

                console.log("Attempting to log in..."); // Debugging log

                try {
                    const response = await fetch("/patients/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email_address, password }),
                    });

                    console.log("Response received:", response);

                    const data = await response.json();

                    if (response.ok) {
                        alert("Login successful!");
                        // Redirect to patient dashboard or another page if needed
                    } else {
                        alert(`Error: ${data.message}`);
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    alert("An error occurred. Please try again.");
                }
            });
    });

    // // Responsive Navbar Toggle (for mobile screens)
    // const hamburgerMenu = document.querySelector(".hamburger-menu");
    // const navbar = document.querySelector(".navbar ul");
    // if (hamburgerMenu) {
    //     hamburgerMenu.addEventListener("click", () => {
    //         navbar.classList.toggle("active");
    //     });
});
