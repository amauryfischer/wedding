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
		field: { onChange, value, ...field },
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields }
	} = useController({
		name,
		control
	})
	return (
		<>
			value : {value.toString()}
			<Select
				variant={variant}
				{...field}
				selectionMode="multiple"
				label={label}
				selectedKeys={new Set(value || [])}
				onSelectionChange={(e) => onChange(Array.from(e))}
			>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</Select>
		</>
	)
}

export default FSelect
