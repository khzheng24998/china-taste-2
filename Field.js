class Field extends React.Component
{
  constructor(props)
  {
    super(props);

    this.getLabel = this.getLabel.bind(this);
  }

  getLabel() { return this.props.id.charAt(0).toUpperCase() + this.props.id.slice(1); }

  render()
  {
    return (<div>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <p style={{fontWeight: 450, fontSize: 16}}>{this.getLabel()}</p>
      <input type={this.props.type} style={{width: this.props.width, height: 22, fontSize: 14}} id={this.props.id} value={this.props.value} onChange={this.props.onChange}></input>
      {this.props.error && <p style={{color: "red"}}>{this.props.msg}</p>}
    </div>);
  }
}

Field.defaultProps = {
  type: "text",
  msg: "Required field.",
  width: 240
};

export default Field;
