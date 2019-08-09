import React from 'react';
import {render} from "react-dom";
import { createStore} from "redux";
import App from './App';
import {Provider} from 'react-redux';
const initialState={
    task:[]};
const TaskReducer=(state=initialState,action)=>{
    switch(action.type){
        case "add":
            state={task:[...state.task,action.payload]}
            break;
        case "delete":
            let array=[...state.task];
            let to_be_deleted=action.payload;
            for(let i=0;i<array.length;i++)
            {
            if(array[i].taskId===to_be_deleted)
            {
                array.splice(i,1);                  
                }
            }
                state={task:array};
                break;
            case "edit":
                state={task:[...state.task,action.payload]}   
                break;
                case "addAll":
                    state={task:action.payload}
                    break;
                default:
                    break;
        }
        return state;
    };
    const store=createStore(TaskReducer,{
        task:[]});
    render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('root'));
