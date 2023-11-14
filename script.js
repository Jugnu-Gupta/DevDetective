const container = document.querySelector('.wrapper');
const heading = document.querySelector('[data-heading]');
const username = document.querySelector('[data-username]');
const searchBox = document.querySelector('[data-searchBox]');
const userInfo = document.querySelector('[data-userInfo]');
const userStats = document.querySelector('[data-userStats]');
const searchInput = document.querySelector('[data-searchInp]');

const mode = document.querySelector('[data-mode]');
const modeIcon = document.querySelector('[data-modeIcon]');
let lightMode = true;

const white = "bg-white";
const textWhite = "text-white";
const lightGray = "bg-gray-50";
const dark = "bg-[#020617]";
const lightDark = "bg-[#0f172a]";
const darkShadow = "shadow-[#0f172a]";
const textBlue = "text-blue-900";
const sun = "fa-sun";
const moon = "fa-moon";

function switchMode(){
    if(lightMode){
        lightMode = false;
        container.classList.remove(lightGray);
        heading.classList.remove(textBlue);
        username.classList.remove(textBlue);
        searchBox.classList.remove(white);
        searchInput.classList.remove(white);
        userInfo.classList.remove(white);
        userStats.classList.remove(lightGray);
        modeIcon.classList.remove(moon);

        container.classList.add(dark);
        container.classList.add(textWhite);
        searchBox.classList.add(lightDark);
        searchInput.classList.add(lightDark);
        userInfo.classList.add(lightDark);
        userStats.classList.add(dark);
        modeIcon.classList.add(sun);
        modeIcon.classList.add(textWhite);
        mode.classList.add(textWhite);
        mode.innerHTML = "LIGHT";
    }
    else{
        lightMode = true;
        container.classList.remove(dark);
        container.classList.remove(textWhite);
        searchBox.classList.remove(lightDark);
        searchInput.classList.remove(lightDark);
        userInfo.classList.remove(lightDark);
        userStats.classList.remove(dark);
        modeIcon.classList.remove(sun);
        modeIcon.classList.remove(textWhite);
        mode.classList.remove(textWhite);
        
        heading.classList.add(textBlue);
        username.classList.add(textBlue);
        container.classList.add(lightGray);
        searchBox.classList.add(white);
        searchInput.classList.add(white);
        userInfo.classList.add(white);
        userStats.classList.add(lightGray);
        modeIcon.classList.add(moon);
        mode.innerHTML = "DARK";
    }
}

async function fetchUserGitHubInfo(){
    try{
        const username =  searchInput.value;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        if(data.message == "Not Found"){
            throw error();
        }
        renderUserGitHubInfo(data);
        console.log(data);
    }
    catch(e){
        alert("Not Found");
        return;
    }
}

function renderUserGitHubInfo(details){
    const userImg = document.querySelector('[data-userImg]');
    const JoiningDate = document.querySelector('[data-joiningDate]');
    const userEmail = document.querySelector('[data-email]');
    const bio = document.querySelector('[data-bio]');
    const repos = document.querySelector('[data-repos]');
    const followers = document.querySelector('[data-followers]');
    const following = document.querySelector('[data-following]');
    const location = document.querySelector('[data-location]');
    const github = document.querySelector('[data-github]');
    const linkedin = document.querySelector('[data-linkedin]');
    const company = document.querySelector('[data-company]');

    // update information.
    userImg.src = details.avatar_url;
    username.innerHTML = details.name;
    const date = Date(details.created_at).split(' ');
    JoiningDate.innerHTML = "Joined " + date[2] + " " + date[1] + " " + date[3];

    userEmail.innerHTML = "@" + details.login;
    if(details.email==null) userEmail.href = "#";
    else userEmail.href = details.email;

    userEmail.innerHTML = details.name;
    if(details.bio==null) bio.innerHTML = "Not Available";
    else bio.innerHTML = details.bio;
    
    repos.innerHTML = details.public_repos;
    followers.innerHTML = details.followers;
    following.innerHTML = details.following;
    
    if(details.location==null) location.innerHTML = "Not Available";
    else location.innerHTML = details.location;
    
    github.href = details.html_url;
    linkedin.href = `https://www.linkedin.com/in/${details.login}/`;
    
    if(details.company==null) company.innerHTML = "Not Available";
    else company.innerHTML = details.location;
}