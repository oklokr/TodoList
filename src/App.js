import './styles/common.scss'
import Header from './layout/Header'
import Content from './layout/Content'
import {TodoContext} from './TodoContext'
function App() {
  return (
    <div className="App">
      <TodoContext>
        <Header />
        <Content />
      </TodoContext>
    </div>
  );
}

export default App;
