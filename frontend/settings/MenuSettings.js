const menu = document.getElementById('menu-settings');
const btnSetting = document.getElementById('btn-settings');

btnSetting.addEventListener('click', () => {
    menu.classList.toggle('show');
});
