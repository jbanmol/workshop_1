import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const Options = () => {
  const [whitelistedSites, setWhitelistedSites] = useState([]);
  const [newWhitelistSite, setNewWhitelistSite] = useState('');
  const [licenseKey, setLicenseKey] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['whitelistedSites', 'licenseKey'], (result) => {
      setWhitelistedSites(result.whitelistedSites || []);
      setLicenseKey(result.licenseKey || '');
    });
  }, []);

  const addWhitelistSite = () => {
    const updatedSites = [...whitelistedSites, newWhitelistSite];
    chrome.storage.local.set({ whitelistedSites: updatedSites }, () => {
      setWhitelistedSites(updatedSites);
      setNewWhitelistSite('');
    });
  };

  const verifyLicense = () => {
    // In a real implementation, this would call the backend API
    console.log(`Verifying license: ${licenseKey}`);
  }

  return (
    <div className="options-container">
      <h1>CleanBrowse Settings</h1>

      <section>
        <h2>Whitelist</h2>
        <input
          type="text"
          value={newWhitelistSite}
          onChange={(e) => setNewWhitelistSite(e.target.value)}
          placeholder="example.com"
        />
        <button onClick={addWhitelistSite}>Add Site</button>
        <ul>
          {whitelistedSites.map(site => <li key={site}>{site}</li>)}
        </ul>
      </section>

      <section>
        <h2>Premium</h2>
        <input
          type="text"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          placeholder="Enter your license key"
        />
        <button onClick={verifyLicense}>Verify License</button>
      </section>
    </div>
  );
};

render(<Options />, document.getElementById('app'));
