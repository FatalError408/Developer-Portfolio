
// Simple script to deploy to GitHub Pages
const { execSync } = require('child_process');
const path = require('path');

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
  execSync('cp 404.html dist/', { stdio: 'inherit' });
  
  // Step 4: Deploy to gh-pages branch
  console.log(`\n${colors.yellow}Deploying to GitHub Pages...${colors.reset}`);
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });

  console.log(`\n${colors.bright}${colors.green}Deployment successful!${colors.reset}`);
  console.log(`Visit https://[your-username].github.io/Developer-Portfolio/ to see your site.`);
} catch (error) {
  console.error(`\n${colors.bright}${colors.red}Deployment failed:${colors.reset}\n`, error);
  process.exit(1);
}
