// Sanitize user input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Populate Page with Content
document.getElementById("page-title").textContent = `${siteContent.pilotName} | Portfolio`;
document.getElementById("tagline").textContent = siteContent.tagline;
document.getElementById("about-heading").textContent = siteContent.about.heading;
document.getElementById("about-description").textContent = siteContent.about.description;
document.getElementById("projects-heading").textContent = siteContent.projects.heading;
document.getElementById("contact-heading").textContent = siteContent.contact.heading;
document.getElementById("telegram-label").textContent = siteContent.contact.telegramLabel;
document.getElementById("telegram-link").textContent = siteContent.contact.telegram;
document.getElementById("telegram-link").href = siteContent.contact.telegram;
document.getElementById("contact-button").textContent = siteContent.contact.buttonText;
document.getElementById("transmission-heading").textContent = siteContent.transmission.heading;
document.getElementById("message-input").placeholder = siteContent.transmission.placeholder;
document.getElementById("send-btn").textContent = siteContent.transmission.sendButton;
document.getElementById("clear-log-btn").textContent = siteContent.transmission.clearButton;

// Contact button opens Telegram
document.getElementById("contact-button").addEventListener("click", () => {
    window.open(siteContent.contact.telegram, "_blank");
});

// Dynamically Populate Projects
const projectGrid = document.getElementById("project-grid");
siteContent.projects.items.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.tabIndex = 0;
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title} thumbnail" style="max-width: 100%; border-radius: 5px;">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Launch</a>
    `;
    projectCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            window.open(project.link, '_blank');
        }
    });
    projectGrid.appendChild(projectCard);
});

// Typing Effect
const text = `Hello I'm ${siteContent.pilotName}`;
const typingElement = document.querySelector(".typing-effect");
let i = 0;

function type() {
    if (i === 0) typingElement.textContent = "";
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, siteConfig.animations.typingSpeed);
    } else {
        typingElement.style.borderRight = "none";
    }
}
type();

// Section Transitions
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.1 }
);
sections.forEach((section) => observer.observe(section));

// Comet-Like Stars
const cometCanvas = document.getElementById("comet-canvas");
const cometCtx = cometCanvas.getContext("2d");
let comets = [];
let animationsEnabled = true;

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas(cometCanvas);

// Throttle resize events
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas(cometCanvas);
        resizeCanvas(particleCanvas);
    }, 100);
});

function createComet() {
    const edge = Math.floor(Math.random() * 4);
    let x, y, dx, dy;
    switch (edge) {
        case 0:
            x = Math.random() * cometCanvas.width;
            y = -10;
            dx = (Math.random() - 0.5) * 2;
            dy = Math.random() * 2 + 1;
            break;
        case 1:
            x = cometCanvas.width + 10;
            y = Math.random() * cometCanvas.height;
            dx = -(Math.random() * 2 + 1);
            dy = (Math.random() - 0.5) * 2;
            break;
        case 2:
            x = Math.random() * cometCanvas.width;
            y = cometCanvas.height + 10;
            dx = (Math.random() - 0.5) * 2;
            dy = -(Math.random() * 2 + 1);
            break;
        case 3:
            x = -10;
            y = Math.random() * cometCanvas.height;
            dx = Math.random() * 2 + 1;
            dy = (Math.random() - 0.5) * 2;
            break;
    }
    return {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        size: Math.random() * 3 + 1,
        life: 100,
        tail: []
    };
}

function drawComet(comet) {
    comet.tail.push({ x: comet.x, y: comet.y });
    if (comet.tail.length > 10) comet.tail.shift();

    cometCtx.beginPath();
    cometCtx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
    cometCtx.fillStyle = `rgba(255, 255, 255, ${comet.life / 100})`;
    cometCtx.fill();

    cometCtx.beginPath();
    cometCtx.moveTo(comet.x, comet.y);
    for (let i = 0; i < comet.tail.length; i++) {
        const alpha = (i / comet.tail.length) * (comet.life / 100);
        cometCtx.lineTo(comet.tail[i].x, comet.tail[i].y);
        cometCtx.strokeStyle = `rgba(0, 255, 204, ${alpha})`;
        cometCtx.stroke();
    }
}

function animateComets() {
    if (!animationsEnabled) return;
    setTimeout(() => {
        cometCtx.clearRect(0, 0, cometCanvas.width, cometCanvas.height);
        if (Math.random() < siteConfig.animations.cometSpawnRate) comets.push(createComet());

        for (let i = comets.length - 1; i >= 0; i--) {
            let c = comets[i];
            drawComet(c);
            c.x += c.dx;
            c.y += c.dy;
            c.life--;

            if (c.life <= 0 || c.x < -20 || c.x > cometCanvas.width + 20 || c.y < -20 || c.y > cometCanvas.height + 20) {
                comets.splice(i, 1);
            }
        }
        requestAnimationFrame(animateComets);
    }, 16);
}
animateComets();

// Particle Effect (Mouse and Ambient)
const particleCanvas = document.getElementById("particle-canvas");
const particleCtx = particleCanvas.getContext("2d");
let particles = [];
const maxParticles = siteConfig.animations.particleMax;

resizeCanvas(particleCanvas);

function createParticle(x, y) {
    return {
        x: x,
        y: y,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        life: 50
    };
}

let lastParticleTime = 0;
document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 50 && particles.length < maxParticles) {
        particles.push(createParticle(e.clientX, e.clientY));
        lastParticleTime = now;
    }
});

function spawnAmbientParticle() {
    if (particles.length < maxParticles) {
        const x = Math.random() * particleCanvas.width;
        const y = Math.random() * particleCanvas.height;
        particles.push(createParticle(x, y));
    }
}

setInterval(() => {
    if (Math.random() < 0.3) spawnAmbientParticle();
}, 200);

function animateParticles() {
    if (!animationsEnabled) return;
    setTimeout(() => {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fillStyle = `rgba(0, 255, 204, ${p.life / 50})`;
            particleCtx.fill();

            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;

            if (p.life <= 0) particles.splice(i, 1);
        }
        requestAnimationFrame(animateParticles);
    }, 16);
}
animateParticles();

// Animation Toggle
const animationSwitch = document.getElementById("animation-switch");
animationSwitch.addEventListener("change", () => {
    animationsEnabled = animationSwitch.checked;
    cometCanvas.style.display = animationsEnabled ? "block" : "none";
    particleCanvas.style.display = animationsEnabled ? "block" : "none";
});

// Transmission Log
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const clearLogBtn = document.getElementById("clear-log-btn");
const messageLog = document.getElementById("message-log");

let messages = JSON.parse(localStorage.getItem("transmissions")) || [];
if (messages.length > 10) messages = messages.slice(-10);
if (messages.length === 0) {
    messageLog.innerHTML = "<p>[System]: No previous transmissions found.</p>";
} else {
    messages.forEach(msg => addMessage(msg));
}

sendBtn.addEventListener("click", async () => {
    const msg = sanitizeInput(messageInput.value.trim());
    if (msg) {
        addMessage(msg);
        messages.push(msg);
        if (messages.length > 10) messages.shift();
        localStorage.setItem("transmissions", JSON.stringify(messages));
        messageInput.value = "";

        // Send to Telegram via Vercel
        try {
            const response = await fetch('https://telegram-backend-5zlxci8dj-m9rezas-projects.vercel.app/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg }),
            });
            if (!response.ok) {
                console.error('Failed to send to Telegram:', response.statusText);
            } else {
                console.log('Message sent to Telegram successfully');
            }
        } catch (error) {
            console.error('Error sending to Telegram:', error);
        }
    }
});

clearLogBtn.addEventListener("click", () => {
    messages = [];
    localStorage.removeItem("transmissions");
    messageLog.innerHTML = "<p>[System]: Transmission log cleared.</p>";
});

function addMessage(msg) {
    const div = document.createElement("div");
    div.className = "message";
    const timestamp = new Date().toLocaleTimeString();
    div.textContent = `${siteContent.transmission.messagePrefix} [${timestamp}] ${msg}`;
    messageLog.appendChild(div);
    messageLog.scrollTop = messageLog.scrollHeight;
}
