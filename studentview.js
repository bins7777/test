class StudentView {
  constructor() {
    this.app = document.getElementById("root");
  }

  clear() {
    this.app.innerHTML = "";
  }

  // helper to show messages
  showMessage(targetId, message, type) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.textContent = message;
    el.className = "feedback " + type;
  }

  showHome() {
    this.clear();
    this.app.innerHTML = `
      <!-- Facilities carousel -->
      <section aria-label="Facilities carousel" class="carousel" id="facilities-carousel">
        <div class="slides" aria-live="polite">
          <div class="slide">
            <img src="images/facility1.jpg" alt="Main Library - study areas and stacks" />
            <div class="caption">Main Library — quiet study & research collections</div>
          </div>
          <div class="slide">
            <img src="images/facility2.jpg" alt="Modern lecture hall with AV equipment" />
            <div class="caption">Lecture Halls — modern AV-enabled classrooms</div>
          </div>
          <div class="slide">
            <img src="images/facility3.jpg" alt="Campus sports center and gym" />
            <div class="caption">Sports Center — fitness & recreation facilities</div>
          </div>
          <div class="slide">
            <img src="images/facility4.jpg" alt="Student commons and cafeteria" />
            <div class="caption">Student Commons — dining & collaborative spaces</div>
          </div>
          <div class="slide">
            <img src="images/facility5.jpg" alt="Science labs and research spaces" />
            <div class="caption">Research Labs — labs and maker spaces</div>
          </div>
        </div>

        <div class="controls">
          <button id="prev" aria-label="Previous slide">&#9664;</button>
          <button id="next" aria-label="Next slide">&#9654;</button>
        </div>

        <div class="indicators" id="indicators">
          <button data-slide="0" class="active"></button>
          <button data-slide="1"></button>
          <button data-slide="2"></button>
          <button data-slide="3"></button>
          <button data-slide="4"></button>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section aria-labelledby="mission-vision" class="values" id="mission-vision">
        <div class="value-card" id="mission">
          <h3>Mission</h3>
          <p>
            Summit University provides transformative education that empowers learners to excel academically,
            engage ethically, and contribute meaningfully to their communities...
          </p>
        </div>
        <div class="value-card" id="vision">
          <h3>Vision</h3>
          <p>
            To be recognized globally for academic excellence, innovative research, and inclusive opportunities...
          </p>
        </div>
      </section>
    `;

    // re-init carousel
    this.initCarousel();
  }

  initCarousel() {
    const slidesEl = document.querySelector(".carousel .slides");
    const slides = document.querySelectorAll(".carousel .slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const indicators = document.getElementById("indicators");
    const indicatorButtons = indicators.querySelectorAll("button");
    let current = 0;
    const total = slides.length;
    let interval = null;
    const AUTO_MS = 5000;

    function goTo(index) {
      current = (index + total) % total;
      slidesEl.style.transform = "translateX(" + -current * 100 + "%)";
      indicatorButtons.forEach((btn, i) =>
        btn.classList.toggle("active", i === current)
      );
    }
    function next() {
      goTo(current + 1);
    }
    function prev() {
      goTo(current - 1);
    }

    nextBtn.addEventListener("click", () => {
      next();
      resetAuto();
    });
    prevBtn.addEventListener("click", () => {
      prev();
      resetAuto();
    });

    indicatorButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        goTo(Number(btn.dataset.slide));
        resetAuto();
      })
    );

    function startAuto() {
      interval = setInterval(next, AUTO_MS);
    }
    function resetAuto() {
      clearInterval(interval);
      startAuto();
    }

    const carousel = document.getElementById("facilities-carousel");
    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", startAuto);

    goTo(0);
    startAuto();
  }

showAbout() {
    this.clear();
    this.app.innerHTML = `
      <h1>About Summit University</h1>
      <h2>Campus Facilities</h2>
      <ul>
        <li><b>Summit Dome:</b> Central hub for research and events.</li>
        <li><b>Innovation Studios:</b> Maker spaces, VR/AR labs, design workshops.</li>
        <li><b>Eco-Campus:</b> Green architecture, solar grids, gardens.</li>
        <li><b>Exploration Halls:</b> Space, oceanic, and frontier sciences.</li>
        <li><b>Global Exchange Centers:</b> International learning connections.</li>
      </ul>
      <h2>Special Programs</h2>
      <ul>
        <li><b>Convergence Tracks:</b> Blending multiple disciplines.</li>
        <li><b>Living Labs:</b> Hands-on sustainability projects.</li>
        <li><b>Summit Global Exchange:</b> Semester abroad experience.</li>
        <li><b>Leadership Incubator:</b> Startup & NGO accelerator.</li>
        <li><b>Arts & Culture Residency:</b> Collaborations with global artists.</li>
      </ul>
    `;
  }

  showRegister(handler) {
    this.clear();
    const form = document.createElement("form");
    form.innerHTML = `
      <h1>Student Registration</h1>
      <input name="name" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="education" placeholder="Educational Background" required />
      <input name="username" placeholder="Username" required />
      <input id="password" name="password" type="password" placeholder="Password" required />
      <div id="strengthBar" style="height:8px; width:100%; background:#ccc; border-radius:4px; margin-top:4px;"></div>
      <button type="submit">Register</button>
      <div class="feedback" id="regFeedback"></div>
    `;

    const passwordInput = form.querySelector("#password");
    const bar = form.querySelector("#strengthBar");
    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      if (score === 0) bar.style.background = "#ccc";
      else if (score === 1) bar.style.background = "red";
      else if (score === 2) bar.style.background = "orange";
      else if (score >= 3) bar.style.background = "green";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (typeof handler === "function") {
        handler(data);
      }
    });
    this.app.append(form);
  }

  showLogin(handler) {
    this.clear();
    const form = document.createElement("form");
    form.innerHTML = `
      <h1>Login</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div class="feedback" id="loginFeedback"></div>
    `;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (typeof handler === "function") {
        handler(data); // controller will handle login
      }
    });
    this.app.append(form);
  }
}
