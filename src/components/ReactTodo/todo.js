import React, { useState, useEffect } from 'react'
import './style.css'


//Get Data from local Storage
const myLocalStorage = () => {
  const lists = localStorage.getItem("myTodosList");
  if (lists) {
     
  return JSON.parse(lists);
    
} else {
  
    return [];

  }
}

const Todo = () => {
  //New Data State Managments
  const [myData, setmyData] = useState("")
 //Old and New Data Managment
  const [myTodoItems, setmyTodoItems] = useState(myLocalStorage())
  //Id Managment
  const [editId, seteditId] = useState(null)
  //Changing button Managment
  const [toggleButton, settoggleButton] = useState(false)
  
  //Add new Item Check
  const addItem = () => {
    if (!myData) {
      alert('Please fill data')
      //Edit Item Check
    } 
   
    else if (myData && toggleButton) {
      setmyTodoItems(
           myTodoItems.map((curVal) => {
        if (curVal.id === editId) {
              return {...curVal, name: myData }
              }
             
            else{return curVal};
          
          
          }
          
          ));

        
          settoggleButton(false)
          setmyData("")
          seteditId(null)
    }
    // Add New Item having Old Items with it
    else {
      const uniqueId = {
        id: new Date().getTime().toString(),
        name: myData
      }
      setmyTodoItems([...myTodoItems, uniqueId])
      setmyData('');
    }
  }
  //Edit Item Logic
  const editItem = (index) => {
    
    const edited_Item_Id = myTodoItems.find((currentValue) => currentValue.id === index
    )

    settoggleButton(true);
    setmyData(edited_Item_Id.name)
    seteditId(index);


  }
  //Delete Single Item in Todos
  const deleteItem = (index) => {

    const updateTodosList = myTodoItems.filter((currentValue) => {
      return currentValue.id !== index
    })
    setmyTodoItems(updateTodosList);
  }
  //Delete All Data
  const deleteAll = () => {
    setmyTodoItems([]);
  }
  //Add Data by Enter key
  const onPressKey=(event)=>{
     if(event.key==='Enter'){
       return addItem()
     }
  }
  //Add Item to Local Storage
  useEffect(() => {
    localStorage.setItem("myTodosList", JSON.stringify(myTodoItems));
  }, [myTodoItems])
  return <>
  {/* Render All Item */}
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./images/todo.svg" alt="todologo" />
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder="✍ Add Item"
            className="form-control"
            value={myData}
            onKeyPress={(event)=>onPressKey(event)}
            onChange={(event) => setmyData(event.target.value)}
          />
          {/* ToggleButton Update  */}
          {toggleButton ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
        </div>
        {/* show our items  */}
        <div className="showItems">
          {myTodoItems.map((curElem) => {
            return (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn" onClick={
                      () => editItem(curElem.id)
                    }
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Remove all button  */}
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={deleteAll}>
            <span> CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
    

  </>
}

export default Todo
