import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // Using the jsconfigPaths plugin is a cleaner and more standard way
  // to handle path aliases than maintaining a long list in the vite config.
  // It reads the paths from jsconfig.json.
  plugins: [react(), jsconfigPaths()],
});