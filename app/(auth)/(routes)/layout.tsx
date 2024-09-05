interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
