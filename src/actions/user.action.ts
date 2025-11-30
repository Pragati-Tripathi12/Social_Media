"use server";

import {auth, currentUser} from "@clerk/nextjs/server";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export async function syncUser(){
    try{
        const {userId} =await auth();
        const user=await currentUser();
        if(!userId || !user) return;
        
        const existingUser=await prisma.user.findUnique({
            where:{clerkId:userId}
        });
        if(existingUser) return existingUser; 
        const dbUser=await prisma.user.create({
            data:{
                clerkId:userId,
                name:`${user.firstName || ""} ${user.lastName || ""}`,
                email:user.emailAddresses[0]?.emailAddress || "",
                username:user.username ?? (user.emailAddresses[0]?.emailAddress.split("@")[0] || ""),
                image:user.imageUrl,
        },
    }) ;
return dbUser   }
catch(error){
    console.error("Error syncing user:",error);
}
}
export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
}
export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id;
}

