import IPFS_MOMENTS_ABI from './abis/factory.json'
import { NFTStorage } from 'nft.storage'

export const IPFS_MOMENTS_ADDRESS = '0x72FA18Acc30AA736238790b0398090a0e760Be01'
export const NFT_STORAGE_CLIENT = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY as string })
export { IPFS_MOMENTS_ABI }
