import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Security, GET_SECURITIES } from './SecurityList';
import { Button } from "@mui/material";

const GET_PRICES = gql`
  {
    prices {
      close
      date
      id
      volume
      ticker
    }
  }
`;

interface Prices {
  ticker: string;
  date: string;
  close: number;
  volume: number;
}

const SecurityDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const { loading: loadingSecurities, error: errorSecurities, data: dataSecurities } = useQuery<{ securities: Security[] }>(GET_SECURITIES);
  const { loading: loadingPrices, error: errorPrices, data: dataPrices } = useQuery<{ prices: Prices[] }>(GET_PRICES);

  if (loadingSecurities || loadingPrices) return <p>Loading...</p>;
  if (errorSecurities) return <p>Error: {errorSecurities.message}</p>;
  if (errorPrices) return <p>Error: {errorPrices.message}</p>;

  const security = dataSecurities?.securities.find(sec => sec.ticker === symbol);
  let prices = dataPrices?.prices.filter(price => price.ticker === symbol);

  if (!security || !prices) return <p>Security not found.</p>;

  // Sort prices by date in ascending order
  prices = prices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartOptions = {
    title: { text: `${security.securityname} Detailed Chart` },
    series: [
      {
        name: 'Stock',
        data: prices.map(item => item.close),
      },
      {
        name: 'Volume',
        data: prices.map(item => item.volume),
        yAxis: 1,
      }
    ],
    xAxis: { categories: prices.map(item => item.date) },
    yAxis: [
      {
        title: { text: 'Stock' },
      },
      {
        title: { text: 'Volume' },
        opposite: true,
      }
    ],
  };

  return (
    <Paper style={{ padding: 16 }} elevation={0}>
      <Typography variant="h4">Securities</Typography><br/>
      <Typography variant="subtitle1">{security.ticker} - {security.securityname}</Typography><br/>
      <Typography variant="subtitle1">Sector: {security.sector}</Typography>
      <Typography variant="subtitle1">Country: {security.country}</Typography><br/>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}<br/>
      <Button component={Link} to="/" variant="contained" color="primary"
              style={{ marginTop: 16, backgroundColor: 'black' }}>Back</Button>
    </Paper>
  );
};

export default SecurityDetail;
