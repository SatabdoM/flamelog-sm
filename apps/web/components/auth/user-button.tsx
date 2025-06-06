'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { useAuthStore } from '@/store/auth';

export const UserButton = () => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return null;
  }

  const onLogoutClick = async () => {
    clearAuth();
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full p-0.5 outline-none">
        <Avatar className="size-8">
          <AvatarImage src={user?.image || ''} alt="user" />
          <AvatarFallback className="bg-muted h-full w-full">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-card relative z-[999] mr-5 w-80 px-2.5 py-4 shadow-2xl">
        <div className="mb-4 flex items-center gap-3 px-2 pr-5">
          <Avatar className="size-9.5">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="bg-muted h-full w-full">
              <UserIcon className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/" className="px-3 py-2.5">
            <Settings className="size-4" />
            <span>Manage Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild onClick={onLogoutClick} className="cursor-pointer">
          <div className="px-3 py-2.5">
            <LogOut className="size-4" />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
