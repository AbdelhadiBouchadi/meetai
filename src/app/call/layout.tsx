interface Props {
  children: React.ReactNode;
}

const CallLayout = ({ children }: Props) => {
  return <div className="bg-accent-foreground h-screen">{children}</div>;
};

export default CallLayout;
