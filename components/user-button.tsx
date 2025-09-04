"use client"

import { useState } from "react"
import { User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/redux/hooks"
import { logoutUser } from "@/redux/slices/authSlice"
import { toast } from "react-hot-toast"

interface UserButtonProps {
  user: {
    username: string
    email: string
    avatar?: string
  }
}

export function UserButton({ user }: UserButtonProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false)

    // Get the first letter of username for avatar fallback
    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase()
    }

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            router.push("/sign-in");
        } catch (error: any) {
            toast.error(error);
        }
    }

    const handleViewProfile = () => {
        // Navigate to profile page
        // router.push("/profile")
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {getInitials(user.username)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
