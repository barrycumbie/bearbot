function loadVideoContent() {
  fetch("../assets/data/video-data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load video data");
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      const grid = document.getElementById("videoGrid");

      data.videos.forEach(video => {
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

        grid.appendChild(col);
      });
    })
    .catch(error => {
      console.error(error);
      document.getElementById("videoGrid").innerHTML =
        "<p class='text-danger'>Unable to load videos.</p>";
    });
}


function unloadVideoContent() {
  document.getElementById("videoGrid").textContent='';

} 