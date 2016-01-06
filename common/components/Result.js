import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

class Result extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(pushState(null, '/'))
  }

  render() {
    return (
      <section className="info">
        <p>{this.props.result.msg}</p>
        <button onClick={this.handleClick.bind(this)}>Go back</button>
      </section>
    )
  }
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {result: state.router.location.state.result}
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)
