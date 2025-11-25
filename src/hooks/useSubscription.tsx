import { useState, useEffect } from "react";

export type SubscriptionTier = "free" | "premium";

export const useSubscription = () => {
  const [tier, setTier] = useState<SubscriptionTier>(() => {
    const stored = localStorage.getItem("subscription_tier");
    return (stored as SubscriptionTier) || "free";
  });

  const isPremium = tier === "premium";

  const toggleTier = () => {
    const newTier: SubscriptionTier = tier === "free" ? "premium" : "free";
    setTier(newTier);
    localStorage.setItem("subscription_tier", newTier);
  };

  const setToPremium = () => {
    setTier("premium");
    localStorage.setItem("subscription_tier", "premium");
  };

  const setToFree = () => {
    setTier("free");
    localStorage.setItem("subscription_tier", "free");
  };

  return {
    tier,
    isPremium,
    toggleTier,
    setToPremium,
    setToFree,
  };
};
