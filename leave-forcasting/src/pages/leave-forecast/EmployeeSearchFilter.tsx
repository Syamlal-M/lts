import { KeyValueObject } from "types/KeyValueList";
import { Button, Grid, MenuItem, TextField } from "components/shared-ui";
import { EmployeeSearchQueryParams } from "types/api/employee/EmployeeSearch.types";
import { useSelectListContext } from "context/SelectListContext";

interface Filter {
    filter: EmployeeSearchQueryParams;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (filter: EmployeeSearchQueryParams) => void;
}

const EmployeeSearchFilter = ({ filter, onChange, onSubmit }: Filter) => {
    const { ORGANIZATIONS, TEAMS } = useSelectListContext();

    return (
        <>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <TextField
                    select
                    fullWidth
                    name="org"
                    label="Organization"
                    variant="outlined"
                    value={filter.org}
                    onChange={onChange}
                >
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
                    onChange={onChange}
                >
                    {TEAMS.map((team: KeyValueObject) => (
                        <MenuItem key={team.value} value={team.value}>
                            {team.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={filter.name}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    value={filter.location}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={() => onSubmit(filter)}
                >
                    Search
                </Button>
            </Grid>
        </>
    );
};

export default EmployeeSearchFilter;