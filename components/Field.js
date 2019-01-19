class Field extends React.Component
{
  constructor(props)
  {
    super(props);
    this.getLabel = this.getLabel.bind(this);
  }

  getLabel()
  {
    let label = "";
    for (let i = 0; i < this.props.id.length; i++)
    {
      if (this.props.id[i] == this.props.id[i].toUpperCase())
        label += " ";
      label += this.props.id[i];
    }
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  render()
  {
    return (<div>
      <p style={{fontWeight: 450, fontSize: 16, margin: "5px 0px 5px 0px"}}>{this.getLabel()}</p>
      <input type={this.props.type} style={{width: this.props.width, height: 22, fontSize: 14}} id={this.props.id} value={this.props.value} onChange={this.props.onChange}></input>
      {this.props.error && <p style={{color: "red", fontSize: 14, margin: 0}}>{this.props.msg}</p>}
    </div>);
  }
}

Field.defaultProps = {
  type: "text",
  msg: "Required field",
  width: 240
};

export default Field;
