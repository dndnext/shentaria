import React, { ChangeEvent, FormEvent } from "react";

class NewEncyclopediaEntry extends React.Component {
  public state = {
    description: "",
    name: "",
  };

  public render() {
    const { name, description } = this.state;
    return (
      <form onSubmit={this.submit}>
        <input type="text" name="name" onChange={this.onChange} value={name} />
        <textarea
          name="description"
          onChange={this.onChange}
          value={description}
        />
        <input type="submit" onClick={this.submit} />
      </form>
    );
  }

  private onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [target.name]: target.value });
  };

  private submit = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
  };
}

export default NewEncyclopediaEntry;
