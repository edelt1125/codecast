"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users } from "lucide-react"; // Import the Users icon which can represent 'Friends'
import { useUser } from "@clerk/nextjs";

function FriendsButton() {
  
  const { isSignedIn, isLoading } = useUser();

  // If user is not signed and is content is done rendering
  if (!isSignedIn && !isLoading) {
    // return component that redirects to sign in page
    // since logged out users will not have following list
    return (
      <Link href="/sign-in" className="flex items-center justify-center">
      <Button variant="ghost">
        <Users className="w-6 h-6" />
      </Button>
    </Link>
    )
  }

  return (
    <Link href="/friends" className="flex items-center justify-center">
      <Button variant="ghost">
        <Users className="w-6 h-6" />
      </Button>
    </Link>
  );
}

export default FriendsButton;
