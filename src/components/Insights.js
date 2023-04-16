import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled'

export default function Insights({ insights }) {
    if (!insights) {
        return <div>Loading insights...</div>;
    }
    const { dataset_size, column_insights } = insights;

    const TableHeadStyled = styled(TableHead)`
        background-color: #3f51b5;
    `;
    const TableHeaderCell = styled(TableCell)`
        color: white;
    `;
    const TableCellStyled = styled(TableCell)`
        font-weight: bold;
    `;

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Dataset size: {dataset_size}
            </Typography>
            <TableContainer component={Paper} style={{ margin: "1rem 0" }}>
                <Table>
                    <TableHeadStyled style={{ fontWeight: "bold" }}>
                        <TableRow>
                            <TableHeaderCell>Column</TableHeaderCell>
                            <TableHeaderCell align="right">Mean</TableHeaderCell>
                            <TableHeaderCell align="right">Median</TableHeaderCell>
                            <TableHeaderCell align="right">Null Count</TableHeaderCell>
                            <TableHeaderCell align="right">Unique Count</TableHeaderCell>
                        </TableRow>
                    </TableHeadStyled>
                    <TableBody>
                        {Object.entries(column_insights).map(([column, data]) => (
                            <TableRow key={column}>
                                <TableCellStyled component="th" scope="row">
                                    {column}
                                </TableCellStyled>
                                <TableCell align="right">{data.mean || ''}</TableCell>
                                <TableCell align="right">{data.median || ''}</TableCell>
                                <TableCell align="right">{data.null_count || ''}</TableCell>
                                <TableCell align="right">{data.unique_count || ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
