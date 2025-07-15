document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('user-form');
  const skillForm = document.getElementById('skill-form');
  const projectForm = document.getElementById('project-form');
  const sectionForm = document.getElementById('section-form');
  const skillsList = document.getElementById('skills-list');
  const projectsGrid = document.getElementById('projects-grid');
  const sectionsList = document.getElementById('sections-list');

  // Load data from LocalStorage
  let userData = JSON.parse(localStorage.getItem('userData')) || {
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
  let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
  let customSections = JSON.parse(localStorage.getItem('customSections')) || [];

  // Populate user form
  document.getElementById('user-name').value = userData.name;
  document.getElementById('about').value = userData.about.join('\n');

  // Render skills
  function renderSkills() {
    skillsList.innerHTML = '';
    userData.skills.forEach((skill, index) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <p>${skill}</p>
        <button class="btn btn-delete" data-index="${index}">Delete</button>
      `;
      skillsList.appendChild(card);
    });

    // Add delete event listeners
    document.querySelectorAll('.skill-card .btn-delete').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        userData.skills.splice(index, 1);
        localStorage.setItem('userData', JSON.stringify(userData));
        renderSkills();
      });
    });
  }

  // Render projects
  function renderProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
        <button class="btn btn-edit" data-index="${index}">Edit</button>
        <button class="btn btn-delete" data-index="${index}">Delete</button>
      `;
      projectsGrid.appendChild(card);
    });

    // Add event listeners for edit and delete
    document.querySelectorAll('.btn-edit').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        const project = projects[index];
        document.getElementById('title').value = project.title;
        document.getElementById('description').value = project.description;
        document.getElementById('link').value = project.link;
        document.getElementById('image').value = '';
        projects.splice(index, 1);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        renderProjects();
      });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        projects.splice(index, 1);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        renderProjects();
      });
    });
  }

  // Render custom sections
  function renderSections() {
    sectionsList.innerHTML = '';
    customSections.forEach((section, index) => {
      const card = document.createElement('div');
      card.className = 'section-card';
      card.innerHTML = `
        <h3>${section.title}</h3>
        <p>${section.content}</p>
        <button class="btn btn-edit" data-index="${index}">Edit</button>
        <button class="btn btn-delete" data-index="${index}">Delete</button>
      `;
      sectionsList.appendChild(card);
    });

    // Add event listeners for edit and delete
    document.querySelectorAll('.section-card .btn-edit').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        const section = customSections[index];
        document.getElementById('section-title').value = section.title;
        document.getElementById('section-content').value = section.content;
        customSections.splice(index, 1);
        localStorage.setItem('customSections', JSON.stringify(customSections));
        renderSections();
      });
    });

    document.querySelectorAll('.section-card .btn-delete').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        customSections.splice(index, 1);
        localStorage.setItem('customSections', JSON.stringify(customSections));
        renderSections();
      });
    });
  }

  // Handle user form submission
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userData.name = document.getElementById('user-name').value;
    userData.about = document.getElementById('about').value.split('\n').filter(p => p.trim());
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('User info updated!');
  });

  // Handle skill form submission
  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const skill = document.getElementById('skill').value;
    userData.skills.push(skill);
    localStorage.setItem('userData', JSON.stringify(userData));
    renderSkills();
    skillForm.reset();
  });

  // Handle project form submission
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    const newProject = { title, description, link };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        newProject.image = reader.result;
        projects.push(newProject);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        renderProjects();
        projectForm.reset();
      };
      reader.readAsDataURL(imageFile);
    } else {
      projects.push(newProject);
      localStorage.setItem('portfolioProjects', JSON.stringify(projects));
      renderProjects();
      projectForm.reset();
    }
  });

  // Handle section form submission
  sectionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('section-title').value;
    const content = document.getElementById('section-content').value;
    customSections.push({ title, content });
    localStorage.setItem('customSections', JSON.stringify(customSections));
    renderSections();
    sectionForm.reset();
  });

  renderSkills();
  renderProjects();
  renderSections();
});