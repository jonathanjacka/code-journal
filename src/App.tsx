import CodeCell from './components/Code-cell';
import TextEditor from './components/Text-editor';
import { Provider } from 'react-redux';
import { store } from './state';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

function App() {

  return (
    <Provider store={store}>
      <div>
        <CodeCell />
      </div>
      <br />
      <br />
      <div>
        <TextEditor />
      </div>
    </Provider>


  )
}

export default App
