import "./list.css";
import BasicExample from "../bootstrap/spinner";

function List({ notes, setNotes, isLoading, setIsLoading, genericRequest, setToast }) {

  const checkedList = (e) => {
    setIsLoading(true);
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
    setIsLoading(true);
    genericRequest(
      "delete",
      targetId,
      null,
      { checked: true, title: "Successfully Saved", message: "Text deleted" },
    );
  };

  const savePostList = (e) => {
    setIsLoading(true);
    genericRequest(
      "put",
      e.target.id,
      { content: notes.filter(item => item.id === e.target.id)[0].content },
      { checked: true, title: "Successfully Saved", message: "Text changed" },
    );
  };

  return (
    <div id='list' className='container'>
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
      {
        isLoading &&
        <div className="loading">
          <BasicExample />
        </div>
      }
    </div>
  );
};

export default List