

const raceClasses = ['A', 'B', 'C', 'D', 'E'];
let selectedBanner = GM_getValue("BR_CRB_BANNER", "A");
let $tornBanner, $classDropdown;

function changeBanner(raceClass) {
    if (!$tornBanner) return;
    raceClasses.forEach(function (cls) {
        if ($tornBanner.hasClass('class-'+cls)) {
            $tornBanner.removeClass('class-'+cls);
        }
    });
    $tornBanner.addClass("class-" + raceClass);
    GM_setValue("BR_CRB_BANNER", raceClass);
}

function addSelector() {
    $classDropdown = $(`<div class="react-dropdown-default change-banner">
    <button type="button" class="toggler down">Change Banner</button>
    <div class="dropdownList down">
        <ul class="scrollarea scroll-area dropdown-content scrollbar-bright down"></ul>
    </div>
</div>`);
    $classDropdown.on('click', function () {
        $classDropdown.toggleClass('dropdown-opened');
    });
    let $list = $classDropdown.find('ul');
    raceClasses.forEach(function (cls) {
        let $item = $(`<li class="item">Class ${cls}</li>`);
        $item.on('click', function () {
            changeBanner(cls);
        });
        $list.append($item);
    });
    GM_addStyle(`
    .change-banner {
        float: left;
        margin-top: -4px;
        margin-left: 10px;
    }
    .content-title .change-banner button.toggler.toggler {
        padding-left: 10px;
    }`);
    $('#skip-to-content').after($classDropdown);
}

(function() {
    'use strict';
    const maxLoop = 10000;
    let counter = 1;
    let loop = setInterval(function () {
        $tornBanner = $('.racing-main-wrap');
        if ($tornBanner.length > 0 || counter > maxLoop) {
            changeBanner(selectedBanner);
            addSelector();
            return clearInterval(loop);
        }
        counter++;
    }, 100);
})();