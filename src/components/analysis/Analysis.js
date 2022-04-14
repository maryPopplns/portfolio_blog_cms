import './analysis.css';
import { useState } from 'react';
import { useEffect } from 'react';

// text components
function Correct({ text }) {
  return <p>{text}</p>;
}
function Error({ text }) {
  return <span className='text_error'>{text}</span>;
}

function Analysis({ data }) {
  const [body, setBody] = useState();

  useEffect(() => {
    // create components from errors
    const allErrors = data.errors.map(({ offset, length }) => ({
      offset,
      length,
    }));
    const errorComponents = allErrors.map(({ offset, length }, index) => {
      const text = data.body.slice(offset, offset + length);
      return <Error text={text} />;
    });
    // setErrorComponents(errorComponents);

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
    const correctComponents = allCorrect.map((array, index) => {
      const joined = array.join('');
      return <Correct text={joined} />;
    });

    // setNormalComponents(normalComponents);

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
  }, [data]);

  return (
    <main className='analysis'>
      <div className='analysis_text'>{body}</div>
    </main>
  );
}

export default Analysis;
