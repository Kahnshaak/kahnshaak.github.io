$.getJSON("resume.json").done(function(json){
  displayFromJSON(json);
})
.fail(function() {
    console.log("resume.json not found");
  });

function collapseText(el){
  const $el = $(el);
  if ($el.hasClass("hidden")) {
    $el.removeClass("hidden");
  } else {
    $el.addClass("hidden");
  }
}

//Populate Resume Data
function displayFromJSON(resume){

  // Introduction
  // $("#intro").text(resume.introduction);

  // Personal info
  $("#name").text(resume.personalInfo.name.toUpperCase());
  $("#linkedin").attr("href", resume.personalInfo.linkedin);
  const shortLinkedin = resume.personalInfo.linkedin.split(".com")[1] || resume.personalInfo.linkedin;
  $("#linkedin").text(shortLinkedin);
  $("#phone").text(resume.personalInfo.phone);
  // $("#email").attr("href", `mailto:${resume.personalInfo.email}`);
  // $("#email").text(resume.personalInfo.email);

  //Education
  const educationContainer = $("#education");
  const educationList = $("<ul>");
  resume.education.forEach(element => {
    const educ = $("<li>").text(element);
    educ.attr("class", "p pl-4 ");
    educationList.append(educ);
  });
  educationContainer.append(educationList);

  //Projects
  const projectList = $("#projects");
  resume.projects.forEach(element =>{
    const project = $("<div>");
    const title = $("<h4>").text(element.title);
    title.attr("onclick", "collapseText(this.nextElementSibling)");
    title.attr("class", "title");
    const description = $("<div>").text(element.description);
    description.attr("class", "hidden pl-4 pb-3 font-serif");
    project.append(title);
    project.append(description);
    projectList.append(project);
  });

  //Jobs
  const jobsList = $("#work");
  resume.jobs.forEach(element =>{
    const job = $("<div>");
    const title = $("<h4>").text(`${element.title} - ${element.company}`);
    title.attr("onclick", "collapseText(this.nextElementSibling)");
    title.attr("class", "title");
    const jobContainer = $("<div>");
    const time = $("<div>").text(element.time);
    time.attr("class", "p pl-10 italic");
    const description = $("<div>").text(element.description);
    description.attr("class", "p pl-4 ");
    job.append(title);
    jobContainer.append(time, description);
    jobContainer.attr("class", "hidden pb-3 font-serif");
    job.append(jobContainer);
    jobsList.append(job);
  });

  //Skills
  const skillsList = $("#skills");
  const skillsContainer = $("<div>");
  resume.skills.forEach(element => {
    const skill = $("<div>");
    const category = $("<div>").text(element.category);
    category.attr("class", "title");
    category.attr("onclick", "collapseText(this.nextElementSibling)");
    skill.append(category);
    const skillContainer = $("<div>");
    skillContainer.attr("class", "p pl-4 pb-3 font-serif")
    element.sk.forEach(e => {
      skillContainer.append($("<div>").text(e));
    })
    skill.append(skillContainer);
    skillsContainer.append(skill);
  });
  skillsList.append(skillsContainer);

  //Languages
  const languageContainer = $("#languages");
  const languagesList = $("<ul>");
  resume.languages.forEach(element => {
    const lang = $("<li>").text(element);
    lang.attr("class", "p pl-4  font-serif");
    languagesList.append(lang);
  });
  languagesContainer.append(languagesList);

  //Coursework
  const courseContainer = $("#coursework")
  const courseList = $("<ul>");
  resume.coursework.forEach(element => {
    const course = $("<li>").text(element);
    course.attr("class", "p pl-4  font-serif");
    courseList.append(course);
  });
  courseworkContainer.append(courseList);

  //Hobbies
  const hobbiesContainer = $("#hobbies")
  const hobbiesList = $("<div>");
  resume.hobbies.forEach(element => {
    const hobby = $("<div>");
    const title = $("<div>").text(element.activity);
    title.attr("class", "title");
    title.attr("onclick", "collapseText(this.nextElementSibling)");
    const note = $("<div>").text(element.note);
    note.attr("class", "hidden pl-4 pb-3 font-serif")
    hobby.append(title);
    hobby.append(note);
    hobbiesList.append(hobby);
  });
  hobbiesContainer.append(hobbiesList);
  // let hobbiesString = resume.hobbies[0];
  // for(let i = 1; i < resume.hobbies.length; i++) hobbiesString += `, ${resume.hobbies[i]}`;
  // $("#hobbies").text(hobbiesString);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if savedTheme == 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
  document.documentElement.classList.remove('dark');
  }
}

initializeTheme();

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

