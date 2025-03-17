const apiKey = "AIzaSyC9-AIj3bsjqvjHkavOl7oGfUVO9OMmtcU"; // Your Google API Key
const username = "Ria3"; // Geonames API username

// Fetch and populate countries
async function fetchCountries() {
    const response = await fetch(`http://api.geonames.org/countryInfoJSON?username=${username}`);
    const data = await response.json();
    const countryDropdown = document.getElementById("country");

    data.geonames.forEach(country => {
        const option = document.createElement("option");
        option.value = country.geonameId; // Use geonameId to fetch states
        option.textContent = country.countryName;
        countryDropdown.appendChild(option);
    });
}

// Fetch and populate states based on selected country
async function fetchStates(countryId) {
    const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=${username}`);
    const data = await response.json();
    const stateDropdown = document.getElementById("state");
    stateDropdown.innerHTML = '<option value="">Select State</option>'; // Clear previous options

    data.geonames.forEach(state => {
        const option = document.createElement("option");
        option.value = state.geonameId; // Use geonameId to fetch cities
        option.textContent = state.name;
        stateDropdown.appendChild(option);
    });
}

// Fetch and populate cities based on selected state
async function fetchCities(stateId) {
    const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=${username}`);
    const data = await response.json();
    const cityDropdown = document.getElementById("city");
    cityDropdown.innerHTML = '<option value="">Select City</option>'; // Clear previous options

    data.geonames.forEach(city => {
        const option = document.createElement("option");
        option.value = city.geonameId; // Optionally store city ID
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });
}

// Event listeners for dropdown changes
document.getElementById("country").addEventListener("change", () => {
    const countryId = document.getElementById("country").value;
    if (countryId) fetchStates(countryId);
});

document.getElementById("state").addEventListener("change", () => {
    const stateId = document.getElementById("state").value;
    if (stateId) fetchCities(stateId);
});

// Initial fetch of countries
fetchCountries();

// Handle submit button click event
document.getElementById("submit-btn").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const sex = document.getElementById("sex").value.trim();
    const birthDateInput = document.getElementById("birth-date").value.trim();
    const birthTime = document.getElementById("birth-time").value.trim();
    const country = document.getElementById("country").value.trim();
    const state = document.getElementById("state").value.trim();
    const city = document.getElementById("city").value.trim();

    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    // Validate input fields
    if (!name || !birthDateInput || !birthTime || !country || !state || !city) {
        errorDiv.innerHTML = 'Please fill in all fields!';
        return;
    }

    try {
        // Parse birth date
        const birthDate = new Date(birthDateInput);
        if (isNaN(birthDate.getTime())) {
            throw new Error('Invalid birth date!');
        }

        // Logic to determine Yantra
        const birthMonth = birthDate.getMonth() + 1; // Months are zero-based
        let yantra = '';

        if (sex === 'Male') {
            switch (birthMonth) {
                case 1: yantra = 'Surya Yantra (for Sun)'; break;
                case 2: yantra = 'Chandra Yantra (for Moon)'; break;
                case 3: yantra = 'Mangal Yantra (for Mars)'; break;
                case 4: yantra = 'Budh Yantra (for Mercury)'; break;
                case 5: yantra = 'Guru Yantra (for Jupiter)'; break;
                case 6: yantra = 'Shukra Yantra (for Venus)'; break;
                case 7: yantra = 'Shani Yantra (for Saturn)'; break;
                case 8: yantra = 'Rahu Yantra (for Rahu)'; break;
                case 9: yantra = 'Ketu Yantra (for Ketu)'; break;
                case 10: yantra = 'Navagraha Yantra (for Nine Planets)'; break;
                case 11: yantra = 'Saraswati Yantra (for Wisdom)'; break;
                case 12: yantra = 'Durga Yantra (for Protection)'; break;
                default: yantra = 'No Yantra Found'; break;
            }
        } else if (sex === 'Female') {
            switch (birthMonth) {
                case 1: yantra = 'Saraswati Yantra (for Wisdom)'; break;
                case 2: yantra = 'Chandra Yantra (for Moon)'; break;
                case 3: yantra = 'Shukra Yantra (for Venus)'; break;
                case 4: yantra = 'Budh Yantra (for Mercury)'; break;
                case 5: yantra = 'Lakshmi Yantra (for Wealth)'; break;
                case 6: yantra = 'Durga Yantra (for Protection)'; break;
                case 7: yantra = 'Mangal Yantra (for Mars)'; break;
                case 8: yantra = 'Surya Yantra (for Sun)'; break;
                case 9: yantra = 'Ketu Yantra (for Ketu)'; break;
                case 10: yantra = 'Navagraha Yantra (for Nine Planets)'; break;
                case 11: yantra = 'Shani Yantra (for Saturn)'; break;
                case 12: yantra = 'Guru Yantra (for Jupiter)'; break;
                default: yantra = 'No Yantra Found'; break;
            }
        }

        // Display results
        resultDiv.innerHTML = `
                    <h2>Your Yantra Recommendation:</h2>
                    <p class="yantra">${yantra}</p>
                    <a href="https://example.com/order-yantras" class="order-link" target="_blank">Order Now</a>
                `;

    } catch (error) {
        errorDiv.innerHTML = error.message;
    }
});