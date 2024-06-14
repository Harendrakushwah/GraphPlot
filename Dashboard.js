import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Filter from "./Filter";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import ScatterPlot from "./ScatterChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
  });

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (!filters.country || item.country === filters.country) &&
          (!filters.topic || item.topic === filters.topic) &&
          (!filters.sector || item.sector === filters.sector) &&
          (!filters.region || item.region === filters.region) &&
          (!filters.pestle || item.pestle === filters.pestle) &&
          (!filters.source || item.source === filters.source)
      )
    );
  }, [filters, data]);

  const uniqueOptions = (key) =>
    [...new Set(data.map((item) => item[key]))].filter(Boolean);

  const pieData = filteredData.map((item) => ({
    label: item.region,
    value: item.intensity,
  }));

  const lineData = filteredData.map((item) => ({
    date: item.published,
    value: item.intensity,
  }));

  const scatterData = filteredData.map((item) => ({
    x: item.intensity,
    y: item.likelihood,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/getData");
      const { data } = await response.json();

      const tmp = data.slice(0,10)

    //   console.log("---tmp---", tmp)
      setData(tmp);
      setFilteredData(tmp);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div className="filters">
        <Filter
          label="Country"
          options={uniqueOptions("country")}
          onChange={(value) => setFilters({ ...filters, country: value })}
        />
            <Filter
            label="Topic"
            options={uniqueOptions("topic")}
            onChange={(value) => setFilters({ ...filters, topic: value })}
            />
            <Filter
            label="Sector"
            options={uniqueOptions("sector")}
            onChange={(value) => setFilters({ ...filters, sector: value })}
            />
            <Filter
            label="Region"
            options={uniqueOptions("region")}
            onChange={(value) => setFilters({ ...filters, region: value })}
            />
            <Filter
            label="PEST"
            options={uniqueOptions("pestle")}
            onChange={(value) => setFilters({ ...filters, pestle: value })}
            />
            <Filter
            label="Source"
            options={uniqueOptions("source")}
            onChange={(value) => setFilters({ ...filters, source: value })}
            />
      </div>
      <BarChart data={filteredData} />
      <PieChart data={pieData} />
      <LineChart data={lineData} />
      <ScatterPlot data={scatterData} />

    </div>
  );
};

export default Dashboard;
