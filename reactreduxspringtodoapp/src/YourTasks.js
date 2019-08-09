import React from 'react'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
export const YourTasks=(props)=>
{
    return(
        <div>
            <List style={{margin: 20}}>
          {props.list.map(item => (
            <li 
            key={item.taskName}>{item.taskName} 
            <Button variant="outlined" style={{ margin: 1 }} color="primary" id={item.taskId} onClick={()=>props.edittask(item)}
    >Edit</Button>
            <Button variant="outlined" style={{ margin: 1 }} color="primary" id={item.taskName} onClick={()=>props.deletetask(item.taskId)}
    >Delete</Button>
            </li>  
          ))
          }
        </List> 
        </div>
    )
}