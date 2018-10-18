import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import connect from "../../../lib/connect";
import { Map, PromiseState } from "../../../types";
import AddButton from "../../atoms/NewButton";
import MapCard from "../../molecules/MapCard";

interface Props {
  maps: PromiseState<Map[]>;
  classes: any;
}

const styles = createStyles(({ spacing }: Theme) => ({
  item: {
    cursor: "pointer",
    margin: spacing.unit,
  },
}));

const ListMap = ({ maps, classes }: Props) => {
  if (maps.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/map">
          <AddButton />
        </a>
        <Grid container>
          {maps.value.map(map => (
            <Grid item key={map._id} className={classes.item}>
              <MapCard {...map} />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  } else if (maps.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default withStyles(styles)(
  connect(() => ({
    maps: "/api/map",
  }))(ListMap),
);
