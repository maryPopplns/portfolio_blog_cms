import './analysis.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';

// text components
function CorrectText({ text }) {
  return <span className='correct_text'>{text}</span>;
}
function ErrorText({ data }) {
  const { description, bad, better, text } = data;
  const [errorText, setErrorText] = useState(text);
  const [modalShowing, setShowingModal] = useState(false);
  return (
    <>
      <span
        className='error_text'
        onClick={() => setShowingModal((prev) => !prev)}
      >
        {errorText}
        <div
          className={
            modalShowing ? 'showing_error_modal' : 'hidden_error_modal'
          }
        >
          <h2>hola</h2>
          {/* <h2>{description.en}</h2> */}
        </div>
      </span>
    </>
  );
}

function Analysis({ data }) {
  const [body, setBody] = useState([]);

  useEffect(() => {
    const errorComponents = data.errors.map((error) => {
      const { offset, length, description, bad, better } = error;
      const key = uuidv4();
      const text = data.body.slice(offset, offset + length);
      return <ErrorText key={key} data={{ description, bad, better, text }} />;
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
  }, [data]);

  return (
    <main className='analysis'>
      <div className='analysis_text'>{body}</div>
      <hr className='analysis_suggestions_divisor' />
    </main>
  );
}

export default Analysis;
