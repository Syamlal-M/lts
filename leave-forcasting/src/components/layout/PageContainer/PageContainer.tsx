import { SxProps } from "@mui/material";
import { Container } from "components/shared-ui";
import { useDocumentTitle } from "usehooks-ts";

interface PageContainerProps {
    children?: React.ReactNode,
    title?: string,
    disableGutters?: boolean,
    fixed?: boolean,
    sx?: SxProps,
    component?: React.ElementType
}

PageContainer.defaultProps = {
    title: "Leave Tracker System"
}

function PageContainer(props: PageContainerProps) {
    const { children, title, disableGutters, sx, ...rest } = props;

    useDocumentTitle(`${title}`);

    return (
        <Container
            disableGutters={disableGutters}
            sx={sx ? sx : disableGutters ? { py: 0 } : { py: 3 }}
            {...rest}
        >
            {children}
        </Container>
    );
}

export { PageContainer };