let slides = [], dots = [], currentIndex = 0;

// Load JSON
fetch("characters.json")
    .then(res => res.json())
    .then(data => {
        const slidesContainer = document.getElementById("slides");
        const dotsContainer = document.getElementById("dots");

        data.forEach((char, i) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (i === 0) slide.classList.add("active");
            slide.innerHTML = `
            <div class="icon">${char.icon}</div>
            <div class="name">${char.name}</div>
            <div class="age">Lived: ${char.age}</div>
            <div class="story">${char.story}</div>
          `;
            slidesContainer.appendChild(slide);

            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        slides = document.querySelectorAll(".slide");
        dots = document.querySelectorAll(".dot");
    });

function showSlide(index) {
    slides.forEach((s, i) => { s.classList.remove("active"); dots[i].classList.remove("active"); });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    showSlide(currentIndex);
}

document.getElementById("prev").addEventListener("click", () => goToSlide(currentIndex - 1));
document.getElementById("next").addEventListener("click", () => goToSlide(currentIndex + 1));

// Auto-play
setInterval(() => { if (slides.length) goToSlide(currentIndex + 1); }, 5000);
