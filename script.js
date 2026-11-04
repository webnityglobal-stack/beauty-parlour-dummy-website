
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");

  menuBtn.textContent = nav.classList.contains("active")
    ? "✕"
    : "☰";
});

// Close mobile menu after clicking a link
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// WhatsApp number - replace with your own number
const whatsappNumber = "91XXXXXXXXXX";

// Minimum booking date
document.getElementById("date").min =
  new Date().toISOString().split("T")[0];

// Booking form
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10 digit mobile number.");
    return;
  }

  const message = `Hello Bloom Beauty!

I want to book an appointment.

Name: ${name}
Mobile: ${phone}
Service: ${service}
Date: ${date}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

// Floating WhatsApp button
document.getElementById("whatsapp").addEventListener("click", function(e) {
  e.preventDefault();
  window.open(`https://wa.me/${whatsappNumber}`, "_blank");
});

/* GALLERY FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});


/* GALLERY LIGHTBOX */

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("lightboxClose");
const prevImage = document.getElementById("lightboxPrev");
const nextImage = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function getVisibleImages() {
  return [...galleryItems]
    .filter(item => !item.classList.contains("hide"))
    .map(item => item.querySelector("img"));
}

function openGalleryImage(index) {
  const images = getVisibleImages();

  if (!images.length) return;

  currentImageIndex = (index + images.length) % images.length;
  lightboxImage.src = images[currentImageIndex].src;
  lightboxImage.alt = images[currentImageIndex].alt;
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

galleryItems.forEach(item => {
  const image = item.querySelector("img");
  const viewButton = item.querySelector(".gallery-view");

  image.addEventListener("click", () => {
    const visibleImages = getVisibleImages();
    const index = visibleImages.indexOf(image);
    openGalleryImage(index);
  });

  viewButton.addEventListener("click", () => {
    const visibleImages = getVisibleImages();
    const index = visibleImages.indexOf(image);
    openGalleryImage(index);
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
});

nextImage.addEventListener("click", () => {
  openGalleryImage(currentImageIndex + 1);
});

prevImage.addEventListener("click", () => {
  openGalleryImage(currentImageIndex - 1);
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (event.key === "ArrowRight") {
    openGalleryImage(currentImageIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    openGalleryImage(currentImageIndex - 1);
  }
});

/* CONTACT APPOINTMENT FORM */

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date + "T00:00:00");

    if (selectedDate < today) {
      alert("Please select today or a future appointment date.");
      return;
    }

    const whatsappNumber = "91XXXXXXXXXX"; // Replace with actual WhatsApp number

    const whatsappMessage = `
Hello Bloom Beauty Parlour!

I want to book an appointment.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Service: ${service}
Date: ${date}
Time: ${time}
Message: ${message || "No additional message"}

Please confirm my appointment.
`;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
  });
}


/* PREVENT PAST APPOINTMENT DATES */

const appointmentDate = document.getElementById("date");

if (appointmentDate) {
  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  appointmentDate.min = localToday;
}

/* APPOINTMENT BOOKING */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

  const bookingDate = document.getElementById("bookingDate");

  // Prevent past dates
  const today = new Date();

  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  bookingDate.min = localToday;

  bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const service = document.getElementById("bookingService").value;
    const date = bookingDate.value;
    const time = document.getElementById("bookingTime").value;
    const message = document.getElementById("bookingMessage").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!name || !service || !date || !time) {
      alert("Please fill all required fields.");
      return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      alert("Please select today or a future date.");
      return;
    }

    // Replace with your actual WhatsApp number
    const whatsappNumber = "91XXXXXXXXXX";

    const whatsappMessage = `
Hello Bloom Beauty Parlour!

I would like to book an appointment.

Customer Details:
Name: ${name}
Mobile: ${phone}
Email: ${email || "Not provided"}

Appointment Details:
Service: ${service}
Date: ${date}
Time: ${time}

Additional Requirements:
${message || "No additional requirements"}

Please confirm my appointment.

Thank you!
`;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");

  });
}
