import { Button, Label, Fieldset, Input, Form, Title, ErrorMessage } from '../../components'
import { useForm } from 'react-hook-form'
interface FormInputErrors {
  name: string
  phone: string
  email: string
  password: string
  confirmedPassword: string
}

const PersonalRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputErrors>()
  const password = watch('password')

  const validatePassword = {
    required: (val: string) => !!val || 'Por favor ingrese la contraseña nuevamente',
    minLength: (val: string) =>
      val.length >= 6 || 'La contraseña debe tener por lo menos y 6 caracteres',
    matchPassword: (val: string) => val === password || 'Las contraseñas no coinciden',
  }

  const onSubmitted = (data: FormInputErrors) => {
    console.log(data)
  }

  function validarEmail(value: string) {
    const formatEmail = /^[^\s@]+@alura\.com$/
    if (!formatEmail.test(value)) {
      console.error('Dirección de email inválido para el dominio alura.com')
      return 'Dirección de email inválido para el dominio alura.com'
    }

    return true
  }
  return (
    <>
      <Title>Ingresa algunos datos básicos:</Title>
      <Form onSubmit={handleSubmit(onSubmitted)}>
        <Fieldset>
          <Label htmlFor='field-name'>Nombre</Label>
          <Input
            id='field-name'
            placeholder='Escribe tu nombre completo'
            type='text'
            $error={!!errors.name}
            {...register('name', {
              required: 'El campo Nombre es obligatorio',
              minLength: {
                value: 5,
                message: 'El nombre debe tener al menos 5 caracteres',
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor='field-email'>Correo electrónico</Label>
          <Input
            id='field-email'
            placeholder='Ingresa tu dirección de correo electrónico'
            type='email'
            $error={!!errors.email}
            {...register('email', {
              required: 'El campo Correo es obligatorio',
              validate: validarEmail,
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Teléfono</Label>
          <Input
            id='field-phone'
            type='text'
            placeholder='Ej: (DDD)XX XXXX-XXXX'
            {...register('phone', {
              required: 'El teléfono es obligatorio',
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor='field-password'>Crea una contraseña</Label>
          <Input
            id='field-password'
            placeholder='Crea una contraseña'
            type='password'
            $error={!!errors.password}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe de ser de al menos 6 caracter',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor='field-confirm-password'>Repite la contraseña</Label>
          <Input
            id='field-confirm-password'
            placeholder='Repite la contraseña anterior'
            type='password'
            $error={!!errors.confirmedPassword}
            {...register('confirmedPassword', {
              required: 'Debe repetir la contraseña',
              validate: validatePassword,
            })}
          />
          {errors.confirmedPassword && (
            <ErrorMessage>{errors.confirmedPassword.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type='submit'>Avanzar</Button>
      </Form>
    </>
  )
}

export default PersonalRegistration
