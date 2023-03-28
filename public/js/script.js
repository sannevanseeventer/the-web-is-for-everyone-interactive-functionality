/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDE =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* HIDDEN PASSWORD */
const showHiddenPass = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () =>{
        if (input.type === 'password'){
            //verander naar text
            input.type = 'text' 

            // verander icon
            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line') 
        } else{
            // verander naar wachtwoord
            input.type = 'password'

            // verander icon
            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line') 
        }
    })
}

showHiddenPass('login-pass', 'login-eye')