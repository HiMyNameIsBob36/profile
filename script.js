let appDatabase = [];
let isHome = true;
const screen = document.getElementById('screen-container');

// Load Data
async function loadApps() {
    try {
        const response = await fetch('apps.json');
        appDatabase = await response.json();
        renderHome();
    } catch (err) {
        console.error("Error loading apps.json. Ensure you are using a local server!", err);
    }
}

// Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = time;
}
setInterval(updateClock, 1000);
updateClock();

// Home Render
function renderHome() {
    isHome = true;
    let html = '<div class="grid">';
    appDatabase.forEach(app => {
        html += `
            <div class="app-icon" onclick="openApp('${app.id}')">
                <img src="${app.icon}" alt="${app.name}">
            </div>
        `;
    });
    html += '</div>';
    screen.innerHTML = html;
}

// App Render
function openApp(id) {
    isHome = false;
    const app = appDatabase.find(a => a.id === id);
    
    if (app.isSettings) {
        renderSettings();
        return;
    }

    const linksHtml = app.links.map(l => `<a href="${l.url}" target="_blank" class="pill-btn">${l.label}</a>`).join('');

    screen.innerHTML = `
        <div class="app-view" id="activeApp">
            <div class="app-header">
                <div class="header-text">
                    <h2>${app.name}</h2>
                    <p>${app.year || ''}</p>
                </div>
                <img src="${app.icon}" class="header-logo">
            </div>
            <hr>
            <div class="app-description">${app.description}</div>
            <div class="btn-list">
            <hr>${linksHtml}</div>
        </div>
    `;
}

function renderSettings() {
    screen.innerHTML = `
        <div class="app-view" id="activeApp">
            <div class="app-header">
                <div class="header-text"><h2>Settings</h2><p>System</p></div>
            </div>
            <div class="app-description">Select a background color for the site:</div>
            <div class="btn-list">
                <button class="pill-btn" onclick="changeTheme('#245215')">Forest Green</button>
                <button class="pill-btn" onclick="changeTheme('#1a1a1a')">Deep Onyx</button>
                <button class="pill-btn" onclick="changeTheme('#1b2743')">Midnight Blue</button>
            </div>
        </div>
    `;
}

window.changeTheme = (color) => {
    document.documentElement.style.setProperty('--bg-outside', color);
    document.documentElement.style.setProperty('--btn-color', color);
};

// Home Button Logic
document.getElementById('homeBtn').addEventListener('click', () => {
    if (isHome) return; // Prevent flashing icons if already home

    const activeApp = document.getElementById('activeApp');
    if (activeApp) {
        activeApp.classList.add('closing');
        setTimeout(() => {
            renderHome();
        }, 300);
    }
});

loadApps();
