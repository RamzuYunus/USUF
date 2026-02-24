## Packages
ethers | Web3 wallet interactions
framer-motion | Smooth animations and page transitions
date-fns | Date formatting for admin dashboard

## Notes
- Using window.ethereum for wallet connection (MetaMask, etc.). Graceful fallback if not present.
- Token price and supply from DB are handled as strings (numeric in pg) and converted to floats for calculation in UI.
- Asset images are imported directly via Vite aliases.
