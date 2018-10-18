import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, PromiseState } from "../../../types";
import AddButton from "../../atoms/NewButton";
import EncyclopediaCard from "../../molecules/EncyclopediaCard";

interface Props {
  encyclopedias: PromiseState<Encyclopedia[]>;
  classes: any;
}

const styles = createStyles(({ spacing }: Theme) => ({
  item: {
    cursor: "pointer",
    margin: spacing.unit,
  },
}));

const ListEncyclopedia = ({ encyclopedias, classes }: Props) => {
  if (encyclopedias.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/map">
          <AddButton />
        </a>
        <Grid container>
          {encyclopedias.value.map(encyclopedia => (
            <Grid item key={encyclopedia._id} className={classes.item}>
              <EncyclopediaCard {...encyclopedia} />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  } else if (encyclopedias.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default withStyles(styles)(
  connect(() => ({
    encyclopedias: "/api/encyclopedia",
  }))(ListEncyclopedia),
);
