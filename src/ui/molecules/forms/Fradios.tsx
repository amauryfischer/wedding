import { Input, Radio, RadioGroup } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FTextProps {
	label?: string
	placeholder?: string
	name: string
	autoFocus?: boolean
	size?: "sm" | "md" | "lg"
	hideLabel?: boolean
	options: { label: string; value: string }[]
	orientation?: "vertical" | "horizontal"
}

const FRadios = ({
	label,
	name,
	autoFocus = false,
	size = undefined,
	options,
	orientation = "vertical",
	hideLabel = false
}: FTextProps) => {
	const { control } = useFormContext()
	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields }
	} = useController({
		name,
		control,
		rules: { required: true }
	})

	// nextui
	return (
		<RadioGroup
			label={hideLabel ? undefined : label}
			value={field.value}
			onValueChange={field.onChange}
			orientation={orientation}
			isInvalid={invalid}
			errorMessage={error?.message}
		>
			{options.map((option) => (
				<Radio key={option.value} value={option.value}>
					{option.label}
				</Radio>
			))}
		</RadioGroup>
	)
}

export default FRadios
