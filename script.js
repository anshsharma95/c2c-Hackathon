const apodDate = document.getElementById("apod-date");
const apodButton = document.getElementById("apod-button");

const apodImage = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodDescription = document.getElementById("apod-description");

apodButton.addEventListener("click", async function () {
    console.log("Fetching data from NASA...");

    const selectedDate = apodDate.value;

    if (!selectedDate) {
        apodDescription.textContent = "Please select a date first.";
        return;
    }

    // Show loading feedback
    apodTitle.textContent = "Discovering the Universe...";
    apodDescription.textContent = "Searching the cosmos for your discovery.";

    apodButton.disabled = true;
    apodButton.textContent = "Discovering...";
    
if (!selectedDate) {
    apodDescription.textContent = "Please select a date first.";
    return;
}

const params = new URLSearchParams({
    date: selectedDate
});

const url =
    `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?${params}`;

try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("NASA response:", data);

    const selectedApod = Array.isArray(data)
        ? data.find(item => item.date === selectedDate)
        : data;

    console.log("Selected APOD:", selectedApod);

    if (!selectedApod) {
        apodTitle.textContent = "No Discovery Found";
        apodDescription.textContent =
            "No astronomy picture was found for this date.";

        apodImage.removeAttribute("src");
        apodImage.style.display = "none";

        return;
    }

    apodTitle.textContent = selectedApod.title;
    apodDescription.textContent = selectedApod.explanation;

    if (selectedApod.media_type === "image" && selectedApod.hdurl) {
        apodImage.src = selectedApod.hdurl;
        apodImage.alt = selectedApod.alt || selectedApod.title;
        apodImage.style.display = "block";
    } else {
        apodImage.removeAttribute("src");
        apodImage.style.display = "none";

        apodDescription.textContent =
            selectedApod.explanation ||
            "No image is available for this date.";
    }

} catch (error) {
    console.error("NASA API error:", error);

    apodTitle.textContent = "Unable to Load Discovery";
    apodDescription.textContent =
        "Something went wrong. Check the browser console for details.";
}


});
/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
".discovery-section, .apod-card, footer"
);

revealElements.forEach((element) => {
element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("is-visible");


            observer.unobserve(entry.target);
        }
    });
},
{
    threshold: 0.12
}


);

revealElements.forEach((element) => {
revealObserver.observe(element);
});

