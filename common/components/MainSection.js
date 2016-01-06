import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../actions/Actions'

const placeholder = `Enter your want subscribe\'s packages
e.g.
koa
co
...

A week to send an email about package version information
`

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: '',
      packs: ''
    }
  }

  handleChange(prop, e) {
    let newState = {}
    newState[prop] = e.target.value
    this.setState(newState)
  }

  handleClick(e) {
    this.props.actions.subscribePacks(this.state.email, this.state.packs)
  }

  render() {
    return (
      <section className="main">
        <input
          onChange={this.handleChange.bind(this, 'email')}
          type="text"
          placeholder="Enter your email" />
        <button
          onClick={this.handleClick.bind(this)}
          >
          Subscribe
        </button>
        <textarea
          onChange={this.handleChange.bind(this, 'packs')}
          className="input-packs"
          rows={20}
          cols={40}
          placeholder={placeholder} >
        </textarea>
      </section>
    )
  }
}

MainSection.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {...state}
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatch: dispatch,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)
