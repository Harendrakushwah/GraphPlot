// src/components/ScatterPlot.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data, width = 800, height = 400 }) => {
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

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    svg.append('g')
      .call(yAxis);

    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'teal');
  }, [data, width, height]);

  return (
        <div>
            <h3>Scatter Plot</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default ScatterPlot;
