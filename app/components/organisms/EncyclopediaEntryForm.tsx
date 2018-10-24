import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Encyclopedia, EncyclopediaEntry } from "../../types";

export interface State {
  name: string;
  content: string;
}

interface Props {
  classes: any;
  encyclopedia: Encyclopedia;
  entry: Partial<EncyclopediaEntry>;
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

class EncyclopediaEntryForm extends React.Component<Props> {
  public state = {
    content: this.props.entry.content || "",
    name: this.props.entry.name || "",
  };

  public render() {
    const { classes, encyclopedia } = this.props;
    const { name, content } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Grid container justify="center" spacing={8} className={classes.root}>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.paper}>
              <Typography variant="h3">{encyclopedia.name}</Typography>
              <Typography variant="body1">
                {encyclopedia.description}
              </Typography>
              <small>
                <a href={`/encyclopedia/${encyclopedia._id}`}>
                  Back to encyclopedia
                </a>
              </small>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.paper}>
              <Input
                placeholder="Entry Name"
                type="text"
                fullWidth
                value={name}
                name="name"
                onChange={this.handleChange}
              />
              <Input
                placeholder="content"
                type="text"
                fullWidth
                value={content}
                name="content"
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

export default withStyles(styles)(EncyclopediaEntryForm);
