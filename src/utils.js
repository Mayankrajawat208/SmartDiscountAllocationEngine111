export function enforceMinMax(allocations, config, kitty) {
  let total = 0;

  const adjusted = allocations.map(a => {
    let amount = Math.round(a.rawAmount);
    if (config.min && amount < config.min) amount = config.min;
    if (config.max && amount > config.max) amount = config.max;
    total += amount;
    return { id: a.id, assignedDiscount: amount, justification: a.justification };
  });

  const excess = total - kitty;

  if (excess > 0) {
    adjusted.sort((a, b) => b.assignedDiscount - a.assignedDiscount).reverse();
    let i = 0;
    while (total > kitty && i < adjusted.length) {
      const reducible = adjusted[i].assignedDiscount - (config.min || 0);
      const reduction = Math.min(reducible, excess);
      adjusted[i].assignedDiscount -= reduction;
      total -= reduction;
      i++;
    }
  }

  return adjusted;
}
