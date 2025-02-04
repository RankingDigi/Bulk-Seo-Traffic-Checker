document.getElementById("checkTraffic").addEventListener("click", function() {
    let domains = document.getElementById("domainList").value.trim().split("\n");
    let errorMessage = document.getElementById("errorMessage");

    // Clear any previous error messages
    errorMessage.textContent = '';

    // Remove any empty domains or lines
    domains = domains.filter(domain => domain.trim() !== "");

    if (domains.length === 0) {
        errorMessage.textContent = "Please enter at least one domain.";
        return;
    }

    // Loop through the domains and generate the URL
    domains.forEach(domain => {
        let trimmedDomain = domain.trim();
        if (trimmedDomain !== "") {
            // Generate the Ahrefs traffic checker URL
            let url = `https://ahrefs.com/traffic-checker/?input=${encodeURIComponent(trimmedDomain)}&mode=subdomains`;

            // Open the URL in a new tab
            chrome.tabs.create({ url });
        }
    });
});

document.getElementById("cleanUrl").addEventListener("click", function() {
    let urlsToClean = document.getElementById("urlToClean").value.trim().split("\n");
    let errorMessage = document.getElementById("errorMessage");
    let cleanedUrlsContainer = document.getElementById("cleanedUrls");

    // Clear previous error and result
    errorMessage.textContent = '';
    cleanedUrlsContainer.textContent = '';

    if (!urlsToClean.length || urlsToClean.every(url => url.trim() === "")) {
        errorMessage.textContent = "Please enter at least one URL to clean.";
        return;
    }

    let cleanedUrls = urlsToClean.map(urlToClean => {
        let url = new URL(urlToClean.trim());
        return url.origin; // Remove the slug part of the URL
    });

    // Display cleaned URLs with preserved line breaks
    cleanedUrlsContainer.innerHTML = cleanedUrls.join("<br>");

    // Enable the copy button
    document.getElementById("copyUrlBtn").style.display = "block";
});

document.getElementById("copyUrlBtn").addEventListener("click", function() {
    let cleanedUrls = document.getElementById("cleanedUrls").innerText; // Use innerText for proper line breaks
    navigator.clipboard.writeText(cleanedUrls)
        .then(() => {
            alert("Cleaned URLs copied to clipboard!");
        })
        .catch(err => {
            alert("Failed to copy URLs!");
        });
});

document.getElementById("switchTool").addEventListener("click", function() {
    // Toggle visibility of traffic checker and URL cleaner
    let trafficCheckerContainer = document.getElementById("trafficCheckerContainer");
    let urlCleanerContainer = document.getElementById("urlCleanerContainer");

    if (trafficCheckerContainer.style.display === "none") {
        trafficCheckerContainer.style.display = "block";
        urlCleanerContainer.style.display = "none";
        document.getElementById("toolName").textContent = "Bulk SEO Traffic Checker";
        document.getElementById("switchTool").textContent = "Switch to URL Cleaner";
        document.getElementById("switchTool").style.color = "#fff"; // White text by default
    } else {
        trafficCheckerContainer.style.display = "none";
        urlCleanerContainer.style.display = "block";
        document.getElementById("toolName").textContent = "URL Cleaner";
        document.getElementById("switchTool").textContent = "Switch to Traffic Checker";
        document.getElementById("switchTool").style.color = "#fff"; // White text by default
    }
});
