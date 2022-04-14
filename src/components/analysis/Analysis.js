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
  const [errorComponents, setErrorComponents] = useState();
  const [normalComponents, setNormalComponents] = useState();

  useEffect(() => {
    create components from errors
    const allErrors = data.errors.map(({ offset, length }) => ({
      offset,
      length,
    }));
    const errorComponents = allErrors.map(({ offset, length }, index) => {
      const text = data.body.slice(offset, offset + length);
      return <Error text={text} key={index} />;
    });
    setErrorComponents(errorComponents);

    // create components from correct text
    const allTextSplit = data.body.split('');
    let errorIndexes = [];
    data.errors.forEach(({ offset, length }) => {
      for (let i = offset; i < offset + length; i++) {
        errorIndexes.push(i);
      }
    });

    let allNormal = [];
    let currentNormal = [];
    allTextSplit.forEach((letter, index) => {
      if (!errorIndexes.includes(index)) {
        currentNormal.push(letter);
      }
      if (errorIndexes.includes(index) && currentNormal.length !== 0) {
        allNormal.push(currentNormal);
        currentNormal = [];
      }
    });
    const normalComponents = allNormal.map((array, index) => {
      const joined = array.join('');
      return <Normal text={joined} />;
    });

    setNormalComponents(normalComponents);
  }, [data]);

  return (
    <main className='analysis'>
      <p>{normalComponents}</p>
      <p>{errorComponents}</p>
      <p>{`${isErrorFirst}`}</p>
    </main>
  );
}

export default Analysis;
