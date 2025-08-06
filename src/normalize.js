import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const weights = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'weights.json'), 'utf-8')
);

export function normalizeAgents(agents) {
  const max = {
    performanceScore: Math.max(...agents.map(a => a.performanceScore)),
    seniorityMonths: Math.max(...agents.map(a => a.seniorityMonths)),
    targetAchievedPercent: Math.max(...agents.map(a => a.targetAchievedPercent)),
    activeClients: Math.max(...agents.map(a => a.activeClients)),
  };

  return agents.map(agent => {
    const score = 
      (agent.performanceScore / max.performanceScore) * (weights.performanceScore || 0) +
      (agent.seniorityMonths / max.seniorityMonths) * (weights.seniorityMonths || 0) +
      (agent.targetAchievedPercent / max.targetAchievedPercent) * (weights.targetAchievedPercent || 0) +
      (agent.activeClients / max.activeClients) * (weights.activeClients || 0);

    return { ...agent, score };
  });
}
