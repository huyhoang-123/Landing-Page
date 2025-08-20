const coverImg = document.querySelector('.cover-img');
const pageTitle = document.getElementById('page-title');
const formLogin = document.querySelector('.login-form');
const formRegister = document.querySelector('.register-form');
const loginImg = document.querySelector('.login-img');
const registerImg = document.querySelector('.register-img');
const registerForm = document.forms['register'];
const loginForm = document.forms['login'];
const handleViewChange = () => {
    const isMobile = window.innerWidth <= 768;
    const isLogin = pageTitle.textContent === 'Login';
    coverImg.style.display = isMobile ? 'none' : 'block';
    formLogin.style.display = (isMobile && !isLogin) ? 'none' : 'block';
    formRegister.style.display = (isMobile && isLogin) ? 'none' : 'block';
    if (!isMobile) {
        loginImg.style.display = isLogin ? 'block' : 'none';
        registerImg.style.display = isLogin ? 'none' : 'block';
    }
}

window.addEventListener("resize", handleViewChange);
const navigate = (url) => {
    window.location.href = url;
};

const getScreenMode = (screen) => {
    if (screen === 'Login') {
        pageTitle.textContent = 'Login';
    }
    else if (screen === 'Register') {
        pageTitle.textContent = 'Register';
    }
    coverImg.classList.toggle('active');
    toggleDisplay();
}

 handleViewChange()


