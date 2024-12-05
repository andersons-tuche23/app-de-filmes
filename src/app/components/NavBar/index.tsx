import Link from 'next/link';
import './index.scss';

export default function NaviBar() {
  return (
    <nav className="navbar">
      <Link href={'/'}>
      <h1 className="page-title">Filmes</h1>
      </Link>
    </nav>
  );
}
