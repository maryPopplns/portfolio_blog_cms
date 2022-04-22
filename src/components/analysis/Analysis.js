import './analysis.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';

// error component
import ErrorText from '../errorText/ErrorText';
// text component
const CorrectText = ({ text }) => <span className='correct_text'>{text}</span>;

function Analysis({ data }) {
  const { errors, body, setBody, setAnalysis } = data;
  const [bodyText, setBodyText] = useState([]);

  function saveHandler() {
    const analysisText = Array.from(
      document.getElementsByClassName('analysis_text')
    )[0].innerText;
    setAnalysis(false);
    setBody(analysisText);
  }
  function cancelHandler() {
    setAnalysis(false);
  }

  useEffect(() => {
    // error components
    const errorComponents = errors.map((error) => {
      const { offset, length, better } = error;
      const key = uuidv4();
      const text = body.slice(offset, offset + length);
      return <ErrorText key={key} data={{ better, text }} />;
    });
    // create components from correct text
    let errorIndexes = [];
    errors.forEach(({ offset, length }) => {
      for (let i = offset; i < offset + length; i++) {
        errorIndexes.push(i);
      }
    });
    let allCorrect = [];
    let currentCorrect = [];
    const allTextSplit = body.split('');
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
    const isErrorFirst = errors[0].offset === 0;
    if (isErrorFirst) {
      const components = errorComponents
        .map((component, index) => {
          if (correctComponents[index]) {
            return [component, correctComponents[index]];
          }
          return component;
        })
        .flat();
      setBodyText(components);
    } else {
      const components = correctComponents
        .map((component, index) => {
          if (errorComponents[index]) {
            return [component, errorComponents[index]];
          }
          return component;
        })
        .flat();
      setBodyText(components);
    }
  }, [body, errors]);

  return (
    <main className='analysis'>
      <div className='analysis_text'>{bodyText}</div>
      <hr className='analysis_suggestions_divisor' />
      <div className='analysis_button_container'>
        <button
          data-testid='save_analysis_button'
          className='analysis_button'
          onClick={saveHandler}
        >
          save
        </button>
        <button className='analysis_button' onClick={cancelHandler}>
          cancel
        </button>
      </div>
    </main>
  );
}

export default Analysis;
