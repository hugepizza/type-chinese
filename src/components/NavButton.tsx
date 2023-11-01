import { Link } from "react-router-dom";

export default function NavButton({ to }: { to: string }) {
  return (
    <Link to={to} className="btn btn-square fixed left-0 top-0 text-2xl bg-transparent">
      ←
    </Link>
  );
}
