import { Input } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FTextProps {
	label?: string
	placeholder?: string
	name: string
	autoFocus?: boolean
	size?: "sm" | "md" | "lg"
	hideLabel?: boolean
}

const FText = ({
	label = undefined,
	placeholder,
	name,
	autoFocus = false,
	size = undefined,
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
	if (error) {
		console.warn(error)
	}
	return (
		<Input
			errorMessage={error?.message}
			isInvalid={invalid}
			size={size}
			autoFocus={autoFocus}
			label={hideLabel ? undefined : label}
			labelPlacement={"outside"}
			placeholder={placeholder}
			width="100%"
			{...field}
			variant="bordered"
		/>
	)
}

export default FText
