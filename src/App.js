
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='wholeLayer' >
    
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
