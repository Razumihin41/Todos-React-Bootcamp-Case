import "./list.css";
import BasicExample from "../bootstrap/spinner";

function List({ notes, setNotes, isLoading, genericRequest, setToast }) {

  const checkedList = (e) => {
    notes = notes.map(change => {
      return {
        content: change.content,
        isCompleted: change.id === e.target.id ?
          !change.isCompleted : change.isCompleted,
        id: change.id,
      };
    });
    setNotes(notes);
    genericRequest(
      "put",
      e.target.id,
      { isCompleted: e.target.checked },
      { checked: true, title: "Successfully Saved", message: "Text checked" },
    );
  };

  const changeList = (e) => {
    setNotes(notes.map(item => {
      return {
        content: item.id === e.target.id ? e.target.value : item.content,
        isCompleted: item.isCompleted === false ? false : true,
        id: item.id
      };
    }));
    setToast(
      {
        checked: true,
        title: "Warning",
        message: "Don't forget to saved",
      }
    );
  };

  const deleteList = (e) => {
    let targetId = e.target.id;
    let indexNumber;
    indexNumber = notes.indexOf(notes.filter((item) => item.id === targetId)[0]);
    notes.splice(indexNumber, 1);
    notes = notes.map(item => {
      return {
        content: item.content,
        isCompleted: item.isCompleted,
        id: item.id,
      };
    });
    setNotes(notes);
    genericRequest(
      "delete",
      targetId,
      null,
      { checked: true, title: "Successfully Saved", message: "Text deleted" },
    );
  };

  const savePostList = (e) => {
    genericRequest(
      "put",
      e.target.id,
      { content: notes.filter(item => item.id === e.target.id)[0].content },
      { checked: true, title: "Successfully Saved", message: "Text changed" },
    );
  };

  return (
    <div id='list' className='container'>
      {
        isLoading &&
        <div className="loading">
          <BasicExample />
          <span>Loading..</span>
        </div>
      }
      <ul className='ulList'>
        {notes.map((item, index) => {
          return <li key={index}>
            <input type="checkbox" id={item.id} checked={item.isCompleted}
              onClick={checkedList} className='checked' />
            <input className='inputLi' id={item.id} onChange={changeList} value={item.content} />
            <button className='saveButton' id={item.id} onClick={savePostList} >Save</button>
            <i onClick={deleteList} className="fa-solid fa-xmark" id={item.id}></i>
          </li>
        })}
      </ul>
    </div>
  );
};

export default List