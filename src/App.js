import './App.css';
import DragDrop from './components/DragDrop'
const data = [
  { title: 'Card 1', items: ['1', '2', '3']},
  { title: 'Card 2', items: ['4', '5']},
  { title: 'Card 3', items: ['6', '7']}
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <DragDrop data={data} />
      </header>
    </div>
  );
}

export default App;
