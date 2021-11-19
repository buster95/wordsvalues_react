import Button from 'react-bootstrap/Button';
import { ChangeEvent, memo, useState } from 'react';
import './App.scss';
import { WordsEvaluatorService } from './services/words_evaluator.service';

const service = new WordsEvaluatorService();

function App() {
  const [word, setWord] = useState('');

  const onHandleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setWord(target.value.toUpperCase());
  };

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="Ingrese una palabra" type="text" value={word} onChange={onHandleTextChange} />

        <br />
        <Button>SHOW VALUES</Button>

        {service.evaluateWord(word)}
        <br />
        {JSON.stringify(service.letters)}
      </header>
    </div>
  );
}

export default memo(App);
