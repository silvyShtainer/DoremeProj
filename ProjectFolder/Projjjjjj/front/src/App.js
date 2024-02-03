import { Login } from './pages/Log-In/Login';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { Signup } from './pages/Sign-up/Signup';
import { Home } from './pages/Home/Home';
import { useState } from 'react';
import { userContext } from './general/userContext';
import { RequireAuth } from './routeGuard';

function App() {
	const [user, setUser] = useState({ _id: null });

	return (
		<userContext.Provider value={{ user, setUser }}>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/home/*' element={<Home />} />
				</Routes>
				{/* <AppFooter /> */}
			</Router>
		</userContext.Provider>
	);
}

export default App;
