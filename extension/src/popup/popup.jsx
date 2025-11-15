import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

console.log("Popup script loaded!");

const Popup = () => {
  const [blockedCount, setBlockedCount] = useState(0);
  const [isSiteWhitelisted, setIsSiteWhitelisted] = useState(false);

  useEffect(() => {
    // Placeholder logic to get blocked count and whitelist status
    // In a real implementation, this would communicate with the background script
    chrome.storage.local.get(['blockedCount', 'whitelistedSites'], (result) => {
      setBlockedCount(result.blockedCount || 0);
      // Logic to check if the current site is whitelisted
    });
  }, []);

  const toggleWhitelist = () => {
    setIsSiteWhitelisted(!isSiteWhitelisted);
    // Logic to update whitelist in chrome.storage
  };

  return (
    <div className="popup-container">
      <h1>CleanBrowse</h1>
      <p>Blocked on this page: <strong>{blockedCount}</strong></p>
      <button onClick={toggleWhitelist}>
        {isSiteWhitelisted ? 'Remove from Whitelist' : 'Add to Whitelist'}
      </button>
      <a href="/src/options/index.html" target="_blank">Settings</a>
      <a href="#" id="upgrade-cta">Upgrade to Premium</a>
    </div>
  );
};

render(<Popup />, document.getElementById('app'));
