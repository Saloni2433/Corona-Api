
document.addEventListener('DOMContentLoaded', function () {
    const totalInfectedElement = document.getElementById('totalInfected');
    const totalDeathsElement = document.getElementById('totalDeaths');
    const totalRecoveredElement = document.getElementById('totalRecovered');
    const worldStatsButton = document.getElementById('worldStatsButton');
    const nationStatsButton = document.getElementById('nationStatsButton');
    const countrySearchField = document.getElementById('countrySearchField');
    const retrieveDataButton = document.getElementById('retrieveDataButton');
    const countryNameInput = document.getElementById('countryName');

    function fetchGlobalStatistics() {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                displayStatistics(data);
            })
            .catch(error => {
                displayError();
                console.error('Error fetching global statistics:', error);
            });
    }

    function fetchNationStatistics(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                displayStatistics(data);
            })
            .catch(error => {
                displayError();
                console.error('Error fetching nation statistics:', error);
            });
    }

    function displayStatistics(data) {
        totalInfectedElement.textContent = data.cases.toLocaleString();
        totalDeathsElement.textContent = data.deaths.toLocaleString();
        totalRecoveredElement.textContent = data.recovered.toLocaleString();
    }

    function displayError() {
        totalInfectedElement.textContent = 'Error';
        totalDeathsElement.textContent = 'Error';
        totalRecoveredElement.textContent = 'Error';
    }

    worldStatsButton.addEventListener('click', function () {
        countrySearchField.classList.add('hidden');
        fetchGlobalStatistics();
    });

    nationStatsButton.addEventListener('click', function () {
        countrySearchField.classList.remove('hidden');
    });

    retrieveDataButton.addEventListener('click', function () {
        const country = countryNameInput.value.trim();
        if (country) {
            fetchNationStatistics(country);
        }
    });

    fetchGlobalStatistics();
});
