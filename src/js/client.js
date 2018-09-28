export default function createClient() {

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
    return {
        getQuestions,
        getRecords
    }
}