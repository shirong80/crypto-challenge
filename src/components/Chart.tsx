import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IHistoryInfo } from "../core/models/types";
import { fetchCoinHistory } from "../core/services/api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../core/services/atoms";

interface IChartData {
  x: Date;
  y: number[];
}

export default function Chart() {
  const { coinId } = useParams();
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data, isSuccess } = useQuery<IHistoryInfo[]>({
    queryKey: ["coinHistory", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setChartData(
        data.map((price) => ({
          x: new Date(Number(price.time_close) * 1000),
          y: [
            Number(price.open),
            Number(price.high),
            Number(price.low),
            Number(price.close),
          ],
        }))
      );
    }
  }, [isSuccess, data]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    theme: { mode: isDark ? "dark" : "light" },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={[{ data: chartData }]}
          type="candlestick"
          height={350}
        />
      )}
    </div>
  );
}
