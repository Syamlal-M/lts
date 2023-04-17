import { SxProps, Breakpoint } from "@mui/material";
import { Container } from "components/shared-ui";
import { useDocumentTitle } from "usehooks-ts";

interface PageContainerProps {
    children?: React.ReactNode,
    title?: string,
    disableGutters?: boolean,
    maxWidth?: false | Breakpoint,
    sx?: SxProps,
}

PageContainer.defaultProps = {
    title: "Leave Tracker System",
    maxWidth: false,
}

function PageContainer(props: PageContainerProps) {
    const { children, title, disableGutters, sx, maxWidth } = props;

    useDocumentTitle(`${title}`);

    return (
        <Container
            disableGutters={disableGutters}
            sx={sx ? sx : disableGutters ? { py: 0 } : { py: 3 }}
            maxWidth={maxWidth}
        >
            {children}
        </Container>
    );
}

export { PageContainer };