// Simple CMS for Projects and Writing
// Load JSON data and populate Vue apps

document.addEventListener('DOMContentLoaded', function() {
    // Load Projects
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            new Vue({
                el: '#projects-app',
                data: {
                    projects: data
                }
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            // Fallback: show message if JSON fails to load
            document.getElementById('projects-app').innerHTML = '<p>Projects loading...</p>';
        });

    // Load Writing
    fetch('data/writing.json')
        .then(response => response.json())
        .then(data => {
            new Vue({
                el: '#writing-app',
                data: {
                    writing: data
                }
            });
        })
        .catch(error => {
            console.error('Error loading writing:', error);
            // Fallback: show message if JSON fails to load
            document.getElementById('writing-app').innerHTML = '<p>Writing loading...</p>';
        });
});

// CMS Admin Functions (for future use)
window.CMS = {
    // Function to add new project
    addProject: function(project) {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(data => {
                data.push(project);
                console.log('Project added:', project);
                // In a real CMS, this would save to the server
                // For now, just log to console
            });
    },

    // Function to add new writing
    addWriting: function(post) {
        fetch('data/writing.json')
            .then(response => response.json())
            .then(data => {
                data.push(post);
                console.log('Writing added:', post);
                // In a real CMS, this would save to the server
            });
    }
};