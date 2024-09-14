import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex justify-center items-center space-x-8">
          <li><Link href="/" className="text-lg font-semibold hover:text-purple-200 transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-lg font-semibold hover:text-purple-200 transition-colors">About</Link></li>
          <li><Link href="/contact" className="text-lg font-semibold hover:text-purple-200 transition-colors">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}