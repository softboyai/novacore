# NovaCore Hub - Frontend Only

A modern, responsive website for NovaCore Hub - Rwanda's digital innovation hub for students and businesses.

## Overview

NovaCore Hub is a digital innovation center located in Sonatube, former UTB, Kigali. This website showcases our programs, services, and provides application forms for students and sponsors.

## Features

- 🎨 Modern, responsive design with glassmorphism effects
- 📱 Mobile-first approach with Tailwind CSS
- 📝 Student application form (Google Forms integration)
- 🤝 Sponsor application form (Google Forms integration)
- 📧 Contact form
- 🎯 SEO optimized with structured data
- ⚡ Fast loading with optimized assets

## Project Structure

```
novacore/
├── index.html              # Main website file
├── css/
│   └── style.css          # Custom styles and Tailwind CSS
├── images/                # Website images and logos
├── js/
│   └── main.js           # JavaScript functionality
├── GOOGLE_FORMS_SETUP.md # Setup instructions for Google Forms
└── README.md             # This file
```

## Setup Instructions

### 1. Clone or Download
Download this project to your local machine.

### 2. Set Up Google Forms
Follow the detailed instructions in `GOOGLE_FORMS_SETUP.md` to:
- Create Google Forms for student and sponsor applications
- Configure form fields
- Update the form URLs in `index.html`

### 3. Host the Website
You can host this website on any static hosting service:

**Free Options:**
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

**Paid Options:**
- Any web hosting service that supports static files

### 4. Local Development
To view the website locally:
1. Open `index.html` in your web browser
2. Or use a local server like Live Server (VS Code extension)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and animations
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Form validation and interactions
- **Google Forms** - Backend form processing

## Key Sections

1. **Hero Section** - Main introduction and call-to-action
2. **About** - Information about NovaCore Hub
3. **Programs** - Available training programs
4. **How It Works** - Process explanation
5. **Business Services** - Services for businesses
6. **Testimonials** - Student and partner feedback
7. **Sponsor Us** - Sponsorship opportunities
8. **Contact** - Contact information and form

## Form Integration

The website uses Google Forms for data collection, which provides:
- Automatic data storage in Google Sheets
- Email notifications for new submissions
- No server maintenance required
- Cost-effective solution

## Customization

### Colors and Branding
Edit the CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #1e40af;
  --secondary-color: #3b82f6;
  /* ... other variables */
}
```

### Content Updates
- Edit text content directly in `index.html`
- Update images in the `images/` folder
- Modify form fields as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images
- Minified CSS
- Fast loading times
- Mobile responsive

## License

This project is proprietary to NovaCore Hub.

## Contact

For questions or support:
- Email: novacorehubltd@gmail.com
- Location: Sonatube, former UTB, Kigali, Rwanda

---

**NovaCore Hub** - Empowering Rwanda's digital future through hands-on training and real-world projects.
