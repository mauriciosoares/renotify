import React, {PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';
import notifiable from '../notifiable';

class Item extends React.Component {
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
    theme: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.closeNotification = props.closeNotification.bind(null, props.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    const {dismiss, dismissTimeout, closeNotification, id, onAdd} = this.props;

    onAdd && onAdd();

    if(dismiss) {
      this.timeout = setTimeout(() => {
        closeNotification(id);
      }, dismissTimeout);
    }
  }

  componentWillUnmount() {
    const {onRemove} = this.props;

    onRemove && onRemove();

    clearInterval(this.timeout);
  }

  render() {
    const {title, message, theme, id, type} = this.props;
    const actions = this._getActions();
    const itemTheme = theme(id, 'item');

    return (
      <div key={itemTheme.key} className={classNames(itemTheme.className, type)}>
        <div {...theme(`${id}-texts`, 'itemTexts')}>
          <div {...theme(`${id}-title`, 'itemTitle')}>
            {title}
          </div>
          <div {...theme(`${id}-message`, 'itemMessage')}>
            {message}
          </div>
        </div>
        <div {...theme(`${id}-actions`, 'itemActions')}>
          {actions}
        </div>
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

export default notifiable()(Item);
