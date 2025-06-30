document.addEventListener('DOMContentLoaded', () => {
  // Load data from LocalStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || {
    name: 'Dennis Wanjiku',
    about: [
      "I'm a fourth-year student at Strathmore University pursuing a Bachelor's in Informatics and Computer Science. I specialize in web development with Laravel, Next.js, and React Native, and I'm an upcoming AI/ML engineer passionate about designing algorithms to solve real-world problems.",
      "I interned at Bityarn Consult as a Software Engineer, working with Laravel, Vue.js, and Docker. I lead the Feedback Committee in Strathmore's 16th Student Council Academic Docket and contribute to the SCESA media team as a videographer and editor using Adobe Premiere Pro and CapCut.",
      "My passions include learning, community engagement, and creating user-friendly UI/UX designs, IoT solutions, and database management systems."
    ],
    skills: [
      'Laravel', 'Next.js', 'React Native', 'Vue.js', 'Docker',
      'AI/ML', 'UI/UX Design', 'Database Management', 'IoT',
      'Algorithm Design', 'Video Editing (Adobe Premiere Pro, CapCut)'
    ]
  };
  let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [
    {
      title: 'Task Management System',
      description: 'A system to allocate tasks, subtasks, and real-time alerts using Windows cronjobs.',
      image: '',
      link: ''
    },
    {
      title: 'News Aggregator',
      description: 'Fetches news from APIs (CNN, BBC, Al Jazeera) using Flask.',
      image: '',
      link: ''
    },
    {
      title: 'Smart Attendance System',
      description: 'Facial recognition-based attendance system with Laravel backend and LMS integration.',
      image: '',
      link: ''
    },
    {
      title: 'Rental Management System',
      description: 'Platform for house advertising and landlord management with financial analysis.',
      image: '',
      link: ''
    },
    {
      title: 'AI Code Editor',
      description: 'An editor suggesting code and ideas during development.',
      image: '',
      link: ''
    },
    {
      title: 'Civilizations Video Project',
      description: 'Video explaining Egypt and Mesopotamia civilizations for Multimedia Systems unit.',
      image: '',
      link: ''
    }
  ];
  const customSections = JSON.parse(localStorage.getItem('customSections')) || [];

  // Render user name
  document.getElementById('user-name').textContent = userData.name;
  document.getElementById('hero-name').textContent = userData.name;

  // Render about section
  const aboutContent = document.getElementById('about-content');
  aboutContent.innerHTML = userData.about.map(paragraph => `<p>${paragraph}</p>`).join('');

  // Render skills
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = userData.skills.map(skill => `<div class="skill-card">${skill}</div>`).join('');

  // Render projects
  const projectsGrid = document.getElementById('projects-grid');
  function renderProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Render custom sections
  const customSectionsContainer = document.getElementById('custom-sections');
  customSections.forEach(section => {
    const sectionElement = document.createElement('section');
    sectionElement.className = 'section';
    sectionElement.innerHTML = `
      <div class="container">
        <h2>${section.title}</h2>
        <div>${section.content}</div>
      </div>
    `;
    customSectionsContainer.appendChild(sectionElement);
  });

  renderProjects();
});