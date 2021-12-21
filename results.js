const url = 'http://localhost:8080/api/votes';

fetch(url)
  .then((response) => response.json())
  .then((votes) => {
    let xValue = [];
    let yValue = [];
    votes.forEach((vote) => {
      console.log(vote.voteCounter);
      xValue.push(vote.party.name);
      yValue.push(vote.voteCounter);
    });
    createChar(xValue, yValue);
  })
  .catch((error) => {
    console.log(error);
  });

function createChar(x, y) {
  let xValues = x;
  let yValues = y;
  const barColors = ['red', 'green', 'blue', 'orange', 'brown'];
  const char = document.querySelector('#myChart').getContext('2d');

  const myChar = new Chart(char, {
    type: 'bar',
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
      title: {
        display: true,
        text: 'Voting in Denmark 2021',
      },
    },
  });
}

