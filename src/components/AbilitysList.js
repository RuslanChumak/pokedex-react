import React, {Component} from 'react';
import Ability from './Ability'

class AbilitysList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.info,
        };
        
    }
    
    
    render(){
        const {info} = this.state
        return(
            <div>
                {info.map((element, index) =>
                    <Ability key={index} item={element}/>
                )}
                
            </div>
        )
    }
}
export default AbilitysList;