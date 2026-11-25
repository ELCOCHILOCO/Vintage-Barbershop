// ========
// file: js/main.js
// Vintage Barbershop project
// ========== 

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
const heroSubtext = document.getElementById("heroSubtext");
const ctaText = document.getElementById("ctaText");
const siteHeader = document.querySelector(".site-header");

// add in services data9array of section
// ----- services data (array of objects)
const services = [
    {
        id: 1,
        title: "Classic Haircut",
        image: "assets/feature-1.jpg",
        alt: "Classic Haircut",
        text: "Timeless cuts with modern precision taylored to your style.",
        price: 25,
        popular: true,
        details: [
            "Consultation with your barber before the cut begins.",
            "Hair sectioning and shape-up based on your preferred style.",
            "Professional clippers, trimmers, and shears used for precision.",
            "Neckline cleanup and finishing touches included.",
            "Light styling product applied for a clean final look.",
        ],
    },
    {
        id: 2,
        title: "Beard Trim",
        image: "assets/feature-4.jpeg",
        alt: "Beard Trim",
        text: "Shape, line-up, and refine your beard for a clean finish.",
        price: 15,
        popular: false,
        details: [
            "Beard assessment and shaping based on face structure.",
            "Line-up around cheeks, jawline, and neckline.",
            "Trimmers and detail tools used for crisp edges.",
            "Conditioning beard product may be applied for softness.",
            "Final symmetry check for a polished finish.",
        ],
    },
    {
        id: 3,
        title: "Straight Razor Shave",
        image: "assets/feature-3.jpg",
        alt: "Straight Razor Shave",
        text: "Hot towel, smooth shave, and classic barbershop expierience.",
        price: 30,
        popular: true,
        details: [
            "Hot towel prep to soften facial hair and open pores.",
            "Premium shaving cream or lather applied to protect the skin.",
            "Straight razor shave performed with careful detailing.",
            "Second hot towel may be used for comfort and cleanup.",
            "Aftershave or soothing skin product applied after service.",
        ],
    },
    {
        id: 4,
        title: "Fade & Style",
        image: "assets/feature-2.jpg",
        alt: "Fade & Style",
        text: "A clean fade with finishing detail for a sharp, modern look.",
        price: 35,
        popular: false,
        details: [
            "Style consultation before clipper work begins.",
            "Fade blended to your preferred level and finish.",
            "Detailing around temples, neckline, and beard area if needed.",
            "Scissors and clipper-over-comb may be used for texture.",
            "Styling product added to complete the final look.",
        ],
    },
    {
        id: 5,
        title: "Kids cut",
        image: "assets/feature-1.jpg",
        alt: "Kids Cut",
        text: "Clean, comfortable haircut service for younger clients.",
        price: 20,
        popular: false,
        details: [
            "Simple consultation with child and parent if needed.",
            "Age-appropriate haircut with comfort in mind.",
            "Careful clipper and scissor work for a clean finish.",
            "Light cleanup around the neckline and ears.",
            "Styled neatly before leaving the chair.",
        ],
    },
    {
        id: 6,
        title: "Head Shave",
        image: "assets/feature-3.jpg",
        alt: "Head Shave",
        text: "Smooth headshave with classic barbershop treatment.",
        price: 28,
        popular: true,
        details: [
            "Scalp prep with warm towel treatment.",
            "Protective shave product applied before razor work.",
            "Close shave performed for a smooth finish.",
            "Scalp cleaned and checked for even consistency.",
            "Moisturizing scalp product applied after the shave.",
        ],
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

// -----Hours Data-----
// add business hours
const businessHours = [
    { day: "Monday", open: 9, close: 19 },
    { day: "Tuesday", open: 9, close: 19 },
    { day: "Wednesday", open: 9, close: 19 },
    { day: "Thursday", open: 9, close: 19 },
    { day: "Friday", open: 9, close: 19 },
    { day: "Saturday", open: 10, close: 17 },
    { day: "Sunday", open: 0, close: 0 },
];

// ------Modal elements------
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");

// ---Main Shop Object----
const shopInfo = {
    name: "Vintage Barber Shop",
    address: "123 Main st, City, USA",
    phoneDisplay: "(555) 123-4567",
    phoneRaw: "5551234567",
    email: "hello@vintagebarbershop.com",
};

// -----Open / Close logic-----
const checkIfOpen = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    let schedule;
    if (currentDay === 0) {
        schedule = businessHours[6];
    } else {
        schedule = businessHours[currentDay - 1];
    }
    if (schedule.open === 0 && schedule.close === 0) {
        updateSubtext("We are closed today. Book now for your next sharp look.");
        return;
    }
    if (currentHour >= schedule.open && currentHour < schedule.close) {
        updateSubtext("We're open right now - walk-ins welcomed, appointments recommended.");
    } else {
        updateSubtext("We are currently closed, but you can still book your next appointment.");
    }
};

// -------Modal logic -------
const openServiceModal = (serviceId) => {
    if (
        !serviceModal ||
        !serviceModalTitle ||
        !serviceModalPrice ||
        !serviceModalList
    )
        return;
    const selectedService = services.find((service) => service.id === Number(serviceId));
    if (!selectedService) return;
    serviceModalTitle.textContent = selectedService.title;
    serviceModalPrice.textContent = `$${selectedService.price}`;
    serviceModalList.innerHTML = selectedService.details
        .map((detail) => `<li>${detail}</li>`)
        .join("");
    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

const closeServiceModal = () => {
    if (!serviceModal) return;
    serviceModal.classList.remove("is-open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
};

// ---- Helpers/Functions -----
// UPdate Footer Year Automatically
const setCurrentYear = () => {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
};

// add hour formatting
const formatHour = (hour) => {
    if (hour === 0) return "Closed";
    if (hour === 12) return "12pm";
    if (hour > 12) return `${hour - 12}pm`;
    return `${hour}am`;
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

// add update subtext function
const updateSubtext = (newText) => {
    if (!heroSubtext) return;
    heroSubtext.textContent = newText;
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
        const bookingSection = document.getElementById("cta");
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: "smooth" })
        }
        updateHeadingText("Choose your date and time below.")
    });
}

// 5) Call Button: try to use the phone number in the footer
// Update call btn
if (callBtn) {
  callBtn.addEventListener("click", () => {
    window.location.href = `tel:${shopInfo.phoneRaw}`;
  });
}
// Add other helper functions
if (featureGrid) {
  featureGrid.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".service-details-btn");
    if (!clickedButton) return;
    const serviceId = clickedButton.dataset.serviceId;
    openServiceModal(serviceId);
  });
}
if (serviceModalClose) {
  serviceModalClose.addEventListener("click", closeServiceModal);
}
if (serviceModalOverlay) {
  serviceModalOverlay.addEventListener("click", closeServiceModal);
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServiceModal();
  }
});

// ----- Render features using forEach -----
// add render features function
const renderFeatures = () => {
    if (!featureGrid) return;
    const servicesHTML = services
        .map((service) => {
            let badgeHTML = "";
            if (service.popular) {
                badgeHTML = `<p class="service-badge">Popular Choice</p>`;
            } else {
                badgeHTML = `<p class="service-badge alt-badge">Barber Favorite</p>`;
            }
            return ` 
            <article class="feature-card"> 
            <img src="${service.image}" alt="${service.alt}" class="feature-img" /> 
            <h3 class="feature-title">${service.title}</h3> 
            <p class="feature-text">${service.text}</p> 
            <!-- Beginning of additions -->
            ${badgeHTML} 
            <p class="service-price">$${service.price}</p> 
            <div class="service-actions"> 
                <button class="service-details-btn" type="button" data-service-id="${service.id}" > View Details </button> 
            </div> 
            <!-- End of additions -->
            </article> `;
        })
        .join("");
    featureGrid.innerHTML = servicesHTML;
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
                    return ` <a href="${link.href}" class="mobile-link">${link.label}</a> `;
                })
                .join("");
            mobileMenu.innerHTML = mobileHTML;
        }
    };

//    add hours render
const renderHours = () => {
    if (!hoursList) return;
    const hoursHTML = businessHours
    .map((item) => {
        if (item.open === 0 && item.close === 0) {
            return `<li>${item.day}: Closed</li>`;
        }
        return `<li>${item.day}: ${formatHour(item.open)} - ${formatHour(item.close)}</li>`;
    })
    .join("");
    hoursList.innerHTML = hoursHTML;
};

// add contact render
const renderContactInfo = () => {
    if (phoneLink) {
        phoneLink.textContent = shopInfo.phoneDisplay;
        phoneLink.href = `tel:${shopInfo.phoneRaw}`;
    }
    if (addressLink) {
        addressLink.textContent = shopInfo.address;
        addressLink.href = "#";
    }
    if (emailLink) {
        emailLink.textContent = shopInfo.email;
        emailLink.href = `mailto:${shopInfo.email}`;
    }
};

    renderFeatures(); //call features to render
    renderNavigation(); //call navigation to render
    renderHours();
    checkIfOpen();
    renderContactInfo();
