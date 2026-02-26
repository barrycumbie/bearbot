const searchBox = document.getElementById("searchBox");
// const searchButton = document.getElementById("searchButton");
const videoGrid = document.getElementById("videoGrid");
// const searchMessage = document.getElementById("searchMessage");

// const SEARCHABLE_FIELDS = ["app", "action"];

let videoData;

fetch("https://barrycumbie.github.io/bearbot/assets/data/video-data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load video data");
    }
    return response.json();

  })
  .then(data => {

    videoData = data;
    console.log('video Data', videoData)

    // Initial render
    renderObjectResults(videoData.videos);

  });


function renderObjectResults(items) {
  videoGrid.innerHTML = "";

  items.forEach(video => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-12";

    col.innerHTML = `
            <div class="card h-100 shadow-sm">
              <a href="${video.url}" target="_blank">
                <img
                  src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
                  class="card-img-top"
                  alt="${video.title}"
                >
              </a>

              <div class="card-body p-3">
                <h6 class="card-title mb-1">
                  ${video.title}
                </h6>

                <p class="card-text small text-muted mb-2">
                  ${video.description}
                </p>
              </div>

              <div class="card-footer bg-white border-0 pt-0 pb-3 px-3">
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">⏱ ${video.duration}</small>
                  <span class="badge bg-secondary">YouTube</span>
                </div>
              </div>
            </div>
          `;

    videoGrid.appendChild(col);
  });

}

function handleGlobalObjectSearch() {
  const query = searchBox.value.trim().toLowerCase();
  if (!query) {
    renderObjectResults(videoData.videos);
    // searchMessage.textContent = "Type to search all fields";
    return videoData.videos;
  }

  const results = videoData.videos.filter(item => {
    const values = Object.values(item);
    return values.some(value => String(value).toLowerCase().includes(query));
  });
  renderObjectResults(results);
  return results;
  // searchMessage.textContent = results.length ? `Found ${results.length} result(s)` : `No results for: ${query}`;
}

// Search as you type
searchBox.addEventListener("input", handleGlobalObjectSearch
);

// // Search on button click
// searchButton.addEventListener("click", handleControlledObjectSearch);

// searchMessage.textContent = "Type to search shortcuts (app/action)";