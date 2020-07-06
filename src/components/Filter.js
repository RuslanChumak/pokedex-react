import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Filter extends Component{
    render(){
        
        const { types, filter,limit, page,changeLimit, deleteFilter,typeOnChange, handleSort, handleReset  } = this.props;
            let selectTypes = types.map((el,id) =>
            <option  key={id} value={el.name}>{el.name[0].toUpperCase()+el.name.slice(1)}</option>
            )
            let selected = filter.map((el,id)=>
            <div  key={id} className={'tag '+el}>{el}<div id={id} onClick={deleteFilter} className="delete in">X</div></div>
            )
            return (
                <div>
                <div>Page:{page}</div>
                    <div>
                        Items in page: {limit}
                        <div>
                        <Button className="limit" onClick={changeLimit}>10</Button>
                        <Button className="limit" onClick={changeLimit}>20</Button>
                        <Button className="limit" onClick={changeLimit}>50</Button>
                        </div>
                    </div>
                    <Row  style={{justifyContent:'flex-start'}}>
                        <Form className='col-5 col-lg-2'>
                            <Form.Label>Filter by type</Form.Label>
                            <Form.Control onChange={typeOnChange} as="select">
                                
                                {selectTypes}
                            </Form.Control>
                        </Form>
                        <Form className='col-5 col-lg-3'>
                            <Form.Label>Sort by</Form.Label>
                            <Form.Control onChange={handleSort} id='sort' as="select">
                                <option value='default' >Default</option>
                                <option value='asc'>Name(alphabetically)</option>
                                <option value='desc'>Name(against alphabet)</option>
                            </Form.Control>
                        </Form>
                        <div className='col-2 col-lg-2'><div style={{color:'white'}}>.</div><Button onClick={handleReset} style={{marginTop:'8px'}}>Reset</Button></div>
                        <div className='col-12 col-lg-12'>
                            {selected}     
                        </div>
                    </Row>
                    </div>
            )
        
        
    };
}
export default Filter;