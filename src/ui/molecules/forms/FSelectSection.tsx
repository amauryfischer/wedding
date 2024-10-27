import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Select,
	SelectItem,
	SelectSection
} from "@nextui-org/react"
import _ from "lodash"
import { useFormContext, useController } from "react-hook-form"

interface FSelectProps {
	label?: string
	placeholder?: string
	name: string
	options: { label: string; value: string; section: string }[]
	size?: "xs" | "sm" | "md" | "lg" | "xl"
	variant?: "bordered" | "flat" | "faded" | "underlined"
	renderValue?: (value: string) => string
}

const FSelectSection = ({
	label = undefined,
	placeholder,
	name,
	options,
	size = undefined,
	variant = undefined,
	renderValue
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
		<Select
			variant={variant}
			{...field}
			label={label}
			renderValue={renderValue}
		>
			{_.uniqBy(options, "section").map((option) => (
				<SelectSection key={option.section} title={option.section}>
					{options
						.filter((o) => o.section === option.section)
						.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
				</SelectSection>
			))}
		</Select>
	)
}

export default FSelectSection
