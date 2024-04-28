import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x
  LinearScale, // y
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "@src/common/hooks/useQuery";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const Diagram = () => {
  const router = useRouter();
  const recordId = router.query.recordId;

  const {
    data: dataCpt,
    reload: reloadCpt,
    isLoading: dataCptLoading,
  } = useQuery(`caculate/cpt/${recordId}`);

  const {
    data: dataStatistical,
    reload: reloadStatistical,
    isLoading: dataStatisticalLoading,
  } = useQuery(`caculate/pptk/${recordId}`);

  const {
    data: dataSpt,
    reload: reloadSpt,
    isLoading: dataSptLoading,
  } = useQuery(`caculate/spt/${recordId}`);

  const {
    data: listSoilLayer,
    reload: reloadSoilLayer,
    isLoading: listSoilLayerLoading,
  } = useQuery(`soilLayer/soilLayerRecord/${recordId}`);

  useEffect(() => {
    reloadStatistical();
    reloadCpt();
    reloadSpt();
    reloadSoilLayer();
  }, [recordId]);

  const data = {
    labels: dataStatistical?.statistical.map((item: any) => item.li.toString()),
    datasets: [
      {
        label: "PPTK",
        data: dataStatistical?.statistical.map((item: any) => item.Pms),
        backgroundColor: "rgba(0, 128, 128, 0.2)",
        borderColor: "rgba(0, 128, 128, 1)",
        pointBorderColor: "rgba(0, 128, 128, 1)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "CPT",
        data: dataCpt?.DataCPT.map((item: any) => item.Pms),
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        borderColor: "rgba(255, 99, 71, 1)",
        pointBorderColor: "rgba(255, 99, 71, 1)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "SPT",
        data: dataSpt?.DataSPT.map((item: any) => item.Pms),
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        pointBorderColor: "rgba(255, 165, 0, 1)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        labels: {
          callback: function (value: any) {
            return value;
          },
        },
        min: 0,
      },
      x: {
        min: 0,
      },
    },
  };

  return (
    <Spin
      spinning={
        dataCptLoading ||
        dataStatisticalLoading ||
        dataSptLoading ||
        listSoilLayerLoading
      }
    >
      <Line
        data={data}
        options={options}
      ></Line>
    </Spin>
  );
};

export default Diagram;
