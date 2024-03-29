import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transaction from "scenes/transaction";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Breakdown from "scenes/breakdown";

function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<div className='app'>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<Navigate to='/dashboard' replace />} />
							<Route path='/dashboard' element={<Dashboard />} />
							<Route path='/products' element={<Products />} />
							<Route path='/customers' element={<Customers />} />
							<Route path='/transaction' element={<Transaction />} />
							<Route path='/geography' element={<Geography />} />
							<Route path='/overview' element={<Overview />} />
							<Route path='/daily' element={<Daily />} />
							<Route path='/monthly' element={<Monthly />} />
							<Route path='/breakdown' element={<Breakdown />} />
							<Route path='/admin' element={<Admin />} />
							<Route path='/performance' element={<Performance />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
