import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export const GET_SECURITIES = gql`
  {
    securities {
      country
      sector
      securityName
      ticker
      trend
    }
  }
`;

export interface Security{
  ticker: string;
  securityName: string;
  sector: string;
  country: string;
  trend: number;
}

const SecurityList: React.FC = () => {
  const { loading, error, data } = useQuery<{ securities: Security[] }>(GET_SECURITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getTrendColor = (trend: number): string => {
    if (trend < -0.20) return 'red';
    if (trend > 0.20) return 'blue';
    return 'green';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Securities</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Trend</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.securities.map((security) => (
            <TableRow key={security.ticker} component={Link} to={`/securities/${security.ticker}`} style={{ textDecoration: 'none' }}>
              <TableCell>{security.ticker}</TableCell>
              <TableCell>{security.securityName}</TableCell>
              <TableCell>{security.sector}</TableCell>
              <TableCell>{security.country}</TableCell>
              <TableCell style={{ backgroundColor: getTrendColor(security.trend) }}>{security.trend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SecurityList;
