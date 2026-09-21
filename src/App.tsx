import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HtmlHub from './pages/HtmlHub';
import Workspace from './pages/Workspace';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/html" element={<HtmlHub />} />
      <Route path="/html/website" element={<Workspace />} />
      <Route path="/html/website/:mode" element={<Workspace />} />
      <Route path="/html/website/:mode/:sub" element={<Workspace />} />
      <Route path="/html/website/:mode/:sub/:item" element={<Workspace />} />
      <Route
        path="/html/email"
        element={<ComingSoon title="html — email template" backTo="/html" backLabel="html" />}
      />
      <Route
        path="/html/document"
        element={<ComingSoon title="html — document / resume" backTo="/html" backLabel="html" />}
      />
      <Route
        path="/html/forms"
        element={<ComingSoon title="html — forms" backTo="/html" backLabel="html" />}
      />
      <Route path="/css" element={<ComingSoon title="css" backTo="/" backLabel="code." />} />
      <Route
        path="/javascript"
        element={<ComingSoon title="javascript" backTo="/" backLabel="code." />}
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
