interface LayoutContainerProps {
	children: React.ReactNode;
	classNames?: string;
}

const LayoutContainer = ({ children, classNames }: LayoutContainerProps) => {
	return <main className={classNames}>{children}</main>;
};

export default LayoutContainer;
