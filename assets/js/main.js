document.addEventListener("DOMContentLoaded", () => {
  console.log("InternConnect loaded");

  // --- Home page search: redirect with query ---
  const homeSearch = document.getElementById("home-search");
  const homeSearchBtn = document.getElementById("home-search-btn");

  if (homeSearch && homeSearchBtn) {
    homeSearchBtn.addEventListener("click", () => {
      const q = homeSearch.value.trim();
      if (!q) return;
      window.location.href = "internships.html?q=" + encodeURIComponent(q);
    });
  }

  // --- Search filter on internships page ---
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll("#internship-list .card");

  if (searchInput && cards.length) {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    if (initialQuery) {
      searchInput.value = initialQuery;
    }

    const applyFilter = () => {
      const query = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.parentElement.style.display = text.includes(query) ? "" : "none";
      });
    };

    // initial filter
    applyFilter();
    searchInput.addEventListener("input", applyFilter);
  }

  // --- Apply form validation ---
  const form = document.getElementById("apply-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const reason = form.elements["reason"].value.trim();

      if (!name || !email) {
        alert("Name and Email are required.");
        e.preventDefault();
        return;
      }

      if (reason.length < 20) {
        alert("Please write at least 20 characters in 'Why should we hire you?'.");
        e.preventDefault();
        return;
      }

      alert("Your application has been submitted (demo – frontend only).");
      e.preventDefault();
      form.reset();
    });
  }
});
