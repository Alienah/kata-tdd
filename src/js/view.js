export default function createGameView () {

    const introContainer = document.getElementById('explanation-container');
    const btnStart = document.getElementById('btn-start');
    const btnHide = document.getElementById('btn-hide');
    let recordTable;
    recordTable = document.querySelector('.record__table');
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

    function renderRecords(records) {
        let recordsPanel = records.map(player => {
            return (
                `<tr class="records__table--player">
                <td class="player__name">${player.name}</td>
                <td class="player__score">${player.score}</td>
            </tr>`);

        });
        recordTable.innerHTML += recordsPanel;
    };

    function paintDataOfPlayer(name, score) {
        let newPlayerRecord = `<tr class="records__table--player">
                <td class="player__name">${name}</td>
                <td class="player__score">${score} puntos</td>
            </tr>`;
        recordTable.insertAdjacentHTML('afterbegin', newPlayerRecord);
    };

    return ({
        prepareDOM,
        showIntroductionInfo,
        hideIntroductionInfo,
        renderRecords,
        paintDataOfPlayer
    })
}