// src/components/BarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width = 800, height = 500 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, width])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    svg.append('g')
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.country))
      .attr('y', (d) => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.intensity))
      .attr('fill', 'teal');
  }, [data]);

  return (
        <div>
            <h3 className='headingBar'>Bar Chart</h3>
            <svg ref={svgRef}></svg>
        </div>
    );

};

export default BarChart;
