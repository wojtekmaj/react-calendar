import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Grid extends Component {
  get gridTemplateColumns() {
    const { count, grow, width } = this.props;

    let track;
    if (width) {
      if (grow) {
        track = `minmax(${width}px, 1fr)`;
      } else {
        track = `${width}px`;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (typeof count === 'number') {
        track = '1fr';
      } else {
        // @TODO: Figure out if it's possible to make it smarter (without px)
        track = 'minmax(100px, 1fr)';
      }
    }

    return `repeat(${count}, ${track})`;
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          display: 'grid',
          gridTemplateColumns: this.gridTemplateColumns,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Grid.defaultProps = {
  count: 'auto-fill',
};

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.oneOfType([
    PropTypes.oneOf(['auto-fill']),
    PropTypes.number,
  ]),
  grow: PropTypes.bool,
  width: PropTypes.number,
};
