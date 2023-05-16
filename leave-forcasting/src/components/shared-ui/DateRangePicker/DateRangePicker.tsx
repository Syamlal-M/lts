import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Grid } from 'components/shared-ui';
import { RegularBreakpoints } from '@mui/material';

const RANGE = {
    START: "start",
    END: "end",
} as const;

type RangeProps = {
    [key in keyof typeof RANGE as typeof RANGE[key]]: string | undefined | boolean;
};

interface DateRangePickerProps {
    label?: RangeProps;
    value: RangeProps;
    onChange?: any;
    minDate?: any;
    maxDate?: any;
    format?: any;
    gridBreakpoints?: RegularBreakpoints;
    disabled?: RangeProps;
    helperText?: RangeProps;
};

const DateRangePicker = ({ label, value, onChange, minDate, maxDate, format, gridBreakpoints, disabled, helperText }: DateRangePickerProps) => {
    const DEFAULT_FORMAT = "DD/MM/YYYY";
    const FORMAT = format || DEFAULT_FORMAT;

    const formatDate = (date: any) => (dayjs(date, FORMAT));
    const t = formatDate;

    const MIN_DATE = minDate ? t(minDate) : t(dayjs());
    const MAX_DATE = maxDate ? t(maxDate) : t(dayjs().add(90, 'day'));

    const handleChange = (key: any, _value: any) => {
        onChange({ ...value, [key]: _value.format(FORMAT) })
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item {...gridBreakpoints}>
                    <MobileDatePicker
                        disabled={Boolean(disabled?.start)}
                        format={FORMAT}
                        label={label?.start}
                        value={t(value?.start)}
                        minDate={MIN_DATE}
                        maxDate={t(value.end)}
                        onChange={(value) => { handleChange("start", value) }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: helperText?.start ? true : false,
                                inputProps: { readOnly: true },
                                helperText: helperText?.start === undefined ? "" : helperText?.start
                            }
                        }}
                    />
                </Grid>
                <Grid item {...gridBreakpoints}>
                    <MobileDatePicker
                        disabled={Boolean(disabled?.end)}
                        format={FORMAT}
                        label={label?.end}
                        value={t(value?.end)}
                        onChange={(value) => handleChange("end", value)}
                        minDate={value?.start ? t(value?.start) : MIN_DATE}
                        maxDate={MAX_DATE}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: helperText?.end ? true : false,
                                inputProps: { readOnly: true },
                                helperText: helperText?.end === undefined ? "" : helperText?.end
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )

}
export { DateRangePicker };