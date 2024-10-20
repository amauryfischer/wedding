import { Input, Textarea } from "@nextui-org/react"
import { useFormContext, useController } from "react-hook-form"

interface FTextProps {
	label?: string
	placeholder?: string
	name: string
	autoFocus?: boolean
	size?: "sm" | "md" | "lg"
	hideLabel?: boolean
}

const FTextarea = ({
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
	return (
		<Textarea
			size={size}
			autoFocus={autoFocus}
			label={hideLabel ? undefined : label}
			labelPlacement={"outside"}
			placeholder={placeholder}
			width="100%"
			{...field}
			variant="bordered"
			errorMessage={error?.message}
		/>
	)
}

export default FTextarea
