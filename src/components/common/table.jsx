import React from 'react'
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({rows=[], columns, pageSize=5, rowPerPage=5}) => {
  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
        
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  )
}

export default Table
