import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Select,
	SelectItem
} from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FSelectProps {
	label?: string
	placeholder?: string
	name: string
	options: { label: string; value: string; alias?: string[] }[]
	size?: "xs" | "sm" | "md" | "lg" | "xl"
	variant?: "bordered" | "flat" | "faded" | "underlined"
}

const FSelect = ({
	label = undefined,
	placeholder,
	name,
	options,
	size = undefined,
	variant = undefined
}: FSelectProps) => {
	const { control } = useFormContext()
	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields }
	} = useController({
		name,
		control
	})
	return (
		<Select variant={variant} {...field} selectionMode="multiple" label={label}>
			{options.map((option) => (
				<SelectItem key={option.value} value={option.value}>
					{option.label}
				</SelectItem>
			))}
		</Select>
	)
}

export default FSelect
