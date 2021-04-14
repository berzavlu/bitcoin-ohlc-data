import { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import cfg from './configChart'

function ChartHome() {
  const chartRef = useRef(null)

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d')
    new Chart(myChartRef, cfg)
  }, [])

  return (
    <section className='bitcoinChartPrice'>
      <canvas id='myChart' ref={chartRef} />
    </section>
  )
}

export default ChartHome
