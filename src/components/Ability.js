import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class Ability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            info: [],
            url: props.item.ability.url,
            isShort: true,
            butText: 'More'
        };
        
    }
    componentDidMount() {
        this.getInfo();
    }
    getInfo = () => {
        fetch(this.state.url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    info: result
                });
            },
        )
    }
    handleShort = () =>{
        if(!this.state.isShort)
            this.setState({
                isShort: !this.state.isShort,
                butText: 'More'
            })
        else
            this.setState({
                isShort: !this.state.isShort,
                butText: 'Close'
            })
    }
    render(){
        const { info, isLoaded, isShort, butText } = this.state;
        if(!isLoaded){
            return(
                <Spinner animation="border" variant="primary" />
            )
        }
        else{
            return(
                <div>
<                   div className='ability'>
                        <h6>{info.name[0].toUpperCase()+info.name.slice(1)}</h6>
                        <p> {isShort ? info.effect_entries[0].short_effect:info.effect_entries[0].effect}</p>
                        <Button onClick={this.handleShort}>{butText}</Button>
                    </div>
                    <hr/>
                </div>
                
                
            )
        }
    }
}
export default Ability;