import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Encyclopedia } from "../../types";

export interface State {
  name: string;
  description: string;
}

interface Props {
  classes: any;
  encyclopedia: Partial<Encyclopedia>;
  onChange?: (s: State) => void;
  onSubmit?: (s: State) => void;
}

const styles = createStyles(({ spacing }: Theme) => ({
  paper: {
    padding: spacing.unit,
  },
  root: {
    padding: spacing.unit,
  },
}));

class EncyclopediaForm extends React.Component<Props> {
  public state = {
    description: this.props.encyclopedia.description || "",
    name: this.props.encyclopedia.name || "",
  };

  public render() {
    const { classes } = this.props;
    const { name, description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Grid container justify="center" spacing={8} className={classes.root}>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.paper}>
              <small>
                <a href="/encyclopedia">Back to encyclopedias</a>
              </small>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.paper}>
              <Input
                placeholder="Encyclopedia Name"
                type="text"
                fullWidth
                value={name}
                name="name"
                onChange={this.handleChange}
              />
              <Input
                placeholder="Description"
                type="text"
                fullWidth
                value={description}
                name="description"
                onChange={this.handleChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Button type="submit" variant="contained" onClick={this.onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  private onSubmit = (
    e: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  };

  private handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [target.name]: target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };
}

export default withStyles(styles)(EncyclopediaForm);
