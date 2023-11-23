import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import SignUp from "./screens/Signup"
import Login from "./screens/Login"
import ProtectedRoutes from "./components/protected/ProtectedRoutes"

function App() {

	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/signup"
							element={<SignUp />}
						/>
						<Route
							path="/*"
							element={<ProtectedRoutes />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
