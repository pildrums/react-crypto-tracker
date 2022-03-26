import { fetchCoinTickers, fetchCoinHistory } from 'api';
import ApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

interface IChartProps {
  coinId: string;
}

interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<TickersData>(
    ['price', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    },
  );
  return (
    <div>
      <Helmet>
        <title>Price</title>
      </Helmet>
      {isLoading ? (
        'Loading Price...'
      ) : (
        <>
          <NowPrice>${data?.quotes.USD.price}</NowPrice>
          <ApexChart />
        </>
      )}
    </div>
  );
};

const NowPrice = styled.div`
  font-weight: 800;
  background: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export default Price;
