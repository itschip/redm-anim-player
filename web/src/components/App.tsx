import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { debugData } from '../utils/debugData';
import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useNuiEvent } from '../hooks/useNuiEvent';
import Autocomplete from './Autocomplete';
import Anims from '../anims.json';
import { useDebounce } from '../hooks/useDebounce';
import { fetchNui } from '../utils/fetchNui';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
  {
    action: 'redm-anim-player:toggleModal',
    data: true,
  },
]);

export interface Item {
  label: string;
  value: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animDict, setAnimDict] = useState('');
  const [animName, setAnimName] = useState('');

  // I don't want to hear it. Too lazy to bring in react-hook-form
  const [lockX, setLockX] = useState(false);
  const [lockY, setLockY] = useState(false);
  const [lockZ, setLockZ] = useState(false);
  const [blendInSpeed, setBlendInSpeed] = useState(0);
  const [blendOutSpeed, setBlendOutSpeed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [flag, setFlag] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0);

  const animDictDebounce = useDebounce(animDict, 500);
  const animNameDebounce = useDebounce(animName, 500);

  useNuiEvent<boolean>('redm-anim-player:toggleModal', (show) => {
    setIsModalOpen(show);
  });

  const handlePlayAnimation = () => {
    fetchNui('anim-player:play', {
      animDict,
      animName,
      lockX,
      lockY,
      lockZ,
      blendInSpeed,
      blendOutSpeed,
      duration,
      flag,
      playbackRate,
    }).then((res) => {
      console.log(res);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeDict = (value: string) => {
    setAnimDict(value);
  };

  const handleOnChangeName = (value: string) => {
    setAnimName(value);
  };

  useEffect(() => {
    setAnimDict(animDictDebounce);
  }, [setAnimDict, animDictDebounce]);

  useEffect(() => {
    setAnimName(animNameDebounce);
  }, [setAnimName, animNameDebounce]);

  const anims: any = Anims;

  const animDicts: string[] = useMemo(() => {
    return Object.keys(Anims);
  }, []);

  const animNames: string[] = useMemo(() => {
    return anims[animDict];
  }, [animDict]);

  return (
    <div className="nui-wrapper">
      <Modal size="4xl" isOpen={isModalOpen} onClose={closeModal} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Animation player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Autocomplete
              placeholder="Anim dict"
              value={animDict}
              onChange={handleOnChangeDict}
              items={animDicts}
            />
            <Autocomplete
              disabled={!animDict}
              placeholder="Anim name"
              value={animName}
              onChange={handleOnChangeName}
              items={animNames}
            />
            <Box pt={3}>
              <Text mb={4} fontSize="1xl" fontWeight={500}>
                Arguments
              </Text>
              <Box
                gap={5}
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                alignItems="stretch"
              >
                <Box display="flex" flexDirection="column">
                  <Checkbox isChecked={lockX} onChange={(e) => setLockX(e.target.checked)}>
                    Lock X
                  </Checkbox>
                  <Checkbox isChecked={lockY} onChange={(e) => setLockY(e.target.checked)}>
                    Lock Y
                  </Checkbox>
                  <Checkbox isChecked={lockZ} onChange={(e) => setLockZ(e.target.checked)}>
                    Lock Z
                  </Checkbox>
                </Box>
                <Box>
                  <Text mb="8px">BlendInSpeed</Text>
                  <NumberInput>
                    <NumberInputField
                      value={blendInSpeed}
                      onChange={(e: any) => setBlendInSpeed(e.target.value)}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text mb="8px">BlendOutSpeed</Text>
                  <NumberInput>
                    <NumberInputField
                      value={blendOutSpeed}
                      onChange={(e: any) => setBlendOutSpeed(e.target.value)}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text mb="8px">Duration</Text>
                  <NumberInput>
                    <NumberInputField
                      value={duration}
                      onChange={(e: any) => setDuration(e.target.value)}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text mb="8px">Flag</Text>
                  <NumberInput>
                    <NumberInputField value={flag} onChange={(e: any) => setFlag(e.target.value)} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text mb="8px">PlaybackRate </Text>
                  <NumberInput>
                    <NumberInputField
                      value={playbackRate}
                      onChange={(e: any) => setPlaybackRate(e.target.value)}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlePlayAnimation}>Play</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;
