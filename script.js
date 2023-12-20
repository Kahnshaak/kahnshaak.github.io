$.getJSON("resume.json", function(json){
  displayFromJSON(json);
});

function collapseText(el){
  if ($(el).css("display") !== "none") {
    $(el).css("display", "none");
  } else {
    $(el).css("display", "block");
  }
}

//Populate Resume Data
function displayFromJSON(resume){

  // Introduction
  // $("#intro").text(resume.introduction);

  // Personal info
  $("#name").text(resume.personalInfo.name.toUpperCase());
  $("#linkedin").attr("href", resume.personalInfo.linkedin);
  const shortLinkedin = resume.personalInfo.linkedin.split(".com")[1];
  $("#linkedin").text(shortLinkedin);
  $("#phone").text(resume.personalInfo.phone);
  // $("#email").attr("href", `mailto:${resume.personalInfo.email}`);
  // $("#email").text(resume.personalInfo.email);

  //Education
  const educationList = $("#education").append("<ul>");
  resume.education.forEach(element => {
    const educ = $("<li>").text(element);
    educ.attr("class", "p pl-4 ");
    educationList.append(educ);
  });

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
  const skillsList = $("#skills").append($("<div>"));
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
    skillsList.append(skill);
  });

  //Languages
  const languagesList = $("#languages").append($("<ul>"));
  resume.languages.forEach(element => {
    const lang = $("<li>").text(element);
    lang.attr("class", "p pl-4  font-serif");
    languagesList.append(lang);
  });

  //Coursework
  const courseList = $("#coursework").append($("<ul>"));
  resume.coursework.forEach(element => {
    const course = $("<li>").text(element);
    course.attr("class", "p pl-4  font-serif");
    courseList.append(course);
  });

  //Hobbies
  const hobbiesList = $("#hobbies").append($("<div>"));
  resume.hobbies.forEach(element => {
    console.log(`${element.activity}`);
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
  // let hobbiesString = resume.hobbies[0];
  // for(let i = 1; i < resume.hobbies.length; i++) hobbiesString += `, ${resume.hobbies[i]}`;
  // $("#hobbies").text(hobbiesString);
}

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
// Whenever the user explicitly chooses light mode
localStorage.theme = 'light';

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark';

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme');
