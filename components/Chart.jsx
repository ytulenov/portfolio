import { useEffect, useRef } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { isValidElement } from 'react';

const ChartComponent = ({ children, type = 'bar', library = 'chartjs' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  
  const extractTextFromChildren = (children) => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(child => {
        if (typeof child === 'string') return child;
        if (isValidElement(child)) return extractTextFromChildren(child.props.children);
        return '';
      }).join(''); 
    }
    if (isValidElement(children)) {
      return extractTextFromChildren(children.props.children);
    }
    return '';
  };

  useEffect(() => {
    if (!containerRef.current || !children) return;

    if (chartRef.current && library === 'chartjs') {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    
    const content = extractTextFromChildren(children);
    if (!content) return; 

    const dataLines = content.trim().split('\n').filter(line => line.trim());
    
    const renderChartJs = () => {
      let chartConfig = {};
      const fixedHeight = 600; 

      switch (type.toLowerCase()) {
        case 'pie':
          const pieData = dataLines.map(line => {
            const [label, value] = line.split(':');
            return { label: label.trim(), value: parseFloat(value) };
          });
          chartConfig = {
            type: 'pie',
            data: {
              labels: pieData.map(d => d.label),
              datasets: [{
                data: pieData.map(d => d.value),
                backgroundColor: ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC', '#FFCCFF'] 
              }],
            },
            options: { 
              responsive: true, 
              maintainAspectRatio: false, 
              plugins: { legend: { position: 'top' } }, 
              height: fixedHeight,
            },
          };
          break;

        case 'bar':
        case 'line':
          const [header, ...rows] = dataLines;
          const headers = header.split(',');
          const labels = rows.map(row => row.split(',')[0]);
          const values = rows.map(row => parseFloat(row.split(',')[1]));
          chartConfig = {
            type: type.toLowerCase(),
            data: {
              labels,
              datasets: [{
                label: headers[1] || 'Value',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }],
            },
            options: { 
              responsive: true, 
              maintainAspectRatio: false, 
              scales: { y: { beginAtZero: true } },
              height: fixedHeight,
            },
          };
          break;

        case 'bubble':
          const bubbleHeaders = dataLines[0].split('\t');
          const bubbleData = dataLines.slice(1).map(line => {
            const [country, reserves, gdp, population] = line.split('\t');
            return {
              label: country,
              data: [{ x: parseFloat(gdp), y: parseFloat(reserves), r: Math.min(parseFloat(population) / 10, 30) }],
            };
          });
          chartConfig = {
            type: 'bubble',
            data: {
              datasets: bubbleData.map((d, i) => ({
                label: d.label,
                data: d.data,
                backgroundColor: `rgba(${i * 50}, 99, 132, 0.6)`,
              })),
            },
            options: {
              responsive: true, 
              maintainAspectRatio: false, 
              scales: {
                x: { title: { display: true, text: 'GDP ($T)' } },
                y: { title: { display: true, text: 'Reserves (B barrels)' } },
              },
              height: fixedHeight,
            },
          };
          break;

        case 'scatter':
          const [scatterHeader, ...scatterRows] = dataLines;
          const scatterHeaders = scatterHeader.split(',');
          const scatterData = scatterRows.map(row => {
            const [x, y, r] = row.split(',').map(val => (isNaN(val) ? val : parseFloat(val)));
            return { x, y, r: r || 5 }; 
          });
          chartConfig = {
            type: 'scatter',
            data: {
              datasets: [{
                label: 'Scatter Data',
                data: scatterData.map(d => ({ x: d.x, y: d.y })),
                pointRadius: scatterData.map(d => d.r || 5), 
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }],
            },
            options: {
              responsive: true, 
              maintainAspectRatio: false, 
              scales: {
                x: { title: { display: true, text: scatterHeaders[0] || 'X' } },
                y: { title: { display: true, text: scatterHeaders[1] || 'Y' } },
              },
              height: fixedHeight,
            },
          };
          break;

        default:
          console.error('Unsupported Chart.js chart type');
          return;
      }
      chartRef.current = new Chart(canvasRef.current, chartConfig);
    };

    const renderD3 = () => {
      const fixedHeight = 600; 
      const margin = { top: 20, right: 30, bottom: 40, left: 40 }; 

      
      const containerWidth = containerRef.current.offsetWidth || 600; 

      
      d3.select(containerRef.current).selectAll('svg').remove();
      
      const svg = d3.select(containerRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', fixedHeight)
        .style('background', 'white');

      switch (type.toLowerCase()) {
        case 'pie':
          const pieData = dataLines.map(line => {
            const [label, value] = line.split(':');
            return { label: label.trim(), value: parseFloat(value) };
          });
          
          const pie = d3.pie().value(d => d.value);
          const arc = d3.arc().innerRadius(0).outerRadius((fixedHeight - margin.top - margin.bottom) / 2);
          const color = d3.scaleOrdinal(d3.schemeCategory10);

          const g = svg.append('g')
            .attr('transform', `translate(${containerWidth/2},${fixedHeight/2})`);

          g.selectAll('path')
            .data(pie(pieData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

          g.selectAll('text')
            .data(pie(pieData))
            .enter()
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text(d => d.data.label);
          break;

        case 'bar':
          const [barHeader, ...barRows] = dataLines;
          const barData = barRows.map(row => {
            const [x, y] = row.split(',');
            return { x, y: parseFloat(y) };
          });

          const xScale = d3.scaleBand()
            .domain(barData.map(d => d.x))
            .range([margin.left, containerWidth - margin.right])
            .padding(0.1);

          const yScale = d3.scaleLinear()
            .domain([0, d3.max(barData, d => d.y) * 1.1]) 
            .range([fixedHeight - margin.bottom, margin.top]);

          svg.append('g')
            .selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.x))
            .attr('y', d => yScale(d.y))
            .attr('width', xScale.bandwidth())
            .attr('height', d => fixedHeight - margin.bottom - yScale(d.y))
            .attr('fill', '#36A2EB');

          svg.append('g')
            .attr('transform', `translate(0,${fixedHeight - margin.bottom})`)
            .call(d3.axisBottom(xScale));

          svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

          
          svg.append('text')
            .attr('transform', `translate(${containerWidth / 2},${fixedHeight - margin.bottom + 30})`)
            .style('text-anchor', 'middle')
            .text('X');

          svg.append('text')
            .attr('transform', `translate(${margin.left - 30},${fixedHeight / 2}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .text('Y');
          break;

        case 'line':
          const [lineHeader, ...lineRows] = dataLines;
          const lineData = lineRows.map(row => {
            const [x, y] = row.split(',');
            return { x, y: parseFloat(y) };
          });

          const xLineScale = d3.scalePoint()
            .domain(lineData.map(d => d.x))
            .range([margin.left, containerWidth - margin.right]);

          const yLineScale = d3.scaleLinear()
            .domain([0, d3.max(lineData, d => d.y) * 1.1]) 
            .range([fixedHeight - margin.bottom, margin.top]);

          const line = d3.line()
            .x(d => xLineScale(d.x))
            .y(d => yLineScale(d.y));

          svg.append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', '#36A2EB')
            .attr('stroke-width', 2)
            .attr('d', line);

          svg.append('g')
            .attr('transform', `translate(0,${fixedHeight - margin.bottom})`)
            .call(d3.axisBottom(xLineScale));

          svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yLineScale));

          
          svg.append('text')
            .attr('transform', `translate(${containerWidth / 2},${fixedHeight - margin.bottom + 30})`)
            .style('text-anchor', 'middle')
            .text('X');

          svg.append('text')
            .attr('transform', `translate(${margin.left - 30},${fixedHeight / 2}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .text('Y');
          break;

        case 'bubble':
          const bubbleHeaders = dataLines[0].split('\t');
          const bubbleData = dataLines.slice(1).map(line => {
            const [country, reserves, gdp, population] = line.split('\t');
            return {
              label: country,
              x: parseFloat(gdp),
              y: parseFloat(reserves),
              r: Math.min(parseFloat(population) / 10, 30),
            };
          });

          const xBubbleScale = d3.scaleLinear()
            .domain([0, d3.max(bubbleData, d => d.x)])
            .range([margin.left, containerWidth - margin.right]);

          const yBubbleScale = d3.scaleLinear()
            .domain([0, d3.max(bubbleData, d => d.y)])
            .range([fixedHeight - margin.bottom, margin.top]);

          svg.selectAll('circle')
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr('cx', d => xBubbleScale(d.x))
            .attr('cy', d => yBubbleScale(d.y))
            .attr('r', d => d.r)
            .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
            .attr('opacity', 0.6);

          svg.append('g')
            .attr('transform', `translate(0,${fixedHeight - margin.bottom})`)
            .call(d3.axisBottom(xBubbleScale).tickFormat(d => `${d}$T`));

          svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yBubbleScale));

          
          svg.append('text')
            .attr('transform', `translate(${containerWidth / 2},${fixedHeight - margin.bottom + 30})`)
            .style('text-anchor', 'middle')
            .text('GDP ($T)');

          svg.append('text')
            .attr('transform', `translate(${margin.left - 30},${fixedHeight / 2}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .text('Reserves (B barrels)');
          break;

        case 'scatter':
          const [scatterHeader, ...scatterRows] = dataLines;
          const scatterHeaders = scatterHeader.split(',');
          const scatterData = scatterRows.map(row => {
            const [x, y, r] = row.split(',').map(val => (isNaN(val) ? val : parseFloat(val)));
            return { x, y, r: r || 5 }; 
          });

          const xScatterScale = d3.scaleLinear()
            .domain(d3.extent(scatterData, d => d.x))
            .range([margin.left, containerWidth - margin.right]);

          const yScatterScale = d3.scaleLinear()
            .domain(d3.extent(scatterData, d => d.y))
            .range([fixedHeight - margin.bottom, margin.top]);

          const rScale = d3.scaleSqrt()
            .domain(d3.extent(scatterData, d => d.r))
            .range([2, 20]); 

          svg.selectAll('circle')
            .data(scatterData)
            .enter()
            .append('circle')
            .attr('cx', d => xScatterScale(d.x))
            .attr('cy', d => yScatterScale(d.y))
            .attr('r', d => rScale(d.r))
            .attr('fill', '#36A2EB')
            .attr('opacity', 0.6);

          svg.append('g')
            .attr('transform', `translate(0,${fixedHeight - margin.bottom})`)
            .call(d3.axisBottom(xScatterScale).tickFormat(d3.format('.0f')));

          svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScatterScale));

          
          svg.append('text')
            .attr('transform', `translate(${containerWidth / 2},${fixedHeight - margin.bottom + 30})`)
            .style('text-anchor', 'middle')
            .text(scatterHeaders[0] || 'X');

          svg.append('text')
            .attr('transform', `translate(${margin.left - 30},${fixedHeight / 2}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .text(scatterHeaders[1] || 'Y');
          break;

        default:
          console.error('Unsupported D3 chart type');
          return;
      }
    };

    if (library === 'chartjs' && canvasRef.current) {
      renderChartJs();
    } else if (library === 'd3') {
      renderD3();
    }

    return () => {
      if (chartRef.current && library === 'chartjs') {
        chartRef.current.destroy();
      }
      if (library === 'd3') {
        d3.select(containerRef.current).selectAll('svg').remove();
      }
    };
  }, [children, type, library]);

  return (
    <Box my={8} p={4} bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)} borderRadius="lg" borderWidth="1px" borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}  overflow="auto">
      <Text mb={2} fontSize="sm" fontWeight="medium" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} >
        {type.charAt(0).toUpperCase() + type.slice(1)} Chart ({library.toUpperCase()})
      </Text>
      <Box 
        bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
        p={4} 
        borderRadius="md" 
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        borderWidth="1px" 
        borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} 
        ref={containerRef}
        w="100%" 
        h="600px" 
      >
        {library === 'chartjs' && <canvas ref={canvasRef} />}
      </Box>
    </Box>
  );
};

export default ChartComponent;