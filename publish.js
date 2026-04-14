const { execSync } = require('child_process');
execSync('npm config set //localhost:4873/:_authToken "secret_token_123"', { stdio: 'inherit' });
try { execSync('npm publish --registry http://localhost:4873/', { stdio: 'inherit' }); } catch(err) { console.error('Failed to publish ui!'); }
