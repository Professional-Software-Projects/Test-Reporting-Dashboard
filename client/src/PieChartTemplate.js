function getChart({ passCount, failCount, skipCount }) {
    const data = {
        labels: ['Passed', 'Failed', 'Skipped'],
        datasets: [{
            label: 'Test Pass Rate',
            data: [passCount, failCount, skipCount],
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Test Chart',
                align: 'center'
            }
        }
    };

    return [data, options];
}

export { getChart as default };