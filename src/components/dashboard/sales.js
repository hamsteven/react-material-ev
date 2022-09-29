import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function getWeather() {
  return fetch('https://api.weather.gov/gridpoints/LWX/89,70/forecast/hourly').then((data) => data.json())
}

function formatDateTime(dateTime) {
  const date = new Date(dateTime)
  // const monthIndex = getWholeDate.getMonth()
  // const day = getWholeDate.getDate()
  // const year = getWholeDate.getFullYear()
  // const hours = getWholeDate.getHours()
  // const minutes = getWholeDate.getMinutes(2)
  // return `${hours}:${minutes}`
  return date.toLocaleString('en-us', { hour: '2-digit', minute: '2-digit' })
}

function BasicTable() {
  console.log(`weatherDataShort: ${weatherDataShort}`)

  const rows = weatherDataShort.properties.periods

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell> */}
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Wind Speed</TableCell>
            <TableCell align="right">Wind Direction</TableCell>
            <TableCell align="right">Forecast</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.startTime} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {formatDateTime(row.startTime)}
              </TableCell>
              <TableCell align="right">{formatDateTime(row.endTime)}</TableCell>
              <TableCell align="right">{`${row.temperature} ${row.temperatureUnit}`}</TableCell>
              <TableCell align="right">{row.windSpeed}</TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
              <TableCell align="right">{row.shortForecast}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein }
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]

export const Sales = (props) => {
  const theme = useTheme()
  const [weather, setWeather] = useState([])

  useEffect(() => {
    let mounted = true
    getWeather().then((items) => {
      if (mounted) {
        setWeather(items)
      }
    })
    return () => (mounted = false)
  }, [])

  // const data = {
  //   datasets: [
  //     {
  //       backgroundColor: '#3F51B5',
  //       barPercentage: 0.5,
  //       barThickness: 12,
  //       borderRadius: 4,
  //       categoryPercentage: 0.5,
  //       data: [18, 5, 19, 27, 29, 19, 20],
  //       label: 'This year',
  //       maxBarThickness: 10,
  //     },
  //     {
  //       backgroundColor: '#EEEEEE',
  //       barPercentage: 0.5,
  //       barThickness: 12,
  //       borderRadius: 4,
  //       categoryPercentage: 0.5,
  //       data: [11, 20, 12, 29, 30, 25, 13],
  //       label: 'Last year',
  //       maxBarThickness: 10,
  //     },
  //   ],
  //   labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug'],
  // // }

  // const options = {
  //   animation: false,
  //   cornerRadius: 20,
  //   layout: { padding: 0 },
  //   legend: { display: false },
  //   maintainAspectRatio: false,
  //   responsive: true,
  //   xAxes: [
  //     {
  //       ticks: {
  //         fontColor: theme.palette.text.secondary,
  //       },
  //       gridLines: {
  //         display: false,
  //         drawBorder: false,
  //       },
  //     },
  //   ],
  //   yAxes: [
  //     {
  //       ticks: {
  //         fontColor: theme.palette.text.secondary,
  //         beginAtZero: true,
  //         min: 0,
  //       },
  //       gridLines: {
  //         borderDash: [2],
  //         borderDashOffset: [2],
  //         color: theme.palette.divider,
  //         drawBorder: false,
  //         zeroLineBorderDash: [2],
  //         zeroLineBorderDashOffset: [2],
  //         zeroLineColor: theme.palette.divider,
  //       },
  //     },
  //   ],
  //   tooltips: {
  //     backgroundColor: theme.palette.background.paper,
  //     bodyFontColor: theme.palette.text.secondary,
  //     borderColor: theme.palette.divider,
  //     borderWidth: 1,
  //     enabled: true,
  //     footerFontColor: theme.palette.text.secondary,
  //     intersect: false,
  //     mode: 'index',
  //     titleFontColor: theme.palette.text.primary,
  //   },
  // }

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
            Last 7 days
          </Button>
        }
        title="Today's Weather Forecast"
      />
      <Divider />
      <CardContent>
        {/* <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box> */}
        <div className="wrapper">
          <h1>Hourly</h1>
          <BasicTable />

          {/* {JSON.stringify(weather)} */}
          {/* <ul>
            {weather.map((item) => (
              <li key={item.item}>{item.item}</li>
            ))}
          </ul> */}
        </div>
      </CardContent>
      {/* <Divider /> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box>
    </Card>
  )
}

const weatherDataShort = {
  properties: {
    periods: [
      {
        number: 1,
        name: '',
        startTime: '2022-09-27T10:00:00-04:00',
        endTime: '2022-09-27T11:00:00-04:00',
        isDaytime: true,
        temperature: 63,
        temperatureUnit: 'F',
        temperatureTrend: null,
        windSpeed: '9 mph',
        windDirection: 'W',
        icon: 'https://api.weather.gov/icons/land/day/skc?size=small',
        shortForecast: 'Sunny',
        detailedForecast: '',
      },
      {
        number: 2,
        name: '',
        startTime: '2022-09-27T11:00:00-04:00',
        endTime: '2022-09-27T12:00:00-04:00',
        isDaytime: true,
        temperature: 66,
        temperatureUnit: 'F',
        temperatureTrend: null,
        windSpeed: '12 mph',
        windDirection: 'W',
        icon: 'https://api.weather.gov/icons/land/day/few?size=small',
        shortForecast: 'Sunny',
        detailedForecast: '',
      },
    ],
  },
}
