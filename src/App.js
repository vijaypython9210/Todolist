import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState([]);
  const [post1, setPost1] = useState([]);
  const [task, setTask] = useState("");
  let [tid, setTid] = useState(1);
  const [load,setLoad]=useState(true)

  useEffect(() => {
    setTimeout(()=>{console.log('Load page close');setLoad(false)},3000)
    setPost1(post)
    console.log('Load Page Start');
  }, [post]);

  const handleDelete = (id) => {
    const deletedData = post.filter((p) => p.tid !== id);
    console.log(deletedData, id);
    setPost(deletedData);
  };

  function handleSubmit() {
    const newTask = {
      task: task,
      tid: tid,
      check: false,
    };
    newTask && setPost([...post, newTask]);
    setTask("");
    setTid((tid += 1));
  }

  function handleCheckChange(id) {
    const checktask = post.filter((p) => p.tid === id);
    checktask[0].check = !checktask[0].check;
    const s = post.filter((p) => p.id !== id);
    setPost1(s);
  }

  function handleSearch(e) {
    setPost1(post.filter((p) => p.task.toLowerCase().includes(e.target.value)));
  }

  return (
    <div className="App col-12 d-flex flex-column justify-content-around align-items-center p-4">
      <h1 className="heading">Todo List</h1>
      <div className="d-flex col-10 justify-content-between">
        <div className="search">
          <input
            type="search"
            name="searchList"
            id="searchList"
            className="form-control-lg"
            placeholder="Search a tasks..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="footer">
          <input
            type="text"
            name="task"
            id="list"
            className="form-control-lg rounded rounded-3 me-2"
            placeholder="Add a List"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Add
          </button>
        </div>
      </div>

      {post1[0] ? (
        post1.map((p) => {
          return (
            <div className="content d-flex col-6 mt-5 justify-content-between align-items-center" key={p.tid}>
              <h1>{p.tid}</h1>
              <input
                type="checkbox"
                name="check"
                value={p.check}
                onClick={(e) => handleCheckChange(p.tid)}
                className="check"
              />
              <p className="fs-4">
                {p.check ? <del className="text-dark">{p.task}</del> : p.task.toUpperCase()}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(p.tid)}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (!load) ?
        <h1>Task is Empty</h1> : <h1>Task is Loading....</h1>}
    </div>
  );
}

export default App;
