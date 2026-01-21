#!/usr/bin/env node

// Simple CMS CLI Tool
// Usage: node cms-cli.js [command] [type] [options]

const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');
const WRITING_FILE = path.join(__dirname, 'data', 'writing.json');

function loadData(file) {
    if (!fs.existsSync(file)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveData(file, data) {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addProject(title, description, technologies, link = '#') {
    const projects = loadData(PROJECTS_FILE);
    const project = {
        id: generateId(),
        title,
        description,
        technologies: technologies.split(',').map(t => t.trim()),
        link,
        featured: true
    };
    projects.push(project);
    saveData(PROJECTS_FILE, projects);
    console.log('Project added:', project.title);
}

function addPost(title, description, link = '#') {
    const posts = loadData(WRITING_FILE);
    const post = {
        id: generateId(),
        title,
        description,
        link,
        published: new Date().toISOString().split('T')[0],
        featured: true
    };
    posts.push(post);
    saveData(WRITING_FILE, posts);
    console.log('Post added:', post.title);
}

function listProjects() {
    const projects = loadData(PROJECTS_FILE);
    console.log('Projects:');
    projects.forEach(p => console.log(`- ${p.title} (${p.id})`));
}

function listPosts() {
    const posts = loadData(WRITING_FILE);
    console.log('Posts:');
    posts.forEach(p => console.log(`- ${p.title} (${p.id})`));
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];
const type = args[1];

switch (command) {
    case 'add':
        if (type === 'project') {
            const title = args[2];
            const description = args[3];
            const technologies = args[4];
            const link = args[5] || '#';
            addProject(title, description, technologies, link);
        } else if (type === 'post') {
            const title = args[2];
            const description = args[3];
            const link = args[4] || '#';
            addPost(title, description, link);
        }
        break;
    case 'list':
        if (type === 'projects') {
            listProjects();
        } else if (type === 'posts') {
            listPosts();
        }
        break;
    default:
        console.log('Usage:');
        console.log('  node cms-cli.js add project "Title" "Description" "Tech1,Tech2" [link]');
        console.log('  node cms-cli.js add post "Title" "Description" [link]');
        console.log('  node cms-cli.js list projects');
        console.log('  node cms-cli.js list posts');
}