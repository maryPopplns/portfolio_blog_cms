import './analysis.css';
import { useState } from 'react';
import { useEffect } from 'react';

// text components
function Normal({ text }) {
  return <p>{text}</p>;
}
function Error({ text }) {
  return <span className='text_error'>{text}</span>;
}

function Analysis({ data }) {
  const [grammar, setGrammar] = useState([{}]);
  const [spelling, setSpelling] = useState([{}]);
  const [body, setBody] = useState();

  useEffect(() => {
    // seperate errors
    const grammarErrors = data.errors.filter(
      (error) => error.type === 'grammar'
    );
    const spellingErrors = data.errors.filter(
      (error) => error.type === 'spelling'
    );
    setGrammar(grammarErrors);
    setSpelling(spellingErrors);

    // create components from errors
    const allErrors = data.errors.map(({ offset, length }) => ({
      offset,
      end: offset + length,
    }));
    const errorComponents = allErrors.map(({ offset, end }, index) => {
      const text = data.body.slice(offset, end);
      return <Error text={text} key={index} />;
    });
    setBody(errorComponents);

    // create componets from correct text
    const splitBody = data.body.split('');
    // splitBody.
  }, [data]);

  return (
    <main className='analysis'>
      <p>{body}</p>
    </main>
  );
}

export default Analysis;
