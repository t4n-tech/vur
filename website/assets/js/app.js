document.addEventListener('DOMContentLoaded', async () => {
    // Cek apakah kita di halaman index atau package
    if (document.getElementById('packageList')) {
        initSearchPage();
    }
});

let allPackages = [];

async function initSearchPage() {
    try {
        // Fetch data package
        const res = await fetch('packages.json');
        allPackages = await res.json();
        
        // Setup Event Listeners
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const sortSelect = document.getElementById('sortSelect');

        searchInput.addEventListener('input', () => renderPackages());
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderPackages();
            });
        });

        sortSelect.addEventListener('change', () => renderPackages());

        // Initial Render
        renderPackages();

    } catch (error) {
        document.getElementById('packageList').innerHTML = `
            <div class="error">
                Failed to load package list.<br>
                Ensure <code>packages.json</code> exists.
            </div>`;
        console.error(error);
    }
}

function renderPackages() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const activeCat = document.querySelector('.filter-btn.active').dataset.cat;
    const sortMode = document.getElementById('sortSelect').value;
    const listEl = document.getElementById('packageList');
    const countEl = document.getElementById('resultCount');

    // 1. Filter
    let filtered = allPackages.filter(pkg => {
        const matchesSearch = pkg.name.toLowerCase().includes(searchInput) || 
                              pkg.short_desc.toLowerCase().includes(searchInput);
        const matchesCat = activeCat === 'all' || pkg.category === activeCat;
        return matchesSearch && matchesCat;
    });

    // 2. Sort
    filtered.sort((a, b) => {
        if (sortMode === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortMode === 'updated') {
            return new Date(b.last_updated) - new Date(a.last_updated);
        }
    });

    // 3. Update UI
    countEl.textContent = `${filtered.length} packages found`;
    listEl.innerHTML = '';

    if (filtered.length === 0) {
        listEl.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No packages found.</div>';
        return;
    }

    filtered.forEach(pkg => {
        const date = new Date(pkg.last_updated).toLocaleDateString();
        const card = document.createElement('div');
        card.className = 'pkg-card';
        card.onclick = () => window.location.href = `package.html?pkg=${pkg.name}`;
        
        card.innerHTML = `
            <div class="pkg-header">
                <span class="pkg-name">${pkg.name}</span>
                <span class="badge ${pkg.category}">${pkg.category}</span>
            </div>
            <div class="pkg-desc">${pkg.short_desc}</div>
            <div class="pkg-meta">
                <span>${pkg.version}</span>
                <span>Updated: ${date}</span>
            </div>
        `;
        listEl.appendChild(card);
    });
}