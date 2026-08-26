/**
 * 锐视安科技官网 - 交互脚本
 */

(function () {
  "use strict";

  const header = document.querySelector(".header");
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const fadeElements = document.querySelectorAll(".fade-in");
  const tabBtns = document.querySelectorAll(".product-tab");
  const productCards = document.querySelectorAll(".product-card");

  function onScroll() {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add("visible");
      }
    });

    highlightActiveNav();
  }

  function highlightActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < bottom) {
        document
          .querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]')
          .forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("active");
            }
          });
      }
    });
  }

  function toggleMenu(show) {
    if (show) {
      mobileMenu?.classList.add("open");
      overlay?.classList.add("open");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu?.classList.remove("open");
      overlay?.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  mobileBtn?.addEventListener("click", () => {
    toggleMenu(!mobileMenu.classList.contains("open"));
  });

  overlay?.addEventListener("click", () => toggleMenu(false));

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  const activeTabClasses = ["bg-brand-500", "text-white", "border-transparent"];
  const inactiveTabClasses = ["bg-deep-700", "text-slate-300", "border-slate-600"];

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      tabBtns.forEach((b) => {
        b.classList.remove("active", ...activeTabClasses);
        b.classList.add(...inactiveTabClasses);
      });
      btn.classList.remove(...inactiveTabClasses);
      btn.classList.add("active", ...activeTabClasses);

      productCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : "";

      if (btn) {
        btn.innerHTML = "提交中...";
        btn.disabled = true;
      }

      setTimeout(() => {
        alert("提交成功！我们会尽快与您联系。");
        form.reset();
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }, 1200);
    });
  });

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);
  onScroll();
})();
