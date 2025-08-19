const menu = document.querySelector('.cover-img');
const pageTitle = document.getElementById('pageTitle');
const formLogin = document.querySelector('.Login-form');
const formRegister = document.querySelector('.register-form');

const toggleDisplay = () => {
    if (window.innerWidth <= 768) {
        menu.style.display = 'none';   
        // Kiểm tra pageTitle để hiển thị form tương ứng
        if (pageTitle.textContent === 'Login') {
            formLogin.style.display = 'block';
            formRegister.style.display = 'none';
        } else if (pageTitle.textContent === 'Register') {
            formRegister.style.display = 'block';
            formLogin.style.display = 'none';
        }
    } else {
        menu.style.display = 'block';
        // Trên desktop, hiển thị cả hai form (hoặc theo logic ban đầu)
        formLogin.style.display = 'block';
        formRegister.style.display = 'block';
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
toggleDisplay();