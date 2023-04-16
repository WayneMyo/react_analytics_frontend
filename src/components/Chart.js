import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export default function Chart({ chartJSON }) {
    if (!chartJSON) {
        return <div>Loading chart...</div>;
    }
    // Parse the JSON string to a JavaScript object
    const chartData = JSON.parse(chartJSON);

    // Set the layout properties for the chart
    const layout = {
        title: 'Generated Chart',
        xaxis: { title: chartData.data[0].xaxis },
        yaxis: { title: chartData.data[0].yaxis },
        margin: { t: 100, b: 100, l: 100, r: 50 },
    };

    // Render the chart using the Plotly React component
    return (
        <Plot
            data={chartData.data}
            layout={layout}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
        />
    );
}
