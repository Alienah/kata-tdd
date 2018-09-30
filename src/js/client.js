export default function createClient(store) {

    function getQuestions() {
        return (
            fetch('http://localhost:3000/api/questions')
                .then((response) => { return response.json(); })
                .then((data) => { return data })
                )
    }

    function getRecords() {
        return localStorage.getItem('recordsData') ? JSON.parse(localStorage.getItem('recordsData')) : [];
    }

    function saveDataOfPlayerInStorage() {
        localStorage.setItem('recordsData', JSON.stringify(store.records));
    };

    return {
        getQuestions,
        getRecords,
        saveDataOfPlayerInStorage
    }
}