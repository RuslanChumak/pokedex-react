import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import EvolutionChain from './EvolutionChain'
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
        return(
            <div>
            <table className='details'>
                <tbody>
                <tr>
                    <td className='caption' style={{textAlign:'center'}} colSpan='2'>Species</td>
                </tr>
                <tr>
                    <td>Base Happiness:</td>
                    <td>{info.base_happiness}</td>
                </tr>
                <tr>
                    <td>Capture rate:</td>
                    <td>{info.capture_rate}</td>
                </tr>
                <tr>
                    <td>Hatch counter</td>
                    <td>{info.hatch_counter}</td>
                </tr>
                <tr>
                    <td>Growth rate:</td>
                    <td>{info.growth_rate.name}</td>
                </tr>
                <tr>
                <td>Generation:</td>
                <td>{info.generation.name}</td>
            </tr>
            <tr>
            <td>Shape:</td>
            <td>{info.shape.name}</td>
        </tr>
        </tbody>
        </table>
        <EvolutionChain url={info.evolution_chain.url}/>
        </div>
        )}
        
    }
}
export default Stats;