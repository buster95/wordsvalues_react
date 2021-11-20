import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { ChangeEvent, FormEvent, memo, useState } from 'react';
import './App.scss';
import { WordsEvaluatorService } from './services/words_evaluator.service';

const service = new WordsEvaluatorService();

function App() {
  const [word, setWord] = useState('');
  const [showValues, setShowValues] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const onHandleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setWord(target.value.toUpperCase());
  };

  const onHandleAddWord = (e: FormEvent) => {
    e.preventDefault();
    setWords([...words, word]);
    setWord('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => setShowValues(!showValues)}>SHOW VALUES</Button>
        <br />
        {showValues &&
          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Letra</th>
                </tr>
              </thead>
              <tbody>
                {service.letters.map((letter, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{letter}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        }

        <Form onSubmit={onHandleAddWord}>
          <Form.Group className="mb-3">
            <Form.Label>INGRESE UNA PALABRA</Form.Label>
            <Form.Control type="text" placeholder="Enter your word..." value={word} onChange={onHandleTextChange} />
          </Form.Group>
          <Button type='submit'>Add Word</Button>
        </Form>

        <br />
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Word</th>
                <th>Max Value</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {words.map((word, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{word}</td>
                    <td>{service.maxWordValue(word)}</td>
                    <td>{service.evaluateWord(word)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </header>
    </div>
  );
}

export default memo(App);
