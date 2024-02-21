import { defineConfig } from 'astro/config';
import node from "@astrojs/node";


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
  server: {
    host: "0.0.0.0"
  },
  ssr: {
    // Add npm packages containing invalid code here
    noExternal: ["astro-bootstrap"],
  },

  
});