import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const Textfield=(props)=>
{
    return(<div>
        <h1> TODO APP</h1>
        
            <TextField
        id="taskname"
        placeholder="Enter task"
        
        variant="outlined"
        
      />
      <Button variant="contained" color="primary" onClick={()=>props.addtask()} >Add Task
      </Button>
      <hr />
      <h1>YOUR TASKS</h1>
        </div>
    )
}
