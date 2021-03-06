import './style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { UniqueIndex } from 'utils/base'

const $ = window.$ || document.querySelector.bind(document)

export default class Modal extends React.Component {

  componentId = 'BRAFT-MODAL-' + UniqueIndex()
  state = {
    visible: false
  }

  componentDidMount () {

    if (this.props.visible) {
      this.setState({
        visible: true
      })
    }

    this.rootElement = $('#' + this.componentId)

    if (!this.rootElement) {
      this.rootElement = document.createElement('div')
      this.rootElement.id = this.componentId
      this.rootElement.className = 'braft-modal-root'
      document.body.appendChild(this.rootElement)
    }

  }

  componentWillReceiveProps (next) {

    if (this.props.visible && !next.visible) {
      this.unrenderComponent()
    } else if (this.props.visible || next.visible) {
      this.renderComponent(next)
    }

  }

  render () {
    return null
  }

  handleTransitionEnd = () => {

    if (!this.rootElement || !this.rootElement.classList) {
      return false
    }

    if (!this.rootElement.classList.contains('active')) {
      ReactDOM.unmountComponentAtNode(this.rootElement)
    }

  }

  unrenderComponent () {
    this.rootElement.classList.remove('active')
  }

  renderComponent (props) {

    const { title, className, width, height, children, confirmable, showCancel, showClose, bottomText, language } = props
    const childComponent = (
      <div className={"braft-modal " + (className || '')}>
        <div className="braft-modal-mask"></div>
        <div onTransitionEnd={this.handleTransitionEnd} style={{width, height}} className="braft-modal-content">
          <div className="braft-modal-header">
            <h3 className="braft-modal-caption">{title}</h3>
            {showClose && <button onClick={this.close} className="braft-modal-close-button"><i className="icon-close"></i></button>}
          </div>
          <div className="braft-modal-body">{children}</div>
          <div className="braft-modal-footer">
            <div className="braft-modal-addon-text">{bottomText}</div>
            <div className="braft-modal-buttons">
              {showCancel && <button onClick={this.handleCancel} className="braft-modal-cancel">{language.base.cancel}</button>}
              <button onClick={this.handleConfirm} className={"braft-modal-confirm " + (!confirmable ? 'disabled' : '')}>{language.base.confirm}</button>
            </div>
          </div>
        </div>
      </div>
    )

    ReactDOM.render(childComponent, this.rootElement)
    setImmediate(() => {
      this.rootElement.classList.add('active')
    })

  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel()
  }

  handleConfirm = () => {
    this.props.onConfirm && this.props.onConfirm()
  }

  close = () => {
    this.props.onClose && this.props.onClose()
  }

}
