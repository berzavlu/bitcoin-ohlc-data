import btcData from './data/ohlc_data'

function generateData() {
  const data = btcData
  for (let i = 0; i < data.length; i++) {
    data[i] = {
      t: data[i][0],
      y: data[i][1]
    }
  }
  return data
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})

const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default {
  data: {
    datasets: [{
      label: 'Precio',
      backgroundColor: '#FF9500',
      borderColor: '#FF9500',
      data: generateData(),
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2
    }]
  },
  options: {
    animation: {
      /* duration: 0 */
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        offset: true,
        ticks: {
          major: {
            enabled: true,
            fontStyle: 'bold'
          },
          source: 'data',
          autoSkip: true,
          autoSkipPadding: 75,
          maxRotation: 0,
          sampleSize: 100,
        },
        gridLines: {
          display:false
        },
      }],
      yAxes: [{
        gridLines: {
          circular: true,
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value, index, values) => {
            // console.log(value)
            return `${formatter.format(value)}`
          }
        }
      }]
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      callbacks: {
        title: function (tooltipItem) {
          const timeStamp = Date.parse(tooltipItem[0].label)
          const typeDate = new Date(timeStamp)
          const showDate = typeDate.toLocaleDateString('es-PE', optionsDate)
          return showDate
        },
        label(tooltipItem, myData) {
          let label = myData.datasets[tooltipItem.datasetIndex].label || ''
          if (label) {
            label += ': '
          }
          const price = parseFloat(tooltipItem.value).toFixed(2)
          label += formatter.format(price)
          return label
        },
      }
    }
  }
}