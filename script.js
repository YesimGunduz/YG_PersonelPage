function toggleCvMenu() {
  const cvMenu = document.getElementById("cv-dropdown");
  if (cvMenu) {
    cvMenu.classList.toggle("open");
  }
}

// Mobile hamburger menu toggle
function toggleMenu() {
  const hamburgerNav = document.getElementById("hamburger-nav");
  if (!hamburgerNav) return;
  const menuLinks = hamburgerNav.querySelector(".menu-links");
  const hamburgerIcon = hamburgerNav.querySelector(".hamburger-icon");
  if (menuLinks) menuLinks.classList.toggle("open");
  if (hamburgerIcon) hamburgerIcon.classList.toggle("open");
}

// Close open dropdowns/menus when clicking outside
document.addEventListener("click", (event) => {
  // CV dropdown close
  const dropdown = document.querySelector(".dropdown");
  const cvMenu = document.getElementById("cv-dropdown");
  if (dropdown && cvMenu && cvMenu.classList.contains("open")) {
    const clickedInsideDropdown = dropdown.contains(event.target);
    if (!clickedInsideDropdown) {
      cvMenu.classList.remove("open");
    }
  }

  // Hamburger menu close
  const hamburgerNav = document.getElementById("hamburger-nav");
  if (hamburgerNav) {
    const menuLinks = hamburgerNav.querySelector(".menu-links");
    const hamburgerIcon = hamburgerNav.querySelector(".hamburger-icon");
    const isOpen = menuLinks && menuLinks.classList.contains("open");
    const clickedInsideHamburger = hamburgerNav.contains(event.target);
    if (isOpen && !clickedInsideHamburger) {
      menuLinks.classList.remove("open");
      if (hamburgerIcon) hamburgerIcon.classList.remove("open");
    }
  }
});

// Handle lottie animation loading
function handleLottieError(event) {
  console.error('Lottie Error Details:', event);
  
  // Show fallback icon
  const fallbackIcon = document.querySelector('.contact-icon-fallback');
  if (fallbackIcon) {
    fallbackIcon.style.display = 'block';
  }
  
  // Hide lottie player
  const lottiePlayer = document.querySelector('lottie-player');
  if (lottiePlayer) {
    lottiePlayer.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Lottie player loads via onload/onerror in HTML; avoid extra file fetch checks
});

// Projects carousel functionality with FIFO logic
let currentProjectIndex = 0;
const totalProjects = 5;
const visibleProjects = 3;

// Project data array for easy management
const projects = [
  {
    id: 'moodaktif',
    title: 'MoodAktif',
    description: 'Android Studio ve Java kullanarak geliştirdiğim yapay zekâ destekli mobil uygulama. Kullanıcıların günlük ruh hallerini takip eder ve kişiye özel öneriler sunar.',
    image: 'WhatsApp Image 2025-09-10 at 21.16.11.jpeg',
    link: 'https://github.com/YesimGunduz/MoodAktif'
  },
  {
    id: 'film-analizi',
    title: 'Film Yorumları Duygu Analizi',
    description: 'Film yorumlarının olumlu ya da olumsuz olduğunu belirlemek için Naive Bayes, Lojistik Regresyon, SVM ve Random Forest yöntemlerini kullandım.',
    image: 'DoğalDilİşleme.jpg',
    link: 'https://github.com/YesimGunduz/Film-yorumlar-olumlu-ve-olumsuz-degerlendirme-Dogal-Dil-Isleme-'
  },
  {
    id: 'e-park',
    title: 'E-Park Sistemi',
    description: 'ASP.NET ve SQL Server kullanarak geliştirdiğim otopark yönetim sistemi. Kullanıcılar otopark yerlerini rezerve edebilir ve yönetebilir.',
    image: 'E-park.jpg',
    link: 'https://github.com/YesimGunduz?tab=repositories'
  },
  {
    id: 'ruh-sagligi',
    title: 'Ruh Sağlığı Ölçümleme',
    description: 'Bir grup Üniversite Öğrencilerine ait bir veri kümesini kullanarak onların demografik özellikleri üzerinden depresyon, anksiyete ve panik atak gibi zihinsel sağlık durumlarını incelemek ve bunları sınıflandırmaya yönelik bir model geliştirmektir.',
    image: 'RuhSağlığı.png',
    link: 'https://github.com/YesimGunduz/Mental-Sagligi-olcumleme'
  },
  {
    id: 'github',
    title: 'Diğer Projelerim',
    description: 'Diğer projelerimi GitHubım üzerinden inceleyebilirsiniz.',
    image: './assets/github.png',
    link: 'https://github.com/YesimGunduz',
    isGithubCard: true
  }
];

function updateButtonStates() {
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  
  if (leftBtn) {
    leftBtn.disabled = false; // Always enabled for circular navigation
  }
  
  if (rightBtn) {
    rightBtn.disabled = false; // Always enabled for circular navigation
  }
}

function renderProjects() {
  const carousel = document.querySelector('.projects-carousel');
  if (!carousel) return;
  
  // Clear existing content
  carousel.innerHTML = '';
  
  // Show only 3 projects starting from currentProjectIndex
  for (let i = 0; i < visibleProjects; i++) {
    const projectIndex = (currentProjectIndex + i) % totalProjects;
    const project = projects[projectIndex];
    
    const projectCard = document.createElement('div');
    projectCard.className = project.isGithubCard ? 'project-card github-card' : 'project-card';
    
    const iconClass = project.isGithubCard ? 'icon-circle github-icon' : 'icon-circle';
    
    projectCard.innerHTML = `
      <div class="project-icon">
        <div class="${iconClass}">
          <img src="${project.image}" alt="${project.title} Icon" class="icon-image" />
        </div>
      </div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-actions">
        <button class="btn btn-color-2" onclick="location.href='${project.link}'">${project.isGithubCard ? 'GitHub' : 'Projeye Git'}</button>
      </div>
    `;
    
    carousel.appendChild(projectCard);
  }
}

function nextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
  renderProjects();
  updateButtonStates();
}

function previousProject() {
  currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
  renderProjects();
  updateButtonStates();
}

function showMoreProjects() {
  nextProject();
}

// Initialize button states and render projects
document.addEventListener('DOMContentLoaded', function() {
  renderProjects();
  updateButtonStates();
});

// 🔹 Formspree entegrasyonu
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form-container form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("Mesajınız başarıyla gönderildi ✅");
        form.reset();
      } else {
        alert("Bir hata oluştu ❌ Lütfen tekrar deneyin.");
      }
    });
  }
});
