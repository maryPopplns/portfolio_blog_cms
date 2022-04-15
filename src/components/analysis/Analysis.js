import './analysis.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';

// text components
function CorrectText({ text }) {
  return <span className='correct_text'>{text}</span>;
}
function ErrorText({ text }) {
  return <span className='error_text'>{text}</span>;
}
// error component
function Error({ error, index }) {
  const { description, bad, better } = error;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className='error'>
      <div
        className='open_error_button'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {index + 1}
      </div>
      <div
        className={`error_description_container ${
          isOpen ? 'error_description_open' : 'error_description_close'
        }`}
      >
        <div>{description.en}</div>
        <div>Error: {bad}</div>
        <div>
          {better.length === 1 ? 'suggestion' : 'Suggestions'}: [{' '}
          {better.join(', ')} ]
        </div>
      </div>
    </li>
  );
}

function Analysis({ data }) {
  const [spellingErrors, setSpellingErrors] = useState([]);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(() => {
    // create components from errors
    const allErrors = data.errors.map(({ offset, length }) => ({
      offset,
      length,
    }));
    const errorComponents = allErrors.map(({ offset, length }, index) => {
      const key = uuidv4();
      const text = data.body.slice(offset, offset + length);
      return <ErrorText text={text} key={key} />;
    });
    // create components from correct text
    let errorIndexes = [];
    data.errors.forEach(({ offset, length }) => {
      for (let i = offset; i < offset + length; i++) {
        errorIndexes.push(i);
      }
    });
    let allCorrect = [];
    let currentCorrect = [];
    const allTextSplit = data.body.split('');
    allTextSplit.forEach((letter, index) => {
      if (!errorIndexes.includes(index)) {
        currentCorrect.push(letter);
      }
      if (errorIndexes.includes(index) && currentCorrect.length !== 0) {
        allCorrect.push(currentCorrect);
        currentCorrect = [];
      }
    });
    if (currentCorrect.length !== 0) {
      allCorrect.push(currentCorrect);
    }
    const correctComponents = allCorrect.map((array, index) => {
      const key = uuidv4();
      const joined = array.join('');
      return <CorrectText text={joined} key={key} />;
    });
    // combine arrays
    const isErrorFirst = data.errors[0].offset === 0;
    if (isErrorFirst) {
      const components = errorComponents
        .map((component, index) => {
          if (correctComponents[index]) {
            return [component, correctComponents[index]];
          }
          return component;
        })
        .flat();
      setBody(components);
    } else {
      const components = correctComponents
        .map((component, index) => {
          if (errorComponents[index]) {
            return [component, errorComponents[index]];
          }
          return component;
        })
        .flat();
      setBody(components);
    }

    const spellingErrors = data.errors.filter(
      (error) => error.type === 'spelling'
    );
    const grammarErrors = data.errors.filter(
      (error) => error.type === 'grammar'
    );
    const spellingErrorComponents = spellingErrors.map((error, index) => {
      const key = uuidv4();
      return <Error error={error} key={key} index={index} />;
    });
    const grammarErrorComponents = grammarErrors.map((error, index) => {
      const key = uuidv4();
      return <Error error={error} key={key} index={index} />;
    });
    setSpellingErrors(spellingErrorComponents);
    setGrammarErrors(grammarErrorComponents);
  }, [data]);

  return (
    <main className='analysis'>
      <div className='analysis_text'>{body}</div>
      <hr className='analysis_suggestions_divisor' />
      <div className='error_list_container'>
        <div className='error_container spelling_errors'>
          <h2 className='error_header'>spelling errors</h2>
          <ul>{spellingErrors}</ul>
        </div>
        <div className='error_container grammar_errors'>
          <h2 className='error_header'>grammar errors</h2>
          <ul>{grammarErrors}</ul>
        </div>
      </div>
    </main>
  );
}

export default Analysis;
