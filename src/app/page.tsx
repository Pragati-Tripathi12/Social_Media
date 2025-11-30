import Image from "next/image";
import { SignInButton,SignedOut,SignUpButton,SignedIn,UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modetoggle";
import Link from "next/link";
import prisma from "@/lib/prisma"; 

export default async function Home() {
  await prisma
  return (
    <div> 
            
  
    </div>

  );
}
