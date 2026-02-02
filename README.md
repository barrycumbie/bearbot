# bearbot 🐻🤖 - CIS 376 Web Development Learning App

A comprehensive web development learning application built for CIS 376 Spring 2026. This app demonstrates modern web development practices with Bootstrap 5, responsive design, session management, and dynamic content filtering.

## 🌟 Features

- **Responsive Design**: Mobile-first Bootstrap 5 layout
- **Dynamic Content**: JSON-driven learning cards with search and filtering
- **Authentication**: Login system with session storage
- **Interactive Search**: Real-time content filtering and grid/list views
- **Data Management**: Session storage visualization and management
- **Modern UI**: Clean, accessible interface with Bootstrap components

## 🚀 Live Demo

- **Repository**: [bearbot on GitHub](https://github.com/barrycumbie/bearbot)
- **Live App**: [bearbot Web App](https://barrycumbie.github.io/bearbot/)

## 📱 User Story

As a CIS 376 student, I want to access learning resources through an intuitive web app that allows me to:
- Search through learning content by topic, difficulty, or tags
- Log in to access protected content areas
- Switch between grid and list views for better readability
- View and manage my session data
- Access external resources and documentation links

## 🏗️ Project Structure

```
bearbot/
├── index.html              # Main landing page
├── pages/
│   ├── content.html         # Dynamic learning content page
│   ├── login.html           # User authentication
│   ├── data.html            # Session data management
│   └── vanilla-login.html   # Legacy login page
├── scripts/
│   ├── app.js               # Main application logic
│   ├── login-script.js      # Authentication handling
│   ├── session.js           # Session management utilities
│   ├── data.js              # Data page functionality
│   └── content-data.json    # Learning content database
├── styles/
│   └── bear-style.css       # Custom styling (minimal)
└── docs/
    └── project-requirements.md
```

## 💻 Technical Implementation

### HTML5 Features
- Semantic HTML elements for accessibility
- Mobile-responsive design with Bootstrap 5
- Clean, organized structure with proper nesting
- Form validation and user input handling

### CSS & Styling
- **Bootstrap 5** for primary styling and components
- Custom CSS kept minimal for specific branding needs
- Responsive grid system and utility classes
- CSS custom properties for consistency

### JavaScript Functionality
- **ES6+** modern JavaScript features
- DOM manipulation and event handling
- Fetch API for JSON data loading
- Session storage for user state management
- Real-time search and filtering algorithms

### Code Example - Dynamic Content Loading

```javascript
// Load and render learning content dynamically
async function loadContentData() {
  try {
    const response = await fetch('./scripts/content-data.json');
    contentData = await response.json();
    filteredData = [...contentData];
    renderContentCards(filteredData);
    console.log('Loaded', contentData.length, 'content items');
  } catch (error) {
    console.error('Failed to load content data:', error);
  }
}
```

## 🔐 Authentication System

The login system demonstrates:
- Password validation (dev password: `lasagna`)
- Session storage management
- Page protection for authenticated routes
- User state persistence across pages

**Demo Credentials**: Username: `any` | Password: `lasagna`

## 📊 Validation & Accessibility

- **HTML5 Validation**: All pages pass W3C markup validation
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Responsive Testing**: Verified on mobile, tablet, and desktop
- **Cross-browser Compatibility**: Tested on Chrome, Firefox, Safari

## 🔗 External Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Course Calendar Wiki](https://github.com/barrycumbie/bearbot/wiki/Web-Dev-Course-Calendar)

## 👨‍💻 Author

**Barry Cumbie** - [GitHub Profile](https://github.com/barrycumbie)

### Attribution
- **Course**: CIS 376 Web Development, Spring 2026
- **Framework**: Bootstrap 5.0.2
- **Icons**: Bootstrap Icons 1.13.1
- **Hosting**: GitHub Pages

## 📈 Learning Objectives Demonstrated

✅ **Git & Version Control**: Repository management, branching, commits  
✅ **Responsive Design**: Mobile-first Bootstrap implementation  
✅ **JavaScript DOM**: Dynamic content rendering and user interaction  
✅ **Session Management**: User authentication and data persistence  
✅ **API Integration**: JSON data fetching and processing  
✅ **Modern Workflow**: ES6+, async/await, modular code structure  

---

*This project showcases practical web development skills including responsive design, JavaScript programming, and user experience design for educational content delivery.*
