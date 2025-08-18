const navigate =(url)=>{

    window.location.href = url;
};

const toggleMenu = () => {
    const menu = document.querySelector('.cover-img');
    menu.classList.toggle('active');
}