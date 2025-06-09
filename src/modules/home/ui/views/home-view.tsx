'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const HomeView = (props: Props) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-svh">
        <p className="text-lg">You are not logged in.</p>
        <Button asChild>
          <a href="/sign-in">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-svh p-4 gap-y-4">
      <p>
        {' '}
        Logged in as{' '}
        <span className="text-2xl font-bold">{session?.user.name}</span>{' '}
      </p>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push('/sign-in') },
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default HomeView;
