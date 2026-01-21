# Content Management System (CMS)

This portfolio site now includes a simple JSON-based CMS for managing case studies and writing content.

## How It Works

The CMS uses JSON files stored in the `data/` directory to manage content dynamically:

- `data/projects.json` - Contains case studies/projects
- `data/writing.json` - Contains blog posts/essays

Content is loaded via Vue.js and displayed dynamically on the main site.

## File Structure

```
data/
├── projects.json    # Case studies and projects
└── writing.json     # Blog posts and essays

assets/js/
└── cms.js          # CMS functionality

admin.html          # Admin interface
```

## Using the CMS

### Option 1: Direct JSON Editing (Recommended)

1. **Edit Projects**: Open `data/projects.json` and add/edit project entries
2. **Edit Writing**: Open `data/writing.json` and add/edit writing entries

Each entry should follow this format:

**Projects:**
```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Brief description of the project",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "link": "https://link-to-case-study",
  "featured": true
}
```

**Writing:**
```json
{
  "id": "unique-post-id",
  "title": "Post Title",
  "description": "Brief description of the post",
  "link": "https://link-to-post",
  "published": "2024-01-15",
  "featured": true
}
```

### Option 2: Admin Interface

1. Open `admin.html` in your browser
2. Use the tabs to switch between Projects and Writing
3. Add new content using the forms
4. Edit or delete existing content

**Note:** The admin interface currently saves to localStorage. For production use, you'd need to implement server-side saving.

### Option 3: Command Line Interface

Use the included CLI tool for quick content management:

```bash
# Add a new project
node cms-cli.js add project "My Project" "Project description" "Tableau,SQL,Python" "https://link"

# Add a new blog post
node cms-cli.js add post "My Article" "Article description" "https://medium.com/link"

# List all projects
node cms-cli.js list projects

# List all posts
node cms-cli.js list posts
```

## Adding New Content

### Adding a Project

1. Open `data/projects.json`
2. Add a new object to the array:

```json
{
  "id": "my-new-project",
  "title": "My Amazing Project",
  "description": "This project revolutionized how we handle data analytics.",
  "technologies": ["Tableau", "Python", "Machine Learning"],
  "link": "#",
  "featured": true
}
```

### Adding a Writing Post

1. Open `data/writing.json`
2. Add a new object to the array:

```json
{
  "id": "my-new-post",
  "title": "The Future of Data Visualization",
  "description": "Exploring emerging trends in data visualization and their impact on business intelligence.",
  "link": "#",
  "published": "2024-03-01",
  "featured": true
}
```

## Deployment

Since this is a static site, the JSON files will be served directly. Make sure the `data/` directory is included in your deployment.

## Future Enhancements

For a more robust CMS, consider:

1. **Headless CMS**: Contentful, Strapi, or Sanity
2. **Static Site CMS**: Netlify CMS or Forestry
3. **Git-based CMS**: TinaCMS
4. **Server-side saving**: Implement API endpoints to save changes

## Security Note

The current admin interface is for local development. In production, you'd want to add authentication and proper server-side data persistence.