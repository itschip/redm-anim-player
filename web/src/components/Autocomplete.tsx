import React, { useState } from 'react';
import { Box, Input } from '@chakra-ui/react';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  items: string[];
  placeholder: string;
  disabled?: any;
}

interface AutocompleteListProps {
  value: string;
  items: string[];
  onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  items,s
  placeholder,
  disabled,
}) => {
  const handleOnChange = (value: string) => {
    onChange(value);
  };

  return (
    <Box zIndex={9999999999} mb={3}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleOnChange(e.currentTarget.value)}
        disabled={disabled}
      />
      {value && <AutocompleteList value={value} items={items} onChange={handleOnChange} />}
    </Box>
  );
};

const AutocompleteList: React.FC<AutocompleteListProps> = ({ value, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(!!value);

  const regExp = new RegExp(value, 'gi');

  const handleSelectedItem = (item: string) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Box zIndex={99999999999} bg="gray.600" position="absolute" width="90%" borderRadius={8}>
          {items &&
            items
              ?.filter((item) => item?.match(regExp))
              ?.map((item) => (
                <Box
                  onClick={() => handleSelectedItem(item)}
                  width="100%"
                  pl={2}
                  _hover={{
                    bg: 'gray.500',
                    _first: {
                      borderTopRadius: 8,
                      borderBottomRadius: 0,
                    },
                    _last: {
                      borderTopRadius: 0,
                      borderBottomRadius: 8,
                    },
                  }}
                  m={0}
                  py={1}
                >
                  {item}
                </Box>
              ))}
        </Box>
      )}
    </>
  );
};

export default Autocomplete;
