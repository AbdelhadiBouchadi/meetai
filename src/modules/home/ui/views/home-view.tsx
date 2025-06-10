'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {};

const HomeView = (props: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: 'Abdelhadi' }));

  return <div>{data?.greeting}</div>;
};

export default HomeView;
