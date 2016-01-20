import React, { Component, PropTypes } from 'react'

export default class Todo extends Component {
  render() {
    return (
      <li
        style={{
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        <h1>{this.props.sale.name}</h1>
        <p>{this.props.sale.openHour}</p>
        <span onClick={this.props.onDeleteClick}
          style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            X
        </span>
        <span className="fa-edit" onClick={this.props.onEditClick}
          style={{ color: 'black', marginLeft: '10px', cursor: 'pointer', 'font-family':'FontAwesome' }}>
        </span>
      </li>
    )
  }
}

Todo.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  sale: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired
}
