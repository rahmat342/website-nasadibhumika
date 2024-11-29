// data array
const images = [
  {
    src: "/gallery/images/gambar 1.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 34.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 3.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 4.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 6.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 7.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/videos/vidio 1.mp4",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/videos/vidio 2.mp4",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/videos/vidio 3.mp4",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/videos/vidio 4.mp4",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 12.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 23.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 14.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 25.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 20.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/img 10.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 31.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 32.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 29.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 9.jpeg",
    alt: "",
    title: "",
    category: "",
  },
  {
    src: "./gallery/images/gambar 11.jpeg",
    alt: "",
    title: "",
    category: "",
  },
];

// function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function to get the current page type
function getPageType() {
  const path = window.location.pathname;
  if (path.includes("wedding.html")) {
    return "wedding";
  } else if (path.includes("travel.html")) {
    return "travel";
  } else if (path.includes("cinematic.html")) {
    return "cinematic";
  } else {
    return "all";
  }
}

// function to filter images based on category
function filterImages(images, category) {
  if (category === "all") return images;
  return images.filter((image) =>
    image.category
      .split(".")
      .map((c) => c.trim())
      .includes(category)
  );
}

// get current page type
const pageType = getPageType();

// Filter images based on page type
const filteredImages = filterImages(images, pageType);

// shuffled filtered images
const shuffledFilteredImages = shuffleArray(filteredImages);

// get the container element
const container = document.getElementById("card-container");

// Create and append card elements
shuffledFilteredImages.forEach((items) => {
  // Create card element
  const card = document.createElement("div");
  card.classList.add("card");

  let video;

  // Check if the item is an image or video
  if (items.src.endsWith("mp4")) {
    // Create video element
    video = document.createElement("video");
    const videoIcon = document.createElement("i");
    videoIcon.classList.add("ai-video");
    video.src = items.src;
    video.alt = items.alt;
    video.muted = true;

    card.appendChild(video);
    card.appendChild(videoIcon);

    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
    });
  } else {
    // Create image element
    const img = document.createElement("img");
    img.src = items.src;
    img.alt = items.alt;

    // append image to card
    card.appendChild(img);
  }

  // Create title element
  const title = document.createElement("h5");
  title.textContent = items.title;

  // append title to card
  card.appendChild(title);

  container.appendChild(card);

  card.addEventListener("click", () => {
    openLightbox(items.src, items.title);
  });
});

// Get lightbox elements
const lightbox = document.getElementById("lightbox"),
  lightboxClose = document.getElementById("lightbox-close"),
  lightboxCntent = document.getElementById("lightbox-content");

// function to open lightbox
function openLightbox(src, title) {
  // clear previous content
  lightboxCntent.innerHTML = "";

  const titleText = document.createElement("h5");

  if (src.endsWith(".mp4")) {
    // create video element for lightbox
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;

    // append video element to lightbox
    lightboxCntent.appendChild(video);
  } else {
    // create image Element
    const img = document.createElement("img");
    img.src = src;
    img.alt = title;

    // append image to lightbox
    lightboxCntent.appendChild(img);
  }

  // set title
  titleText.textContent = title;
  lightboxCntent.appendChild(titleText);

  // display lightbox
  lightbox.style.display = "flex";
}

// function to close lightbox
lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// close lightbox when clicking outside of the content

lightbox.addEventListener("click", (e) => {
  const video = lightboxCntent.querySelector("video");

  // if a video element is found, pause the video
  if (video) {
    video.pause();
  }
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
