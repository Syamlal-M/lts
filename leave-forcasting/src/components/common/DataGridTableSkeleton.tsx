import { Grid, Skeleton } from "components/shared-ui";

interface Props {
  noOfRows?: number;
  noOfColumns?: 2 | 3 | 4 | 6;
}

const DataGridTableSkeleton = ({ noOfRows = 10, noOfColumns = 6 }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="rounded" height="5rem" />
      </Grid>
      {Array(noOfRows * noOfColumns)
        .fill("")
        .map((_, idx) => (
          <Grid item xs={12 / noOfColumns} key={idx}>
            <Skeleton />
          </Grid>
        ))}
      <Grid item xs={12}>
        <Skeleton variant="rounded" height="5rem" />
      </Grid>
    </Grid>
  );
};

export default DataGridTableSkeleton;
