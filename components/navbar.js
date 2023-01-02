import Link from "next/link";

const Navbar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/mint">Mint</Link>
        </li>
        <li>
          <Link href="/allowList">whitelist</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
