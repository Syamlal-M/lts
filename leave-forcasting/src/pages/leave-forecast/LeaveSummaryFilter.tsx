import { Button, Grid, MenuItem, TextField } from "components/shared-ui";
import { useSelectListContext } from "context/SelectListContext";
import { KeyValueObject } from "types/KeyValueList";
import { LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";

interface Filter {
  filter: LeaveSummaryQueryParams;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (filter: LeaveSummaryQueryParams) => void;
}

const LeaveSummaryFilter = ({ filter, onChange, onSubmit }: Filter) => {
  const { ORGANIZATIONS, TEAMS, MONTHS, YEARS } = useSelectListContext();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <TextField
          select
          fullWidth
          name="org"
          label="Organization"
          variant="outlined"
          value={filter.org}
          onChange={onChange}>
          {ORGANIZATIONS.map((org: KeyValueObject) => (
            <MenuItem key={org.value} value={org.value}>
              {org.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <TextField
          select
          fullWidth
          name="team"
          label="Team"
          variant="outlined"
          value={filter.team}
          onChange={onChange}>
          {TEAMS.map((team: KeyValueObject) => (
            <MenuItem key={team.value} value={team.value}>
              {team.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <TextField
          select
          fullWidth
          name="month"
          label="Month"
          variant="outlined"
          value={filter.month}
          onChange={onChange}>
          {MONTHS.map((month: KeyValueObject) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <TextField
          select
          fullWidth
          name="year"
          label="Year"
          variant="outlined"
          value={filter.year}
          onChange={onChange}>
          {YEARS.map((year: KeyValueObject) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Button fullWidth type="submit" variant="contained" onClick={() => onSubmit(filter)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default LeaveSummaryFilter;
