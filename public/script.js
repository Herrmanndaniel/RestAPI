let token = null;

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    token = data.token;
    document.getElementById("auth").style.display = "none";
    document.getElementById("logout").style.display = "block";
    loadPosts();
  } else {
    alert("Login failed");
  }
}

async function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    alert("Registration successful! You can now log in.");
    toggleForms();
  } else {
    alert("Registration failed");
  }
}

function logout() {
  token = null;
  document.getElementById("auth").style.display = "block";
  document.getElementById("logout").style.display = "none";
  document.getElementById("posts").innerHTML = ""; // Clear posts
}

async function loadPosts() {
  const response = await fetch("/blog", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const posts = await response.json();
    displayPosts(posts);
  } else {
    alert("Failed to load posts");
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear previous posts

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h3>${post.author}</h3>
      <p>${post.content}</p>
      <small>Posted on: ${new Date(post.createdAt).toLocaleString()}</small>
    `;
    postsContainer.appendChild(postElement);
  });
}

function toggleForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  registerForm.style.display =
    registerForm.style.display === "none" ? "block" : "none";
}
