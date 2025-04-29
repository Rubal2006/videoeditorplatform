import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
  <>
    <header className=" bg-black-500 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="text-4xl font-bold">
        video-<span className="text-blue-500">editor</span>
      </div>
      <nav className="space-x-10 hidden md:flex">
       <a href="#" className="hover:text-blue-400 text-2xl">Home</a>
       <a href="#" className="hover:text-blue-400 text-2xl">Features</a>
       <a href="#" className="hover:text-blue-400 text-2xl">Pricing</a>
       <a href="#" className="hover:text-blue-400 text-2xl">Contact</a>
      </nav>
      <div className="md:hidden">
        <button className="text-white hover:text-blue-400"> ☰</button>
     </div>
    </header>


    <div className=" text-center justify-center py-60 ">
      <h1 className="text-6xl font-bold mb-6 text-white">Welcome to Video Editor</h1>
      <p className="text-muted-foreground text-1xl text-white mb-10">
      Upload, edit, subtitle, overlay, and preview your videos — all inside the browser!
      </p>
      <Link href="/upload">
        <Button size="lg" className="text-2xl font-bold text-white bg-pink-800">Get Started</Button>
      </Link>
    </div>
  </>
);
}


