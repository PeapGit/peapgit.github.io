(function () {
    function setDynamicLogo() {
        var img = document.getElementById('dynamic-logo');
        if (!img) return;

        var now = new Date();
        var month = now.getUTCMonth() + 1;
        var day = now.getUTCDate();
        
        var isChristmas = (month === 11) || (month === 12);

        var src = isChristmas
            ? 'assets/images/christmas.png'
            : 'assets/images/logo.png';

        img.src = src;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setDynamicLogo);
    } else {
        setDynamicLogo();
    }
})();