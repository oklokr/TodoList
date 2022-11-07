import './styles/common.scss'
import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'
import {TodoContext} from './TodoContext'
function App() {
  return (
    <div className="App">
      <TodoContext>
        <Header />
        <Content />
        <Footer />
      </TodoContext>
    </div>
  );
}

export default App;
