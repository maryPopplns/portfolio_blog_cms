import './errorText.css';
import { useState } from 'react';
import { useEffect } from 'react';

// choice component
const Choice = ({ choice, setErrorText }) => (
  <li
    className='better_choice'
    onClick={() => {
      setErrorText(choice);
    }}
  >
    {choice}
  </li>
);

function ErrorText({ data }) {
  const { better, text } = data;
  const [currentText, setCurrentText] = useState(text);
  const [modalShowing, setShowingModal] = useState(false);
  const [choiceComponents, setChoiceComponents] = useState([]);

  useEffect(() => {
    better &&
      setChoiceComponents(
        better.map((choice, i) => {
          return (
            <Choice choice={choice} key={i} setErrorText={setCurrentText} />
          );
        })
      );
  }, [better]);

  return (
    <>
      <span
        className={currentText === text ? 'error_text' : 'corrected_text'}
        onClick={() => setShowingModal((prev) => !prev)}
      >
        {currentText}
        <div
          className={
            modalShowing ? 'showing_error_modal' : 'hidden_error_modal'
          }
        >
          <ul className='better_choices'>{choiceComponents}</ul>
        </div>
      </span>
    </>
  );
}

export default ErrorText;
