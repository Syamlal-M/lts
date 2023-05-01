import { Dialog, DialogContent, DialogTitle, Icon, IconButton } from "components/shared-ui";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";

interface LeaveSubmissionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    filter: LeaveSummaryQueryParams;
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterSubmit: (filter: LeaveSummaryQueryParams) => void;
}

const LeaveSubmissionDialog = ({ isOpen, onClose, filter, onFilterChange, onFilterSubmit }: LeaveSubmissionDialogProps) => {
    return (
        <Dialog
            fullWidth
            maxWidth='xl'
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Leave Plans
                <IconButton onClick={onClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <LeaveSummaryFilter
                    filter={filter}
                    onChange={onFilterChange}
                    onSubmit={() => onFilterSubmit(filter)}
                />
                This is test message
            </DialogContent>
        </Dialog>
    );
}

export default LeaveSubmissionDialog;