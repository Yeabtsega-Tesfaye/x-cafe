export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 px-8 py-5 backdrop-blur-md">
  <h1 className="text-2xl font-bold tracking-tight">
    X Cafe
  </h1>

  <div className="flex items-center gap-8">
    <nav className="flex gap-6 text-sm font-medium">
        <a
  href="#"
  className="text-orange-500 transition-colors hover:text-orange-600"
>
  Home
</a>
        <a href="#"className="transition-colors hover:text-orange-500">Menu</a>
        <a href="#"className="transition-colors hover:text-orange-500">About</a>
        <a href="#"className="transition-colors hover:text-orange-500">Contact</a>
     </nav>

    <a
      href="#"
      className="rounded-full bg-orange-500 px-5 py-2 text-white transition-colors hover:bg-orange-600"
    >
      Order Now
    </a>
  </div>
</header>
  );
}