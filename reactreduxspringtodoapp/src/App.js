import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import {Textfield} from './Textfield';
import { YourTasks } from './YourTasks';

class App extends React.Component {
 
  componentDidMount()
  {
    {this.props.addAllTasks()}
  }
  render(){
  return (
    <div className="container">

    <Textfield addtask={()=>{this.props.addTask(document.getElementById("taskname").value);
  }}/>

<YourTasks list={this.props.task}
  deletetask={(id)=>{this.props.deleteTask(id)}}
  edittask={(task)=>{this.props.editTask(task)}}/>
  </div>
);
}
}
const mapStateToProps=(state)=>{
return{
  task: state.task
};
};
const mapDispatchToProps=(dispatch)=>{
  let newtask;
  return{

    addAllTasks: ()=>{
      axios.get("http://localhost:8080/getTasks").then(res=> {
        dispatch({
          type: "addAll",
          payload: res.data
        })
      }
      )
    },
    addTask: (task)=>{
      axios.post("http://localhost:8080/addTask",{"taskName":task}).then(res=> {
        dispatch({
          type: "add",
          payload: res.data
        })
      }
      )
    },
    deleteTask: (task)=>{
      axios.delete("http://localhost:8080/deleteTask/"+task).then(res=> {
      dispatch({
        type: "delete",
        payload: task
      })}
      )
    },
    editTask: (task)=>{
      newtask=prompt("Enter the new task");
      task.taskName=newtask
      axios.put("http://localhost:8080/editTask",task).then(res=> {
        dispatch({
          type: "delete",
          payload: task.taskId
        })
      dispatch({
        type: "edit",
        payload: res.data
      })}
      )
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App)