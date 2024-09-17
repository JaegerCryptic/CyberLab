import { ChangeEvent, ForwardedRef, forwardRef } from 'react'
import { Controller, ControllerProps, FieldValues } from 'react-hook-form'

import { CLTextInput, CLTextInputProps } from './CLTextInput'

/**
 * Fully extensible React Hook Form controller wrapper for CLTextInput
 * Designed to work with Zod schema parsing, it should work for everything
 * 
 * Example usage:
 * 
 * // Schema and inferred type
 * const EmailLoginSchema = z.object({
 *   email: z.string().email(EMAIL_ERROR_MESSAGE),
 *   password: z.string()
 * })
 * 
 * type EmailLoginSchema = z.infer<typeof EmailLoginSchema>
 * 
 * // useForm control
 * const { control, handleSubmit } = useForm<EmailLoginSchema>({
    resolver: zodResolver(EmailLoginSchema),
    mode: 'onSubmit',
  })
 * 
 * // Component with type provided
 * <ControlledInput<EmailLoginSchema>
 *   control={control}
 *   name={email} // name of the field
 *   // other controller props here
 *   inputProps={{
 *     label="Email"
 *     // props for CLTextInput component, excluding onChange and value
 *   }}


 */

interface Props<T extends FieldValues>
  extends Omit<ControllerProps<T>, 'render'> {
  inputProps: Omit<CLTextInputProps, 'onChange' | 'value'>
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InnerControlledInput = <T extends FieldValues>(
  props: Props<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { name, control, defaultValue, inputProps, ...controllerProps } = props

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error: fieldError },
      }) => (
        <CLTextInput
          ref={ref}
          onChange={props.onChange || onChange}
          onBlur={onBlur}
          value={value}
          error={Boolean(fieldError) || Boolean(inputProps.error)}
          helperText={fieldError?.message || inputProps.helperText}
          {...inputProps}
        />
      )}
    />
  )
}

const ControlledInput = forwardRef(InnerControlledInput) as <
  T extends FieldValues
>(
  props: Props<T> & React.RefAttributes<HTMLInputElement>
) => JSX.Element

export { ControlledInput }
