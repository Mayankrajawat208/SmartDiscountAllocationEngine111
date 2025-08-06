import { normalizeAgents } from "./normalize.js";
import { generateJustification } from "./justification.js";
import { enforceMinMax } from "./utils.js";

export function allocateDiscounts(data) {
  const kitty = data.siteKitty;
  const agents = data.salesAgents;
  const config = data.config || {};
  const mode = config.mode || "base-bonus";

  const normalized = normalizeAgents(agents);

  let allocations = [];

  if (mode === "base-bonus") {
    const basePortion = config.basePercentage || 0.2;
    const baseAmount = (kitty * basePortion) / agents.length;
    const bonusPool = kitty - baseAmount * agents.length;
    const totalScore = normalized.reduce((sum, a) => sum + a.score, 0);

    allocations = normalized.map((agent) => {
      const bonus = (agent.score / totalScore) * bonusPool;
      const total = baseAmount + bonus;
      return {
        id: agent.id,
        rawAmount: total,
        justification: generateJustification(agent),
      };
    });
  } else {
    const totalScore = normalized.reduce((sum, a) => sum + a.score, 0);
    allocations = normalized.map((agent) => {
      const share = (agent.score / totalScore) * kitty;
      return {
        id: agent.id,
        rawAmount: share,
        justification: generateJustification(agent),
      };
    });
  }

  // Apply min/max caps and round values
  const final = enforceMinMax(allocations, config, kitty);
  let totalAssigned = final.reduce(
    (sum, agent) => sum + agent.assignedDiscount,
    0
  );
  let leftover = kitty - totalAssigned;

  // 🔁 Redistribute leftover kitty based on scores
  if (leftover > 0) {
    const totalScore = normalized.reduce((sum, a) => sum + a.score, 0);

    for (let agent of final) {
      const agentScore = normalized.find((a) => a.id === agent.id).score;
      const bonusShare = Math.floor((agentScore / totalScore) * leftover);
      agent.assignedDiscount += bonusShare;
    }

    // Recalculate remaining kitty
    totalAssigned = final.reduce(
      (sum, agent) => sum + agent.assignedDiscount,
      0
    );
    leftover = kitty - totalAssigned;
  }

  return {
    allocations: final,
    remainingKitty: leftover,
  };
}
