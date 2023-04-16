import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Papa from 'papaparse';
import FileUpload from './components/FileUpload';
import DropdownSelect from './components/DropdownSelect';
import Chart from './components/Chart';
import Insights from './components/Insights';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import ExportButton from './components/ExportButton';

import {
  generateDashboard as generateDashboardAPI,
  dataInsights,
  correlationHeatmap,
  exportToWord as exportToWordAPI,
} from './services/axios_service';

function App() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dateColumns, setDateColumns] = useState([]);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [chartType, setChartType] = useState('scatter');
  const [chartData, setChartData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);

  const handleFileChange = async (uploadedFile) => {
    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          const { data, errors, meta } = results;
          setFile(uploadedFile);
          const columnNames = meta.fields;
          setColumns(columnNames);
          // setDateColumns(columnNames);
        },
      });
    }
  };

  const generateDashboard = async () => {
    if (file && xColumn && yColumn) {
      const dashboardParams = {
        x_column: xColumn,
        y_column: yColumn,
        chart_type: chartType,
        filter_column: '',
        time_range_start: '',
        time_range_end: '',
      };
  
      const dashboardData = await generateDashboardAPI(dashboardParams, file);
      setChartData(dashboardData.chart);
  
      const insightsData = await dataInsights(file);
      setInsights(insightsData.insights);
  
      const heatmapData = await correlationHeatmap(file);
      setHeatmapData(heatmapData.heatmap);
    }
  };  

  const exportToWord = async () => {
    if (file && xColumn && yColumn) {
      const dashboardParams = {
        x_column: xColumn,
        y_column: yColumn,
        filter_column: filterColumn,
        chart_type: chartType,
      };
  
      await exportToWordAPI(dashboardParams, file);
    }
  };  

  return (
    <Container maxWidth="xl">
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Data Dashboard
      </Typography>
      <FileUpload onFileChange={handleFileChange} />
      <DropdownSelect
        label="X Column"
        options={columns.map((col) => ({ label: col, value: col }))}
        value={xColumn}
        onChange={(e) => setXColumn(e.target.value)}
      />
      <DropdownSelect
        label="Y Column"
        options={columns.map((col) => ({ label: col, value: col }))}
        value={yColumn}
        onChange={(e) => setYColumn(e.target.value)}
      />
      {/* <DropdownSelect
        label="Filter Column"
        options={dateColumns.map((col) => ({ label: col, value: col }))}
        value={filterColumn}
        onChange={(e) => setFilterColumn(e.target.value)}
      /> */}
      <DropdownSelect
        label="Chart Type"
        options={[
          { label: 'Scatter', value: 'scatter' },
          { label: 'Bar', value: 'bar' },
        ]}
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={generateDashboard}>
          Generate Chart
        </Button><span style={{ margin: "0 1rem" }}></span>
        <ExportButton
          onExport={exportToWord}
          disabled={!file || !xColumn || !yColumn}
        />
      </Box>
      {chartData && <Chart chartJSON={chartData} />}
      {insights && <Insights insights={insights} />}
      {heatmapData && <div style={{ display: 'flex', justifyContent: 'center' }}><CorrelationHeatmap heatmapJSON={heatmapData} /></div>}
    </Container>
  );
}

export default App;
