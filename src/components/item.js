import React, {PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';
import notifiable from '../notifiable';

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
    theme: PropTypes.func.isRequired,
    Template: React.PropTypes.oneOfType([
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
    const {title, message, theme, id, type, Template} = this.props;
    const actions = this._getActions();
    const itemTheme = theme(id, 'item');
    const hasTemplate = (Template !== null);

    return (
      <div key={itemTheme.key} className={classNames(itemTheme.className, type)}>
        {hasTemplate ?
          <Template title={title} message={message} actions={actions} /> :
          [
            <div {...theme(`${id}-texts`, 'itemTexts')}>
              <div {...theme(`${id}-title`, 'itemTitle')}>
                {title}
              </div>
              <div
                {...theme(`${id}-message`, 'itemMessage')}
                dangerouslySetInnerHTML={{__html: message}} />
            </div>,
            <div {...theme(`${id}-actions`, 'itemActions')}>
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

export default notifiable()(Item);
