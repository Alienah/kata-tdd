export default function createGameView () {

    const introContainer = document.getElementById('explanation-container');
    const btnStart = document.getElementById('btn-start');
    const btnHide = document.getElementById('btn-hide');
    // let btnHide;
    // let btnStart;

    function prepareDOM () {
        introContainer = document.getElementById('explanation-container');
        btnStart = document.getElementById('btn-start');
        btnHide = document.getElementById('btn-hide');
    }

    function showIntroductionInfo() {
        introContainer.classList.remove('hide');
        introContainer.classList.add('show');
        btnHide.classList.remove('hide');
        btnHide.classList.add('show');
    };

    function hideIntroductionInfo() {
        introContainer.classList.remove('show');
        introContainer.classList.add('hide');
        btnHide.classList.add('hide');
        btnStart.disabled = true;
        btnStart.classList.add('btn--disabled');
    };

    return ({
        prepareDOM,
        showIntroductionInfo,
        hideIntroductionInfo
    })
}