import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: 'none'
    }
  }
  render() {
    return (
      <div>
        <input type='text' ref='inputName' placeholder='Name'/>
        <input type='text' ref='inputOpenHour' placeholder='Open Hour'/>
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
        <button onClick={(e)=>this.handleEditClick(e)}
          style={{display:this.handleEditstate()}}>
            Edit
        </button>
      </div>
    )
  }
  //pass the value after click edit-button
  handleEditClick(e){
    const nodeName = this.refs.inputName
    const name = nodeName.value.trim()
    const nodeOpenHour = this.refs.inputOpenHour
    const openHour = nodeOpenHour.value.trim()
    const sale={name:name,openHour:openHour,id:this.props.isEdit.id}
    console.log('edited click',sale)
    this.props.onEditedClick(sale)
    nodeName.value = ''
    nodeOpenHour.value = ''
  }
  //show the wait-for-editing-value on input components
  handleEdit(sale){
    const nodeName = this.refs.inputName
    const nodeOpenHour = this.refs.inputOpenHour
    nodeName.value = sale.name
    nodeOpenHour.value = sale.openHour
  }
  //control the edit button if is show
  handleEditstate(){
    console.log('handle edit state',this.props.isEdit)

    switch(this.props.isEdit.isediting){
      case 'IS_EDITING':
        this.handleEdit(this.props.isEdit.sale)
        return 'inline-block'
        break
      case 'NOT_EDITING':
        return 'none'
        break
      default:
        return 'none'
    }
  }
  handleClick(e) {
    //console.log('addTodo component')
    const nodeName = this.refs.inputName
    const name = nodeName.value.trim()
    const nodeOpenHour = this.refs.inputOpenHour
    const openHour = nodeOpenHour.value.trim()
    const sale={name:name,openHour:openHour}
    this.props.onAddClick(sale)
    nodeName.value = ''
    nodeOpenHour.value = ''
  }
}

AddTodo.propTypes = {
  isEdit:PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditedClick:PropTypes.func.isRequired
}
