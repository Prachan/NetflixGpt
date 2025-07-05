import { Provider } from 'react-redux';
import Body from './component/Body';
import './index.css';
import appStore from './utils/appStore';

function App() {
  return (
    // className="min-h-screen bg-gray-100 flex items-center justify-center"
    <div >
      {/* <h1 className="text-3xl font-bold text-blue-600">
        Tailwind is working!
      </h1> */}
      <Provider store={appStore}>
        <Body/>
      </Provider>
    </div>
  );
}

export default App;
