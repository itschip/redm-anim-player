import React, {useMemo, useState} from 'react';
import './App.css'
import {debugData} from "../utils/debugData";
import {
	Box, Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent, ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text
} from "@chakra-ui/react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import Autocomplete from "./Autocomplete";
import Anims from '../anims.json'

// This will set the NUI to visible if we are
// developing in browser
debugData([
	{
		action: 'setVisible',
		data: true,
	},
	{
		action: 'redm-anim-player:toggleModal',
		data: true
	}
])

export interface Item {
	label: string;
	value: string;
}

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [animDict, setAnimDict] = useState('');
	const [animName, setAnimName] = useState('');
	
	const initialRef = React.useRef()
	const finalRef = React.useRef()
	
	useNuiEvent<boolean>('redm-anim-player:toggleModal', (show) => {
		setIsModalOpen(show)
	})
	const closeModal = () => {
		setIsModalOpen(false)
	}
	
	const anims: any = Anims;
	
	const handleOnChangeDict = (value: string) => {
		setAnimDict(value)
	}
	
	const handleOnChangeName = (value: string) => {
		setAnimName(value)
	}
	
	const animDicts: string[] = useMemo(() => {
		return Object.keys(Anims)
	}, [])
	
	const animNames: string[] = useMemo(() => {
		return anims[animDict]
	}, [animDict])
	
	return (
		<div className="nui-wrapper">
			<Modal size="4xl" isOpen={isModalOpen} onClose={closeModal} closeOnOverlayClick={false}>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>Animation player</ModalHeader>
					<ModalCloseButton/>
					<ModalBody>
						<Autocomplete
							placeholder="Anim dict"
							value={animDict}
							onChange={handleOnChangeDict}
							items={animDicts}
						/>
						<Autocomplete
							placeholder="Anim name"
							value={animName}
							onChange={handleOnChangeName}
							items={animNames}
						/>
						<Box pt={3}>
							<Text mb={4} fontSize="1xl" fontWeight={500}>Arguments</Text>
							<Box gap={5} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="stretch">
								<Box display="flex" flexDirection="column">
									<Checkbox defaultChecked>Lock X</Checkbox>
									<Checkbox defaultChecked>Lock Y</Checkbox>
									<Checkbox defaultChecked>Lock Z</Checkbox>
								</Box>
								<Box>
									<Text mb='8px'>BlendInSpeed</Text>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Box>
								<Box>
									<Text mb='8px'>BlendOutSpeed</Text>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Box>
								<Box>
									<Text mb='8px'>Duration</Text>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Box>
								<Box>
									<Text mb='8px'>Flag</Text>
									<NumberInput>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Box>
								<Box>
									<Text mb='8px'>PlaybackRate </Text>
									<NumberInput>
										<NumberInputField />
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
						<Button>Play</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default App;
