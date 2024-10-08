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
import Typography from "@mui/material/Typography";

export const GET_SECURITIES = gql`
  {
    securities {
      country
      sector
      securityname
      ticker
      trend
    }
  }
`;

export interface Security{
  ticker: string;
  securityname: string;
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
      <Paper style={{padding: 16}} elevation={0}>
        <Typography variant="h4">{"Securities"}</Typography>
        <br/>
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
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
                  <TableRow key={security.ticker} component={Link} to={`/securities/${security.ticker}`}
                            style={{textDecoration: 'none'}}>
                    <TableCell>{security.ticker}</TableCell>
                    <TableCell>{security.securityname}</TableCell>
                    <TableCell>{security.sector}</TableCell>
                    <TableCell>{security.country}</TableCell>
                    <TableCell style={{
                      backgroundColor: getTrendColor(security.trend),
                      color: 'white'
                    }}>{security.trend}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  );
};

export default SecurityList;
