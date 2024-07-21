import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Security, GET_SECURITIES } from './SecurityList';

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
  const prices = dataPrices?.prices.filter(price => price.ticker === symbol);

  if (!security || !prices) return <p>Security not found.</p>;

  const chartOptions = {
    title: { text: `${security.securityName} Stock Price` },
    series: [
      {
        name: 'Close Price',
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
        title: { text: 'Close Price' },
      },
      {
        title: { text: 'Volume' },
        opposite: true,
      }
    ],
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">{security.securityName}</Typography>
      <Typography variant="subtitle1">Symbol: {security.ticker}</Typography>
      <Typography variant="subtitle1">Sector: {security.sector}</Typography>
      <Typography variant="subtitle1">Country: {security.country}</Typography>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </Paper>
  );
};

export default SecurityDetail;
