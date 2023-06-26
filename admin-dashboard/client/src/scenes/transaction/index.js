import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsQuery } from 'feature/api'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useState } from 'react'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'


const Transaction = () => {
    const theme = useTheme()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({})
    const [searchInput, setSearchInput] = useState("")

    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        search,
        sort: JSON.stringify(sort)
    })
    console.log("🚀 ~ file: index.js:24 ~ Transaction ~ data:", data)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# od products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ];

    return (
        <Box m='1.5rem 2rem'>
            <Header title='TRANSACTIONS' subtitle='Entire list of transactions' />
            <Box height='75vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundCotor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    pageSizeOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode='server'
                    sortingMode='server'
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transaction