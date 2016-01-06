import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import Header from '../components/Header'
import MainSection from '../components/MainSection'
import Footer from '../components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, inputValue } = this.props

    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}


function mapDispatchToProps(dispatch) {
  return {dispatch}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    pushState
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App)
