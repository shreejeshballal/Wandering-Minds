import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-[5rem] 2xl:container px-5 sm:px-10 w-full min-h-screen">
      {children}
    </section>
  );
};

export default Layout;
