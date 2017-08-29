import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';
import renotify from '../renotify';

export class Item extends React.Component {
  static displayName = 'Item';

  static propTypes = {
    dismiss: PropTypes.bool.isRequired,
    dismissTimeout: PropTypes.number.isRequired,
    closeNotification: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    actions: PropTypes.array,
    type: PropTypes.string,
    Template: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ])
  };

  constructor(props) {
    super();

    this.closeNotification = props.closeNotification.bind(null, props.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    const {dismiss, dismissTimeout, onAdd} = this.props;

    onAdd && onAdd();

    if(dismiss) {
      this.timeout = setTimeout(() => {
        this.closeNotification();
      }, dismissTimeout);
    }
  }

  componentWillUnmount() {
    const {onRemove} = this.props;

    onRemove && onRemove();

    clearInterval(this.timeout);
  }

  render() {
    const {title, message, id, type, Template} = this.props;
    const actions = this._getActions();
    const hasTemplate = (Template !== null);

    return (
      <div className={classNames('renotify__item', type)}>
        {hasTemplate ?
          <Template title={title} message={message} actions={actions} /> :
          [
            <div key="1" className={classNames(`${id}-texts`, 'renotify__item-texts')}>
              <div className={classNames(`${id}-title`, 'renotify__item-title')}>
                {title}
              </div>
              <div
                className={classNames(`${id}-message`, 'renotify__item-message')}
                dangerouslySetInnerHTML={{__html: message}} />
            </div>,
            <div key="2" className={classNames(`${id}-actions`, 'renotify__item-actions')}>
              {actions}
            </div>
          ]
        }
      </div>
    );
  }

  _getActions() {
    const {actions} = this.props;

    return actions.map(({label, callback}, index) => (
      <button
        key={index}
        onClick={() => callback ? callback(this.closeNotification) : this.closeNotification()}>
        {label}
      </button>
    ));
  }
}

export default renotify()(Item);
