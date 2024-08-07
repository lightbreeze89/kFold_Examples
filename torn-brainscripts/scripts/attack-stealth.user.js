

function watchPercentage(target, title) {
    function updatePercentage() {
        const percent = parseFloat(target.style.height.replace('%', '')).toFixed(2) + '%';
        console.info('style changed!', percent, title);
        title.innerText = `Attacking - Stealth ${percent}`;
    }
    var observer = new MutationObserver(() => updatePercentage());
    updatePercentage();
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}

(function() {
    'use strict';
    const maxLoop = 10000;
    let counter = 1;
    let loop = setInterval(function () {
        const bar = document.querySelector(`div[class^='stealthBarWrap_'] [class^='level_']`);
        const title = document.querySelector(`div[class^='titleContainer_'] [class^='title_']`);
        if (bar && title) {
            watchPercentage(bar, title);
            return clearInterval(loop);
        }
        if (counter > maxLoop) {
            console.error('bar never found');
            return clearInterval(loop);
        }
        counter++;
    }, 100);
})();
