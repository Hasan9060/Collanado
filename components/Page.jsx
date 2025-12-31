// components/ui/Page.jsx
const Page = ({ children, className = '' }) => {
  return (
    <div className={`w-full h-full bg-white border-4 border-accent rounded-xl shadow-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Page;