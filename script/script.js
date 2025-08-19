const menu = document.querySelector('.cover-img');
const pageTitle = document.getElementById('pageTitle');
const formLogin = document.querySelector('.Login-form');
const formRegister = document.querySelector('.register-form');
const loginImg = document.querySelector('.login-img');
const registerImg = document.querySelector('.register-img');

const toggleDisplay = () => {
    const isMobile = window.innerWidth <= 768;
    const isLogin = pageTitle.textContent === 'Login';
    menu.style.display = isMobile ? 'none' : 'block';
    formLogin.style.display = (isMobile && !isLogin) ? 'none' : 'block';
    formRegister.style.display = (isMobile && isLogin) ? 'none' : 'block';
    if (!isMobile) {
        // Hiển thị hình ảnh tương ứng với trạng thái đăng nhập
        loginImg.style.display = isLogin ? 'block' : 'none';
        registerImg.style.display = isLogin ? 'none' : 'block';
    }
}

window.addEventListener("resize", toggleDisplay);
const navigate = (url) => {
    window.location.href = url;
};

const toggleButton = (message) => {
    if (message === 'Login') {
        pageTitle.textContent = 'Login';
    }
    else if (message === 'Register') {
        pageTitle.textContent = 'Register';
    }
    menu.classList.toggle('active');
    // Gọi toggleDisplay để cập nhật hiển thị form
    toggleDisplay();
}

// Gọi toggleDisplay khi trang load để thiết lập trạng thái ban đầu
 toggleDisplay()