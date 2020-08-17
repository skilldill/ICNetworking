export interface InputProps {
    type?: string;
    placeholder?: string;
    bottomBorder?: boolean;
    onChange?: (value: string) => void;
    value?: string;
}