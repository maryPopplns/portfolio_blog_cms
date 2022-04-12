import './analysis.css';
import { useState } from 'react';
import { useEffect } from 'react';

function Analysis({ data }) {
  const [spelling, setSpelling] = useState([{}]);
  const [grammar, setGrammar] = useState([{}]);

  useEffect(() => {
    const spellingErrors = data.errors.filter(
      (error) => error.type === 'spelling'
    );
    const grammarErrors = data.errors.filter(
      (error) => error.type === 'grammar'
    );

    setSpelling(spellingErrors);
    setGrammar(grammarErrors);
  }, [data]);

  console.log(spelling);
  console.log(grammar);

  return <div>analysis</div>;
}

export default Analysis;
