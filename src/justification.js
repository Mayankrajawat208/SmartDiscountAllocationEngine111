export function generateJustification(agent) {
  const messages = [];
  if (agent.performanceScore > 80) messages.push('high performance');
  if (agent.seniorityMonths > 12) messages.push('long-term contribution');
  if (agent.targetAchievedPercent > 75) messages.push('strong target achievement');
  if (agent.activeClients > 10) messages.push('high client responsibility');
  return messages.length > 0 ? messages.join(', ') : 'consistent performance';
}
