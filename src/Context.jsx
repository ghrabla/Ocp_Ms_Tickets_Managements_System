import React,{Component} from 'react';
import {rowData} from './appData';

const TicketContext = React.createContext();

class TicketProvider extends Component{
    state = {
        AllData : rowData
    }
    render(){
        //console.log(this.state.AllData);
        return(
            <div>
                <TicketContext.Provider
                value={{...this.state}}>
                    {this.props.children}
                </TicketContext.Provider>
            </div>
        )
    }
}
const TicketConsumer = TicketContext.Consumer;
export { TicketProvider, TicketConsumer }