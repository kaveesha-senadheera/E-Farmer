import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Typography, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SalesTrends = () => {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState([]);

  const fetchReport = async () => {
    try {
      let url = '';
      if (reportType === 'inventory') url = 'http://localhost:5000/api/inventory/report/inventory';
      else if (reportType === 'sales') url = 'http://localhost:5000/api/sales/report'; 
      const res = await axios.get(url);
      setReportData(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };

  const downloadCSV = () => {
    if (reportType === 'inventory') {
      window.open('http://localhost:5000/api/inventory/report/inventory?format=csv', '_blank');
    } else if (reportType === 'sales') {
      window.open('http://localhost:5000/api/sales/report?format=csv', '_blank');
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${reportType === 'inventory' ? '📄 Inventory' : '📄 Sales'} Report`, 14, 20);
    const tableData = reportData.map(item => Object.values(item));
    autoTable(doc, {
      head: [Object.keys(reportData[0] || {})],
      body: tableData,
      startY: 30
    });
    doc.save(`${reportType}_report.pdf`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">📊 Sales Trends & Reports</Typography>

        {/* Dropdown */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
  <Select
    value={reportType}
    onChange={(e) => setReportType(e.target.value)}
    displayEmpty
    sx={{ width: 300, bgcolor: '#f4f4f4' }}
  >
    <MenuItem value="" disabled>Select Report Type</MenuItem>
    <MenuItem value="inventory">Inventory Report</MenuItem>
    <MenuItem value="sales">Sales Report</MenuItem>
  </Select>
  <Button
    variant="contained"
    sx={{ ml: 2, height: '56px' }}
    disabled={!reportType}
    onClick={fetchReport}
  >
    Generate Report
  </Button>
</Box>

        {/* Report Table */}
        {reportData.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#e0e0e0' }}>
                  <TableRow>
                    {Object.keys(reportData[0]).map((key, index) => (
                      <TableCell key={index}><strong>{key}</strong></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((val, index) => (
                        <TableCell key={index}>{val}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Download Buttons */}
            <Box>
              <Button variant="contained" onClick={downloadPDF} sx={{ mr: 2 }}>Download PDF</Button>
              <Button variant="contained" color="success" onClick={downloadCSV}>Download CSV</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SalesTrends;
