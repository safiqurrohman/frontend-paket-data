import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from './route/RouteConfig';


export default function App() {
  return (
    <Router basename="/frontend-paket-data/">
        <RouteConfig />
    </Router>
  );
}