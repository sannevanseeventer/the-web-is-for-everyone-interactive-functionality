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