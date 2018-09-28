export default function createClient() {

    function getQuestions() {
        return (
            fetch('http://localhost:3000/api/questions')
                .then((response) => { return response.json(); })
                .then((data) => { return data })
                )
    }
    return {
        getQuestions
    }
}