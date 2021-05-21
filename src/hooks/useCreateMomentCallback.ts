import { BigNumber } from '@ethersproject/bignumber'
import { useCallback } from 'react'
import { IPFS_MOMENTS_ADDRESS, IPFS_MOMENTS_ABI, NFT_STORAGE_CLIENT } from '../constants'
import { toast } from 'react-toastify'
import { useContract } from './useContract'
import CID from 'cids'
import Multihashes from 'multihashes'

export interface MomentData {
  file: File | null
  name: string
  description: string
  amount: number
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useCreateMomentCallback(nftData: MomentData): () => Promise<void> {
  const ipfsMomentsContract = useContract(IPFS_MOMENTS_ADDRESS, IPFS_MOMENTS_ABI)

  return useCallback(async () => {
    if (!ipfsMomentsContract || !nftData.file || !nftData.name || !nftData.description) {
      console.error('invalid ipfs moment data or contract missing')
      return
    }
    const imageCid = await NFT_STORAGE_CLIENT.storeBlob(nftData.file)
    const nftMetadata = new Blob([
      JSON.stringify({ name: nftData.name, description: nftData.description, image: `ipfs://${imageCid}` }),
    ])
    const nftCid = new CID(await NFT_STORAGE_CLIENT.storeBlob(nftMetadata))
    console.log(Buffer.from(Multihashes.decode(nftCid.multihash).digest.buffer).toString('hex'))
    const erc1155Id = BigNumber.from(
      `0x${Buffer.from(Multihashes.decode(nftCid.multihash).digest.buffer).toString('hex')}`
    )
    try {
      const transaction = await ipfsMomentsContract.mintMoments(erc1155Id, nftData.amount || 1)
      await transaction.wait()
      toast.success('Moment successfully created')
    } catch (error) {
      toast.error('Error creating moment')
    }
  }, [ipfsMomentsContract, nftData.amount, nftData.description, nftData.file, nftData.name])
}