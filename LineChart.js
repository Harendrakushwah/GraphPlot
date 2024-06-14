// src/components/LineChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 800, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear any previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    svg.append('g')
      .call(yAxis);

    const line = d3.line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data, width, height]);

  return (
        <div>
            <h3>Line Chart</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default LineChart;
