import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create stack generator
    const stack = d3.stack().keys(Object.keys(data[0]).slice(1));

    const series = stack(data);

    // Define color scale
    const color = d3.scaleOrdinal()
      .domain(Object.keys(data[0]).slice(1))
      .range(["#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5",
      "#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1",
      "#9ac7e1","#99c6e1","#97c6e0","#96c5e0"]);

    // Create x and y scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.instructor))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .range([innerHeight, 0]);

    // Create group for stacked bars
    const barGroups = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', d => color(d.key));

    // Create stacked bars
    barGroups.selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', d => xScale(d.data.instructor))
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth());

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <svg ref={chartRef} width={1500} height={1500}></svg>
  );
};

export default StackedBarChart;
