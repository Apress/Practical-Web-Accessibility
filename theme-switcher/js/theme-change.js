// MAKING SWITCH ACCESSIBLE
// If the switch is in focus, and enter or space is pressed, simulate a click
$('[data-action="aria-switch"]').on('keydown', function(e) {
    var $this = $(this);
    if ($this.is(':focus') && (e.which === 32 || e.which === 13)) {
        e.preventDefault();
        $this.trigger('click');
    };
});

// THEME SWITCH
// Toggle a body class that will change
var localStorage = window.localStorage,
    themeSwitcher = document.querySelector('.switch-button');

if (
    (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        localStorage.getItem('ThemeSwitch') != 'light') ||
        localStorage.getItem('ThemeSwitch') != 'light'
    ) {
    document.body.classList.add('night');
    localStorage.setItem("ThemeSwitch", "night");
    document.getElementById("theme-switch").checked = true;
}

themeSwitcher.onclick = function() {
	document.body.classList.toggle('night');
    var status = document.body.classList.contains("night") ? "night" : "light";
    localStorage.setItem("ThemeSwitch", status);
}

