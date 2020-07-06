import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import ElOfChain from './ElOfChain'
class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            url: props.url,
            isLoaded:false
        };
    }
    componentDidMount(){
        this.getInfo()
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
    render(){
        const { info,isLoaded } = this.state;
        if(!isLoaded)
            return  (<Spinner animation="border" variant="primary" />)
        else{
            let el = info.chain
            let arr = []
            do{
                arr.push(<ElOfChain key={el.species.name} name={el.species.name}/>)
                el = el.evolves_to[0]
            }while(el !== undefined)
        return(
            <table className='details' >
                <tbody>
                    <tr>
                        <td colSpan='2' style={{textAlign:'center'}} className='caption'>Evolution chain</td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{textAlign:'center'}}>{arr}</td>
                    </tr>
                </tbody>

            </table>
        )}
        
    }
}
export default Stats;