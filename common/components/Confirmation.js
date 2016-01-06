import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { confirm } from '../actions/Actions'


class Confirmation extends Component {
  componentWillMount() {
    let query = this.props.location.query
    this.props.actions.confirm(query.email, query.token)
  }

  render() {
    return (
      <section>
        <p>Redirecting...</p>
      </section>
    )
  }
}

export default connect(
  (state) => {
    return {}
  },
  (dispatch) => { 
    return {
      actions: bindActionCreators({ confirm }, dispatch)
    }
  }
)(Confirmation)

