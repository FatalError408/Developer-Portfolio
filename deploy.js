
// Simple script to deploy to GitHub Pages
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.cyan}Starting deployment to GitHub Pages...${colors.reset}\n`);

try {
  // Step 1: Build the project
  console.log(`${colors.yellow}Building project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 2: Create .nojekyll file to bypass Jekyll processing
  console.log(`\n${colors.yellow}Adding .nojekyll file...${colors.reset}`);
  execSync('touch dist/.nojekyll', { stdio: 'inherit' });
  
  // Step 3: Handling 404 for SPA routing
  console.log(`${colors.yellow}Ensuring 404.html is in place...${colors.reset}`);
  if (fs.existsSync('404.html')) {
    execSync('cp 404.html dist/', { stdio: 'inherit' });
  } else {
    console.log(`${colors.yellow}404.html not found, creating one...${colors.reset}`);
    const html404Content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script type="text/javascript">
    var pathSegmentsToKeep = 1;
    var l = window.location;
    var basePathName = '/Developer-Portfolio';
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      basePathName + '/?/' +
      l.pathname.slice(basePathName.length).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  <h1>Redirecting...</h1>
  <p>If you are not redirected automatically, click <a href="/Developer-Portfolio/">here</a>.</p>
</body>
</html>`;
    fs.writeFileSync('dist/404.html', html404Content);
  }
  
  // Step 4: Check dist directory
  console.log(`\n${colors.yellow}Verifying build output...${colors.reset}`);
  const distFiles = fs.readdirSync('dist');
  console.log(`Files in dist directory: ${distFiles.join(', ')}`);

  // Check if main JS and CSS files are present
  const hasJsFiles = distFiles.some(file => file.endsWith('.js'));
  const hasCssFiles = distFiles.some(file => file.endsWith('.css'));
  if (!hasJsFiles || !hasCssFiles) {
    console.warn(`${colors.yellow}Warning: Missing expected build files. JS files: ${hasJsFiles}, CSS files: ${hasCssFiles}${colors.reset}`);
  }
  
  // Step 5: Deploy to gh-pages branch
  console.log(`\n${colors.yellow}Deploying to GitHub Pages...${colors.reset}`);
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });

  console.log(`\n${colors.bright}${colors.green}Deployment successful!${colors.reset}`);
  console.log(`Visit https://[your-username].github.io/Developer-Portfolio/ to see your site.`);
  
  // Additional instructions
  console.log(`\n${colors.yellow}Important Notes:${colors.reset}`);
  console.log(`1. Make sure GitHub Pages is set up to deploy from the gh-pages branch in your repository settings.`);
  console.log(`2. It may take a few minutes for changes to appear on GitHub Pages.`);
  console.log(`3. If you see a blank page, check browser console for errors and verify all paths are correct.`);
} catch (error) {
  console.error(`\n${colors.bright}${colors.red}Deployment failed:${colors.reset}\n`, error);
  process.exit(1);
}
