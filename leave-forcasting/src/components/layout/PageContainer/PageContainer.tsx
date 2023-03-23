import { useDocumentTitle } from "usehooks-ts";

interface PageContainerProps {
    children: React.ReactNode,
    title?: string
}

PageContainer.defaultProps = {
    title: "Leave Tracker System"
}

function PageContainer({ children, title }: PageContainerProps) {
    useDocumentTitle(`${title}`);

    return (<>{children}</>);
}

export { PageContainer };