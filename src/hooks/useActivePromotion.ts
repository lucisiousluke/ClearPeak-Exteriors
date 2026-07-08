import * as React from "react";
import { promotions } from "~/data/promotions";
import type { Promotion } from "~/types";

const isActiveToday = (promo: Promotion): boolean => {
  if (!promo.active) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (promo.startDate) {
    const start = new Date(promo.startDate);
    start.setHours(0, 0, 0, 0);
    if (today < start) return false;
  }
  if (promo.endDate) {
    const end = new Date(promo.endDate);
    end.setHours(23, 59, 59, 999);
    if (today > end) return false;
  }
  return true;
};

/**
 * Resolves the active promotion (if any) for a given placement, evaluated
 * client-side against today's date. Starts as `null` on both server render
 * and initial client render (same output, no hydration mismatch), then
 * updates after mount — this keeps a static-site build correct even when a
 * promo's date window starts/ends between deploys, without needing a fresh
 * build exactly at the boundary.
 */
export function useActivePromotion(placement: Promotion["placement"]): Promotion | null {
  const [promo, setPromo] = React.useState<Promotion | null>(null);

  React.useEffect(() => {
    const match = promotions.find((p) => p.placement === placement && isActiveToday(p));
    setPromo(match ?? null);
  }, [placement]);

  return promo;
}
