import React from "react";
import './SaveRespose.css';

const SaveResponse = () => {
  const [userName, setuserName] = React.useState("");
  const [userMessage, setuserMessage] = React.useState("");
  const [allresponse, setAllresponse] = React.useState([]);
  const userresponse = [];
  const [stopInfinite, setstopInfinte] = React.useState(false);

  // get response
  if (!stopInfinite) {
    fetch(
      "https://realtimed-45526-default-rtdb.asia-southeast1.firebasedatabase.app/message.json"
    )
      .then((response) => response.json())
      .then((data) => {
        for (const dataItem in data) {
          userresponse.push({
            userName: data[dataItem].userName,
            userMessage: data[dataItem].userMessage,
          });
        }
        setAllresponse(userresponse);
      });
    setstopInfinte(true);
  }

  const handleuserName = (e) => {
    setuserName(e.target.value);
  };

  const handleuserMessage = (e) => {
    setuserMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if(userName && userMessage){
    //create(CRUD)
    fetch(
      "https://realtimed-45526-default-rtdb.asia-southeast1.firebasedatabase.app/message.json",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          userMessage: userMessage,
        }),
      }
    );
    setstopInfinte(false);
    // setuserName('');
    // setuserMessage('');
    

  };

  return (
    <div>
      <div className="container-box">
        <div className="container-heading">

        <h2>TI-CHAT</h2>
        </div>
        <div className="container-title">

        <p>Let's Chat bro , with open mind!</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Please enter Name"
              onChange={handleuserName}
              required
            />
            <input
              type="text"
              placeholder="Please enter your message"
              onChange={handleuserMessage}
              required
            />
            <button type="submit">submit</button>
          </form>
        </div>
        <div className="response-container">
          {allresponse &&
            allresponse.map((item, index) => {
              return (
                <div className="response-item" key={index}>
                  <p className="response-name">{item.userName} :</p>
                  <p className="response-message">{item.userMessage}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SaveResponse;
