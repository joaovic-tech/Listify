const menu = document.getElementById('menu-settings');
const btnSetting = document.getElementById('btn-settings');

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.id === 'btn-settings') menu.classList.toggle('show');
});
