import './errorText.css';
import { useState } from 'react';
import { useEffect } from 'react';

// choice component
const Choice = ({ choice }) => <li className='better_choice'>{choice}</li>;

function ErrorText({ data }) {
  const { better, text } = data;
  const [errorText, setErrorText] = useState(text);
  const [modalShowing, setShowingModal] = useState(false);
  const [choiceComponents, setChoiceComponents] = useState([]);

  useEffect(() => {
    better &&
      setChoiceComponents(
        better.map((choice, i) => {
          return <Choice choice={choice} key={i} />;
        })
      );
  }, [better]);

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
          <ul className='better_choices'>{choiceComponents}</ul>
          {/* <div>hela</div> */}
        </div>
      </span>
    </>
  );
}

export default ErrorText;
