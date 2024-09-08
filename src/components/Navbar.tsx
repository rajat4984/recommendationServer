const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between pb-5 p-10 px-5 md:px-20 items-center">
        <div className="md:text-2xl text-xl">
          <span className="md:text-5xl text-4xl">R</span>ecommend.me
        </div>
        <div className="flex justify-between self-end">
          <p className="md:mx-2 hover:bg-white hover:text-black rounded p-1 cursor-pointer transition-all">
            FAQ
          </p>
          <p className="md:mx-2 hover:bg-white hover:text-black rounded p-1 cursor-pointer transition-all">
            Github
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
