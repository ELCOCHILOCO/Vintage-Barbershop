// ========
// file: js/main.js
// Vintage Barbershop project
// ========== 

// add in services data9array of section
// ----- services data (array of objects)
const services = [
    {
        title: "Classic Haircut",
        text: "Timeless cuts with modern precision taylored to your style.",
        image: "assets/feature-1.jpg",
    },
    {
        title: "Beard trim",
        text: "Shape and line-up your beard for a clean, sharp finish.",
        image: "assets/feature-2.jpg",
    },
    {
        title: "Straight razor shave",
        text: "Hot towel treatment with a smooth tradition shave.",
        image: "assets/feature-3.jpg",
    },
];

// -----Navagation Data (Araay of objects)-----
// add navigation data section
const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#features" },
    { label: "Book", href: "#cta" },
    { label: "Contact", href: "#footer" },
];

// ---- DOM Elements ----
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid"); //add featureGrid DOM selector
const nav = document.getElementById("nav");

const siteHeader = document.querySelector(".site-header");


// ---- Helpers/Functions -----
// UPdate Footer Year Automatically
const setCurrentYear = () => {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
};

// Header scroll
// add scroll handling  for scroll effects
const handleHeaderOnScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
        siteHeader.classList.add("is-scrolled");
    } else {
        siteHeader.classList.remove("is-scrolled");
    }
};

// Toggle Mobile Menu Open/Close
let isMenuOpen = false;
const toggleMobileMenu = () => {
    if (!mobileMenu) return;
    if (isMenuOpen === false) {
        mobileMenu.classList.add("is-open");
        isMenuOpen = true;
    } else {
        mobileMenu.classList.remove("is-open");
        isMenuOpen = false;
    }
};

// Close Mobile Menu (Used when a link is clicked)
const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
};

// Reusable Function with parameters
const updateHeadingText = (newText) => {
    if (!heading) return;
    heading.textContent = newText;
};

// ----- Even listeners -----
// 1) Set year on page load
setCurrentYear();
// 2) hamburger menu toggle
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        toggleMobileMenu();
    });
};

// 3) Close Mobile Menu when a Mobile link is clicked (event delegation)
if (mobileMenu) {
    mobileMenu.addEventListener("click", (event) => {
        // if they clicked an <a> inside the menu, close it
        if (event.target.tagName === "A") {
            closeMobileMenu();
        }
    });
}

// 4) CTA button : "Book Now" (placeholder behavior)
if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
        updateHeadingText("Booking coming nect - Great choice!");
    });
}

// 5) Call Button : try to use the phone number in the footer
if (callBtn) {
    callBtn.addEventListener("click", () => {
        //  if you later set phoneLink href to tel, this will work perfectly
        // for now this is a beginner friendly placeholder
        if (phoneLink) {
            updateHeadingText("Call us at " + phoneLink.textContent);
        } else {
            updateHeadingText("Call feature coming next!");
        }
    });
}

// 6) Window listens for scroll
window.addEventListener("scroll", handleHeaderOnScroll);
// run once on page load in case user refreshes midscroll

// ----- Render features using forEach -----
// add render features function
const renderFeatures = () => {
    if (!featureGrid) return;
    services.forEach((service) => {
        const card = document.createElement("article");
        card.classList.add("feature-card");
        card.innerHTML = ` <img src="${service.image}" alt="${service.title}" class="feature-img" /> <h3 class="feature-title">${service.title}</h3> <p class="feature-text">${service.text}</p> `;
        featureGrid.appendChild(card); 
    });
};

// ----Render navigation using map() -----
// add navigation render
const renderNavigation = () => {
    // desktop nav
    if (nav) {
        const navHTML = navLinks
        .map((link) => {
            return ` <a href="${link.href}" class="nav-link">${link.label}</a> `;
        })
        .join("");
        nav.innerHTML = navHTML;
    }

    // mobile nav
    if (mobileMenu) {
        const mobileHTML = navLinks
        .map((link) => {
            return ` <a href="${link.href}" class="nav-link">${link.label}</a> `;
        })
        .join("");
        mobileHTML.innerHTML = mobileHTML;
    }
};

// Render features with map()
// const renderFeaturesMap = () => {
//     const cardsHTML = services
//     .map((service) => {
//         return `
//         <article class="feature-card"> 
//             <img src="${service.image}" alt="${services.title}" class"feature-img" />
//             <h3 class="feature-title"${service.title}</h3>
//             <p class="feature-text">${service.text}</p>
//         </article>
//         `;
//     })
//     .join(""); //join the array of strings into a single string
//     featureGrid.innerHTML = cardsHTML;
// };

renderFeatures(); //call features to render
renderNavigation(); //call navigation to render

