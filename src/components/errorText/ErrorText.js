import './errorText.css';
import { useState } from 'react';
import { useEffect } from 'react';

function ErrorText({ data }) {
  const { better, text } = data;
  const [errorText, setErrorText] = useState(text);
  const [modalShowing, setShowingModal] = useState(false);
  const [allChoices, setAllChoices] = useState([]);

  // useEffect(() => {
  //   const betterChoices = better.map((choice, i) => {
  //     return (
  //       <li className='better_choice' key={i}>
  //         {choice}
  //       </li>
  //     );
  //   });
  //   setAllChoices(betterChoices);
  // }, [better]);

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
          {/* <ul className='better_choices'>{allChoices}</ul> */}
          <div>hola</div>
        </div>
      </span>
    </>
  );
}

export default ErrorText;
