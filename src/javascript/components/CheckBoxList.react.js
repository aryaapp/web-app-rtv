var React = require('react');

module.exports = React.createClass({
  propTypes: {
    defaultData: React.PropTypes.array,
    onChange: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      data: this.props.defaultData || []
    };
  },

  handleItemChange: function(e) {
    var selectedValues = [],
      newData = [];

    this.state.data.forEach(function(item) {
      if(item.value === e.target.value) {
        item.checked = e.target.checked;
      }
      if(item.checked) {
        selectedValues.push(item.value);
      }
      newData.push(item);
    });

    this.setState({data: newData});

    if(this.props.onChange) {
      this.props.onChange(selectedValues);
    }
  },

  // uncheck all items in the list
  reset: function() {
    var newData = [];
    this.state.data.forEach(function(item) {
      item.checked = false;
      newData.push(item);
    });

    this.setState({data: newData});
  },

  checkAll: function() {
    var newData = [];
    this.state.data.forEach(function(item) {
      item.checked = true;
      newData.push(item);
    });

    this.setState({data: newData});
  },

  componentWillReceiveProps: function(nextProps) {
    let newDataState = []
    nextProps.defaultData.forEach( (newStateItem) => {
      this.state.data.forEach( (oldStateItem) => {
        if (oldStateItem.value == newStateItem.value) {
          newStateItem.checked = oldStateItem.checked
          newDataState.push(newStateItem)
        }
      })
      if($.inArray(newStateItem, newDataState) == -1) {
        newDataState.push(newStateItem)
      }
    })
    this.setState({ data: newDataState })
  },

  render: function() {
    var options;

    options = this.state.data.map(function(item, index) {
      return (
        React.createElement("div", {key: 'chk-' + index, className: "checkbox"},
          React.createElement("label", null,
            React.createElement("input", {
              type: "checkbox",
              value: item.value,
              onChange: this.handleItemChange,
              checked: item.checked ? true : false}), " ", item.label
          )
        )
      );
    }.bind(this));

    return (
      React.createElement("div", null,
        options
      )
    );
  }
});