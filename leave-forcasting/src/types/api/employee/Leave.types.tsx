enum LEAVE_DATE_SPAN {
    FULL = "FULL",
    HALF = "HALF",
};
type LeaveDateSpan = `${LEAVE_DATE_SPAN}`;

enum LEAVE_DATE_ACTION {
    INSERT = "INSERT",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
};
type LeaveDateAction = `${LEAVE_DATE_ACTION}`;

enum LEAVE_DATE_PLANNING_TYPE {
    ACTUAL = "ACTUAL",
    EXPECTED_WITH_LEAVES = "EXPECTED_WITH_LEAVES",
    EXPECTED_NO_LEAVES = "EXPECTED_NO_LEAVES",
};
type LeaveDatePlanningType = `${LEAVE_DATE_PLANNING_TYPE}`;

export type {
    LeaveDateSpan,
    LeaveDateAction,
    LeaveDatePlanningType,
};

export {
    LEAVE_DATE_SPAN,
    LEAVE_DATE_ACTION,
    LEAVE_DATE_PLANNING_TYPE,
}