import './analysis.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from 'react';

// text components
function CorrectText({ text }) {
  return <p>{text}</p>;
}
function ErrorText({ text }) {
  return <p className='text_error'>{text}</p>;
}
// error components
function SpellingError({ error }) {
  console.log(error);
  return <></>;
}
function GrammarError({ error }) {
  console.log(error);
  return <></>;
}

function Analysis({ data }) {
  const [spellingErrors, setSpellingErrors] = useState([]);
  const [grammarErrors, setGrammarErrors] = useState([]);
  // const [body, setBody] = useState([]);
  const [body, setBody] = useState(
    ' Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
  );

  useEffect(() => {
    //   // create components from errors
    //   const allErrors = data.errors.map(({ offset, length }) => ({
    //     offset,
    //     length,
    //   }));
    //   const errorComponents = allErrors.map(({ offset, length }, index) => {
    //     const key = uuidv4();
    //     const text = data.body.slice(offset, offset + length);
    //     return <ErrorText text={text} key={key} />;
    //   });
    //   // create components from correct text
    //   let errorIndexes = [];
    //   data.errors.forEach(({ offset, length }) => {
    //     for (let i = offset; i < offset + length; i++) {
    //       errorIndexes.push(i);
    //     }
    //   });
    //   let allCorrect = [];
    //   let currentCorrect = [];
    //   const allTextSplit = data.body.split('');
    //   allTextSplit.forEach((letter, index) => {
    //     if (!errorIndexes.includes(index)) {
    //       currentCorrect.push(letter);
    //     }
    //     if (errorIndexes.includes(index) && currentCorrect.length !== 0) {
    //       allCorrect.push(currentCorrect);
    //       currentCorrect = [];
    //     }
    //   });
    //   if (currentCorrect.length !== 0) {
    //     allCorrect.push(currentCorrect);
    //   }
    //   const correctComponents = allCorrect.map((array, index) => {
    //     const key = uuidv4();
    //     const joined = array.join('');
    //     return <CorrectText text={joined} key={key} />;
    //   });
    //   // combine arrays
    //   const isErrorFirst = data.errors[0].offset === 0;
    //   if (isErrorFirst) {
    //     const components = errorComponents
    //       .map((component, index) => {
    //         if (correctComponents[index]) {
    //           return [component, correctComponents[index]];
    //         }
    //         return component;
    //       })
    //       .flat();
    //     setBody(components);
    //   } else {
    //     const components = correctComponents
    //       .map((component, index) => {
    //         if (errorComponents[index]) {
    //           return [component, errorComponents[index]];
    //         }
    //         return component;
    //       })
    //       .flat();
    //     setBody(components);
    //   }

    const spellingErrors = data.errors.filter(
      (error) => error.type === 'spelling'
    );
    const grammarErrors = data.errors.filter(
      (error) => error.type === 'grammar'
    );
    const spellingErrorComponents = spellingErrors.map((error) => {
      const key = uuidv4();
      return <SpellingError error={error} key={key} />;
    });
    const grammarErrorComponents = grammarErrors.map((error) => {
      const key = uuidv4();
      return <GrammarError error={error} key={key} />;
    });
    setSpellingErrors(spellingErrorComponents);
    setGrammarErrors(grammarErrorComponents);
  }, [data]);

  return (
    <main className='analysis'>
      <div className='analysis_text'>{body}</div>
      <div className='spelling_errors'>{spellingErrors}</div>
      <div className='grammar_errors'>{grammarErrors}</div>
    </main>
  );
}

export default Analysis;
