import { Grid, Skeleton } from "components/shared-ui";

interface Props {
  noOfMonths?: 1 | 2 | 3 | 4;
  noOfRows?: 2 | 3 | 4 | 5;
  noOfColumns?: 2 | 3 | 4 | 6;
}

const MonthlyLeaveListSkeleton = ({ noOfMonths = 2, noOfRows = 3, noOfColumns = 4 }: Props) => {
  return (
    <Grid container spacing={5}>
      {Array(noOfMonths)
        .fill("")
        .map((_, idx) => (
          <Grid item xs={12} key={idx}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton variant="rounded" height={"5rem"} />
              </Grid>
              {Array(noOfRows * noOfColumns)
                .fill("")
                .map((_, idx) => (
                  <Grid item xs={12 / noOfColumns} key={idx}>
                    {(idx === 0 || idx % 4 !== 0) && (
                      <Skeleton variant="rounded" height={"2.5rem"} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default MonthlyLeaveListSkeleton;
