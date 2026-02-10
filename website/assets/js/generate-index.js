// generate-index.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Konfigurasi
const REPO_PATH = path.join(__dirname, 'vur'); // Path ke clone repo VUR lokal
const OUTPUT_FILE = path.join(__dirname, 'data', 'packages.json');
const CATEGORIES = ['core', 'extra', 'multilib'];

let allPackages = [];

// Fungsi parse template Void Linux
function parseTemplate(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const data = {};

        lines.forEach(line => {
            // Regex untuk mencari variable="value"
            const match = line.match(/^(\w+)="(.*)"$/);
            if (match) {
                data[match[1]] = match[2];
            }
        });
        return data;
    } catch (e) {
        return null;
    }
}

CATEGORIES.forEach(cat => {
    const catPath = path.join(REPO_PATH, cat);
    if (!fs.existsSync(catPath)) return;

    const packages = fs.readdirSync(catPath);

    packages.forEach(pkgName => {
        const templatePath = path.join(catPath, pkgName, 'template');
        
        if (fs.existsSync(templatePath)) {
            const meta = parseTemplate(templatePath);
            
            // Ambil timestamp file terakhir (sebagai proxy 'Last Updated')
            const stats = fs.statSync(templatePath);
            const lastUpdated = stats.mtime;

            if (meta && meta.pkgname) {
                allPackages.push({
                    name: meta.pkgname,
                    version: meta.version || 'unknown',
                    short_desc: meta.short_desc || 'No description',
                    maintainer: meta.maintainer || 'unknown',
                    license: meta.license || '-',
                    category: cat,
                    // URL ke folder package di Github
                    repository: `https://github.com/t4n-tech/vur/tree/master/${cat}/${meta.pkgname}`,
                    lastUpdated: lastUpdated
                });
            }
        }
    });
});

// Sorting default berdasarkan nama
allPackages.sort((a, b) => a.name.localeCompare(b.name));

// Tulis ke JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPackages, null, 2));
console.log(`Generated ${OUTPUT_FILE} with ${allPackages.length} packages.`);