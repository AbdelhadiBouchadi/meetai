"use client";

import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { PricingCard } from "./pricing-card";

const UpgradeView = () => {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  return (
    <div className="flex flex-1 flex-col gap-y-10 px-4 py-4 md:px-8">
      <div className="mt-4 flex flex-1 flex-col items-center gap-y-10">
        <h5 className="text-2xl font-medium md:text-3xl">
          You're on the{" "}
          <span className="text-primary font-semibold">
            {currentSubscription?.name ?? "Free"}
          </span>{" "}
          Plan
        </h5>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((product) => {
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;

            let buttonText = "Upgrade";
            let onClick = () => authClient.checkout({ products: [product.id] });

            if (isCurrentProduct) {
              buttonText = "Manage";
              onClick = () => authClient.customer.portal();
            } else if (isPremium) {
              buttonText = "Change Plan";
              onClick = () => authClient.customer.portal();
            }

            return (
              <PricingCard
                key={product.id}
                buttonText={buttonText}
                onClick={onClick}
                variant={
                  product.metadata.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                }
                title={product.name}
                price={
                  product.prices[0].amountType === "fixed"
                    ? product.prices[0].priceAmount / 100
                    : 0
                }
                description={product.description!}
                priceSuffix={`${product.prices[0].recurringInterval}`}
                features={product.benefits.map(
                  (benefit) => benefit.description,
                )}
                badge={product.metadata.badge as string | null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState title="Loading" description="This may take a few seconds" />
  );
};

export const UpgradeViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};

export default UpgradeView;
