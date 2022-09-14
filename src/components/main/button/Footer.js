import "./footer.css";

function Footer({ notes }) {

  let number = 0;
  notes.filter((item) => {
    return item.isCompleted === false ? number++ : number;
  });

  return (
    <div className='footer'>
      <div className='note-number'>
        (<b>{number}</b>) <br /> items left
      </div>
    </div>
  );

};

export default Footer