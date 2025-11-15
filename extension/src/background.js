// Service worker for CleanBrowse

chrome.runtime.onInstalled.addListener(() => {
  console.log("CleanBrowse installed.");
  // On install, load the initial set of rules
  updateRules();
});

// Function to fetch, format, and apply declarativeNetRequest rules
async function updateRules() {
  const ruleFiles = ['rules/rules.json']; // Can be expanded with more lists
  const allRules = [];
  let ruleId = 1;

  for (const file of ruleFiles) {
    const response = await fetch(chrome.runtime.getURL(file));
    const rules = await response.json();
    allRules.push(...rules.map(rule => ({ ...rule, id: ruleId++ })));
  }

  // Get current rules to remove them before adding new ones
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingRuleIds = existingRules.map(rule => rule.id);

  // Update the ruleset
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRuleIds,
    addRules: allRules,
  });

  console.log("Blocking rules updated.");
}
