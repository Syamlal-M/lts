import {
    Skeleton as MuiSkeleton,
    SkeletonProps as MuiSkeletonProps
} from "@mui/material";

type SkeletonProps = MuiSkeletonProps;

const Skeleton = (props: SkeletonProps) => {
    const { ...rest } = props;

    return (
        <MuiSkeleton {...rest} />
    );
}

export { Skeleton };