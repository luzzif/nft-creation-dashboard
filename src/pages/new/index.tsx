import { useWeb3React } from '@web3-react/core'
import { useState, ReactElement, useEffect } from 'react'
import { Flex, Box } from 'rebass'
import { ButtonMedium } from '../../components/button'
import { FileInput } from '../../components/input/file'
import { TextInput } from '../../components/input/text'
import { useCreateMomentCallback, MomentData } from '../../hooks/useCreateMomentCallback'

export function New(): ReactElement {
  const { account } = useWeb3React()
  const [nftData, setNftData] = useState<MomentData>({
    file: null,
    name: '',
    description: '',
    amount: 0,
  })
  const createMoment = useCreateMomentCallback(nftData)

  const [createDisabled, setCreateDisabled] = useState(false)

  useEffect(() => {
    setCreateDisabled(!account || !nftData.file || !nftData.name || !nftData.description)
  }, [account, nftData.description, nftData.file, nftData.name])

  const handleFormElementChangeHandler = (key: keyof MomentData) => (value: string | File) => {
    setNftData({ ...nftData, [key]: value })
  }

  return (
    <Flex flexDirection="column" width={['100%', '80%', '60%', '25%']} alignItems="center">
      <Box width="100%" mb="24px">
        <FileInput label="File" value={nftData.file} onChange={handleFormElementChangeHandler('file')} />
      </Box>
      <Box width="100%" mb="24px">
        <TextInput
          placeholder='E.g. "vicious drifting"'
          label="Name"
          value={nftData.name}
          onTextChange={handleFormElementChangeHandler('name')}
        />
      </Box>
      <Box width="100%" mb="24px">
        <TextInput
          placeholder='E.g. "that one time drifting"'
          label="Description"
          value={nftData.description}
          onTextChange={handleFormElementChangeHandler('description')}
        />
      </Box>
      <Flex width="100%">
        <Box>
          <ButtonMedium disabled={createDisabled} onClick={createMoment}>
            Create
          </ButtonMedium>
        </Box>
      </Flex>
    </Flex>
  )
}
