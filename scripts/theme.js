const checkDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const selectElements = {
    color: document.querySelector('#colorTheme'),
    colorReset: document.querySelector('#jscolor_reset'),
    dark: document.querySelector('#user_action_change_dark')
}

const colorBackground = ".tee .layout_box_title, .tee .table table thead, .tee .table table td.listtable_top, .tee .admin_nav";
const colorBorder = ".tee .nav ul li.active, .tee .input:focus";
const colorColor = ".tee .jscolor_li button.jscolor, .tee a";

const setColorTheme = picker => {
    selectElements.color.innerHTML = `
        ${colorBackground} { background-color: ${picker}; }
        ${colorBorder} { border-color: ${picker}; }
        ${colorColor} { color: ${picker}; }
        .tee .input:focus { box-shadow: ${picker}4d 0px 0px 0px 4px; }
        .tee .nav ul li a::after, .tee .table table tbody tr.collapse:hover { background: ${picker}26; }
    `;
    selectElements.colorReset.style.display = 'flex';
    localStorage.setItem(localStorageName.color, picker);
};

const enableDark = () => {
    document.querySelector('html').dataset.theme = 'dark';
    localStorage.setItem(localStorageName.dark, 1);
};

const disableDark = () => {
    delete document.querySelector('html').dataset.theme;
    localStorage.setItem(localStorageName.dark, 0);
};

// Check if color is enable in localStorage
if (localStorage.getItem(localStorageName.color) != null) setColorTheme(localStorage.getItem(localStorageName.color));

if (checkDark && localStorage.getItem(localStorageName.manualDark) === null) {
    enableDark();
} else if (!checkDark && localStorage.getItem(localStorageName.manualDark) === null) {
    disableDark();
};

selectElements.colorReset.addEventListener('click', el => {
    selectElements.color.innerHTML = '';
    selectElements.colorReset.style.display = 'none';
    localStorage.removeItem(localStorageName.color);
});

selectElements.dark.addEventListener('click', el => {
    localStorage.setItem(localStorageName.manualDark, 1);
    localStorage.getItem(localStorageName.dark) != 1 ? enableDark() : disableDark();
})


jscolor.presets.default = {
    previewSize: 0,
    forceStyle: false,
    onInput: 'setColorTheme(this)'
};