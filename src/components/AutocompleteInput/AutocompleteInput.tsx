import styled from "styled-components/macro";

const Ul = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

const Li = styled.li`
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;

  cursor: pointer;
`;

interface AutocompleteInputProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
  onOptionClick(value: string): void;
  options: string[];
  optionsLimit?: number;
  inputTestId?: string;
}

const limitOptions = (options: string[], limit: number) =>
  options.filter((option, index) => index <= limit);

export const AutocompleteInput = ({
  value,
  onChange,
  onKeyDown,
  onOptionClick,
  options,
  optionsLimit = 5,
  inputTestId,
}: AutocompleteInputProps) => {
  const limitedOptions = limitOptions(options, optionsLimit);

  return (
    <div>
      <input
        data-testid={inputTestId}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Ul>
        {limitedOptions.map((option) => (
          <Li onClick={() => onOptionClick(option)} key={option}>
            {option}
          </Li>
        ))}
      </Ul>
    </div>
  );
};
