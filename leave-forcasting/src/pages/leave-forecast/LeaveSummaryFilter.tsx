import { Button, Grid, MenuItem, TextField } from "components/shared-ui";
import { KeyValueObject } from "types/KeyValueList";
import { LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";

interface Filter {
    filter: LeaveSummaryQueryParams;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (filter: LeaveSummaryQueryParams) => void;
}

const LeaveSummaryFilter = ({ filter, onChange, onSubmit }: Filter) => {
    const orgList: KeyValueObject[] = [];
    const teamList: KeyValueObject[] = [];
    const monthList: KeyValueObject[] = [];
    const yearList: KeyValueObject[] = [];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                    select
                    fullWidth
                    name="org"
                    label="Organization"
                    variant="outlined"
                    value={filter.org}
                    onChange={onChange}
                >
                    {orgList.map((org: KeyValueObject) => (
                        <MenuItem key={org.value} value={org.value}>
                            {org.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                    select
                    fullWidth
                    name="team"
                    label="Team"
                    variant="outlined"
                    value={filter.team}
                    onChange={onChange}
                >
                    {teamList.map((team: KeyValueObject) => (
                        <MenuItem key={team.value} value={team.value}>
                            {team.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                    select
                    fullWidth
                    name="month"
                    label="Month"
                    variant="outlined"
                    value={filter.month}
                    onChange={onChange}
                >
                    {monthList.map((month: KeyValueObject) => (
                        <MenuItem key={month.value} value={month.value}>
                            {month.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                    select
                    fullWidth
                    name="year"
                    label="Year"
                    variant="outlined"
                    value={filter.year}
                    onChange={onChange}
                >
                    {yearList.map((year: KeyValueObject) => (
                        <MenuItem key={year.value} value={year.value}>
                            {year.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={() => onSubmit(filter)}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default LeaveSummaryFilter;