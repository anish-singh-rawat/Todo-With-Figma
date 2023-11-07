import React, { useEffect, useState } from "react";
import "./TodoWithFigma.css";
import { v4 as uuidv4 } from "uuid";

const getLocalItem = () => {
  let data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
};
const TodoWithFigma = () => {
  const [inputData, setInputData] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const [listData, setListData] = useState(getLocalItem());
  const [editData, setEditData] = useState(null);
  const [editInputData, setEditInputData] = useState("");
  const [showEditEror, setShowEditEror] = useState(false)
  const [newFilterData, setNewFilterData] = useState('All')

  const handleClick = () => {
    setShowInput(true);
  };

  const isWhitespace = (inputData) => {
    return !inputData.trim();
  };

  const handleAdd = () => {
    if (inputData !== "" && !isWhitespace(inputData)) {
      setListData([...listData, { text: inputData, id: uuidv4(), checked: false}]);
      setShowError(false);
      setShowInput(false);
      setInputData("");
    } else {
      setShowError(true);
    }
  };

  const handleCancel = () => {
    setShowInput(false);
    setShowError(false);
  };

  const removeData = (id) => {
    const updatedData = listData.filter((data) => data.id !== id);
    setListData(updatedData);
  };

  const handleEdit = (id) => {
    setEditData(id);
    const itemToEdit = listData.find(data => data.id === id);
    setEditInputData(itemToEdit.text);
  };

  const EditDone = () => {
    if (editInputData.length < 1) {
      alert("Please enter data");
      setShowEditEror(true)

    }
    else {
      const updatedData = listData.map((data) => {
        if (data.id === editData) {
          return { ...data, text: editInputData };
        }

        return data;

      });

      setListData(updatedData);
      setEditData(null);

    }
  };

  const clearAllData = () => {
    setListData([]);
  };

  const CheckBoxClick = (id) => {
    setListData((item) =>
      item.map((data) =>
        data.id === id ? { ...data, checked: !data.checked } : data
      )
    )
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(listData));
  }, [listData]);

  const filterDatas = listData.filter((item) => {
    if (newFilterData === "complete") {
      return item.checked === true;
    }
    else if (newFilterData === "incomplete") {
      return item.checked === false;
    }
    else {
      return true
    }
  })

  return (
    <>
      <div className="container-fluid px-3">
        <div className="row">
          <div className="col ">
            <div className="top-parent-heading mt-3">
              <div className="top-sub-heading" style={{color : "#252A31"}}>Today</div>
              <div className="top-sub-icon">
                <i className="fa-solid fa-circle-plus" onClick={handleClick}></i>
              </div>
            </div>

            <div>
              {showInput && (
                <div className="box-parent mt-5">
                  <div className="box-sub-parent">
                    <div className="box-title" >Add TODO</div>

                    <textarea
                      className="textarea-feild resize"
                      onChange={(e) => setInputData(e.target.value)} ></textarea>

                    <div className="input-button-parent ">
                         <div className="cancel-btn" onClick={handleCancel} style={{color : "#006CFF", fontFamily :'SF Pro Text'}}>
                        Cancel

                      </div>
                      {showError && (
                        <div className="show-error"> Please Enter Data </div>
                      )}
                      <div className="add-btn" onClick={handleAdd} style={{fontWeight : 'bold', fontSize : '18px', color : "#006CFF"}}>
                        Done
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {
              listData.length > 0 && !showInput &&
              <div className="top-filter-buttons mt-3 ">
              <div className="filter-heading" >
                 <input
                   type="radio"
                   id="option1"
                   name="radio-group"
                   defaultChecked
                   className="radio-btn"
                   onClick={() => setNewFilterData("All")}
                 />All
               </div>
 
               <div className="filter-heading">
                 <input
                   type="radio"
                   id="option1"
                   name="radio-group"
                   className="radio-btn"
                   value="ojhg"
                   onClick={() => setNewFilterData("complete")}
                 />Complete
               </div>
 
               <div  className="filter-heading" >
                 <input
                   type="radio"
                   id="option1"
                   name="radio-group"
                   className="radio-btn"
                 onClick={() => setNewFilterData("incomplete")}/>Incomplete
               </div>
 
             </div>
            }
           
            <div className="mt-4">
              {!showInput && (
                <div>
                  {listData.length > 0 &&
                    filterDatas.map((data) => (
                      <div key={data.id} >
                        <div className="parent-data">
                          <div className="parent-data-one">
                            <div className="list-sub-data">
                              {editData !== data.id ? (
                                <div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input border-red"
                                      type="checkbox"
                                      value=""
                                      defaultChecked={data.checked}
                                      id="border-redius"
                                      onClick={() => CheckBoxClick(data.id)}
                                    />

                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >

                                      {data.text}
                                    
                                    </label>
                                  </div>
                                </div>)
                                : (
                                  <div className="edit-btn-parent">
                                    <input className="input-feild"
                                      type="text" value={editInputData}
                                      onChange={(e) => setEditInputData(e.target.value)}  onBlur={EditDone} />
                                    <div className="click-btn">
                                      <i className="fa-regular fa-circle-check" onClick={EditDone}> </i>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="parent-data-two ">
                            <div className="delete-icon icon">
                              <i
                                className="fa-solid fa-trash"
                                onClick={() => removeData(data.id)}
                              ></i>
                            </div>

                            <div className="edit-icon icon">
                              <i
                                className="fa-regular fa-pen-to-square"
                                onClick={() => handleEdit(data.id)}
                              ></i>
                            </div>
                            {
                              data.checked ? 
                              (
                                <div className="dot-icon-unchecked icon">  </div>
                              )
                              :
                              (
                                <div className="dot-icon-checked icon">  </div>
                              )
                            }
                          </div>
                        </div>
                        <div className="hr-line mt-2"></div>
                        <br />
                      </div>
                    ))}
                </div>
              )}

              {listData.length > 1 && (
                <center>
                  {!showInput && (
                    <button className="clear-all" onClick={clearAllData}>
                      {" "}
                      Clear All
                    </button>
                  )}
                </center>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TodoWithFigma;