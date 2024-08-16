import React,{Component} from 'react';
import {rowData} from './appData';

const TicketContext = React.createContext();

export default class Context extends Component{
    state = {
        AllData : rowData
    }
    render(){
        console.log(this.state.AllData);
        return(
            <div>

            </div>
        )
    }
}