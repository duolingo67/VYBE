let aura = 0;
let posts = [];

function login() {
  const user = document.getElementById("username").value;
  if (!user) return;

  localStorage.setItem("vybeUser", user);
  localStorage.setItem("vybeAura", 50);
  localStorage.setItem("vybePosts", JSON.stringify([]));

  startApp();
}

function startApp() {
  const user = localStorage.getItem("vybeUser");
  if (!user) return;

  aura = Number(localStorage.getItem("vybeAura")) || 0;
  posts = JSON.parse(localStorage.getItem("vybePosts")) || [];

  document.getElementById("authScreen").classList.add("hidden");
  document.querySelector(".feed").classList.remove("hidden");
  document.querySelector(".postBtn").classList.remove("hidden");

  document.getElementById("aura").textContent = aura;

  renderFeed();
}

function openPost() {
  document.getElementById("postModal").classList.remove("hidden");
}

function closePost() {
  document.getElementById("postModal").classList.add("hidden");
}

function createPost() {
  const text = document.getElementById("postText").value;
  const emoji = document.getElementById("postEmoji").value || "🎬";
  const user = localStorage.getItem("vybeUser");

  if (!text) return;

  posts.unshift({ user, text, emoji });
  localStorage.setItem("vybePosts", JSON.stringify(posts));

  closePost();
  renderFeed();
}

function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    feed.innerHTML += `
      <div class="card">
        <div class="video">${post.emoji}</div>
        <div class="info">
          <h3>@${post.user}</h3>
          <p>${post.text}</p>
        </div>
      </div>
    `;
  });
}

startApp();
