import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Change, Value } from "slate";
import { Editor } from "slate-react";
import { Encyclopedia, EncyclopediaEntry } from "../../types";

export interface State {
  name: string;
  value: Value;
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

const defaultValue = {
  document: {
    nodes: [
      {
        nodes: [
          {
            leaves: [
              {
                text: "Description.",
              },
            ],
            object: "text",
          },
        ],
        object: "block",
        type: "paragraph",
      },
    ],
  },
};

class EncyclopediaEntryForm extends React.Component<Props> {
  public state = {
    name: this.props.entry.name || "",
    value: Value.fromJSON(
      JSON.parse(
        (this.props.entry && this.props.entry.content) ||
          JSON.stringify(defaultValue),
      ),
    ),
  };

  public render() {
    const { classes, encyclopedia } = this.props;
    const { name, value } = this.state;
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
              <Editor
                value={value}
                onChange={this.handleEditorChange}
                className={classes.paper}
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

  private handleEditorChange = ({ value }: Change) => {
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };
}

export default withStyles(styles)(EncyclopediaEntryForm);
