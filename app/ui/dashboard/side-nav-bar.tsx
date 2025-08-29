const SideNavBar = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="h-auto w-full grow rounded-md bg-brown-100">
        <div className="flex justify-center items-center h-20 w-full border-b border-brown-300">
          <p className="text-xl font-bold text-brown-600">{}</p>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
