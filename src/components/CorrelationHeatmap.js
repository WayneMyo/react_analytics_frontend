import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export default function CorrelationHeatmap({ heatmapJSON }) {
    if (!heatmapJSON) {
        return <div>Loading heatmap...</div>;
    }
    // Parse the JSON string to a JavaScript object
    const heatmapData = JSON.parse(heatmapJSON);

    // Set the layout properties for the heatmap
    const layout = {
        title: 'Correlation Heatmap',
        xaxis: { title: 'Columns' },
        yaxis: { title: 'Columns' },
        margin: { t: 100, b: 100, l: 100, r: 50 },
    };

    // Render the heatmap using the Plotly React component
    return (
        <Plot
            data={heatmapData.data}
            layout={layout}
            useResizeHandler
            style={{ width: '50%', height: '100%' }}
        />
    );
}
