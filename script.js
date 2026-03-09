let apps = [];
let currentView = 'home';
const screen = document.getElementById('screen-container');

// Fetch the JSON file
fetch('apps.json')
    .then(res => res.json())
    .then(data => {
        apps = data;
        renderHome();
    });

// Time Update
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

function renderHome() {
    if (currentView === 'home') return; // Don't flash if already home
    
    currentView = 'home';
    let html = '<div class="grid">';
    apps.forEach(app => {
        html += `
            <div class="app-icon" onclick="openApp('${app.id}')">
                <img src="${app.icon}">
            </div>
        `;
    });
    html += '</div>';
    screen.innerHTML = html;
}

function openApp(id) {
    const app = apps.find(a => a.id === id);
    currentView = 'app';
    
    if (app.isSettings) {
        renderSettings();
        return;
    }

    const linksHtml = app.links.map(l => `<a href="${l.url}" class="pill-btn">${l.label}</a>`).join('');

    screen.innerHTML = `
        <div class="app-view" id="activeApp">
            <div class="app-header">
                <div class="header-text">
                    <h2>${app.name}</h2>
                    <p>${app.year}</p>
                </div>
                <img src="${app.icon}" class="header-logo">
            </div>
            <div class="app-description">${app.description}</div>
            <div class="btn-list">${linksHtml}</div>
        </div>
    `;
}

function renderSettings() {
    screen.innerHTML = `
        <div class="app-view" id="activeApp">
            <h2>Settings</h2>
            <p>Background Color:</p>
            <div class="btn-list">
                <button class="pill-btn" onclick="setBg('#1b431c')">Forest Green</button>
                <button class="pill-btn" onclick="setBg('#1a1a1a')">Onyx Black</button>
                <button class="pill-btn" onclick="setBg('#431b1b')">Deep Red</button>
            </div>
        </div>
    `;
}

function setBg(color) {
    document.documentElement.style.setProperty('--bg-color', color);
}

// Home Button Click Logic
document.getElementById('homeBtn').addEventListener('click', () => {
    const activeApp = document.getElementById('activeApp');
    if (activeApp) {
        // Animation: "Rising down"
        activeApp.classList.add('closing');
        setTimeout(() => {
            renderHome();
        }, 350);
    } else {
        renderHome();
    }
});
